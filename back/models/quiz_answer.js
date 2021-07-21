const { disable } = require("debug");
const db = require("../components/db");

module.exports.insert = async (connection, options) => {
  console.log("options : ", options);
  let query = "INSERT INTO quiz_answers SET ?";
  let values = options;
  return await db.query({
    connection: connection,
    query: query,
    values: values,
  });
};

module.exports.update = async (connection, options) => {
  console.log("options : ", options);
  let query = "UPDATE quiz_answers SET ? WHERE id = ?";
  return await db.query({
    connection: connection,
    query: query,
    values: [options, options.id],
  });
};

module.exports.delete = async (connection, options) => {
  console.log("options : ", options.id);
	let query = "DELETE FROM quiz_answers WHERE id = ?";

  return await db.query({
    connection: connection,
    query: query,
    values: options.id,
  });
};



module.exports.getQuizTotal = async (options) => {
	console.log("options : ", options);

  try {
    const { id } = options;
    let values;

    if (id) {
      let query = `SELECT COUNT(quiz_id) FROM quiz_answers WHERE quiz_id = ?`;
      values = id;
      return await db.query({
        query: query,
        values: values,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getQuizAnswer = async (options) => {
	console.log("options : ", options);

  try {
    const { id } = options;
		let values;

    if (id) {
      let query = `SELECT COUNT(quiz_id) FROM quiz_answers WHERE answer = 1 AND quiz_id = ?`;;
			values = id;
			return await db.query({
				query: query,
				values: values,
			});
		}
		
  } catch (err) {
    throw new Error(err);
  }
};


