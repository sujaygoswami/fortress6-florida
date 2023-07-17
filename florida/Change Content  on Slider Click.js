

//Animated logo TXT
var floridatxt = document.getElementById("header-logo-txt-sub-florida");
var entertainmenttxt = document.getElementById("header-logo-txt-sub-entertainment");
var isTouch = ('ontouchstart' in document.documentElement);
var firstSlideChange = true;

function showLogoTxt() {
    var floridatxt = document.getElementById("header-logo-txt-sub-florida");
    var entertainmenttxt = document.getElementById("header-logo-txt-sub-entertainment");
    floridatxt.classList.add("header-logo-txt-show");
    floridatxt.classList.remove("header-logo-txt-hide");
    entertainmenttxt.classList.add("header-logo-txt-sub-show");
    entertainmenttxt.classList.remove("header-logo-txt-sub-hide");
}

function hideLogoTxt() {
    var floridatxt = document.getElementById("header-logo-txt-sub-florida");
    var entertainmenttxt = document.getElementById("header-logo-txt-sub-entertainment");
    floridatxt.classList.add("header-logo-txt-hide");
    floridatxt.classList.remove("header-logo-txt-show");
    entertainmenttxt.classList.add("header-logo-txt-sub-hide");
    entertainmenttxt.classList.remove("header-logo-txt-sub-show");

}


jQuery(document).ready(function( $ ) {

    //Animated logo TXT
    var floridatxt = document.getElementById("header-logo-txt-sub-florida");
    var entertainmenttxt = document.getElementById("header-logo-txt-sub-entertainment");
    var isTouch = ('ontouchstart' in document.documentElement);
    var firstSlideChange = true;

//check ob der wir im elementor edit mode sind, wenn nicht , dann code ausführen
    if(!$('body').hasClass("elementor-editor-active")) {



        if(window.location.pathname == "/" ){//|| window.location.hash == "/#TV" || window.location.hash == "/#Reklame" || window.location.hash == "/#Film"){


            var currTopic = "TV";
            entertainmenttxt.innerHTML = "TV";
            $('#florida-logo').css("display","none");
            $('.floridaheader').css("display", "none");

            function muteAllVideos(){
                $('.showcase-section').each(function(i, obj) {
                    var video = $(this).find("video");
                    var toggletBtn = $(this).find(".toggle_sound");

                    video.prop("muted", true);
                    video.css("height","100%");
                    video.css("width","100%");
                    toggletBtn.find(".elementor-button-icon").html('<img id="muteBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-mute.svg" />');
                    //toggletBtn.find(".elementor-button-icon").html('<img id="muteBtn-icon" src="https://www.floridatv-entertainment.de/wp-content/uploads/2022/03/flo-toggle-sound.gif" />');
                });
            }





            //$(window).on('load', function () { });
//	var revapi = $(window).on('load', function () { });


            var revapi = jQuery(document).ready(function() {

                revapi.on('revolution.slide.onloaded', function() {

                    //changeContent(1);

                    /*  if(window.location.hash == "#TV"){
                              changeContent(1);
                      }else if(window.location.hash   == "#Film"){
                          changeContent(3);
                      }else if(window.location.hash == "#Reklame"){
                          changeContent(2);
                      }else{
                          changeContent(1);
                      }*/


                    // toggle('home-tv', 'block'); // Shows
                    //  toggle('home-reklame', 'none');
                    //  toggle('home-film', 'none');
                });


                /*
                TV Intro - 1
                TV Unit - 2


                */

                revapi.on('revolution.slide.onchange', function(event, data) {

                    if(firstSlideChange == true){
                        if(data.slide[0].id == "tv-unit" || data.slide[0].id == "reklame-unit" || data.slide[0].id == "film-unit" ){
                            firstSlideChange = false;
                            $('.floridaheader').fadeIn("slow");
                            fullpage_api.setAllowScrolling(true);
                            fullpage_api.setKeyboardScrolling(true);
                        }
                    }else{
                        fullpage_api.moveTo(1);
                        /*	if(data.slide[0].id == "tv-intro" || data.slide[0].id == "reklame-intro" || data.slide[0].id == "film-intro"){
                                revapi24.revnext();
                            }*/


                    }



                    /*if(data.slideIndex == 4){
                        $('.floridaheader').css("display", "none");
                        fullpage_api.setAllowScrolling(false);
                        fullpage_api.setKeyboardScrolling(false);

                    }else{
                        $('.floridaheader').fadeIn("slow");
                        fullpage_api.setAllowScrolling(true);
                        fullpage_api.setKeyboardScrolling(true);
                    }*/

                    //if(data.prevSlideIndex != data.slideIndex){
                    //	fullpage_api.moveTo(1)
                    //		changeContent(data.slideIndex);

                    //	   }



                    //console.log(data);
                    //console.log(data.slide[0].id);

                    changeContent(data.slide[0].id);
                });

            });




            /**************************************FUNCTIONS**************************************/



            function toggle(className, displayState){
                var elements = document.getElementsByClassName(className)

                for (var i = 0; i < elements.length; i++){
                    elements[i].style.display = displayState;
                }
            }

            function changeContent(index){

                if(index == "tv-intro" || index == "tv-unit"){
                    currTopic = "TV"
                }else if(index == "reklame-intro" || index == "reklame-unit"){
                    currTopic = "Reklame"
                }else if(index == "film-intro" || index == "film-unit"){
                    currTopic = "Film"
                }


                if(currTopic == "TV"){
                    // console.log("TV");
                    // window.location.href = "#TV";
                    entertainmenttxt.innerHTML = "TV";
                    toggle('home-tv', 'table'); // Shows
                    toggle('home-reklame', 'none');
                    toggle('home-film', 'none');
                }

                if(currTopic == "Reklame"){
                    // console.log("Reklame");
                    // window.location.href = "#Reklame";
                    entertainmenttxt.innerHTML = "REKLAME";
                    toggle('home-reklame', 'table'); // Shows
                    toggle('home-tv', 'none');
                    toggle('home-film', 'none');
                }

                if(currTopic == "Film"){
                    //     console.log("Film");
                    //  window.location.href = "#Film";
                    entertainmenttxt.innerHTML = "FILM";
                    toggle('home-film', 'table'); // Shows
                    toggle('home-reklame', 'none');
                    toggle('home-tv', 'none');

                    /*   if(isTouch){
                     toggle('showcaseslider', 'none');
                       }else{
                           toggle('showcase-section', 'none');
                      }*/
                }
                $(window).trigger('resize');
                muteAllVideos();

            }
//});


        }else{
            entertainmenttxt.innerHTML = "ENTERTAINMENT";

        }

    }//if end -> wenn nicht im elementor edit mode

});




