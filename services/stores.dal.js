// import pool as dal. (elimates having to initialize pool in each dal)
const dal = require("./db");
/***********************GET STORES ****************************/
var getStores = function () {
  // create promise within function to allow async usage in route
  return new Promise(function (resolve, reject) {
    //   set const sql that contains view from pgadmin to pull stores data
    const sql = "SELECT * FROM vw_stores";
    // use const sql to query database, return data as array
    dal.query(sql, [], (err, result) => {
      // if error occurs, display error
      if (err) {
        reject(err);
      } else {
        //serve data
        resolve(result.rows);
      }
    });
  });
};
/***********************GET STORES BY ID ****************************/
// create a function to allow us to pass the store ID as params and return store details
var getStoreById = function (id) {
  // create promise within function to allow async usage in route
  return new Promise(function (resolve, reject) {
    //   set const sql that contains view from pgadmin to pull stores data
    const sql = "SELECT * FROM vw_stores WHERE store_id = $1";
    // use const sql to query database, return data as array
    dal.query(sql, [id], (err, result) => {
      // if error occurs, display error
      if (err) {
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
  getStores,
  getStoreById,
};
