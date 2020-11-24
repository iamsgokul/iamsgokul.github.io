$(function () {
    $('#navbar').load('nav.html');
    $('#footerbar').load('footer.html');
    $('#watchread').load('watchread.html');
})

$(document).delegate(function(){
    $('i.gwicon-menu').on('click', function () {
        $('header nav ul').toggleClass('open');
    })
})