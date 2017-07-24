$(document).ready(function () {
    $('.sellButton').click(function () {
      $(this).attr('disabled', 'disabled');
        $.get("/playlist/sell/" + $(this).data('id')).then((data) => {
            $(this).parent().append('<button data-id="'+$(this).data("id")+'" class="dontSell button"><span>Stop selling</span></button>');
            $(this).remove();
        }).catch(function (err) {
            console.log(err);
        });
    });

    $('.buyButton').click(function () {
        $(this).attr('disabled', 'disabled');
        $.get("/playlist/buy/" + $(this).data('id')).then(() => {
            $(this).parent().append('<button style="float:right;" class="button">Purchased</button>');
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
        $('#ledgerTr').append('<input id="passwordInput" type="password" placeholder="***********">');
        $('#edit').remove();
        $("#editDiv").append('<button id="sub">Save</button>');
        $('#sub').click(saveClicked);
    }
    $(".dontSell").click(function(){
        $.get('/dontSell', {playlistId: $(this).data('id')}).then((response) => {
            console.log(response);
            $(this).parent().append('<button style="float: right;" class="sellButton button" data-id="'+$(this).data('id')+'"><span>Sell</span></button>');
            $(this).remove();
        }).catch((err) => {
            console.log(err);
        });
    });
});
