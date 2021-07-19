const { disable } = require("debug");
const db = require("../components/db");

module.exports.insert = async (connection, options) => {
  console.log("options : ", options);
  let query = "INSERT INTO users SET ?";
  let values = options;
  return await db.query({
    connection: connection,
    query: query,
    values: values,
  });
};

module.exports.update = async (connection, options) => {
  console.log("options : ", options); // {idx :2, name:'ssdf'}
  let query = "UPDATE users SET ? WHERE user_idx = ?";
  return await db.query({
    connection: connection,
    query: query,
    values: [options, options.user_idx],
  });
};

module.exports.delete = async (connection, options) => {
  console.log("options : ", options.user_idx); // {idx :2, name:'ssdf'}
  let query = "DELETE FROM users WHERE user_idx = ?";
  return await db.query({
    connection: connection,
    query: query,
    values: options.user_idx,
  });
};

module.exports.getList = async (options) => {
  console.log("options : ", options);
  const { id } = options;
  let query = "SELECT * FROM users ";
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

module.exports.getCartGetList = async (options) => {
  const { user_idx } = options;
  let query = "";
  let values = [];

  if (user_idx) {
    query += "SELECT * FROM users WHERE user_idx = ?";
    values.push(user_idx);
  }

  return await db.query({
    // connection:connection,
    query: query,
    values: values,
  });
};
