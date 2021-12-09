$(document).ready(function () {
  function handleGuideStep() {
    $("#guideStep").steps({
      transitionEffect: "slideLeft"
    });
  }
  function handleToggleNav() {
    $('.toggle--nav').click(function () {
      $('.sidebar').toggleClass('show--nav');
    })
  }
  handleGuideStep();
  handleToggleNav();
});
