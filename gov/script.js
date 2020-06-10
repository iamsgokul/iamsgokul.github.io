var simpleSlider = function(){

  var currentSlide = 0,
      sliderSlide = $('.slider__slide'),
      slideTotal = sliderSlide.length;

  function cycleSlides() {
    var slide = sliderSlide.eq(currentSlide);
    sliderSlide.removeClass('is-active');
    slide.addClass('is-active');
  }
  
  sliderSlide.first().addClass('is-active');

  $(document).on('click', '.js-slide-toggle', function(){
    currentSlide += 1;
    if (currentSlide > slideTotal - 1) {
      currentSlide = 0;
    }
    cycleSlides();
  });

};

simpleSlider();