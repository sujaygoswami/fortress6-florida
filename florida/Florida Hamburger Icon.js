jQuery(document).ready(function( $ ){

    $('.icon-bars').click(function() {
        document.getElementsByClassName("icon-bars")[0].classList.toggle("open");
    });
});

/*

var element = document.getElementsByClassName("icon-bars");

element[0].addEventListener("click", toogleHamburgerBtn);

function toogleHamburgerBtn() {
    element[0].classList.toggle("open");
}

*/