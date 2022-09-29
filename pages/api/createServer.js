import auth0 from "./utils/auth0";
import { table, minifyRecords } from "./utils/ServersAirtable";

export default auth0.withApiAuthRequired(async (req, res) => {
  const { name, location, customer } = req.body;
  const { user } = await auth0.getSession(req, res);

  try {
    const createdRecords = await table.create([
      { fields: { name: name, location: location, customer: customer } },
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
