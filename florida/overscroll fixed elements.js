jQuery(document).ready(function( $ ){

   if(window.location.pathname == "/"){
       document.getElementById("homeslider").addEventListener('touchstart', handleTouchStart, false);
       document.getElementById("homeslider").addEventListener('touchmove', handleTouchMove, false);
   }else if(window.location.pathname.includes("/kontakt")){
       document.getElementsByClassName("fixedSection")[0].addEventListener('touchstart', handleTouchStart, false);
       document.getElementsByClassName("fixedSection")[0].addEventListener('touchmove', handleTouchMove, false);
   }else if(window.location.pathname.includes("/jobs")){
       document.getElementsByClassName("fixedSection")[0].addEventListener('touchstart', handleTouchStart, false);
       document.getElementsByClassName("fixedSection")[0].addEventListener('touchmove', handleTouchMove, false);
   }else if(window.location.pathname.includes("/about")){
       document.getElementsByClassName("fixedSection")[0].addEventListener('touchstart', handleTouchStart, false);
       document.getElementsByClassName("fixedSection")[0].addEventListener('touchmove', handleTouchMove, false);
   }

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* right swipe */
            } else {
                /* left swipe */
            }
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */
                var isTouch = ('ontouchstart' in document.documentElement);
                if(isTouch){

                    if(window.location.pathname == "/"){
                        $("#homeslider").css("z-index",-1);
                    }else if(window.location.pathname.includes("/kontakt")){
                        $(".fixedSection").css("z-index",-1);
                    }else if(window.location.pathname.includes("/jobs")){
                        $(".fixedSection").css("z-index",-1);
                    }else if(window.location.pathname.includes("/about")){
                        $(".fixedSection").css("z-index",-1);
                    }

                    fullpage_api.moveTo(2);
                }
                //console.log("swiping down");
            } else {
                /* up swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
});



