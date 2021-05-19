$(document).ready(function () {  
  function handleStepForm() {
    $('#stepForm').steps();
  }
  function handleTogglePassword() {
    $(".icon-password").click(function () {
      $(this).toggleClass("active");
      var password = $(this).prev(".form__input--password");
      if (password.attr("type") === "password") {
        password.attr("type", "text");        
      } else {
        password.attr("type", "password");        
      }
    });
  }
  function handleReadMore() {
    $('.button--read-more').click(function(){
      if ($(this).closest(".card--attention").hasClass('expanded')) {
        $(this).html( "Read More" );
      } else {
        $(this).html( "Less" );
      }
      $(this).closest(".card--attention").toggleClass('expanded');
    })
  }
  function handleOpenNav() {
    $('.toggle--nav').click(function(){
      $('.sidebar').toggleClass('show--nav');
    })
  }
  
  handleStepForm();
  handleTogglePassword();
  handleReadMore();
  handleOpenNav();
}); 