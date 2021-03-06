$(document).ready(function () {
  $('.sellButton').click(sellClick);

  //Click event listener for buy button
  $('.buyButton').click(function () {
    $(this).attr('disabled', 'disabled');
    $.get("/playlist/buy/" + $(this).data('id')).then(() => {
      $(this).parent().append('<button style="float:right;" class="button">Purchased</button>');
      $(this).remove();
    }).catch(function (err) {
      console.log('Error buying playlist');
      console.log(err.statusText);
      if(err.responseJSON.err == "ILP username and ILP password don't set")
      {
        $(".container").prepend('<div class="alert alert-warning"><strong>Warning !</strong> You don\'t set your ilp username and ilp password</div>');
      }
    });
  });

  $("#edit").click(editClicked);

  //This function to set interledger password
  function editClicked() {
    $('#ledgerAdress').remove();
    $('#ledgerTr').append('<input id="ledgerInput" type="text" placeholder="Enter intledger adress here">');
    $('#ledgerTr').append('<input id="passwordInput" type="password" placeholder="***********">');
    $('#edit').remove();
    $("#editDiv").append('<button id="sub">Save</button>');
    $('#sub').click(saveClicked);
  }

  //This to save password in database
  function saveClicked() {
    let value1 = $('#ledgerInput').val();
    let value2 = $('#passwordInput').val();
    if (value1 !== '' && value2 !== '') {
      $('#error').text('');
      $.get('/ILPAuthenticate', {username: value1, password: value2}).then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
      $('#sub').remove();
      $("#editDiv").append('<button id="edit">Edit</button>');
      $('#ledgerTr').append('<span id="ledgerAdress">' + value1 + '</span>');
      $("#edit").click(editClicked);
      $('#ledgerInput').remove();
      $('#passwordInput').remove();
    } else {
      $('#error').text('You are not write your username or password');
    }
  }

  function sellClick() {
    $(this).attr('disabled', 'disabled');
    $(this).parent().append('<input id="pricePl" type="text" placeholder="Write your playlist price">');
    $(this).parent().append('<button id="send" class="button">Send</button>');
    window.playlistId = $(this).data('id');
    $(this).remove();
    $("#send").click(sendClick);
  }

  function sendClick() {
    window.pricePl = $("#pricePl").val();
    if (pricePl === "") {
      pricePl = 0.99;
    }
    $.get("/playlist/sell/" + playlistId + "/" + pricePl).then((data) => {
      $(this).parent().append('<button data-id="' + $(this).data("id") + '" class="dontSell button"><span>Stop selling</span></button>');
      $("#pricePl").remove();
      $("#send").remove();
    }).catch(function (err) {
      console.log(err);
      if(err.responseJSON.err == "ILP username and ILP password don't set")
      {
          $(".container").prepend('<div class="alert alert-warning"><strong>Warning !</strong> You don\'t set your ilp username and ilp password</div>');
      }
    });
    $('.sellButton').click(sellClick);
  }

  $(".dontSell").click(function () {
    $.get('/dontSell', {playlistId: $(this).data('id')}).then((response) => {
      console.log(response);
      $(this).parent().append('<button style="float: right;" class="sellButton button" data-id="' + $(this).data('id') + '"><span>Sell</span></button>');
      $(this).remove();
    }).catch((err) => {
      console.log(err);
    });
  });
});
