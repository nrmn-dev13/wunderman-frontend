$(document).ready(function () {
  function sliderHandler() {
    $(".slider--about").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $(".prev-arrow"),
      nextArrow: $(".next-arrow"),
      mobileFirst: true,
      responsive: [
        {
           breakpoint: 480,
           settings: "unslick"
        }
     ]
    });
  }
  sliderHandler()
});
