$(function () {
    $('.menu a, .footer a').on('click', function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate(
            {
                scrollTop: top,
            },
            1500,
        );
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.header').addClass('header--active');
        } else {
            $('.header').removeClass('header--active');
        }
    });

    $('.blog__slider-items').slick({
        dots: true,
        arrows: false,
    });

    $('.menu__btn').on('click', function () {
        $('.menu__list').toggleClass('menu__list--active');
    });

    $('.menu__list-link, .logo').on('click', function () {
        $('.menu__list--active').removeClass('menu__list--active');
    });

    var mixer = mixitup('.gallery__items');
});
