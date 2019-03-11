var express = require("express");

var con = require('../database/database');

var router = express.Router();

var bcrypt = require("bcryptjs");

var path = require("path");

var passport = require("passport");

var multer = require("multer");

var path1 = [];

const PDFdocument = require("pdfkit");

const fs = require("fs");


router.get('/stflgn/:id', authenticationMiddleware(), function (req, res) {
    res.sendFile('./public/html/staffdeatils.html', { "root": __dirname.substring(0, __dirname.indexOf("\\routes")) });
});


// PDF Using PDFKIT In Staff Details...

router.get('/invoiceprint/:id', function (req, res) {
    console.log(req.params.id, 'pdf as arrived');
    const id = req.params.id;
    var sql = "SELECT *From staffdata where id=" + id + "";
    con.query(sql, function (err, user) {
        if (err) {
            return console.log(err);
        }

        const invoiceName = 'invoice-' + id + '.pdf';
        const invoicePath = path.join('data', 'invoice', invoiceName);
        const pdfDoc = new PDFdocument();

        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Contant-Disposition',
            'inline; filename="' + invoiceName + '"'
        );

        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);

        pdfDoc.fontSize(30).text('Staff Details');

        pdfDoc.fontSize(26).text('----------------------------------------------------');
        pdfDoc.fontSize(22).text('Staff Id:' + user[0].id);
        pdfDoc.fontSize(22).text('Full Name:' + user[0].staffFullName);
        pdfDoc.fontSize(22).text('Gender:' + user[0].staffGender);
        pdfDoc.fontSize(22).text('Father Name:' + user[0].fatherName);
        pdfDoc.fontSize(22).text('Mother Name:' + user[0].motherName);
        pdfDoc.fontSize(22).text('Date of Birth:' + user[0].staffdob);
        pdfDoc.fontSize(22).text('Contact Address 1:' + user[0].staffContactAdd1);
        pdfDoc.fontSize(22).text('Contact Address 2:' + user[0].staffContactAdd2);
        pdfDoc.fontSize(22).text('Contact Address 3:' + user[0].staffContactAdd3);
        pdfDoc.fontSize(22).text('Contact Number:' + user[0].staffContactNumber);
        pdfDoc.fontSize(22).text('Email:' + user[0].staffEmail);
        pdfDoc.fontSize(22).text('Landmark:' + user[0].staffLandmark);
        pdfDoc.fontSize(22).text('Location:' + user[0].staffctv);
        pdfDoc.fontSize(22).text('State:' + user[0].staffState);
        pdfDoc.fontSize(22).text('Pincode:' + user[0].staffpincode);
        pdfDoc.fontSize(22).text('Role:' + user[0].staffRole);
        pdfDoc.fontSize(22).text('Experience:' + user[0].experience);
        pdfDoc.fontSize(22).text('Qualification:' + user[0].qualification);
        pdfDoc.fontSize(22).text('Salary:' + user[0].salary);

        pdfDoc.fontSize(30).text(' Staff Subjects Known:');

        pdfDoc.fontSize(26).text('----------------------------------------------------');
        pdfDoc.fontSize(22).text('English:' + user[0].english);
        pdfDoc.fontSize(22).text('Hindi:' + user[0].hindi);
        pdfDoc.fontSize(22).text('Telugu:' + user[0].telugu);
        pdfDoc.fontSize(22).text('Science:' + user[0].science);
        pdfDoc.fontSize(22).text('Maths:' + user[0].maths);
        pdfDoc.fontSize(22).text('Social:' + user[0].social);
        pdfDoc.fontSize(22).text('Computers:' + user[0].computers);
        pdfDoc.end();
    })
})

// ******************* END *****************************

router.post('/stflgn2', passport.authenticate(
    'local3', {
        // successRedirect: '/stulogpag',
        failureRedirect: '/failure2',
    }), function (req, res) {
        // res.json(req.user);
        if (req.user) {
            return res.redirect('/stflgn/' + req.user.staff_id);
        }
    });

router.post('/failure2', function (err, req) {
    res.json(0);
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

// STAFF LOGIN DEATILS

router.get('/get1/:id', function (req, res) {
    console.log(req.params.id);

    var sql = "SELECT * from staffdata where id ='" + req.params.id + "'";

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
        //console.log(path1[0]);
        //console.log(obj)
    }
});

var upload = multer({
    storage: storage
}).single('photo');

// STAFF REGISTER DATA INTO DATABASE

router.post('/staff', function (req, res) {
    path1 = [];

    upload(req, res, function (err) {
        console.log(req.body.stImageUrl);
        var d = req.body;

        var pass = d.LoGPass;

        bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(pass, salt, function (err, hash) {
                if (err) throw err;
                pass = hash;

                var sql = "insert into staffdata SET ?";
                var post = {

                    staffFullName: d.sname,
                    staffGender: d.gender,
                    fatherName: d.FName,
                    motherName: d.MName,
                    staffdob: d.DoB,
                    staffContactAdd1: d.cntaddr1,
                    staffContactNumber: d.cnum,
                    staffEmail: d.email,
                    staffContactAdd2: d.cntaddr2,
                    staffContactAdd3: d.cntaddr3,
                    staffLandmark: d.stFLnMrk,
                    staffctv: d.StFfCtV,
                    staffState: d.statelist,
                    staffpincode: d.PnCde,
                    staffLoginPs: pass,
                    staffRole: d.StFRle,
                    stImageUrl: path1[0],
                    experience: d.Exprnce,
                    qualification: d.Qulfctn,
                    language: d.lngkwn,
                    salary: d.Salry,
                    id: d.id,
                    english: d.English,
                    hindi: d.Hindi,
                    telugu: d.Telugu,
                    science: d.Science,
                    maths: d.Maths,
                    social: d.Social,
                    computers: d.Computers
                }
                con.query(sql, post, function (err, row) {
                    if (err) throw err;
                    console.log("Record is Inserted");
                    return res.redirect('/stdtls');
                })
            })
        })
    })
});


/*****Getting Data INTO STAFFDATA******/

router.get('/getdata', function (req, res) {

    console.log(req.body);
    con.query("SELECT * FROM staffdata ;", function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.json(result);
        }
    });
});


/********* Filling StAFF Data in Edit Page*************/

router.get('/filldata2/:email', function (req, res) {
    // console.log(req.params.email,'////////////////');
    var sql = "SELECT * from staffdata where staffEmail ='" + req.params.email + "'";
    con.query(sql, function (err, row) {
        if (err) {
            throw err;
        }
        console.log(row);
        res.json(row);
    });
});


/**********STAFF UPDATING DATA INTO DATABASE*************/

router.post('/update2', function (req, res) {
    var a = req.body.staffEmail;
    console.log(req.body.staffEmail, '///////')
    var b = req.body;
    console.log(req.body);

    con.query("UPDATE staffdata SET ? WHERE staffEmail = ?", [b, a], function (err, result) {
        if (err) {
            return console.log(err);
        }
        //  return res.redirect('/stdtls');  
        return res.json('1');
    });
});


/**********DELETING staff DATA INTO DATABASE*************/

router.post('/deleterow1/:staffEmail', function (req, res) {
    // console.log(req.params);

    con.query("DELETE from staffdata where staffEmail = '" + req.params.staffEmail + "'", function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('staff delete success');
        }
    });
});

module.exports = router;