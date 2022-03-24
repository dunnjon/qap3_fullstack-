// telling express to create router for stores
const express = require("express");
const router = express.Router();
// importing data access layers for each service we want to perform
const storesDal = require("../services/stores.dal");
const unreturnedFilmsDal = require("../services/unreturnedFilms.dal");
const topFilmsDal = require("../services/topFilms.dal");
// required for using css/images. Use public folder
router.use(express.static("public"));
/***************  MAIN ROUTE FOR STORES *******************/
router.get("/", async (req, res) => {
  // use get stores function stored in dal to get stores from database table
  let stores = await storesDal.getStores();
  //   fault checking if any stores exist in table
  if (stores.length === 0) res.render("norecord");
  else {
    //   if stores exist, render the stores ejs page with stores data
    res.render("stores.ejs", { stores });
  }
});
/***************  ROUTE FOR DETERMINIG UNRETURNED DVDS *******************/
router.get("/unreturned/:id", async (req, res) => {
  // pass id from params into get store by id function from the dal
  var store = await storesDal.getStoreById(req.params.id);
  //   fault checking if any stores exist in table
  if (store.length === 0) res.render("norecord");
  else {
    //   set var for store unreturned films retreived from database using store id
    let unreturnedFilms = await unreturnedFilmsDal.getUnreturnedFilms(
      req.params.id
    );
    // render the ejs file containing unreturned film data
    res.render("unreturnedFilms.ejs", { unreturnedFilms });
  }
});
/***************  ROUTE FOR GETTING STORES TO PASS INTO TOP 10 FUNCTION *******************/
router.get("/top10", async (req, res) => {
  // get stores from database to make selection
  let stores = await storesDal.getStores();
  //   fault checking if any stores exist in table
  if (stores.length === 0) res.render("norecord");
  else {
    //   render ejs file displaying stores from database
    res.render("top10.ejs", { stores });
  }
});
/***************  ROUTE FOR GETTING TOP 10 RENTALS BY STORE *******************/
router.get("/top10/:id", async (req, res) => {
  // pass id from params into get store by id function from the dal
  var store = await storesDal.getStoreById(req.params.id);
  //   fault checking if any stores exist in table
  if (store.length === 0) res.render("norecord");
  else {
    //   pass params into function and store topfilms from database as topFilms
    let topFilms = await topFilmsDal.getTopFilmsByStoreId(req.params.id);
    // render ejs file with topfilms
    res.render("topFilms.ejs", { topFilms, store });
  }
});
// export module for use
module.exports = router;
