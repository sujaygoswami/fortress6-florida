jQuery(document).ready(function( $ ) {


    $(".reklame-showreel").on("click", function (event) {
        fullpage_api.setAllowScrolling(false);
        fullpage_api.setKeyboardScrolling(false);


        DialogsManager.getWidgetType("lightbox").prototype.onShow = function () {

            var observer = new MutationObserver(function (mutations) {

                if ($("#elementor-lightbox-cd08068").css("display") == "none") {
                    fullpage_api.setAllowScrolling(true);
                    fullpage_api.setKeyboardScrolling(true);
                    observer.disconnect();
                }


            });
            var target = document.querySelector('#elementor-lightbox-cd08068');
            observer.observe(target, {
                attributes: true
            });

        }
    });


});