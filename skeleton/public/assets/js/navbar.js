$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    console.log("click navbar")
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});

//  // Close mobile & tablet menu on item click
//  $('.navbar-item').each(function(e) {
//   $(this).click(function(){
//     if($('#navbar-burger-id').hasClass('is-active')){
//       $('#navbar-burger-id').removeClass('is-active');
//       $('#navbar-menu-id').removeClass('is-active');
//     }
//   });
// });

// // Open or Close mobile & tablet menu
// $('#navbar-burger-id').click(function () {
//   if($('#navbar-burger-id').hasClass('is-active')){
//     $('#navbar-burger-id').removeClass('is-active');
//     $('#navbar-menu-id').removeClass('is-active');
//   }else {
//     $('#navbar-burger-id').addClass('is-active');
//     $('#navbar-menu-id').addClass('is-active');
//   }
// });