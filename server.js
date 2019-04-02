/*********INSTALLING PACKAGES*********/
var express = require("express");

var app = express();

var path = require("path");

var bodyparser = require("body-parser");

var con = require("./database/database");


//require routes
var adminroute = require("./routes/admin");
var studentroute = require("./routes/student");
var stafflgn = require('./routes/stafflgn');


/****** AUTHENTICATION PACKAGES******/

var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var LocalStrategy2 = require('passport-local').Strategy;
var LocalStrategy3 = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var bcrypt = require("bcryptjs");


app.use(bodyparser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


var options = {
    host: "localhost",
    user: "root",
    password: "sql@123",
    database: "mydb",
    // Whether or not to automatically check for and clear expired sessions: 
    clearExpired: true, 
    // How frequently expired sessions will be cleared; milliseconds: 
    checkExpirationInterval: 600000, 
    expiration: 600000
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'jbfgdhgsepijksdf',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

/*******   PASSPORT AUTHENTICATION   **********/

/******** ADMIN LOGIN ************/
passport.use('local', new LocalStrategy({
    usernameField: 'adminname',
    passwordField: 'pwd',
    passReqToCallback: true
}, function(req, adminName, adminPs, done){
    con.query('SELECT * FROM admin WHERE name = ?', [adminName], function(err, results, fields){
        //console.log(results)
        if(err) {
            console.log('err1')
            return done(err);
        }
        if(results.length === 0) {
          console.log('err2')
            return done(null, false);
        } else {
            const hash = results[0].password.toString();
            bcrypt.compare(adminPs, hash, function(err, response){
                //console.log(response);
                if (response === true){
                    return done(null, {admin_id: results[0].id})
                } else {
                  return done(null, false)
                }
            })
        }
    })
}))


/************* STUDENT LOGIN *****************/

passport.use('local2', new LocalStrategy2({
    usernameField: 'stuid',
    passwordField: 'stuPwd',
    passReqToCallback: true
}, function(req, studID, stuPS, done){
    con.query('SELECT * FROM studentdb WHERE id = ?', [studID], function(err, results, fields){
        //console.log(results)
        if(err) {
            console.log('err1')
            return done(err);
        }
        if(results.length === 0) {
          console.log('err2')
            return done(null, false);
        } else {
            const hash = results[0].password.toString();
            bcrypt.compare(stuPS, hash, function(err, response){
                console.log(response);
                if (response === true){
                    return done(null, {stud_id: results[0].id})
                } else {
                  return done(null, false)
                }
            })
        }
    })
}))



/************* STAFF LOGIN *****************/

passport.use('local3', new LocalStrategy3({
    usernameField: 'stfid',
    passwordField: 'stfPwd',
    passReqToCallback: true
}, function(req, studID, stuPS, done){
    con.query('SELECT * FROM staffdata WHERE id = ?', [studID], function(err, results, fields){
        //console.log(results)
        if(err) {
            console.log('err1')
            return done(err);
        }
        if(results.length === 0) {
          console.log('err2')
            return done(null, false);
        } else {
            const hash = results[0].staffLoginPs.toString();
            bcrypt.compare(stuPS, hash, function(err, response){
                console.log(response);
                if (response === true){
                    return done(null, {staff_id: results[0].id})
                } else {
                  return done(null, false)
                }
            })
        }
    })
}))


app.use(function(req,res,next){
res.locals.isAuthenticated = req.isAuthenticated();
next();
});


/********DEFAULT PATH BY USING EXPRESS*******/

// app.use(express.static(path.join(__dirname, '/public')));

/**************  SAVED FOLDER IN PARTICULAR SERVER PATH ******************/

app.get('/id', function (req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.sendFile(path.join(__dirname + '/public'+'/html'+'/login.html'));
});


//using route

app.use(adminroute);
app.use(studentroute);
app.use(stafflgn);


app.listen(8081, function (req, res) {
    console.log("Express app listening on port 8080");
});


