$(document).ready(function() {
    preventDefaultAnchor();
  function preventDefaultAnchor() {
    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });
  };

  setTimeout(function(){
    $('.portfolio').css({'opacity':1});
    $('.about-menu').css({'opacity':1});
  },100);

  $('.close').on('click', function() {
    $('.popup-box').removeClass('fix');
    $('body').css({'overflow':'auto'});
  });

  setImageSlide('.pofol_swipe', 1, false, 3000);

  function setImageSlide(selector, first, status, speed) {
    var numSlide = $(selector).find('.slide > li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = first;
    var startX = 0;
    var startY = 0;
    var delX = 0;
    var delY = 0;
    var offsetX = 0;
    var direction = '';

    // 초기화
    $(selector).find('.slide > li').each(function(i) {
        $(this).css({'left': (i * 100) + '%', 'display': 'block'});
        $(selector).find('.indicator').append('<li><a href="#"><span class="hide">' + (i + 1) + '번 슬라이드</span></a></li>\n');
    });

    showSlide(slideFirst);

    $(selector).find('.indicator li a').on('click', function() {
        var index = $(selector).find('.indicator li').index($(this).parent());
        showSlide(index + 1);
    });
    $(selector).find('.control .prev').on('click', function() {
        $(this).find('img').stop(true).animate({'left': '-10px'}, 50).animate({'left': 0}, 100);
        showSlide(slidePrev);
    });
    $(selector).find('.control .next').on('click', function() {
        $(this).find('img').stop(true).animate({'right': '-10px'}, 50).animate({'right': 0}, 100);
        showSlide(slideNext);
    });

    // swipe
    $(selector).find('.slide').on('touchstart', function(e) {
        $(selector).find('.control span.bar').stop(true).css({'width': 0});
        $(selector).find('.slide').css({'transition': 'none'});
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        offsetX = $(this).position().left;

        document.addEventListener('touchmove', touchMove, {passive: false});

        $(document).on('touchend', function() {
            if (delX < -50 && slideNow !== numSlide) {
                showSlide(slideNext);
            } else if (delX > 50 && slideNow !== 1) {
                showSlide(slidePrev);
            } else {
                showSlide(slideNow);
            }
            direction = '';

            document.removeEventListener('touchmove', touchMove);
            $(document).off('touchend');
        });
    });

    function touchMove(e) {
        delX = e.touches[0].clientX - startX;
        delY = e.touches[0].clientY - startY;
        if (direction === '') {
            e.preventDefault();
            if (Math.abs(delX) > 5) {
                direction = 'horizon';
            } else if (Math.abs(delY) > 5) {
                direction = 'vertical';
            }
        } else if (direction === 'horizon') {
            e.preventDefault();
            if ((slideNow === 1 && delX > 0) || (slideNow === numSlide && delX < 0)) {
                delX = delX / 10;
            }
            $(selector).find('.slide').css({'left': (offsetX + delX) + 'px'});
        } else if (direction === 'vertical') {
            delX = 0;
        }
    }

    function showSlide(n) {
        $(selector).find('.control span.bar').stop(true).css({'width': 0});
        if (slideNow === 0) {
            $(selector).find('.slide').css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
        } else {
            $(selector).find('.slide').css({'transition': 'left 0.3s', 'left': -((n - 1) * 100) + '%'});
        }
        $(selector).find('.indicator li').removeClass('on');
        $(selector).find('.indicator li:eq(' + (n - 1) + ')').addClass('on');
        slideNow = n;
        slidePrev = (n - 1) < 1 ? numSlide : n - 1;
        slideNext = (n + 1) > numSlide ? 1 : n + 1;
    }
  }
});
