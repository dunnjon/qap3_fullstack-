// import pool as dal. (elimates having to initialize pool in each dal)
const dal = require("./db");
/***********************GET TOP FILMS BY ID ****************************/
// create a function that aloows us to pass a store id into it and return the top 10 films for that store by money earned
var getTopFilmsByStoreId = function (id) {
  // create promise within function to allow async usage in route
  return new Promise(function (resolve, reject) {
    //   set const sql that contains view from pgadmin to pull top 10 films by money earned for each store
    const sql = "SELECT * FROM vw_toprentals WHERE store_id = $1 LIMIT 10";
    // use const sql to query database, return data as array
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // if error occurs, display error
        reject(err);
      } else {
        //serve data
        resolve(result.rows);
      }
    });
  });
};
// export functions for usage in routes
module.exports = {
  getTopFilmsByStoreId,
};
