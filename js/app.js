$(function () {
    $('#navbar').load('nav.html');
    $('#footerbar').load('footer.html');
    $('#watchread').load('watchread.html');

    $('header nav > a i').click(function () {
        debugger
        $('header nav ul').toggleClass('open');
    })
})