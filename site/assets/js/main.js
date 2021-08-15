$(document).ready(function () {
  function handleFormStep() {
    $('#formStep').steps();
  }
  function handleGuideStep() {
    $("#guideStep").steps({
      transitionEffect: "slideLeft"
    });
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
    $('.button--read-more').click(function () {
      if ($(this).closest(".card--attention").hasClass('expanded')) {
        $(this).html("Read More");
      } else {
        $(this).html("Less");
      }
      $(this).closest(".card--attention").toggleClass('expanded');
    })
  }
  function handleToggleNav() {
    $('.toggle--nav').click(function () {
      $('.sidebar').toggleClass('show--nav');
    })
    $('.sidebar__item').click(function () {
      $('.sidebar').removeClass('show--nav');
    })
    $('.hamburger').click(function () {
      $('.aside').toggleClass('show--nav');
    })
  }
  function handleVideo() {
    var video = document.querySelector('.video-content__source');
    $('.button--video').click(function () {
      video.setAttribute("controls", "controls")
      video.play();
      $('.video-content').addClass('isPlaying');
    })
    $('.close--modal').click(function () {
      video.removeAttribute("controls", "controls")
      video.pause();
      $('.video-content').removeClass('isPlaying');
    })
  }
  function handleAlert() {
    $('.btn-close--alert').click(function () {
      $('.alert-section').addClass('active');
    })
  }  

  handleFormStep();
  handleGuideStep();
  handleTogglePassword();
  handleReadMore();
  handleToggleNav();
  handleVideo();
  handleAlert()
});