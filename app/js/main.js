$(function () {

  $('.blog__slider-items').slick({
    dots: true,
    arrows: false,
  });

  $('.menu__btn').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active');

  });

  var mixer = mixitup('.gallery__items');
});