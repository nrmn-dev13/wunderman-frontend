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
    $('.sidebar__item').click(function () {
      $('.sidebar').removeClass('show--nav');
    })
  }
  handleGuideStep();
  handleToggleNav();
});
