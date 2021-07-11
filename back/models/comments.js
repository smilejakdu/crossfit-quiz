const db = require("../components/db");

module.exports.insert = async (connection, options) => {
  console.log("options : ", options);
  let query = "INSERT INTO comment SET ?";
  let values = options;
  return await db.query({
    connection: connection,
    query: query,
    values: values,
  });
};

module.exports.update = async (connection, options) => {
  console.log("options : ", options);
  let query = "UPDATE comment SET ? WHERE id = ?";
  return await db.query({
    connection: connection,
    query: query,
    values: [options, options.id],
  });
};

module.exports.delete = async (connection, options) => {
  console.log("options : ", options.idx); // {idx :2, name:'ssdf'}
  let query = "DELETE FROM comment WHERE id = ?";
  return await db.query({
    connection: connection,
    query: query,
    values: options.id,
  });
};

module.exports.getList = async (options) => {
  console.log("options : ", options);
  const { quiz_id } = options;
  let query = "SELECT * FROM comments";
	let values;

  if (quiz_id) {
    query += " WHERE quiz_id = ?";
    values = quiz_id;
  }
  return await db.query({
    // connection:connection,
    query: query,
    values: values,
  });
};

