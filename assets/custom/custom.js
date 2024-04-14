
$(document).ready(function(){

    $(".clickFade ul").hide();
    $(".clickFade").click(function(){
        $(this).children("ul").stop(true,true).fadeToggle("fast"),
        $(this).toggleClass("dropdown-active");
    });

    // Start Winter Infotech 18-12-2020
    $('.winter-review').each(function() {
        if(typeof($(this).children('span').data('review')) !== "undefined") {
            $(this).parent().find('.winter-count').text($(this).children('span').attr('data-review'));
        }
    });
    // End Winter Infotech 18-12-2020
    /* loader */
   var o = $('#page-preloader');
    if (o.length > 0) {
        $(window).on('load', function() {
            $('#page-preloader').removeClass('visible');
        });
    }
    
    // go to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

    // sticky add to cart in product page
    $(window).scroll(function () {
        if ($(this).scrollTop() > 900) {
            $('.sticky-cart-product').fadeIn();
        } else {
            $('.sticky-cart-product').fadeOut();
        }
    });

    // search
    $(".first").click(function(){
        $(".sec").addClass("newadd");
    });
    
      $(".sec").click(function(){
        $(".first").addClass("newrem");
        $(this).removeClass("newadd");
    });

    $("#gridProduct").click(function(event) {
        $("#gridProduct").addClass("active");
        $("#listProduct").removeClass("active");
        $(".productList").addClass("productGrid");
        $(".productGrid").removeClass("productList");

    });
    $("#listProduct").click(function(event) {
        $("#listProduct").addClass("active");
        $("#gridProduct").removeClass("active");
        $(".productGrid").addClass("productList");
        $(".productList").removeClass("productGrid");
    });

    // Brand section js
    $(document).ready(function() {
    $("#brand").owlCarousel({
    itemsCustom : [
    [0, 2],
    [425, 3],
    [600, 4],
    [768, 5],
    [1200, 5],
    [1589, 5]
    ],
      autoPlay: 2500,
      loop: true,
      navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      navigation : false,
      pagination:false
    });
    });

     /* sticky header */
if ($(window).width() >= 800) {     
var header = document.querySelector('.header');
    onScroll = () => {
      var scrolledPage = Math.round(window.pageYOffset);
      if(scrolledPage > 400) {
        $('.header-top').addClass('fixed fadeInDown animated mycustom-container');
        document.getElementById("header_placeholder").style.display = "block";
      } else {
        $('.header-top').removeClass('fixed fadeInDown animated mycustom-container');
        document.getElementById("header_placeholder").style.display = "none";
      }
    }
document.addEventListener('scroll', onScroll);
}else{
    var header = document.querySelector('.header');
    onScroll = () => {
      var scrolledPage = Math.round(window.pageYOffset);
      if(scrolledPage > 120) {
        $('.header-top').addClass('fixed fadeInDown animated mycustom-container');
        document.getElementById("header_placeholder").style.display = "block";
      } else {
        $('.header-top').removeClass('fixed fadeInDown animated mycustom-container');
        document.getElementById("header_placeholder").style.display = "none";
      }
    }
    document.addEventListener('scroll', onScroll);
}

if ($(window).width() <= 800) {
    $('.page-sidebar').appendTo('.page-content');
    $('#facetedSearch').appendTo('.xs-filter');
    $('.mygift').appendTo('.user-down');
    $('.theme_fashion .myquick-search').appendTo('.fashion-search');

  }
if ($(window).width() <= 575) {
    $('.navUser-item--wishlist').appendTo('.user-down');
}
});

