$(document).ready(function () {
  function sliderHandler() {
    $(".slider--about").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $(".prev-arrow"),
      nextArrow: $(".next-arrow"),
      mobileFirst: true,
      infinite: false,
      responsive: [
        {
           breakpoint: 480,
           settings: "unslick"
        }
     ]
    });
    $(".slider--perks").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $(".prev-arrow--perks"),
      nextArrow: $(".next-arrow--perks"),
      dots: true,
      mobileFirst: true,
      infinite: false,
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
