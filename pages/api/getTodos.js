import { table, minifyRecords } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import auth0 from "./utils/auth0";

export default auth0.withApiAuthRequired(async (req, res) => {
  const { user } = await auth0.getSession(req, res);
  try {
    const records = await table
      .select({
        filterByFormula: `userId = '${user.sub}'`,
      })
      .firstPage();
    const minifiedRecords = minifyRecords(records);

    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "something went wrong" });
  }
});
