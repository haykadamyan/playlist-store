$(document).ready(function(){
  $('.sellButton').click(function(){
    $.get( "/playlist/sell/" + $(this).data('id')).then((data) => {
      $(this).parent().append('<span class="forSale"> For sale </span>');
      $(this).remove();
      console.log(data);
    }).catch(function(err) {
      console.log(err);
    });
  })

  $('.buyButton').click(function(){
    $.get( "/playlist/buy/" + JSON.stringify($(this).data('id'))).then(() => {
      $(this).parent().append('<span class="forSale"> For sale </span>');
      $(this).remove();
    }).catch(function(err) {
      console.log('work');
      console.log(err.statusText);
    });
  });
});
