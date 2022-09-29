const Airtable = require("airtable");
const base = new Airtable({
  apiKey: "keyjm7Rkv2Helu2vj",
}).base("appRsEirIz69I34Qg");

const customerTable = base("customers");

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};
const getMinifiedRecord = (record) => {
  return { id: record.id, fields: record.fields };
};
export { customerTable, getMinifiedRecord, minifyRecords };
