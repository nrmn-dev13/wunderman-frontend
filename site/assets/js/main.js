$(document).ready(function () {
  function handleGuideStep() {
    $("#onboardingStep").steps({
      transitionEffect: "slideLeft",
    });
  }
  function handleToggleNav() {
    // Toggle sidenav
    $(".toggle--nav").click(function () {
      $(".sidebar").toggleClass("show--nav");
    });
    $(".sidebar__item").click(function () {
      $(".sidebar").removeClass("show--nav");
    });
    // Radio Button Event
    $("input.form-control--support:radio").change(function () {
      if (this.value == "yes") {
        $(".invitation-wrapper").addClass("active");
      } else {
        $(".invitation-wrapper").removeClass("active");
      }
    });
    $("input.form-control--hauora:radio").change(function () {
      if (this.value == "yes") {
        $(".organize-wrapper").addClass("active");
      } else {
        $(".organize-wrapper").removeClass("active");
      }
    });
  }
  handleGuideStep();
  handleToggleNav();
});
