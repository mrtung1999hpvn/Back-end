/** @format */

// http is an inbuilt module in Node.js
const http = require("http");
/** @format */
const express = require("express");

const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
const pool = require("./mysqlconnect");

// API
app.get("/Test", async (req, res) => {
  try {
    pool.getConnection((error, connection) => {
      if (error) throw error;
      connection.query("select * from test", (error, rows) => {
        connection.release();
        if (!error) {
          res.send(rows);
        } else {
          console.log(error);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});
//
console.log("test");
// server is listening to incoming requests on port 3000 on localhost
app.listen(process.env.PORT || port, () => {
  console.log("Port : " + port);
});
