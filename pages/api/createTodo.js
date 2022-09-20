import { table, minifyRecords } from "./utils/Airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import auth0 from "./utils/auth0";

export default auth0.withApiAuthRequired(async (req, res) => {
  const { description, detailedDescription } = req.body;
  const { user } = await auth0.getSession(req, res);

  try {
    const createdRecords = await table.create([
      { fields: { description, userId: user.sub, detailedDescription } },
    ]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };

    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "something went wrong" });
  }
});
