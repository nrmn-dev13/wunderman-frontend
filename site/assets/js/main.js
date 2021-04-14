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
  handleStepForm();
  handleTogglePassword();
}); 