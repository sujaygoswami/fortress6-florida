jQuery(document).ready(function( $ ) {
    var global_sound = false;


    $('.showcase-over-section').each(function(i, obj) {
        var overSection = $(this);

        //alle article elemente aus der oversection holen
        var articles = $(this).find("article");

        articles.each(function(index, art){

            //clone overSection
            var overSectionClone = overSection.clone();

            var postLinkBtn = overSectionClone.find("article").find(".post-link");

            //delete all article elements
            overSectionClone.find("article").remove();

            //get first article element from loop and insert in overSection-Clone
            $(this).clone().appendTo(overSectionClone.find(".ecs-posts:eq(0)"));
            overSectionClone.appendTo(".elementor:eq(1)").insertAfter(overSection);
            overSectionClone.css("height",$(window).innerHeight());
            overSectionClone.find(".showcase-section").css("height",$(window).innerHeight());
            overSectionClone.find(".showcase-control-elem").css("height",$(window).innerHeight());

            //change progress bar color to unit color
            if(overSectionClone.hasClass("home-tv")){
                overSectionClone.find(".video-progress-filled").css("background-color", "#FFD3D3");
            }else if(overSectionClone.hasClass("home-reklame")){
                overSectionClone.find(".video-progress-filled").css("background-color", "#F6DCC6");
            }else{
                overSectionClone.find(".video-progress-filled").css("background-color", "#A3D4ED");
            }


            overSectionClone.find("article").find("video").css("height","100%");
            // overSectionClone.find("article").find(".showcase-section").css("height","100%");





            var postId = overSectionClone.find("article").attr("id").split("-")[1];
            overSectionClone.find("article").find(".details-btn-showcase").attr("data-post",postId);

            var post_image_check_data = {
                'action'   : 'getPostField',
                'field'    : 'post_image_checkbox',
                'the_ID': postId
            };

            $.post(my_ajax_object.ajax_url, post_image_check_data, function(response) {
                //wenn image verwendet werden soll, statt eines videos
                if(response == 1){

                    //disable and style play and mute button
                    overSectionClone.find("article").find(".toggle_play").css("pointer-events","none");
                    overSectionClone.find("article").find(".toggle_sound").css("pointer-events","none");

                    overSectionClone.find("article").find(".toggle_play").find(".elementor-button-icon").html('<img id="playBtn-icon" src="/wp-content/uploads/2022/03/f-toggle-pause-disabled.svg" />');
                    overSectionClone.find("article").find(".toggle_sound").find(".elementor-button-icon").remove();
                    overSectionClone.find("article").find(".toggle_sound").find(".elementor-button-content-wrapper").html('<img id="muteBtn-icon" src="/wp-content/uploads/2022/03/f-toggle-sound-disabled.svg" />');

                    //delete video div
                    overSectionClone.find("article").find(".elementor-background-video-container").remove();

                    //fetch image file
                    var post_image_file_data = {
                        'action'   : 'getPostField',
                        'field'    : 'post_image_file',
                        'the_ID': postId
                    };

                    $.post(my_ajax_object.ajax_url, post_image_file_data, function(image) {
                        if(image != null){
                            overSectionClone.find("article").find(".elementor-background-overlay").prepend('<img id="ComingSoonImage" />')
                            overSectionClone.find("#ComingSoonImage").attr("src",image);

                            //image to full width
                            overSectionClone.find("#ComingSoonImage").css("object-fit","cover");
                            overSectionClone.find("#ComingSoonImage").css("width","100%");
                            overSectionClone.find("#ComingSoonImage").css("height","100%");
                        }else{
                            //fallback image ??
                        }

                    });

                }
                //wenn ein video verwendet werden soll statt eines bildes
                else{
                    var WindowWidth = $(window).width();
                    var video = overSectionClone.find(".elementor-background-video-hosted");
                    video.attr('type', 'video/mp4');


                    //fetch video files
                    var post_video_desktop_file = {
                        'action'   : 'getShowcaseVideoFiles',
                        'the_ID': postId
                    };

                    $.post(my_ajax_object.ajax_url, post_video_desktop_file, function(videoRes) {
                        if(videoRes != null){
                            var videoFile = JSON.parse(videoRes)["16_9"];
                            var videoFileMobile = JSON.parse(videoRes)["9_16"];

                            if(!videoFileMobile){
                                video.attr('src', videoFile);

                            }else{
                                if (WindowWidth < 768) {
                                    video.attr('src', videoFileMobile);
                                } else {
                                    video.attr('src', videoFile);
                                }
                            }
                            video.load();
                            //remove the autoplay attr
                            video.removeAttr("autoplay");
                            video.addClass("playing");

                        }
                    });
                }
            });



            //show video progress bar
            overSectionClone.find("video")[0].addEventListener('timeupdate',function (){
                var percentage = (overSectionClone.find("video")[0].currentTime)  / (overSectionClone.find("video")[0].duration) * 100;
                overSectionClone.find(".video-progress-filled").css("transition","width 0.5s ease");
                overSectionClone.find(".video-progress-filled").width(percentage + '%');
            });

            var toggletBtn = overSectionClone.find(".showcase-controls").find(".toggle_sound");
            toggletBtn.on("click", function(event) {
                //video.prop("muted", !video.prop("muted"));

                var isMuted = !overSectionClone.find("video").prop("muted")

                if (isMuted) {
                    global_sound = false;
                    //  toggletBtn.find(".elementor-button-icon").html('<img id="muteBtn-icon" src="https://www.staging.floridatv-entertainment.de/wp-content/uploads/2022/03/flo-toggle-mute.svg" />');


                } else {
                    global_sound = true;
                    //  toggletBtn.find(".elementor-button-icon").html('<img id="muteBtn-icon" src="https://www.staging.floridatv-entertainment.de/wp-content/uploads/2022/03/flo-toggle-sound.gif" />');

                }

            });







            //hide video controls after 4 seconds
            onVisible(overSectionClone.find(".showcase-controls").find(".showcase-title-elem")[0], function(){
                // console.log(global_sound);
                if(global_sound){
                    overSectionClone.find("video").prop("muted", false);
                    toggletBtn.find(".elementor-button-icon").html('<img id="muteBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-sound.gif" />');
                }else{
                    overSectionClone.find("video").prop("muted", true);
                    toggletBtn.find(".elementor-button-icon").html('<img id="muteBtn-icon" src="/wp-content/uploads/2022/03/flo-toggle-mute.svg" />');
                }

                //start timer
                setTimeout( function(){
                    overSectionClone.find(".showcase-controls").fadeOut();
                } , 3000);

                $("body,html").on("touchstart touchmove scroll mousedown DOMMouseScroll mousewheel keyup mousemove click", function(e){
                    //reset timer
                    overSectionClone.find(".showcase-controls").fadeIn();
                });
            });

        //articles.each(function(index, art){
        });

        overSection.remove();

    });




    function onVisible(element, callback) {
        new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0) {
                    callback(element);
                    //   console.log("visible");


                    //on fullpage api change slide
                    // observer.unobserve(element);
                    // observer.observe(element);
                }

            });

            if(entries[0]['intersectionRatio'] == 0) {
                // console.log("invisible");
                observer.unobserve(element);
                observer.observe(element);
            }

        }).observe(element);
    }

    function getPostField(postID,fieldID) {
        //  console.log("backend Script: post-link btn clicked");

        var data = {
            'action'   : 'getPostField',
            'field'    : fieldID,
            'the_ID': postID
        };

        $.post(my_ajax_object.ajax_url, data, function(response) {
            return response;
        });
    }



    /*AB HIER POPUP CODE *************************************/

    $(".post-link").click(function() {

       var post_id = $(this).data("post");
          var data = {
             'action'   : 'getDynPopupContent',
             'the_ID': post_id
         };

         $.post(my_ajax_object.ajax_url, data, function(response) {
             var showinfo = JSON.parse(response)["showinfo"];
             var showtitle = JSON.parse(response)["showtitle"];
             var postcontent = JSON.parse(response)["postcontent"];


             $( window ).on( 'elementor/popup/show', () => {
                 if ($("#popup-post-div").length > 0) {
                     $('#popup-post-div').empty();
                     $('#popup-post-div').prepend(postcontent);

                     $('.dynPost-showinfo p').html(showinfo);
                     $('.dynPost-title h2').html(showtitle);

                   //  $( '.premium-gallery-container' ).imagesLoaded( function() {
                      //   console.log("images are loaded");

                         //$("#popup-post-div").find('.elementor-element').each(function () {
                         //    elementorFrontend.elementsHandler.runReadyTrigger($(this));
                        // });
                     //});
                     /*
                     $("#popup-post-div").find('.elementor-element').each(function () {
                         elementorFrontend.elementsHandler.runReadyTrigger($(this));
                     });*/

                     $('.post-popup-anim-1').addClass("animated animatedFadeInUp fadeInUpOwn");
                     $('.post-popup-anim-2').addClass("animated-1-2 animatedFadeInUp fadeInUpOwn");
                     $('.post-popup-anim-3').addClass("animated-1-4 animatedFadeInUp fadeInUpOwn");
                     $('.post-popup-anim-4').addClass("animated-1-6 animatedFadeInUp fadeInUpOwn");
                 }
                 //enable scrolling after closing the popup
                 $('.flo-close-popup').click(function() {
                     fullpage_api.setAllowScrolling(true);
                     fullpage_api.setKeyboardScrolling(true);
                     
                 });





             });
             elementorProFrontend.modules.popup.showPopup( {id:2653}, event);
             //elementorProFrontend.modules.popup.showPopup( {id:13372}, event);
         });

/*
        var data = {
            'action'   : 't4a_ajax_call', // the name of your PHP function!
            'function' : 'show_files',    // a random value we'd like to pass
            'fileid'   : '7'   ,
            'the_ID': post_id
        };

        $.post(my_ajax_object.ajax_url, data, function(response) {
            // console.log(response);



            $( document ).on( 'elementor/popup/show', () => {
                if ($("#popup-post-div").length > 0){
                    $('#popup-post-div').empty();
                    $('#popup-post-div').prepend(response);



                    //dynamische Post felder füllen
                    var post_showinfo = {
                        'action'   : 'getPostField',
                        'field'    : 'showinfo',
                        'the_ID': post_id
                    };

                    $.post(my_ajax_object.ajax_url, post_showinfo, function(resp_showinfo) {
                        $('.dynPost-showinfo p').html(resp_showinfo);

                    });


                    var post_title = {
                        'action'   : 'getPostField',
                        'field'    : 'post_title',
                        'the_ID': post_id
                    };

                    $.post(my_ajax_object.ajax_url, post_title, function(resp_title) {
                        $('.dynPost-title h2').html(resp_title);
                    });

                    $("#popup-post-div").find('.elementor-element').each(function() { elementorFrontend.elementsHandler.runReadyTrigger( $( this ) ); });


                    $('.post-popup-anim-1').addClass("animated animatedFadeInUp fadeInUpOwn");
                    $('.post-popup-anim-2').addClass("animated-1-2 animatedFadeInUp fadeInUpOwn");
                    $('.post-popup-anim-3').addClass("animated-1-4 animatedFadeInUp fadeInUpOwn");
                    $('.post-popup-anim-4').addClass("animated-1-6 animatedFadeInUp fadeInUpOwn");
                }


                //enable scrolling after closing the popup
                $('.flo-close-popup').click(function() {
                    fullpage_api.setAllowScrolling(true);
                    fullpage_api.setKeyboardScrolling(true);
                });


            } );
            elementorProFrontend.modules.popup.showPopup( {id:2653}, event);

        });*/
    });
});





