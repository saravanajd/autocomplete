// toggle sidenav on menu button click
document.querySelector('.menu-toggle').addEventListener('click', function () {
  const element = document.querySelector('body');
  const isMenuOpen = element.className.indexOf('menu-close') > -1;
  if (isMenuOpen) {
    element.classList.remove('menu-close');
  } else {
    element.classList.add('menu-close');
  }
});


// Show / Hide the side nav based on the screen size
$(document).ready(function () {

  const ToggleSideMenuByScreenSize = function () {
    const ww = document.body.clientWidth;
    const screenWidth = 900;
    if (ww < screenWidth) {
      $('body').addClass('menu-close');
    } else if (ww >= screenWidth) {
      $('body').removeClass('menu-close');
    };
  };

  $(window).resize(function () {
    ToggleSideMenuByScreenSize();
  });

  //Fire it when the page first loads:
  ToggleSideMenuByScreenSize();

});

const menuList = document.querySelectorAll("ul.menu a");
menuList.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const selectedElement = this.getAttribute("href");

    let to = 0;
    if (selectedElement && selectedElement !== '#') {
      to = $(selectedElement).position().top - 30;
    }

    $(".page-content").animate({
      scrollTop: to
    }, 1000)

  });
});