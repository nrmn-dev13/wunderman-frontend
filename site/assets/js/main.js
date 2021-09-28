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
  function handleFlash() {
    $('.icon--close-flash').click(function () {
      $('.flash').addClass('close');
    })
  }

  handleFormStep();
  handleGuideStep();
  handleTogglePassword();
  handleReadMore();
  handleToggleNav();
  handleVideo();
  handleAlert()
  handleFlash()
});

// temp chart
var ctx = document.getElementById('tempChart');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
    datasets: [{
        label: 'Hot',
        data: [60, 60, 60, 60, 60, 60], // max area hot
        backgroundColor: 'rgba(205, 98, 118, 0)',
        borderColor: 'rgba(205, 98, 118, 0)',
        fill: {above: 'rgba(205, 98, 118, 0.5)', target: {value: 30}} // min area hot
      },
      {
        label: 'Comfortable',
        data: [30, 30, 30, 30, 30, 30],
        backgroundColor: 'rgba(77, 157, 46, 0)',
        borderColor: 'rgba(77, 157, 46, 0)',
        fill: {above: 'rgba(77, 157, 46, 0.5)', target: {value: 18}}
      }
      ,
      {
        label: 'Cold',
        data: [18, 18, 18, 18, 18, 18],
        backgroundColor: 'rgba(89, 162, 201, 0)',
        borderColor: 'rgba(89, 162, 201, 0)',
        fill: {above: 'rgba(89, 162, 201, 0.5)', target: {value: 0}}
      }
      ,
      {
        label: 'Temp',
        data: [15, 31, 20, 20, 18, 15],
        backgroundColor: 'rgb(0, 0, 0)',
        borderColor: 'rgb(0, 0, 0)',
        fill: false
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      }
    },
  
    plugins: {
      legend: {
        position: 'bottom',
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  }
});

// humidity chart 
var ctx = document.getElementById('humidityChart');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
    datasets: [{
        label: 'Damp',
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(205, 98, 118, 0)',
        borderColor: 'rgba(205, 98, 118, 0)',
        fill: {above: 'rgba(205, 98, 118, 0.5)', target: {value: 60}}
      },
      {
        label: 'Comfortable',
        data: [60, 60, 60, 60, 60, 60],
        backgroundColor: 'rgba(77, 157, 46, 0)',
        borderColor: 'rgba(77, 157, 46, 0)',
        fill: {above: 'rgba(77, 157, 46, 0.5)', target: {value: 30}}
      }
      ,
      {
        label: 'Dry',
        data: [30, 30, 30, 30, 30, 30],
        backgroundColor: 'rgba(89, 162, 201, 0)',
        borderColor: 'rgba(89, 162, 201, 0)',
        fill: {above: 'rgba(89, 162, 201, 0.5)', target: {value: 0}}
      }
      ,
      {
        label: 'Temp',
        data: [70, 50, 60, 30, 80, 55],
        backgroundColor: 'rgb(0, 0, 0)',
        borderColor: 'rgb(0, 0, 0)',
        fill: false
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      }
    },
  
    plugins: {
      legend: {
        position: 'bottom',
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  }
});

// datepicker
$('.datepicker').datepicker({
  uiLibrary: 'bootstrap4'
});