$(document).ready(function(){
  $('.carousel_inner').slick({
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplaySpeed: 2000,
    prevArrow: '<svg width="42" height="60" viewBox="0 0 42 60" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"  class="slick-prev"><path d="M35 30H7M21 50L7 30l14-20" /> </svg> ' ,
    nextArrow: '<svg width="42" height="60" viewBox="0 0 42 60" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"  class="slick-next"><path d="M7 30h28M21 10l14 20-14 20" /></svg>  ',
    responsive: [
      {
        breakpoint: 700,
        settings: {
        dots: true,
        arrows: false
        }
      }
    ]
  });
  $(function() {
  
    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
      $(this)
        .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
        .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
    });
  });
  // modal
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal_close').on('click', function(){
    $('.overlay, #consultation, #thanks').fadeOut('slow');
  });
  $('form').submit(function(e){
      e.preventDefault();
        // if (!$(this).valid(){return;}) чтобы только после прохождения валидации
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val("");
        $('#consultation').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
      });
      return false;
  });
  $(window).scroll(function(){
    if($(this).scrollTop() > 1400) {
      $('.pageUp').fadeIn('slow');
    } else {
      $('.pageUp').fadeOut();
    }
  });  
  $('a[href^="#"').on('click', function() {

    const href = $(this).attr('href');

  $('html, body').animate({
      scrollTop: $(href).offset().top
  });
  return false;
});

});
