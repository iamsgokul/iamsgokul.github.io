$(function () {
    $('#navbar').load('nav.html');
    $('#footerbar').load('footer.html');
    $('#watchread').load('watchread.html');

    $('i.gwicon-menu').click(function () {
        debugger
        $('header nav ul').toggleClass('open');
    })
})