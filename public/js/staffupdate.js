
/********* Filling StAFF Data in Edit Page*************/

function filldata2() {
    var pathArray = window.location.pathname.split('/');
    var email = pathArray[2];

    $.ajax({
        url: '/filldata2/' + email,
        dataType: 'JSON',

        success: function (data1) {
            var data2 = data1;
            $("#sFName").val(data2[0].staffFullName);
            $("#staffGender").val(data2[0].staffGender);
            $("#fname").val(data2[0].fatherName);
            $("#Mname").val(data2[0].motherName);
            $("#DOB").val(data2[0].staffdob);
            $("#addr1").val(data2[0].staffContactAdd1);
            $("#addr2").val(data2[0].staffContactAdd2);
            $("#addr3").val(data2[0].staffContactAdd3);
            $("#cnumbr").val(data2[0].staffContactNumber);
            $("#Email").val(data2[0].staffEmail);
            $("#StffLnmrk").val(data2[0].staffLandmark);
            $("#StfCtv").val(data2[0].staffctv);
            $("#states").val(data2[0].staffState);
            $("#Pincde").val(data2[0].staffpincode);
            $("#StFRle").val(data2[0].staffRole);
            $("#quLictn").val(data2[0].qualification);
            $("#ExPrnCe").val(data2[0].experience);
            if (data2[0].english == 'on') {
                $("#eng").attr('checked', true);
            }
            if (data2[0].hindi == 'on') {
                $("#hin").attr('checked', true);
            }
            if (data2[0].telugu == 'on') {
                $("#tel").attr('checked', true);
            }
            if (data2[0].science == 'on') {
                $("#sci").attr('checked', true);
            }
            if (data2[0].maths == 'on') {
                $("#mat").attr('checked', true);
            }
            if (data2[0].social == 'on') {
                $("#soc").attr('checked', true);
            }
            if (data2[0].computers == 'on') {
                $("#com").attr('checked', true);
            }
            $("#salry").val(data2[0].salary);
            $("#Lngknw").val(data2[0].language);
            $("#sid").val(data2[0].id);
        },
        error: function (errorThrown) {
            console.log('error', errorThrown);
        }
    })
}

// Updating Data into Database IN STAFF

function updtDate() {
    var data = {};
    var a = window.location.href.search('=');
    var b = window.location.href.slice(a);

    data.staffFullName = $("#sFName").val();
    data.staffGender = $("#staffGender").val();
    data.fatherName = $("#fname").val();
    data.motherName = $("#Mname").val();
    data.staffdob = $("#DOB").val();
    data.staffContactAdd1 = $("#addr1").val();
    data.staffContactAdd2 = $("#addr2").val();
    data.staffContactAdd3 = $("#addr3").val();
    data.staffContactNumber = $("#cnumbr").val();
    data.staffEmail = $("#Email").val();
    data.staffLandmark = $("#StffLnmr").val();
    data.staffctv = $("#StfCtv").val();
    data.staffState = $("#states").val();
    data.staffpincode = $("#Pincde").val();
    data.staffRole = $("#StFRle").val();
    data.qualification = $("#quLictn").val();
    data.experience = $("#ExPrnCe").val();
    if ($('#eng').is(":checked")) {
        data.english = "on";
    } else {

        data.english = "off";
    }
    if ($('#hin').is(":checked")) {
        data.hindi = "on";
    } else {
        data.hindi = 'off';
    }
    if ($('#tel').is(":checked")) {
        data.telugu = "on";
    } else {
        data.telugu = "off";
    }
    if ($("#sci").is(":checked")) {
        data.science = "on";
    } else {
        data.science = 'off';
    }
    if ($('#mat').is(":checked")) {
        data.maths = "on";
    } else {
        data.maths = "off";
    }
    if ($('#soc').is(':checked')) {
        data.social = "on";
    } else {
        data.social = 'off';
    }
    if ($('#com').is(':checked')) {
        data.computers = "on";
    } else {
        data.computers = 'off';
    }
   
    $.ajax({
        url: '/update2',
        type: 'POST',
        data: data,
        success: function (res) {
            if(res==1){
                window.location.href="/stdtls";
            }
        }
    });
}

