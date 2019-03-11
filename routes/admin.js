var express = require("express");

var con = require('../database/database');

var bcrypt = require("bcryptjs");

var router = express.Router();

var path = require("path");

var passport = require("passport");

var multer = require("multer");

var path1 = [];

router.get('/adminpage', function (req, res) {
    res.sendFile('./public/html/register.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});

router.get('/signup', function (req, res) {
    res.sendFile('./public/html/signup.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});


router.post('/signup', passport.authenticate(
    'local', {
        successRedirect: '/stdtls',
        failureRedirect: '/adminpage'
    }));


router.get('/stdtls', authenticationMiddleware(), function (req, res) {
    // console.log(req.user)
    res.sendFile('./public/html/studentdetails.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});


router.get('/stdreg', authenticationMiddleware(), function (req, res) {
    res.sendFile('./public/html/studentregister.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});


router.get('/editstudent/:email', authenticationMiddleware(), function (req, res) {
    res.sendFile('./public/html/edit.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});


function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`
        req.session.passsport.user: ${JSON.stringify(req.session.passport)};
        `)
        if (req.isAuthenticated()) return next();
        res.redirect('/adminpage');
    }
}


router.get('/logout', function (req, res) {
    //console.log(req.session); 
    req.logout()
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/id')
    })
})


router.post('/submit', function (req, res) {

    var adminName = req.body.adminName;
    var password = req.body.Pwd;
    var phonenumber = req.body.PNum;


    var exists = "select * from admin where name= '" + adminName + "'";

    con.query(exists, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send('<script>window.location.href="/signup";window.alert("admin already exist")</script>');
        } else {

            /***********PASSWORD ENCRYPTING USING BCRYPT***********/
            bcrypt.genSalt(12, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw err;

                    password = hash;

                    var sql = "insert into admin SET ?";
                    var post = { name: adminName, password: password, phonenumber: phonenumber }
                    con.query(sql, post, function (err, result) {
                        if (err) throw err;

                        con.query("SELECT LAST_INSERT_ID() as user_id", function (err, result) {
                            if (err) throw err;

                            var user_id = result[0];

                            console.log(result[0]);

                            /********* PASSPORT.JS WILL GENERATE A USER_ID ***********/
                            req.login(user_id, function (err) {
                                res.redirect('/stdtls');                                
                            });
                            //console.log("Data inserted");
                            //res.send('<script>window.location.href="/adminpage";window.alert("Login Success")</script>');
                        })
                    });
                })
            })
        }
    });
})

/******** SETTING ID IN AS COOKIES'S IN USER BROSWER*******/
passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

/******** GETTING ID FROM THE COOKIES'S IN USER BROSWER*******/
passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});



/******** PROVIDING LOCAL AUTHENTICATION ********/

// router.post('/retrive', function (req, res) {
//     var adminName = req.body.adminname;
//     var password = req.body.pwd;

//     var existsName = "select *from admin where name = '" + adminName + "'";
//     con.query(existsName, function (err, admin) {
//         if (err) throw err;
//         if (admin.length === 0) {
//             return res.send('<script>window.location.href="/adminpage";window.alert("Please Give a Valid Credentials")</script>');
//         }
//         if (admin.length > 0) {
//             // res.send("success");
//             // res.send('<script>window.location.href="/stdtls";</script>');

//             bcrypt.compare(password, admin[0].password, function (err, isMatch) {
//                 if (err) throw err;
//                 if (isMatch) {
//                     res.send('<script>window.location.href="/stdtls";window.alert("Login Success")</script>');
//                 } else {
//                     res.send('<script>window.location.href="/adminpage";window.alert("Please Give a Valid Credentials")</script>');
//                 }
//             })
//         }
//         // else {
//         //     // var ErrMsg=("Please Give a Valid Credentials");
//         //     // res.send(ErrMsg);
//         //     res.send('<script>window.location.href="/adminpage";window.alert("Please Give a Valid Credentials")</script>');
//     })
// })

module.exports = router;