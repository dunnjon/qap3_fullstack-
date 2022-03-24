const Pool = require("pg").Pool;
const pool = new Pool({
  user: "Keyin2021",
  host: "localhost",
  database: "dvdrental",
  password: "Keyin2021",
  port: 5432,
});
module.exports = pool;
