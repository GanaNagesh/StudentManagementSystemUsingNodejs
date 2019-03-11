// STAFF Login DISPLAY DATA INTO STUDENT LOGIN PAGE
$('#err-msg1').hide();

function getdata2(){

    var pathArray = window.location.pathname.split('/');
    var id = pathArray[2];
    console.log(id);

    $.ajax({
        url:'/get1/' + id,
        type:'GET',
        dataType:'JSON',

        success: function(data1){
            if(data1==0){
                return $('#err-msg1').show();
              }
              $('#err-msg1').hide();

            console.log(data1);
            $('#print1').html(`<a href="/invoiceprint/${data1[0].id}">Invoice Download</a>
            <h5>Staff id:${data1[0].id}</h5>
            <h5>Staff FullName:${data1[0].staffFullName}</h5>
            <h5>Staff ID:${data1[0].id}</h5>
            <h5>GENDER:${data1[0].staffGender}</h5>
            <h5>FATHER NAME:${data1[0].fatherName}</h5>
            <h5>MOTHER NAME:${data1[0].motherName}</h5>
            <h5>DATE OF BIRTH:${data1[0].staffdob}</h5>
            <h5>CONTACT ADDRESS 1:${data1[0].staffContactAdd1}</h5>
            <h5>CONTACT ADDRESS 2:${data1[0].staffContactAdd2}</h5>
            <h5>CONTACT ADDRESS 3:${data1[0].staffContactAdd3}</h5>
            <h5>CONTACT NUMBER:${data1[0].staffContactNumber}</h5>
            <h5>EMAIL:${data1[0].staffEmail}</h5>
            <h5>LANDMARK:${data1[0].staffLandmark}</h5>
            <h5>LOCATION:${data1[0].staffctv}</h5>
            <h5>STATE:${data1[0].staffState}</h5>
            <h5>PINCODE:${data1[0].staffpincode}</h5>
            <h5>ROLE:${data1[0].staffRole}</h5>
            <h5>IMAGE:<img class=".img-thumbnail" height="150" width="150" src="${data1[0].stImageUrl}"></h5>
            <h5>EXPERIENCE:${data1[0].experience}</h5>
            <h5>QUALIFICATION:${data1[0].qualification}</h5>
            <h5>SALARY:${data1[0].salary}</h5>
            <h5>ENGLISH:${data1[0].english}</h5>
            <h5>HINDI:${data1[0].hindi}</h5>
            <h5>TELUGU:${data1[0].telugu}</h5>
            <h5>SCIENCE:${data1[0].science}</h5>
            <h5>MATHS:${data1[0].maths}</h5>
            <h5>SOCIAL:${data1[0].social}</h5>
            <h5>COMPUTERS:${data1[0].computers}</h5>
            `)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    })
}