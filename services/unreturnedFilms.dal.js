// import pool as dal. (elimates having to initialize pool in each dal)
const dal = require("./db");
/***********************GET UNRETURNED FILMS ****************************/
// create a function to allow us to pass a store id into it and return all dvds in that store that have been returned.
var getUnreturnedFilms = function (id) {
  // create promise within function to allow async usage in route
  return new Promise(function (resolve, reject) {
    //   set const sql that contains view from pgadmin to pullall unretruned films for each store
    const sql = "SELECT * FROM vw_unreturnedfilms WHERE store_id = $1";
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
  getUnreturnedFilms,
};
