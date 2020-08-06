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
});

// background-image: linear-gradient(315deg, #36096d 0%, #37d5d6 74%);