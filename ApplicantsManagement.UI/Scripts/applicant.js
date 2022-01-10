//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.FamilyName + '</td>';
                html += '<td>' + item.Address + '</td>';
                html += '<td>' + item.CountryOfOrigin + '</td>';
                html += '<td>' + item.EMailAdress + '</td>';
                html += '<td>' + item.Age + '</td>';
                html += '<td>' + item.Hired + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var applicantObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        FamilyName: $('#FamilyName').val(),
        Address: $('#Address').val(),
        CountryOfOrigin: $('#CountryOfOrigin').val(),
        EMailAdress: $('#EMailAdress').val(),
        Age: $('#Age').val(),
        Hired: $('#Hired').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(applicantObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(ID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#FamilyName').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#CountryOfOrigin').css('border-color', 'lightgrey');
    $('#EMailAdress').css('border-color', 'lightgrey');
    $('#Hired').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + ID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Age').val(result.Age);
            $('#FamilyName').val(result.FamilyName);
            $('#Address').val(result.Address);
            $('#CountryOfOrigin').val(result.CountryOfOrigin);
            $('#EMailAdress').val(result.EMailAdress);
            $('#Hired').val(result.Hired);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var applicantObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        FamilyName: $('#FamilyName').val(),
        Address: $('#Address').val(),
        CountryOfOrigin: $('#CountryOfOrigin').val(),
        EMailAdress: $('#EMailAdress').val(),
        Age: $('#Age').val(),
        Hired: $('#Hired').val()
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(applicantObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Age').val("");
            $('#FamilyName').val("");
            $('#Address').val("");
            $('#CountryOfOrigin').val("");
            $('#EMailAdress').val("");
            $('#Hired').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#myModal').modal('show');
    $('#Id').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#FamilyName').val("");
    $('#Address').val("");
    $('#CountryOfOrigin').val("");
    $('#EMailAdress').val("");
    $('#Hired').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#FamilyName').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#CountryOfOrigin').css('border-color', 'lightgrey');
    $('#EMailAdress').css('border-color', 'lightgrey');
    $('#Hired').css('border-color', 'lightgrey');
}
function Close() {
    $('#myModal').modal('hide');
    $('#Id').val("");
    $('#Name').val("");
    $('#Age').val("");
    $('#FamilyName').val("");
    $('#Address').val("");
    $('#CountryOfOrigin').val("");
    $('#EMailAdress').val("");
    $('#Hired').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#FamilyName').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#CountryOfOrigin').css('border-color', 'lightgrey');
    $('#EMailAdress').css('border-color', 'lightgrey');
    $('#Hired').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#EMailAdress').val().trim() == "") {
        $('#EMailAdress').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EMailAdress').css('border-color', 'lightgrey');
    }
    if ($('#CountryOfOrigin').val().trim() == "") {
        $('#CountryOfOrigin').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CountryOfOrigin').css('border-color', 'lightgrey');
    }
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        if ($('#Name').val().length < 5) {
            $('#Name').css('border-color', 'Red');
            $("#groupName span").remove();
            $("#groupName").append("<span style='color: red' class='label label-important'>" + 'Name Minimum Length 5 char' + '</span>');
            isValid = false;
        }
        else {
            $('#Name').css('border-color', 'lightgrey');
            $("#groupName span").remove();
        }
    }
 
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        var age = $('#Age').val();
        if (!$.isNumeric(age)) {
            $('#Age').css('border-color', 'Red');
            $("#groupAge span").remove();
            $("#groupAge").append("<span style='color: red' class='label label-important'>" + 'Age must be numbers only' + '</span>');
            isValid = false;
        }
        else {
            $('#Age').css('border-color', 'lightgrey');
            $("#groupAge span").remove();
        }
    }
    if ($('#FamilyName').val().trim() == "") {
        $('#FamilyName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        if ($('#FamilyName').val().length < 5) {
            $('#FamilyName').css('border-color', 'Red');
            $("#groupFamilyName span").remove();
            $("#groupFamilyName").append("<span style='color: red' class='label label-important'>" + 'FamilyName Minimum Length 5 char' + '</span>');
            isValid = false;
        }
        else {
            $('#FamilyName').css('border-color', 'lightgrey');
            $("#groupFamilyName span").remove();
        }
    }

    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        if ($('#Address').val().length < 10) {
            $('#Address').css('border-color', 'Red');
            $("#groupAddress span").remove();
            $("#groupAddress").append("<span style='color: red' class='label label-important'>" + 'Address Minimum Length 10 char' + '</span>');
            isValid = false;
        }
        else {
            $('#Address').css('border-color', 'lightgrey');
            $("#groupAddress span").remove();
        }
    }
    return isValid;
}  