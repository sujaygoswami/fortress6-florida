// rev start




jQuery(document).ready(function( $ ){

    //global variables
    const currPage = detectCurrPage();
    //console.log(currPage);









    //detect pages
    function detectCurrPage(){
        if(window.location.pathname == "/"){
            return "home";
        }else if(window.location.pathname.includes("/kontakt")){
            return "kontakt";
        }else if(window.location.pathname.includes("/jobs")){
            return "jobs";
        }else if(window.location.pathname.includes("/about")){
            return "about";
        }else if(window.location.pathname.includes("/news")){
            return "news";
        }else if(window.location.pathname.includes("/datenschutz")){
            return "datenschutz";
        }else if(window.location.pathname.includes("/impressum")){
            return "impressum";
        }else{
            return "news-beitrag";
        }
    }

});



// custom js 1

jQuery(document).ready(function($){
    $(window).on("elementor/frontend/init", function() {
        
        var PremiumMediaGrid = function($scope) {
            var $elem = $scope.find(".premium-gallery-container");
            
            setTimeout(function(){
             $elem.isotope('layout');    
                console.log("sdfsdf");
            }, 200);
            
        }
        
         elementorFrontend.hooks.addAction(
             "frontend/element_ready/premium-img-gallery.default",
             PremiumMediaGrid
         );
        
        
        
    });
    
     
 });
 
 // custom js 1


//  rs module
var tpj = jQuery;
		var revapi24;
		if (window.RS_MODULES === undefined) window.RS_MODULES = {};
		if (RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider241"] = {
			once: RS_MODULES.modules["revslider241"] !== undefined ? RS_MODULES.modules["revslider241"].once : undefined, init: function () {
				window.revapi24 = window.revapi24 === undefined || window.revapi24 === null || window.revapi24.length === 0 ? document.getElementById("rev_slider_24_1") : window.revapi24;
				if (window.revapi24 === null || window.revapi24 === undefined || window.revapi24.length == 0) { window.revapi24initTry = window.revapi24initTry === undefined ? 0 : window.revapi24initTry + 1; if (window.revapi24initTry < 20) requestAnimationFrame(function () { RS_MODULES.modules["revslider241"].init() }); return; }
				window.revapi24 = jQuery(window.revapi24);
				if (window.revapi24.revolution == undefined) { revslider_showDoubleJqueryError("rev_slider_24_1"); return; }
				revapi24.revolutionInit({
					revapi: "revapi24",
					DPR: "dpr",
					sliderLayout: "fullscreen",
					visibilityLevels: "1240,1240,778,480",
					gridwidth: "1240,1240,778,480",
					gridheight: "900,900,960,720",
					lazyType: "smart",
					perspective: 600,
					perspectiveType: "global",
					editorheight: "900,768,960,720",
					responsiveLevels: "1240,1240,778,480",
					fullScreenOffsetContainer: "#masthead",
					stopAtSlide: 1,
					stopAfterLoops: 0,
					stopLoop: true,
					progressBar: { disableProgressBar: true },
					navigation: {
						onHoverStop: false
					},
					parallax: {
						levels: [1, 2, 3, 4, 5, 10, 15, 25, 30, 35, 47, 48, 49, 90, 100, 3],
						type: "mouse",
						origo: "slidercenter",
						speed: 0,
						disable_onmobile: true
					},
					viewPort: {
						global: true,
						globalDist: "-200px",
						enable: true
					},
					enableDeeplinkHash: true,
					fallbacks: {
						allowHTML5AutoPlayOnAndroid: true
					},
				});

				if (typeof RSMousetrap !== "undefined") RSMousetrap(revapi24);

			}
		} // End of RevInitScript
		if (window.RS_MODULES.checkMinimal !== undefined) { window.RS_MODULES.checkMinimal(); };
// rs module