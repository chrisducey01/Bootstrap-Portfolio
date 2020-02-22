const resume_offset = $("#resume").offset().top;
const about_offset = $("#about").offset().top;
const header_offset = $("#header").offset().top;
const window_height = $(window).height();
const portfolio_offset = $("#portfolio").offset().top;
const portfolio_height = $("#portfolio").height();
const portfolio_bottom = portfolio_offset + portfolio_height;

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // scroll functions
    $(window).scroll(function (e) {
        // add/remove class to navbar when scrolling to hide/show

        var scroll = $(window).scrollTop();

        if (scroll >= 150 && scroll <= (about_offset - 150)) {
            $('.navbar').addClass("navbar-hide");
        } else {
            $('.navbar').removeClass("navbar-hide");
        }

        // Make the navbar sticky at the top when it reaches the about me section
        if (scroll >= (about_offset - 150)) {
            $('.navbar').addClass("sticky");
        }
        else {
            $('.navbar').removeClass("sticky");
        }

        // Update the active link in the navbar based on the scroll position
        if (scroll < about_offset) {
            $(".nav-item").find("a").removeClass("active-link");
            $("#home-link").addClass("active-link");
        }
        else if (scroll >= about_offset && scroll <= resume_offset) {
            $(".nav-item").find("a").removeClass("active-link");
            $("#about-link").addClass("active-link");
        }
        else if (scroll >= resume_offset && scroll <= portfolio_offset) {
            $(".nav-item").find("a").removeClass("active-link");

            // If portfolio height is shorter than the window height, it'll never hit the top of the window
            // So set it to the active link when it is at the bottom of the window
            if ((portfolio_height < window_height) && (scroll >= (portfolio_bottom - window_height -  40))) {
                $("#portfolio-link").addClass("active-link");
            } else {
                $("#resume-link").addClass("active-link");
            }
        }
        else if (scroll >= portfolio_offset) {
            $(".nav-item").find("a").removeClass("active-link");
            $("#portfolio-link").addClass("active-link");
        }
    });
});

/*
  Lazy loading background image
  Code from:  https://imagekit.io/blog/lazy-loading-images-complete-guide/#
*/
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })