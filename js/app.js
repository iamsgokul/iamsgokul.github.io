$(function () {
    $('#navbar').load('nav.html');
    $('#footerbar').load('footer.html');
    $('#watchread').load('watchread.html');
})
$(document).ready(function () {
    $('header nav > a').click(function () {
        debugger
        $('header nav ul').toggleClass('open');
    })
})