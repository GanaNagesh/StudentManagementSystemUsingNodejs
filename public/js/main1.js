var member = true;
function test1() {
    var alphaExp = /^[a-z A-Z]+$/;
    //  var x= document.getElementById("name").value; 
    var x = $("#name").val();

    if (x == "") {
        $("#p1").html("<b><font color='red'>Please entered a Name</font></b>");
        //  document.getElementById("p1").innerHTML="<b><font color='red'>You have entered an Name</font></b>";
        member = false;

    } else if (!(alphaExp).test(x)) {
        $("#p1").html("<b><font color='Darkgreen'>Please Enter Valid Name</font></b>");
        // document.getElementById("p1").innerHTML = "<b><font color='Darkgreen'>Enter Name only alphabets</font></b>";
        member = false;
    }
    else {
        $("#p1").html("");
        //  document.getElementById("p1").innerHTML="";
    }
}

function test2() {
    var alphaExp = /^[a-z A-Z]+$/;
    var x = $("#fname").val();
    if (x == "") {
        $("#p2").html("<b><font color='red'>Please entered a Name</font></b>");
        member = false;
    }
    else if (!(alphaExp).test(x)) {
        $("#p2").html("<b><font color='Darkgreen'>Please Enter Valid Name</font></b>");
        member = false;
    }
    else {
        $("#p2").html("");

    }
}

function test3() {
    var alphaExp = /^[a-z A-Z]+$/;
    var x = $("#mname").val();
    if (x == "") {
        $("#p3").html("<b><font color='red'>Please entered a Name</font></b>");
        member = false;
    }
    else if (!(alphaExp).test(x)) {
        $("#p3").html("<b><font color='Darkgreen'>Please Enter Valid Name</font></b>");
        member = false;
    }
    else {
        $("#p3").html("");
    }
}

function test4() {
    var alphaExp = /^[a-z A-Z]+$/;
    var x = $("#scls").val();
    if (x == "") {
        $("#p4").html("<b><font color='red'>Please entered a valid Class</font></b>");
        member = false;
    }
    else if (!(alphaExp).test(x)) {
        $("#p4").html("<b><font color='Darkgreen'>Please Enter Valid Class Only Alphabets</font></b>");
        member = false;
    }
    else {
        $("#p4").html("");
    }
}

function test5() {
    // var alphaExp = /^[a-zA-Z]+$/;
    var x = $("#addr").val();
    if (x == "") {
        $("#p5").html("<b><font color='red'>Please entered Address </font></b>");
        member = false;
    }
    // else if(!(alphaExp).test(x)){
    //     $("#p5").html("<b><font color='Darkgreen'>Atleast 255 to 300 Characters</font></b>");
    // }
    else {
        $("#p5").html("");

    }
}

function test7() {
    var phnum = /[0-9]|\./;
    var x = $("#pnum").val();
    if (!x.match(phnum)) {
        $("#p7").html("<b><font color='red'>Please Valid Phone Number </font></b>");
        member = false;
    }
    else {
        $("#p7").html("");

    }
}

function test8() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var x = $("#email").val();
    if (!x.match(mailformat)) {
        $("#p8").html("<b><font color='red'>Please Enter Valid Email</font></b>");
        member = false;
    } else {
        $("#p8").html("");

    }
}

function test9() {
    var bgExp = /(A|B|AB|0)(\+|-)/;
    var a = $("#bldgrp").val();
    if (!a.match(bgExp)) {
        $("#p9").html("<b><font color='red'>Please Enter Valid Blood Group</font></b>");
        member = false;
    }
    else {
        $("#p9").html("");

    }
}

function test11() {
    var x = $("#busfe").val();
    if (x == "") {
        $("#p11").html("<b><font color='red'>Please Enter Valid Bus Fee</font></b>");
        member = false;
    } else {
        $("#p11").html("");

    }
}


function test12() {
    var x = $("#stfe").val();
    if (x == "") {
        $("#p12").html("<b><font color='red'>Please Enter Valid Student Fee</font></b>");
        member = false;
    } else {
        $("#p12").html("");

    }
}

function test13() {
    var x = $("#totfe").val();
    if (x == "") {
        $("#p13").html("<b><font color='red'>Please Enter Valid Total Fee</font></b>");
        member = false;
    } else {
        $("#p13").html("");
    }
}

function test14() {
    var x = $("#totpay").val();
    if (x == "") {
        $("#p14").html("<b><font color='red'>Please Enter Valid Total Paid</font></b>");
        member = false;
    } else {
        $("#p14").html("");

    }
}

function test15() {
    var x = $("#totdue").val();
    if (x == "") {
        $("#p15").html("<b><font color='red'>Please Enter Valid Total Due</font></b>");
        member = false;
    } else {
        $("#p15").html("");

    }
}

function busstuttl() {
    var bfee = $('#busfe').val();
    var sfee = $('#stfe').val();
    var result = parseInt(bfee, 10) + parseInt(sfee, 10);
    $('#totfe').val(result);
    // $("#totfe").attr("disabled", "disabled");
    $("totfe").focus();
}

