$(document).ready(function(){
  $('.carousel_inner').slick({
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrowLeft.ico"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrowRight.ico"></button>',
    responsive: [
      {
        breakpoint: 768,
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
});
