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