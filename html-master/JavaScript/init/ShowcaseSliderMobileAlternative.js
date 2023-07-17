//jQuery(document).ready(function( $ ){

    var revapi = jQuery(document).ready(function($) {
        revapi.on('revolution.slide.onloaded', function () {



            $(".reklame-showreel").on("click", function(event) {
                fullpage_api.setAllowScrolling(false);
                fullpage_api.setKeyboardScrolling(false);


                DialogsManager.getWidgetType("lightbox").prototype.onShow = function(){

                    var observer = new MutationObserver(function(mutations) {

                        if($("#elementor-lightbox-cd08068").css("display") == "none"){
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






            
    $('.showcase-section').each(function(i, obj) {
        var video = $(this).find(".elementor-background-video-hosted");
        var toggletBtn = $(this).find(".toggle_sound");
        var toggletBtn_play = $(this).find(".toggle_play");
        var detailsBtn = $(this).find(".details-btn-showcase");


        toggletBtn_play.find(".elementor-button-icon").html('<img id="playBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-pause.svg" />');
        //  toggletBtn.find(".elementor-button-icon").html('<img id="muteBtn-icon" src="https://www.floridatv-entertainment.de/wp-content/uploads/2022/03/flo-toggle-sound.gif" />');

        detailsBtn.on("click", function(event) {
            //disable scrolling when opening the popup
            /*code um scrollen zu disablen wenn das popup geöffnet wird
             * wird wieder enabled in der individuellen css und js klasse -> Fix i Btn - Scrollsettings
            */
            fullpage_api.setAllowScrolling(false);
            fullpage_api.setKeyboardScrolling(false);
            /*code ende*/

            $(this).find(".elementor-button-icon").html('<img id="detailsBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-loading.gif" />');
            jQuery( document ).on( 'elementor/popup/show', () => {

                $(this).find(".elementor-button-icon").html('<img id="detailsBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-information.svg" />');
            });


            video.addClass("paused-btn");
            video.removeClass("playing");
            pauseVideo(video);
            toggletBtn_play.find(".elementor-button-icon").html('<img id="playBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-play.svg" />');

        });

        toggletBtn.on("click", function(event) {
            video.prop("muted", !video.prop("muted"));

            if(video.prop("muted")){
                global_sound = false;
                $(this).find(".elementor-button-icon").html('<img id="muteBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-mute.svg" />');


            }else{
                global_sound = true;
                $(this).find(".elementor-button-icon").html('<img id="muteBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-sound.gif" />');

            }


        });


/*
        //catch mobile battery save mode
        video[0].addEventListener('suspend', () => {
            video.addClass("paused-btn");
            video.removeClass("playing");
            toggletBtn_play.find(".elementor-button-icon").html('<img id="playBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-play.svg" />');
        });
*/





        toggletBtn_play.on("click", function(event) {
            if (!(video.hasClass('playing'))) {
                //console.log("BTN CLICK: PLAY: start playing");
                video.addClass("playing");
                video.removeClass("paused-btn");
                playVideo(video);
                toggletBtn_play.find(".elementor-button-icon").html('<img id="playBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-pause.svg" />');

            }
            else {
                //	console.log("BTN CLICK: PLAY: stop playing");
                video.addClass("paused-btn");
                video.removeClass("playing");
                pauseVideo(video);
                toggletBtn_play.find(".elementor-button-icon").html('<img id="playBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-play.svg" />');
            }
        });

    });


    function playVideo(video){
        video.get(0).play();
        // video.trigger("play");
        //  video.parent().next().find(".toggle_play").find(".elementor-button-icon").html('<img id="playBtn-icon" src="https://www.floridatv-entertainment.de/wp-content/uploads/2022/03/flo-toggle-pause.svg" />');
        //change button
    }

    function pauseVideo(video){
        video.get(0).pause();
        //video.trigger("pause");
        //   video.parent().next().find(".toggle_play").find(".elementor-button-icon").html('<img id="playBtn-icon" src="https://www.floridatv-entertainment.de/wp-content/uploads/2022/03/flo-toggle-play.svg" />');
        //change button
    }

        });
    });



//});
