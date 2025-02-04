$(document).ready(function(){
  $('.carousel_inner').slick({
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrowLeft.ico"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrowRight.ico"></button>'
  });
});