// Compare product js
$(document).ready(function(){
    $('#comparecontent').fadeOut('slow');
    $(".card-figcaption-body .compare").click(function(){
        $('#comparecontent').fadeIn('slow');
        // $("#comparecontent").removeClass("d-none");
        setTimeout(function() {
            $('#comparecontent').fadeOut('slow');
            // $("#comparecontent").addClass("d-none");
        }, 2000);
    });
});
$(document).ready(function(){
    $("body").on("click",".wb-compare",function(){
        var pro_id = $(this).data("compare-id"); 
        var oldUrl = $(".navUser-item .navUser-item--compare").attr('href');
        const compareId = $(this).attr("data-compare-id");
        console.log( $(this).parent() )
        if ($(this).parent().hasClass('is-active') ) {
            $("body .compare-"+compareId).removeClass("is-active");
            $('#product-remove-popup').fadeIn().delay(2500).fadeOut();
            console.log('remove')
        }
        else{
            $("body .compare-"+compareId).addClass("is-active");
            $('#product-add-popup').fadeIn().delay(2500).fadeOut();
            console.log('Add')
        }
        
        if ( $(this).hasClass('active') ) {
            $('#compare-remove-content').fadeIn('slow');
            $(this).removeClass('active');
            var newUrl = oldUrl.replace(pro_id + "/", "");
            $(".navUser-item .navUser-item--compare").attr('href',newUrl);
        }
        else {
            
            $('#compare-remove-content').fadeOut('slow');
            $(this).addClass('active');
            var url_a = $(".navUser-item .navUser-item--compare").attr('href');
            var url_b = url_a.replace(/\/$/, "") + "/" + pro_id + "/";

            $(".navUser-item .navUser-item--compare").attr('href',url_b);
            $(".navUser-item .navUser-item--compare").show();
        }
        setTimeout(function() {
            $('#compare-remove-content').fadeOut('slow');
        }, 2000);
    });

    $('.titleWrapper').click(function(){
        var toggle = $(this).next('div#descwrapper');
        $(toggle).slideToggle("slow");
    });
    $('.inactive').click(function(){
        $(this).toggleClass('inactive active');
    });

});

function openSearch() {
    $('body').addClass("active-search");
    document.getElementById("search").style.height = "auto";
    $('#search').addClass("sideb");
    $('.search_query').attr('autofocus', 'autofocus').focus();
}
function closeSearch() {
    $('body').removeClass("active-search");
    document.getElementById("search").style.height = "0";
    $('#search').addClass("siden");
    $('.search_query').removeAttr('autofocus', 'autofocus').focus();
}
$(document).ready(function () {
// video-js
    $('.modal').on('hide.bs.modal', function() {
      var memory = $(this).html();
      $(this).html(memory);
    });
// video-js
$("#closeButton").on("click", function (t) {
    $("#header_banner").slideToggle("slow");
});
});
/* responsive menu */
function openNav() {
  $('body').addClass("active");
  document.getElementById("mySidebar").style.transform = "translate(0%)";
}

function closeNav() {
  $('body').removeClass("active");
  document.getElementById("mySidebar").style.transform = "translate(100%)";
}
function closecart() {
  document.getElementById("cart-preview-dropdown").style.transform = "translate(100%)";
}
/* responsive menu */
$(document).ready(function () {
    $('.mycurry .navUser-action').on("click", function(e) {
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
    });
});

// announcement bar countdown
const WebiTimer = setInterval(countDown, 1000);
function countDown() {
  const countdownSections = document.querySelectorAll('.wb_product_countdown');
  countdownSections.forEach((countdownSection) => {
    var countDownDate = new Date(countdownSection.getAttribute('data-date')).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    if (distance < 0 || isNaN(countDownDate)) {
      countdownSection.querySelector('.main_cdays .wb_cdays').textContent = "00";
      countdownSection.querySelector('.main_chours .wb_chours').textContent = "00";
      countdownSection.querySelector('.main_cminutes .wb_cminutes').textContent = "00";
      countdownSection.querySelector('.main_cseconds .wb_cseconds').textContent = "00";
    }
    else {
      countdownSection.querySelector('.main_cdays .wb_cdays').textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
      countdownSection.querySelector('.main_chours .wb_chours').textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      countdownSection.querySelector('.main_cminutes .wb_cminutes').textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      countdownSection.querySelector('.main_cseconds .wb_cseconds').textContent = Math.floor((distance % (1000 * 60)) / 1000);
    }
  });
}

// js for marquee text loop
// $(document).ready(function () {
// let text = "";

// for (let i = 0; i < 5; i++) {
//   text += i;
// }

// document.getElementById("marqueetext").innerHTML = text;
// });
