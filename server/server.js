const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  const listQuery = "select * from Customer order by customerId desc;";
  connection.query(listQuery, (err, response) => {
    if (err) console.log(err);
    else res.send(response);
  });
});

app.post("/add", (req, res) => {
  const addQuery =
    "insert into Customer (Firstname,Lastname,Email,Password) values('" +
    req.body.fname +
    "', '" +
    req.body.lname +
    "', '" +
    req.body.email +
    "', '" +
    req.body.pass +
    "');";
  connection.query(addQuery, (err) => {
    if (err) console.log(err, res);
    else res.send("User successfully added.");
  });
});

app.delete("/delete/:customerId", (req, res) => {
  console.log(req.params.customerId);
  const deleteQuery =
    "delete from Customer where customerID = " + req.params.customerId + ";";
  connection.query(deleteQuery, (err, res) => {
    if (err) console.log(err);
  });
});

app.delete("/update/:customerId", (req, res) => {
  console.log(req.params.customerId);
  const updateQuery =
    "update Customer set FirstName = '" +
    req.body.fname +
    "', LastName = '" +
    req.body.lname +
    "', Email = '" +
    req.body.email +
    "', Password = '" +
    req.body.pass +
    "' where customerID = " +
    req.params.customerId +
    ";";
  connection.query(updateQuery, (err) => {
    if (err) console.log(err, res);
    else res.send("User updated successfully.");
  });
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
