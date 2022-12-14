const Airtable = require("airtable");
const base = new Airtable({
  apiKey: "keyjm7Rkv2Helu2vj",
}).base("appRsEirIz69I34Qg");

const table = base("todo");

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};
const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }
  return { id: record.id, fields: record.fields };
};
export { table, getMinifiedRecord, minifyRecords };
