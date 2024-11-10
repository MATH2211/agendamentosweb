const {Pool} = require("pg");

const pool = new Pool({
    user:"postgres",
    host:'localhost',
    database:"banco",
    password:'markim',
    port:5432,
});

module.exports = pool;