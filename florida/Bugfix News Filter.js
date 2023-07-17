jQuery(document).ready(function( $ ){
    
    $( ".menu-toggle" ).change(function() {

        var vilibility = $('.fsmfe-wrapper .menu-overlay').css('visibility');

        if(vilibility != "visible"){
            $(".uael-post__header").css("z-index",998);
        }else{
            $(".uael-post__header").css("z-index",1000);
        }

    });
});


