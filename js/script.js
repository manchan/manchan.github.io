(function ($) {

  $(window).load(function () {
    $('.spinner').fadeOut(150);
    $('#loader').slideToggle(350);
    $("body").removeClass("preload");
  });

  //----------------------------------
  // Turnbox
  //----------------------------------
  function config_language_box() {
    $(".language").turnBox(
      {
        width: 40,
        height: 30
      });

    $(".language").find(".turnBoxButton").on("click", function () {
      var self_box = $(this).closest(".turnBoxContainer");
      if (self_box.hasClass("en") == true) {
        var text_lang = $(".text.en");
      } else {
        var text_lang = $(".text.jp");
      }

      $(".language").not(self_box).turnBoxAnimate();
      $(".text").removeClass("show");
      text_lang.addClass("show");
    });

    $(".language.jp").turnBoxAnimate({
      face: 2
    });

    $(".text.jp").addClass("show");
  }


  function init_layout() {
    config_language_box();
  }

  init_layout();


  // flexslider
  $('.flexslider').flexslider({
    animation: "fade",
    prevText: "",
    nextText: "",
    pauseOnHover: true,
    animationSpeed: 500,
    controlNav: false,
    randomize: true,
  });

  // resize header on scroll
  $(document).on("scroll", function () {
    if ($(document).scrollTop() > 100) {
      $("header").removeClass("large").addClass("small").fadeIn("slow");
      $(".menu-hider").removeClass("large").addClass("small").fadeIn("slow");
    } else {
      $("header").removeClass("small").addClass("large").fadeIn("slow");
      $(".menu-hider").removeClass("small").addClass("large").fadeIn("slow");
    }
  });

  // button on header for full menu
  $(".open-menu").click(function () {
    $(".menu-hider").toggleClass("open")
    $(".menu-icon").toggleClass("open")
    $(".social-icon").toggleClass("open")
  });

  // close full menu on scroll
  $(document).on("scroll", function () {
    $(".menu-hider").removeClass("open")
    $(".menu-icon").removeClass("open")
    $(".social-icon").removeClass("open")
  });

  // go to section
  $("ul.menu-hider.homepage li.menu-right, #home .header-group.homepage, #works p").onePageNav({
    currentClass: 'current',
    scrollSpeed: 1000,
    scrollOffset: 60,
    changeHash: false,
    scrollThreshold: 0.5,
    filter: ':not(.journal)',
    easing: 'swing',
    touch: true,
  });

  // height viewport
  $("#home").height($(window).height());
  $(window).resize(function () {
    $("#home").height($(window).height());
  });

  // deactivate skroolr animation on mobile
  if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
    skrollr.init({
      beforerender: function (data) {
        return data.curTop > data.lastTop;
      }

    });
  }

  $("#send").click(function () {

    var valid = '';
    var isr = ' is required!</p>';
    var name = $("#name").val();
    var mail = $("#email").val();
    var messaggio = $("#message").val();

    if (name.length < 1) {
      valid += '<p>*Valid name' + isr;
    }
    if (!mail.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
      valid += '<p>*Valid email address' + isr;
    }


    if (valid != '') {
      $("#response").fadeIn("slow");
      $("#response").html(valid);

      $('#send').removeClass('normal').addClass('error-button');
      $('#send').val('');

      setTimeout(function () {
        $('#send').removeClass('error-button').addClass('normal');
        $('#send').val('send');
        $("#response").fadeOut("slow");
      }, 3000);
    }

    else {
      var datastr = 'name=' + name + '&mail=' + mail + '&messaggio=' + encodeURIComponent(messaggio);
      setTimeout("send('" + datastr + "')", 1000, $('#send').val('wait...'));
    }
    return false;
  });

}(jQuery))

function send(datastr) {

  $.ajax({
    type: "POST",
    url: "http://hirasada.jp/contact/mail.php",
    data: datastr,
    cache: false,

    success: function (html) {
      $('#send').removeClass('normal, error-button').addClass('send-email');
      $('#send').val('');
    },
    error: function (data) {
      alert('error!!!');
    }
  });
}
