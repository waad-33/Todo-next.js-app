import { table, minifyRecords } from "../api/utils/ServersAirtable";
import { getMinifiedRecord } from "./utils/airtable";
import auth0 from "./utils/auth0";

export default auth0.withApiAuthRequired(async (req, res) => {
  const { id } = req.body;
  try {
    const deletedRecords = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "something went wrong" });
  }
});
