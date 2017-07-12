$(document).ready(function () {
    $('.sellButton').click(function () {
        $.get("/playlist/sell/" + $(this).data('id')).then((data) => {
            $(this).parent().append('<span class="forSale"> For sale </span>');
            $(this).remove();
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        });
    });

    $('.buyButton').click(function () {
        $.get("/playlist/buy/" + $(this).data('id')).then(() => {
            $(this).parent().append('<span class="purchased"> Purchased </span>');
            $(this).remove();
        }).catch(function (err) {
            console.log('Error buying playlist');
            console.log(err.statusText);
        });
    });
    $("#edit").click(editClicked);

    function saveClicked(){
        let value1 = $('#ledgerInput').val();
        let value2 = $('#passwordInput').val();
        console.log(value1+" "+value2);
        if(value1 != '' && value2 != '') {
            $('#error').text('');
            $.get('/ILPAuthenticate', {username: value1, password: value2}).then((response) => {
                console.log(response);
            }).catch((err) => {
                console.log(err);
            });
            $('#sub').remove();
            $("#editDiv").append('<button id="edit">Edit</button>');
            $('#ledgerTr').append('<span id="ledgerAdress">'+value1+'</span>');
            $("#edit").click(editClicked);
            $('#ledgerInput').remove();
            $('#passwordInput').remove();
        }else{
            $('#error').text('You are not write your username or password');
        }
    }

    function editClicked () {
        $('#ledgerAdress').remove();
        $('#ledgerTr').append('<input id="ledgerInput" type="text" placeholder="Enter intledger adress here">');
        $('#ledgerTr').append('<input id="passwordInput" type="password">');
        $('#edit').remove();
        $("#editDiv").append('<button id="sub">Save</button>');
        $('#sub').click(saveClicked);
    }
});
