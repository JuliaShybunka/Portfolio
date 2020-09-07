$(document).ready(function() {
    $('.banner-inner').mouseenter(function() {
        $('.banner-inner ').mousemove(function(event) {
            let windowWidth = $(window).width();
            let windowHeight = $(window).height();

            let mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
            let mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

            $('.banner-inner').css('background-image', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #37d5d6, #36096d)');
        });
    });
    $('.banner-inner').mouseleave(function() {
        $('.banner-inner').css('background-image', 'linear-gradient(315deg, #36096d 0%, #37d5d6 74%)');
    });


    $('#burger').click(function(e) {
        e.preventDefault();
        $("#burger").css("padding", '16px 16px 200vw 200vw');
        $(".header-nav").css("display", 'flex');
        $("#quit").css("display", 'inline');

    });

    $('#quit').click(function(e) {
        e.preventDefault();
        $("#burger").css("padding", '16px 16px 32px 32px');
        $(".header-nav").css("display", 'none');
        $("#quit").css("display", 'none');
    });
});

// background-image: linear-gradient(315deg, #36096d 0%, #37d5d6 74%);