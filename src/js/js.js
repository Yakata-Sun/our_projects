$(document).ready(function(){
  $('.carousel_inner').slick({
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
  });
  $(function() {
  
    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
      $(this)
        .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
        .closest('section.catalog').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
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
    if($(this).scrollTop() > 1000) {
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
