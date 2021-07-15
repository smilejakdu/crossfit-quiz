const { disable } = require("debug");
const db = require("../components/db");

module.exports.insert = async (connection, options) => {
  console.log("options : ", options);
  let query = "INSERT INTO quizzes SET ?";
  let values = options;
  return await db.query({
    connection: connection,
    query: query,
    values: values,
  });
};

module.exports.update = async (connection, options) => {
  console.log("options : ", options); 
  let query = "UPDATE quizzes SET ? WHERE id = ?";
  return await db.query({
    connection: connection,
    query: query,
    values: [options, options.id],
  });
};

module.exports.delete = async (connection, options) => {
  console.log("options : ", options.quiz_id); 
  let query = "DELETE FROM quizzes WHERE id = ?";
  return await db.query({
    connection: connection,
    query: query,
    values: options.quiz_id,
  });
};

module.exports.getList = async (options) => {
  console.log("options : ", options);
  const { id } = options;
  let query = "SELECT * FROM quizzes ";
  let values;

  if (id) {
    query += " WHERE id = ?";
    values = id;
  }
  return await db.query({
    // connection:connection,
    query: query,
    values: values,
  });
};