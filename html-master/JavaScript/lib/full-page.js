(function runFullPage() {
    (function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    })(function () {
        function videoAutoplay(element, keep) {
            element = element ? element : document;
            var elements = element.querySelectorAll('video,audio,iframe[src*="youtube.com/embed/"]');
            Array.prototype.forEach.call(elements, function (el, i) {
                if (!el.hasAttribute("data-autoplay")) el.setAttribute("data-autoplay", "true");
                if (keep && !el.hasAttribute("data-keepplaying")) el.setAttribute("data-keepplaying", "true");
            });
        }
        function overlayFix() {
            Array.prototype.forEach.call([".elementor-shape", ".elementor-background-overlay", ".elementor-background-video-container", ".elementor-background-slideshow"], function (item) {
                var overlays = document.querySelectorAll(".fp-tableCell>" + item + ", .fp-scroller>" + item);
                for (var i = overlays.length - 1; i >= 0; i--) {
                    var p = overlays[i];
                    do {
                        p = p.parentElement;
                        if (p.classList.contains("fp-section") || p.classList.contains("fp-slide")) {
                            p.insertBefore(overlays[i], p.firstChild);
                            break;
                        }
                    } while (p && p.nodeType === 1);
                }
            });
        }
        function elementorGetParsed(element) {
            var parsed = {};
            var settings = element.getAttribute("data-settings");
            if (/_?animation/.test(settings)) {
                try {
                    parsed = JSON.parse(settings);
                } catch (e) {}
            }
            return parsed;
        }
        function elementorGetAnimation(element, parsed) {
            if (!parsed) {
                parsed = elementorGetParsed(element);
            }
            return elementorFrontend.getCurrentDeviceSetting(parsed, "animation") || elementorFrontend.getCurrentDeviceSetting(parsed, "_animation");
        }
        function elementorAnimate(element) {
            if (element && !element.classList.contains("animated")) {
                var parsed = elementorGetParsed(element);
                var animation = elementorGetAnimation(element, parsed);
                if (!animation || "none" === animation) {
                    element.classList.remove("elementor-invisible");
                    return;
                }
                var animationDelay = parsed._animation_delay || parsed.animation_delay || 0;
                setTimeout(function () {
                    element.classList.remove("elementor-invisible");
                    element.classList.add("animated");
                    element.classList.add(animation);
                }, animationDelay);
            }
        }
        function elementorAnimateWrapper(f1, origin, destination, direction) {
            if (elementorFrontend.breakpoints) {
                f1(origin, destination, direction);
            } else {
                elementorFrontend.elements.$window.on("elementor/frontend/init", function () {
                    f1(origin, destination, direction);
                });
            }
        }
        function elementorAnimateInner(element) {
            var inner = element.querySelectorAll("[data-settings]");
            for (var i = 0; i < inner.length; ++i) {
                elementorAnimate(inner[i]);
            }
        }
        function elementorAnimateAfterLoad(destination) {
            if (destination && destination.item) {
                elementorAnimate(destination.item);
                if (destination.item.querySelectorAll(".fp-slides").length === 0) {
                    elementorAnimateInner(destination.item);
                } else {
                    elementorAnimate(destination.item.querySelector(".fp-slides .fp-slide.active"));
                    elementorAnimateInner(destination.item.querySelector(".fp-slides .fp-slide.active"));
                }
            }
        }
        function elementorAnimateAfterSlideLoad(destination) {
            elementorAnimate(destination.item);
            elementorAnimateInner(destination.item);
        }
        new fullpage(".mcw-fp-wrapper", {
            licenseKey: "A1FCEB87-976546A6-BAFA9FAC-AD110FA4",
            sectionSelector: ".mcw-fp-section",
            slideSelector: ".mcw-fp-section-slide .mcw-fp-slide",
            navigation: false,
            slidesNavigation: false,
            controlArrows: false,
            lockAnchors: false,
            animateAnchor: true,
            keyboardScrolling: true,
            recordHistory: false,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 750,
            scrollBar: false,
            scrollOverflow: false,
            bigSectionsDestination: "bottom",
            continuousVertical: false,
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            scrollingSpeed: 750,
            css3: true,
            easingcss3: "ease",
            verticalCentered: true,
            paddingTop: typeof mcwPaddingTop !== "undefined" && mcwPaddingTop ? mcwPaddingTop + "px" : "0px",
            paddingBottom: "0px",
            fixedElements: "#homeslider, .fixed-btn-backToTop, .fixed-btn-skipVideos",
            normalScrollElements: ".elementor-location-popup",
            afterRender: function () {
                videoAutoplay(undefined, false);
                overlayFix();
            },
            afterLoad: function (origin, destination, direction) {
                videoAutoplay(undefined, false);
                elementorAnimateWrapper(
                    function () {
                        elementorAnimateAfterLoad(destination);
                    },
                    origin,
                    destination,
                    direction
                );
                var window_size = window.matchMedia("(max-width: 768px)");
                if (destination.index === 0) {
                    jQuery("#homeslider").css("z-index", 0);
                    jQuery("#homeslider").css("position", "absolute");
                    hideLogoTxt();
                    jQuery("#florida-logo").fadeOut("slow", function () {});
                    jQuery(".fixed-btn-backToTop").slideUp("slow", function () {});
                } else {
                    document.getElementById("header-logo-txt").style.display = "block";
                    showLogoTxt();
                    jQuery("#florida-logo").fadeIn("slow", function () {});
                    jQuery(".fixed-btn-backToTop").slideDown("slow", function () {});
                }
                jQuery.each(jQuery(".mcw-fp-section").find("video"), function (index, video) {
                    video.currentTime = 0;
                });
                if (jQuery(".fp-section.active").hasClass("showcase-over-section")) {
                    if (window.matchMedia("(max-width: 767px)").matches) {
                        jQuery(".fixed-btn-backToTop").animate({ bottom: "75px" }, "slow");
                    } else if (window.matchMedia("(max-width: 1024px)").matches) {
                        jQuery(".fixed-btn-backToTop").animate({ bottom: "90px" }, "slow");
                    } else if (window.matchMedia("(min-width: 1025px)").matches) {
                        jQuery(".fixed-btn-backToTop").animate({ bottom: "110px" }, "slow");
                    }
                    jQuery(".fixed-btn-skipVideos").slideDown("slow", function () {});
                } else {
                    if (window.matchMedia("(max-width: 767px)").matches) {
                        jQuery(".fixed-btn-backToTop").animate({ bottom: "15px" }, "slow");
                    } else if (window.matchMedia("(max-width: 1024px)").matches) {
                        jQuery(".fixed-btn-backToTop").animate({ bottom: "15px" }, "slow");
                    } else if (window.matchMedia("(min-width: 1025px)").matches) {
                        jQuery(".fixed-btn-backToTop").animate({ bottom: "40px" }, "slow");
                    }
                    jQuery(".fixed-btn-skipVideos").slideUp("slow", function () {});
                }
                if (jQuery(".fp-section.active").hasClass("backtotop")) {
                    jQuery(".fixed-btn-backToTop").slideUp("slow", function () {});
                }
            },
            onLeave: function (origin, destination, direction) {
                if (destination.index !== 0) {
                    jQuery("#homeslider").css("z-index", -1);
                    jQuery("#homeslider").css("-webkit-overflow-scrolling", "touch");
                    jQuery("#homeslider").css("transform", "translate3d(0,0,0)");
                    jQuery("#homeslider").css("position", "fixed");
                }
                let skip = false;
                let nextSibling = destination.item;
                let nextSlideNr = destination.index + 1;
                while (jQuery(nextSibling).is(":hidden")) {
                    nextSlideNr += direction === "down" ? 1 : -1;
                    nextSibling = direction === "down" ? nextSibling.nextElementSibling : nextSibling.previousElementSibling;
                    skip = true;
                }
                if (skip) {
                    fullpage_api.moveTo(nextSlideNr);
                    return false;
                }
            },
            afterSlideLoad: function (section, origin, destination, direction) {
                elementorAnimateWrapper(
                    function () {
                        elementorAnimateAfterSlideLoad(destination);
                    },
                    origin,
                    destination,
                    direction
                );
            },
        });
        window.fullpage_api.wordpress = { name: "elementor", version: "1.9.0" };
    });
})();
