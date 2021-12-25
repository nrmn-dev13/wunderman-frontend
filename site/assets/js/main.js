$(document).ready(function () {
  function sliderHandler() {
    var $status = $('.slider-nav__counter');
    var $slickElement = $('.slider--about');
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      var i = (currentSlide ? currentSlide : 0) + 1;
      $status.html('<span class="current-number">' + '0' +i + '</span>' + ' / ' + '0' +slick.slideCount);
  });
    $slickElement.slick({
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
      centerMode: true,
      centerPadding: '60px',
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
  function smoothScrollHandler() {
    $("a").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 0, function(){
  
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  }
  sliderHandler()
  smoothScrollHandler()
});
