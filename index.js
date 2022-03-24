const express = require("express");
const app = express();
// use environment port or 3000 if unavailable
const PORT = process.env.PORT || 3000;
// listening oon port 3000, confirm in console
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
// set view engine to ejs to allow us to use ejs files
app.set("view engine", "ejs");
// import router from routes,
const storesRouter = require("./routes/stores");
// required for using css/images. Use public folder
app.use(express.static(__dirname + "/public"));
// use stores router for path /stores
app.use("/stores", storesRouter);
// if no path found, serve 404
app.use((req, res) => {
  res.status(404).render("404");
});
