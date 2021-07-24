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
  try{
    console.log("options : ", options);
    const { id } = options;
    // let query = "SELECT * FROM quizzes ";
    let query = "";
    let values;

    if (id === 0) { // 인기순 (참여자 순) : quiz_answer
      let query = `SELECT * , count(comments.quiz_id) as comment_cnt FROM quizzes
                  LEFT JOIN comments ON quizzes.id = comments.quiz_id
                  LEFT JOIN cards ON quizzes.cards_id = cards.id
                  ORDER BY count(comments.quiz_id)
                  GROUP BY 1,2`;
      values = id;
      return await db.query({
        query: query,
        values: "",
      });
    }else if(id === 1){ // 최신순 , created_at
      query = `SELECT * , count(comments.quiz_id) as comment_cnt FROM quizzes
                LEFT JOIN comments ON quizzes.id = comments.quiz_id 
                ORDER BY quizzes.created_at
                GROUP BY 1,2`;
      return await db.query({
        query: query,
        values: "",
      });
    }
  }catch(err){
    throw new Error(err); 
  }
};



module.exports.cardQuizgetList = async (options) => {
  console.log("options : ", options); // id
  // card_id 를 받는다.
  try {
  } catch (err) {
    throw new Error(err);
  }
};