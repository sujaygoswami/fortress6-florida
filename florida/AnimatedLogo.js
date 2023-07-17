jQuery(document).ready(function( $ ) {

    if (window.location.pathname != "/" && window.location.pathname != "/#TV" && window.location.pathname != "/#Reklame" && window.location.pathname != "/#Film") {
        document.addEventListener('scroll', function (e) {
            var scrollpercent = document.body.scrollTop / document.documentElement.scrollHeight;

            //  console.log(window.pageYOffset);


            if (window.location.pathname.includes("/news")) {
                if (window.pageYOffset > 250) {
                    document.getElementById("header-logo-txt").style.display = "block";
                    showLogoTxt();
                } else {
                    hideLogoTxt();
                }
            } else {
                if (scrollpercent > 0.2) {
                    document.getElementById("header-logo-txt").style.display = "block";
                    showLogoTxt();
                } else {
                    hideLogoTxt();
                }
            }


        }, true);
    }


    document.getElementById('florida-logo').addEventListener("click", function () {
        if (window.location.pathname === "/" || window.location.pathname === "/#TV" || window.location.pathname === "/#Reklame" || window.location.pathname === "/#Film") {


            fullpage_api.moveTo(1)


        } else {
            window.location.href = "/"
        }
    });


});