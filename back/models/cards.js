const { disable } = require("debug");
const db = require("../components/db");

module.exports.insert = async (connection, options) => {
  let query = "INSERT INTO cards SET ?";
	let values = options;

  return await db.query({
    connection: connection,
    query: query,
    values: values,
  });
};

module.exports.update = async (connection, options) => {
	let query = "UPDATE cards SET ? WHERE id = ?";

  return await db.query({
    connection: connection,
    query: query,
    values: [options, options.id],
  });
};

module.exports.delete = async (connection, options) => {
	let query = "UPDATE cards SET deleted = 1 FROM  WHERE id = ?";

  return await db.query({
    connection: connection,
    query: query,
    values: options.id,
  });
};

module.exports.getList = async (options) => {
  const {offset , limit} = options

  try {
    if (offset && limit){
      let query = `SELECT * FROM cards limit ${limit} offset ${offset} WHERE deleted = 0`;
      return await db.query({
        query: query
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
