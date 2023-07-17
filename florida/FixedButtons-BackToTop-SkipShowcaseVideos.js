/*jQuery(document).ready(function( $ ){
    $('.fixed-btn-backToTop').click(function() {
     fullpage_api.moveTo('homeslider', 0);
	});
});




*/

jQuery(document).ready(function( $ ){


    $('.fixed-btn-skipVideos').click(function() {


        var childElements = $('.elementor:eq(1)').children();
        var visibleChildElements = $('.elementor:eq(1)').children(':visible');
        var countChilds = childElements.length;

        /*
        var childElements = $('.elementor-section-wrap').children();
        var visibleChildElements = $('.elementor-section-wrap').children(':visible');
        var countChilds = childElements.length - 1; //- 1 weil der Header sonst mitgezählt wird
        */


//	console.log(childElements);
        // console.log("Section Anzahl alle: " + countChilds);


        var destinationClass = "";
        visibleChildElements.each(function(i) {

            if($(this).hasClass('showcase-over-section') && !$(visibleChildElements[i+1]).hasClass('showcase-over-section')){
                var destinationElement = $(visibleChildElements[i+1]);
                destinationClass = destinationElement.attr('class');
                //console.log(destinationElement + " -> Classname: " + destinationClass);
                return false;
            }



        });

        childElements.each(function(d) {

            if($(this).hasClass(destinationClass)){
                //console.log("Slideindex: " + d);
                fullpage_api.moveTo(d);
                return false;
            }
        });
    });

    $('.fixed-btn-backToTop').click(function() {
        fullpage_api.moveTo(1)
    });

    $( ".home-topp-btn" ).click(function() {
        fullpage_api.moveTo(1)
    });

});








//elementor-section-wrap