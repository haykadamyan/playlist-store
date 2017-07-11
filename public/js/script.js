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
        let value = $('#ledgerSpan').val();
        console.log(value);
        $.get('/ILPAddressChange', {address: value}).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
        $('#sub').remove();
        $("#editDiv").append('<button id="edit">Edit</button>');
        $('#ledgerSpan').remove();
        $('#ledgerTr').append('<span id="ledgerAdress">'+value+'</span>');
        $("#edit").click(editClicked);
    }

    function editClicked () {
        $('#ledgerAdress').remove();
        $('#ledgerTr').append('<input id="ledgerSpan" type="text" placeholder="Enter intledger adress here">');
        $('#edit').remove();
        $("#editDiv").append('<button id="sub">Save</button>');
        $('#sub').click(saveClicked);
    }
});
