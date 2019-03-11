var express = require("express");

var con = require('../database/database');

var bcrypt = require("bcryptjs");

var router = express.Router();

var path = require("path");

var passport = require("passport");

var multer = require("multer");

var path1 = [];

const PDFdocument = require("pdfkit");

const fs = require("fs");

var nodemailer = require('nodemailer');

/***************** ROUTER PATHS IN STAFF.JS**************/

router.get('/stulogpag/:id', authenticationMiddleware(), function (req, res) {
    res.sendFile('./public/html/studentlogin.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});

router.get('/id', function (req, res) {
    res.sendFile('./public/html/login.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});

router.get('/staff', function (req, res) {
    res.sendFile('./public/html/staff.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});

router.get('/updatestudent/:email', function (req, res) {
    res.sendFile('./public/html/staffedit.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});

// Invoice Using PDFKIT & FILE SYSTEM 

router.get('/invoice/:id', function (req, res, next) {
    console.log(req.params.id, 'coming pdf');
    const id = req.params.id;
    var sql = "SELECT * From studentdb where id=" + id + "";
    con.query(sql, function (err, user) {
        //console.log(user)
        if (err) {
            return console.log(err);
        }
        // if(id!=req.session.passport.user.id){
        //     return res.send(`
        //     <script> 
        //     alert('You are not allowed to see others details');
        //    </script>`)
        // }

        const invoiceName = 'invoice-' + id + '.pdf';
        const invoicePath = path.join('data', 'invoice', invoiceName);

        const pdfDoc = new PDFdocument();

        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Contant-Disposition',
            'inline; filename="' + invoiceName + '"'
        );

        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);

        pdfDoc.fontSize(30).text('Student Details:', {
            underline: true
        });

        pdfDoc.fontSize(26).text('----------------------------------------------------');
        pdfDoc.fontSize(24).text('Student Id:' + user[0].id);
        pdfDoc.fontSize(24).text('Student name:' + user[0].name);
        pdfDoc.fontSize(24).text('Father name:' + user[0].Fname);
        pdfDoc.fontSize(24).text('Mother name:' + user[0].Mname);
        pdfDoc.fontSize(24).text('Student Class:' + user[0].Sclass);
        pdfDoc.fontSize(24).text('Address:' + user[0].Address);
        pdfDoc.fontSize(24).text('Gender:' + user[0].gender);
        pdfDoc.fontSize(24).text('Phone Number:' + user[0].phonenumber);
        pdfDoc.fontSize(24).text('Email:' + user[0].email);
        pdfDoc.fontSize(24).text('Blood Group:' + user[0].bloodgrp);
        pdfDoc.fontSize(24).text('Bus Faculity:' + user[0].busfac);
        pdfDoc.fontSize(24).text('Bus Fee:' + user[0].busfee);
        pdfDoc.fontSize(24).text('Student Fee:' + user[0].stufee);
        pdfDoc.fontSize(24).text('Total Fee:' + user[0].totfee);
        pdfDoc.fontSize(24).text('Total Pay:' + user[0].totpay);
        pdfDoc.fontSize(24).text('Total Due:' + user[0].totdue);
        pdfDoc.end();

        //  tiny files only access the readFile Bigger files not handle the readFile 

        // fs.readFile(invoicePath, function(err,data){
        //     if(err) {
        //        return next(err);
        //     }
        //     res.setHeader('Content-type', 'application/pdf');
        //     res.setHeader('Contant-Disposition',
        //     'inline; filename="' + invoiceName + '"'
        //     );
        //     res.send(data); 
        // })

        // const file = fs.createReadStream(invoicePath);
        // res.setHeader('Content-type', 'application/pdf');
        // res.setHeader('Contant-Disposition',
        //     'inline; filename="' + invoiceName + '"'
        //     );
        //     file.pipe(res);

    })
})

// ******************* END *****************************


router.post('/stulgn', passport.authenticate(
    'local2', {
        // successRedirect: '/stulogpag',
        failureRedirect: '/failure',
    }), function (req, res) {
        // res.json(req.user);
        if (req.user) {
            return res.redirect('/stulogpag/' + req.user.stud_id);
        }
    });

router.get('/failure', function (req, res) {
    res.json('0');
});


router.get('/logout', function (req, res) {
    //console.log(req.session); 
    req.logout()
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/id')
    })
})

function authenticationMiddleware() {
    return (req, res, next) => {
        // console.log(`
        //     req.session.passsport.user: ${JSON.stringify(req.session.passport)};
        //     `)
        if (req.isAuthenticated()) return next();
        res.redirect('/id');
    }
}

// STUDENT LOGIN DEATILS

router.get('/get/:id', function (req, res) {
    console.log(req.params.id);

    var sql = "SELECT * from studentdb where id ='" + req.params.id + "'";

    con.query(sql, function (err, row) {
        if (err) throw err;
        console.log(row);
        res.json(row);
    })
})






/********** FILE UPLOADING USING MULTER ***********/
var storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        var updatedpath = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, updatedpath);
        var obj = '';
        obj = "/images/" + updatedpath;
        path1.push(obj);
    }
});


var upload = multer({
    storage: storage
}).fields([{ name: 'front', maxCount: 1 }]);


router.post('/addstudent', function (req, res) {
    path1 = [];
    upload(req, res, function (err) {
        console.log(req.body)
        var d = req.body;

        var studntMail = req.body.email;
        var studntPass = req.body.password;

        console.log(path1[0])
        
        var pass = d.password;

        bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(pass, salt, function (err, hash) {
                if (err) throw err;
                pass1 = hash;
              
                var sql = "insert into studentdb SET ?";
                var post = {

                    id: d.sid,
                    password: pass1,
                    name: d.name,
                    Fname: d.fname,
                    Mname: d.mname,
                    Sclass: d.scls,
                    Address: d.addr,
                    gender: d.gender,
                    phonenumber: d.pnum,
                    email: d.email,
                    bloodgrp: d.bldgrp,
                    busfac: d.stbusfec,
                    busfee: d.busfe,
                    stufee: d.stfe,
                    totfee: d.totfe,
                    totpay: d.totpay,
                    totdue: d.totdue,
                    image: path1[0]
                }

                con.query(sql, post, function (err, row) {
                    //console.log(row.insertId);
                    if (err) throw err;

                    // Send an Email Using NodeMailer

                    var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                          user: 'hindustanschool1@gmail.com',
                          pass: 'ajayajayajay'
                        }
                      });

                      var output = `
                      <h1> HR Model School Given Credentails Must Be Used in the Login Credentails :</h1> 
                        <h3> Student ID: ${row.insertId}</h3>
                        <h3>password: ${studntPass}</h3>
                      `                     
                      var mailOptions = {
                        from: 'hindustanschool1@gmail.com',
                        to: studntMail,
                        subject: 'Sending Email using Node.js',
                        text: 'That was easy!',
                        html: output
                        };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
    
                    return res.redirect('/stdtls');
                    //res.send('<script>window.location.href="/stdtls";window.alert("Register Success")</script>')
                })
            })
        })
    })
});


/*****Getting in Studentdata******/
router.get('/printdata', function (req, res) {

    console.log(req.user);
    con.query("SELECT * FROM studentdb ;", function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

/*********Filling data in Student Table********/

router.get('/filldata/:email', function (req, res) {
    console.log(req.params.email);
    var sql = "SELECT * from studentdb where email ='" + req.params.email + "'";
    con.query(sql, function (err, row) {
        if (err) {
            throw err;
        }
        console.log(row);
        res.json(row);
    });
});


/**********UPDATING DATA INTO STUDENT DATABASE*************/

router.post('/update1', function (req, res) {
    console.log(req.body.oldemail);
    var oldemail = req.body.email;

    var updatedStudent = req.body;
    console.log(req.body.gender)
    con.query("UPDATE studentdb SET ? WHERE email = ?", [updatedStudent, oldemail], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('student update success');
        }
    });
});


/**********DELETING DATA INTO DATABASE*************/

router.post('/deleterow/:email', function (req, res) {
    var stmail = req.params.email;
    con.query("DELETE from studentdb where email = '" + req.params.email + "'", function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('student delete success');
        }
    });
});


module.exports = router;