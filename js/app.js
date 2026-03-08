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

  const menuopen = document.querySelector('header nav > a');
  menuopen.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.topmenu').classList.toggle('open');
  })

  function setActiveNavLink() {
    const currentUrl = window.location.href;
    const navLinks = document.querySelectorAll('.topmenu a');

    navLinks.forEach(link => {
      if (link.href === currentUrl) {
        link.parentElement.classList.add('active');
      } else {
        link.parentElement.classList.remove('active');
      }
    });
  }

  setActiveNavLink();
