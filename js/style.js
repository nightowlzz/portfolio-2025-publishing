$(document).ready(function() {

  setImageSlide('.container_slide', 2);

  function setImageSlide(selector, first) {
    var numSlide = $(selector).find('.sec_slide').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = first;
    var widthBar = 0;
    // 초기화
    showSlide(slideFirst);
    $(selector).find('.sec_slide').each(function(i) {
      widthBar += $(this).outerWidth(true);
      $(this).css({
        'left': (i * 100) + '%'
      });
    });

    $(selector).find('.about').on('click', function() {
      $(this).find('img').stop(true).animate({
        'left': '-10px'
      }, 50).animate({
        'left': 0
      }, 100);
      showSlide(slidePrev);
    });
    $(selector).find('.porfo').on('click', function() {
      $(this).find('img').stop(true).animate({
        'right': '-10px'
      }, 50).animate({
        'right': 0
      }, 100);
      showSlide(slideNext);
    });

    snbMenu();

    function snbMenu() {
      $('.back_menu').on('click', function(e) {
        showSlide(2);
      });
      $('.pofol_move').on('click', function(e) {
        showSlide(3);
      });
      $('.about_move').on('click', function(e) {
        showSlide(1);
      });
    }

    function showSlide(n) {
      if (slideNow === 0) {
        $(selector).css({
          'transition': 'none',
          'left': -((n - 1) * 100) + '%'
        });
      } else {
        $(selector).css({
          'transition': 'left 0.3s',
          'left': -((n - 1) * 100) + '%'
        });
      }
      slideNow = n;
      slidePrev = (n <= 1) ? numSlide : (n - 1);
      slideNext = (n >= numSlide) ? 1 : (n + 1);
    }
  }
});