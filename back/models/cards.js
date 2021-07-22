const { disable } = require("debug");
const db = require("../components/db");

module.exports.insert = async (connection, options) => {
  console.log("options : ", options);
  let query = "INSERT INTO cards SET ?";
	let values = options;

  return await db.query({
    connection: connection,
    query: query,
    values: values,
  });
};

module.exports.update = async (connection, options) => {
  console.log("options : ", options); 
	let query = "UPDATE cards SET ? WHERE id = ?";

  return await db.query({
    connection: connection,
    query: query,
    values: [options, options.id],
  });
};

module.exports.delete = async (connection, options) => {
  console.log("options : ", options.id); 
	let query = "DELETE FROM cards WHERE id = ?";

  return await db.query({
    connection: connection,
    query: query,
    values: options.id,
  });
};

module.exports.getList = async (options) => {
  console.log("options : ", options);
  try {
    const { offset , limit} = options;
    if (offset && limit){
      let query = `SELECT * FROM cards limit ${limit} offset ${offset}`;
      return await db.query({
        query: query
      });
    }
    // select * from cards limit 2 offset 6;
  } catch (err) {
    throw new Error(err);
  }
};