function totdue1() {
    var tfee = $('#totfe').val();
    var tpay = $('#totpay').val();
    var result = parseInt(tfee, 10) - parseInt(tpay, 10);

    $("#totdue").val(result);
    // $("#totdue").attr("disabled", "disabled");
    $("totdue").focus();
}



function services(url, type, data, dataType, page) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,

        success: function (data1) {
            console.log('success', data1);
            success_data(data1, page);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    });
}



/******* STUDENT REGISTRATION INSERTING DATA INTO DATABASE********/

// function submit12() {
//     test1();
//     test2();
//     test3();
//     test4();
//     test5();
//     test7();
//     test8();
//     test9();
//     test11();
//     test12();
//     test13();
//     test14();
//     test15();
//     if (member) {
//         var data = {};
//         var x = $("#studentGender").val();
//         var y = $("#stbusfec").val();
//         // data.sid = $("#ID").val();

//         data.name = $("#name").val();
//         data.fname = $("#fname").val();
//         data.mname = $("#mname").val();
//         data.scls = $("#scls").val();
//         data.addr = $("#addr").val();
//         data.gender = x;

//         data.pnum = $("#pnum").val();
//         data.email = $("#email").val();
//         data.bldgrp = $("#bldgrp").val();

//         data.stbusfec = y;
//         data.busfe = $("#busfe").val();
//         data.stfe = $("#stfe").val();
//         data.totfe = $("#totfe").val();
//         data.totpay = $("#totpay").val();
//         data.totdue = $("#totdue").val();
//         //data.file =$("#file").val();
//         // console.log(data);

//         var url = '/addstudent',
//             type = 'POST',
//             dataType = 'json',
//             page = 'signup';
//         services(url, type, data, dataType, page);
//     }
// }

// function success_data(success_data, page) {
//     if (page == 'signup') {
//         console.log('success', success_data);
//         alert(" SuccessFully Registered With email:" + success_data.email);
//         window.location.href = "/stdtls";
//     }
// }



//     $.ajax({
//             url: '/addstudent',
//             type: 'POST',
//             data: data,
//             success: function (student) {
//                 console.log(student)
//                 window.location.href='/stdtls';
//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         });
//     }
// }


/********EDIT FUNCTIONAILITY IN FILLING DATA INTO EDIT.HTML *********/

    // window.params = function () {
    //     var params = {};
    //     var param_array = window.location.href.split('?')[1].split('&');
    //     for (var i in param_array) {
    //         x = param_array[i].split('=');
    //         params[x[0]] = x[1];
    //     }
    //     console.log("I am Params ", params);
    //     p = params;
    //     return params;
    // }();


    // var data = {};
    // data.email = p.email;

    function filldata() {
        var pathArray =window.location.pathname.split('/');
        var email = pathArray[2];
        console.log(email);
        
    $.ajax({
        url: '/filldata/' + email,
        // type: 'Get',
        // data: data,
        // dataType: "json",

        success: function (data1) {
            console.log(data1);
            var data2 = data1;

            $("#sid").val(data2[0].id);
            $("#name").val(data2[0].name);
            $("#fname").val(data2[0].Fname);
            $("#mname").val(data2[0].Mname);
            $("#scls").val(data2[0].Sclass);
            $("#addr").val(data2[0].Address);
            $("#studentGender").val(data2[0].gender);
            $("#pnum").val(data2[0].phonenumber);
            $("#email").val(data2[0].email);
            $("#bldgrp").val(data2[0].bloodgrp);
            $("#stbusfec1").val(data2[0].busfac);
            $("#busfe").val(data2[0].busfee);
            $("#stfe").val(data2[0].stufee);
            $("#totfe").val(data2[0].totfee);
            $("#totpay").val(data2[0].totpay);
            $("#totdue").val(data2[0].totdue);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    });
}



/********** UPDATING DATA INTO DATABASE **********/

function update1() {
    var data = {};
    var a = window.location.href.search('=');
    var b = window.location.href.slice(a);

    // data.id = $("#sid").val();
    data.name = $("#name").val();
    data.Fname = $("#fname").val();
    data.Mname = $("#mname").val();
    data.Sclass = $("#scls").val();
    data.Address = $("#addr").val();
    data.gender = $("#genderForStd").val();
    data.phonenumber = $("#pnum").val();
    data.email = $("#email").val();
    data.bloodgrp = $("#bldgrp").val();
    data.busfac = $("#busfac").val();
    data.busfee = $("#busfe").val();
    data.stufee = $("#stfe").val();
    data.totfee = $("#totfe").val();
    data.totpay = $("#totpay").val();
    data.totdue = $("#totdue").val();

    $.ajax({
        url: '/update1',
        type: 'POST',
        data: data,
        dataType: 'JSON',
        success: function (res) {
            console.log(res);
        }
    });
}