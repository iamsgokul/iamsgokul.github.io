$(function () {
    $('#navbar').load('nav.html');
    $('#footerbar').load('footer.html');
    $('#watchread').load('watchread.html');
})

$(document).ready(function(){
    $('i.gwicon-menu').click(function () {
        $('header nav ul').toggleClass('open');
    })
})