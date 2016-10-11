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

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

var moveX = 0;
var moveY = 0;
function handleOrientation(event) {
  var x = event.gamma; // In degree in the range [-90,90]
  var y = event.beta; // In degree in the range [-180,180]
  var z = event.alpha; //??

  moveY = y * 0.05;
  moveX = x * 0.05;

  for (var i in particles) {
    particles[i].transition();
  }
}
window.addEventListener('deviceorientation', handleOrientation);

var canvas = document.querySelector('#canvas-container');
var ctx = canvas.getContext('2d');
var Particle = function(scale, color, vx, vy, gv) {
  this.scale = scale; //大きさ
  this.color = color; //色
  this.vx = vx; //X速度
  this.vy = vy; //Y速度
  this.gv = gv; //重力
  this.position = {   // 位置
    x: 0,
    y: 0
  };
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.scale, 0, 2*Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.transition = function() {
  this.vy += this.gv;
  this.position.x += this.vx;
  this.position.y += this.vy;
  this.collisionDetection();
};

Particle.prototype.update = function() {
  this.vy += this.gv + moveY;
  this.vx += moveX;
  this.position.x += this.vx;
  this.position.y += this.vy;
  this.collisionDetection();
  this.draw();
};

Particle.prototype.collisionDetection = function() {
// 地面の衝突判定 上
  if (this.position.y < 0 - this.scale) {
    this.vy *= 0.6;
    this.vx *= 0.85;
    this.position.y = this.vy + this.scale;
  }
  // 下
  else if (this.position.y > ctx.canvas.height - this.scale) {
    this.vy *= -0.6;
    this.vx *= 0.85;
    this.position.y = ctx.canvas.height - this.scale;
  }
  // 左
  else if (this.position.x < 0 - this.scale) {
    this.vx *= -0.85;
    this.position.x = this.vx + this.scale;
  }
  // 右
  else if (this.position.x > ctx.canvas.width - this.scale) {
    this.vx *= -0.85;
    this.position.x = ctx.canvas.width - this.vx - this.scale;
  }
};

// ループ処理
function loop() {
  requestAnimFrame(loop);
  // 描画をクリアー
  ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
  for (var i in particles) {
    particles[i].update();
  }
}

function transitionByGravity() {
  requestAnimFrame(transitionByGravity);
  for (var i in particles) {
    particles[i].transition();
  }
}

// Resize for canvas size
function resize() {
  var width = ctx.canvas.clientWidth;
  var height = ctx.canvas.clientHeight;
  if (ctx.canvas.width != width ||
    ctx.canvas.height != height) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    return true;
  }
  return false;
}

var needToRender = true;  // draw at least once
function checkRender() {
  if (resize() || needToRender) {
    needToRender = false;
    for (var i in particles) {
      particles[i].update();
    }
  }
  requestAnimationFrame(checkRender);
}
checkRender();

var density = 200;  //パーティクルの密度
var particles = []; //パーティクルをまとめる配列
//var colors = ['#D0A000', '#6DD0A5', '#E084C5', '#f6f6f6'];
// Blue Base
//var colors = ['#476e73', '#4a949d', '#0c535c', '#010303'];
//var colors = ['#0072BB', '#FF4C3B', '#FFD034', '#000000', '#C6C8CA', '#FFFFFF'];
// Blue Base2
var colors = ['#333399', '#3399FF', '#FFFFFF', '#3366CC'];


for (var i=0; i<density; i++) {
  var color = colors[~~(Math.random()*4)];
  var scale = ~~(Math.random()*5)+3;
  var x = Math.random() * 10 - 5;
  var y = Math.random()* 9 + 4;
  var g = Math.random()* 0.2 + 0.3;

  var headerHeight = $('header').css('height').replace('px', '');
  particles[i] = new Particle(scale, color, x, -y, g);
  particles[i].position.x = canvas.width / 2;
  particles[i].position.y = (canvas.height - headerHeight) / 2;
  console.log("canvas.width: "+canvas.width);
  console.log("canvas.height: "+canvas.height);
}

loop();