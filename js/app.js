// $(function () {
//     $('#navbar').load('nav.html');
//     $('#footerbar').load('footer.html');
//     $('#watchread').load('watchread.html');
// })


document.addEventListener('DOMContentLoaded', function () {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footerbar').innerHTML = data;
        });

    fetch('watchread.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('watchread').innerHTML = data;
        });
});