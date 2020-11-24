$(function () {
    $('#navbar').load('nav.html');
    $('#footerbar').load('footer.html');
    $('#watchread').load('watchread.html');
})
$(document).ready(function () {
    $('header nav > a').click(function () {
        $('header nav ul').toggleClass('open');
    })
})