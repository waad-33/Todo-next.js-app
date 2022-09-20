import { table, getMinifiedRecord } from "./utils/Airtable";
import ownsRecord from "./middleware/ownsRecord";
import auth0 from "./utils/auth0";
export default ownsRecord(async (req, res) => {
  const { user } = await auth0.getSession(req, res);
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
