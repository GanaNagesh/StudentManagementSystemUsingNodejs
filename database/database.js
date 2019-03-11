var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql@123",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB");
});

module.exports=con;
