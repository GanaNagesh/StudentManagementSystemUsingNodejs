// Student Login DISPLAY DATA INTO STUDENT LOGIN PAGE

var pathArray =window.location.pathname.split('/');
    
var id = pathArray[2];
$('#err-msg').hide();


function getdata() {
    
    // var pathArray =window.location.pathname.split('/');
    
    // var id = pathArray[2];
    console.log(id);

    $.ajax({
        url: '/get/' + id,
        type:'GET',
        dataType:'JSON',

        success: function (data1) {
            if(data1==0){
               return $('#err-msg').show();
             }
             $('#err-msg').hide();
             
            console.log(data1);
            
            $('#print').html(`<a href="/invoice/${data1[0].id}">Invoice</a>
            <h5>Student id:${data1[0].id}</h5>
            <h5>Student Name:${data1[0].name}</h5>
            <h5>Father Name:${data1[0].Fname}</h5>
            <h5>Mother Name:${data1[0].Mname}</h5>
            <h5>Student Class:${data1[0].Sclass}</h5>
            <h5>Address:${data1[0].Address}</h5>
            <h5>Gender:${data1[0].gender}</h5>
            <h5>Phone Number:${data1[0].phonenumber}</h5>
            <h5>Email:${data1[0].email}</h5>
            <h5>Blood Group:${data1[0].bloodgrp}</h5>
            <h5>Bus Faculity:${data1[0].busfac}</h5>
            <h5>Bus Fee:${data1[0].busfee}</h5>
            <h5>Student Fee:${data1[0].stufee}</h5>
            <h5>Total Fee:${data1[0].totfee}</h5>
            <h5>Total Pay:${data1[0].totpay}</h5>
            <h5>Total Due:${data1[0].totdue}</h5>
            <h5>Image:<img class=".img-thumbnail" height="150" width="150" src="${data1[0].image}"></h5>`);
        },
    
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    });
}
