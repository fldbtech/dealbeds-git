import $ from 'jquery';
import { parseInt } from 'lodash';
export default function customJS(context) { 
    
        
    const { graphql_token, currency_selector, hide_newsletter_popup, hide_ask_an_expert, hide_most_popular_slider, hide_recently_viewed_popup, hide_instagram, ig_access_token, ig_access_token_1, ig_access_token_2, ig_access_token_3, enable_recently_bougth_popup, enable_recently_bougth_popup_mobile, rb_popup_text, rb_popup_info, rb_popup_hours, rb_popup_productid, rb_popup_city_country_1, rb_popup_city_country_2, rb_popup_city_country_3, rb_popup_city_country_4, rb_popup_city_country_5, rb_popup_city_country_6, rb_popup_city_country_7, rb_popup_city_country_8, rb_popup_city_country_9, rb_popup_city_country_10, rbp_product_switch} = context;
    const active_currency_id = currency_selector.active_currency_id;
    const active_currency_code = currency_selector.active_currency_code;
    const customUrl = new URL(window.location.href);

    
    //newsletter_popup Start
    if(hide_newsletter_popup){
        //On Load
        if(customUrl.pathname == "/subscribe.php"){
            const date = new Date();
            date.setDate(date.getDate() + 1);
            document.cookie = `nbNewsletterPopup=Close;expires=${date.toGMTString()}; path=/`;
        }
        if(document.cookie.indexOf('nbNewsletterPopup') === -1) {
            setTimeout(function(){
                $(".newsletter_popup").css('display', 'flex');
            },10000)
        }
        //on click
        $("body").on('click', '.newsletter_popup .np-close-button, .newsletter_popup .no-thanks > a', function(){
            $(".newsletter_popup").hide();
            const date = new Date();
            date.setDate(date.getDate() + 1);
            document.cookie = `nbNewsletterPopup=Close;expires=${date.toGMTString()}; path=/`;
        });
    }
    //newsletter_popup End


    //Ask An Expert popup start
    if(hide_ask_an_expert){
        //on click
        $("body").on('click', '.ask-an-expert-popup .ask-close-button', function(){
            $(".ask-an-expert-popup").hide();
        });
        $("body").on('click', '.ask-an-expert-footer', function(){
            $(".ask-an-expert-popup").css('display','flex');
        });

        $(".ask-an-expert-popup .ask-form").on('submit', event => {
            event.preventDefault();
            const page_id = $(".ask-form #page_id").val();
            const page_subject = $(".ask-form #page_content").val();
            const contact_fullname = $(".ask-form #contact_fullname").val();
            const contact_email = $(".ask-form #contact_email").val();
            const contact_phone = $(".ask-form #contact_phone").val();
            const contact_package = $(".ask-form input[name='type_package']:checked").val();
            const contact_comment_area = $(".ask-form #contact_comment_area").val();
            const contact_type_contact = $(".ask-form input[name='type_contact']:checked").val();
            const g_recaptcha_response = $(".ask-form #g-recaptcha-response").val();

            if(g_recaptcha_response == ""){
                alert("Please verify google recaptcha");
                return false;
            }

            if(page_id != "" && contact_fullname != "" && contact_email != "" && contact_phone != "" && contact_comment_area != "" && g_recaptcha_response != ""){
                const html = `\n\rSubject: ${page_subject}\n\rFull Name: ${contact_fullname}\n\rPhone: ${contact_phone}\n\rEmail: ${contact_email}\n\rDo you need: ${contact_package}\n\rWhat can i help you with today: ${contact_comment_area} \n\rHow would you like me to contact you ?: ${contact_type_contact}\n\r\n\r`;
                $("#contact_question").val(html);
                $(".ask-form-body .loadingOverlay").show();
                setTimeout(() => {
                    $.ajax({
                        type: "POST",
                        url: "/pages.php?action=sendContactForm",
                        data: $('.ask-an-expert-popup .ask-form').serialize(),
                        success: function (s) {
                            $(".ask-form-body").html(`<div class="alertBox alertBox--success">Thank you. We've received your feedback and will respond shortly.</div>`)
                        }
                    });
                }, 500);
            }
        });
    }
    //Ask An Expert popup end

    
    //most_popular Slider Dots click show product start
    if(hide_most_popular_slider){
        const home_most_popular_products_child_slider = () => {
            const mp_slider_1_data = $("#mp_slider_1_data").val();
            const mp_slider_2_data = $("#mp_slider_2_data").val();
            const mp_slider_3_data = $("#mp_slider_3_data").val();
            let finalproductIds = "";
            if(typeof(mp_slider_1_data) != "undefined"){
                finalproductIds += mp_slider_1_data;
            }
            if(typeof(mp_slider_2_data) != "undefined"){
                finalproductIds += ","+mp_slider_2_data;
            }
            if(typeof(mp_slider_3_data) != "undefined"){
                finalproductIds += ","+mp_slider_3_data;
            }

            if(graphql_token != "" && graphql_token != "undefined" && finalproductIds != "") { 
                fetch("/graphql?setCurrencyId="+active_currency_id, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+graphql_token },
                    body: JSON.stringify({query: `query productById { site { currency(currencyCode: ${active_currency_code}){ display{ symbol } } products(entityIds: [${finalproductIds}]) { edges{ node { entityId name sku path defaultImage{ url(width:300) } addToCartUrl productOptions{ edges{ node{ displayName } } } prices{ basePrice { value } salePrice { value } } } } } } }
                    `}),}).then(res => res.json())
                .then((res) => {
                    if(res.data != null){
                        const symbol = res.data.site.currency.display.symbol;
                        const productsGq = res.data.site.products.edges;

                        //slider 1
                        if(mp_slider_1_data != ""){
                            let child_html_1 = `<div class="mp-child-slider">`;
                            const mp_slider_1_data_spt = mp_slider_1_data.split(',');
                            mp_slider_1_data_spt.length > 0 && mp_slider_1_data_spt.map((ids)=>{
                                productsGq.length > 0 && productsGq.map((list) => {
                                    const obj = list.node;
                                    const entityId = obj.entityId;
                                    if(ids == entityId){
                                        const path = obj.path;
                                        const name = obj.name;
                                        const productOptions = obj.productOptions.edges;
                                        const defaultImage = obj.defaultImage?.url;
                                        const sku = obj.sku;
                                        const addToCartUrl = obj.addToCartUrl;
                                        const basePrice = obj.prices.basePrice.value;
                                        const salePrice = obj.prices.salePrice?.value;

                                        let priceHtml = "";
                                        if(typeof salePrice != "undefined" && salePrice != null){
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax"> <span data-product-price-with-tax="" class="price price--withTax">${symbol}${salePrice.toFixed(2)}</span></div>`;
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax rrp-price--withTax"> <span data-product-rrp-with-tax="" class="price price--rrp">${symbol}${basePrice.toFixed(2)}</span></div>`;
                                        }else{
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax"><span data-product-price-with-tax="" class="price price--withTax">${symbol}${basePrice.toFixed(2)}</span></div>`;
                                        }
            
                                        let addToCartUrl_html = "";
                                        if(productOptions.length > 0){
                                            addToCartUrl_html += `<a href="${path}">Choose Options</a>`;
                                        }else{
                                            addToCartUrl_html += `<a href="${addToCartUrl}">Add to Cart</a>`;
                                        }
                                        child_html_1 += `<div class="mp-card" data-id="${entityId}">
                                            <div class="mp-card-inner">
                                                <a href="${path}"><img class="mp-card-image" src="${defaultImage}" alt="${name}" width="auto" height="auto" /></a>
                                                <p class="mp-sku">${sku}</p>
                                                <h1 class="mp-title"><a href="${path}">${name}</a></h1>
                                                <div class="mp-price">${priceHtml}</div>
                                                <p class="mp-action">${addToCartUrl_html}</p>
                                            </div>
                                        </div>`;           
                                    }                  
                                })
                            });
                            child_html_1 += "</div>";
                            $(".product_section.mp-pro-data-1").html(child_html_1);
                        }
                        
                        //slider 2
                        if(mp_slider_2_data != ""){
                            let child_html_2 = `<div class="mp-child-slider">`;
                            const mp_slider_2_data_spt = mp_slider_2_data.split(',');
                            mp_slider_2_data_spt.length > 0 && mp_slider_2_data_spt.map((ids)=>{
                                productsGq.length > 0 && productsGq.map((list) => {
                                    const obj = list.node;
                                    const entityId = obj.entityId;
                                    if(ids == entityId){
                                        const path = obj.path;
                                        const name = obj.name;
                                        const productOptions = obj.productOptions.edges;
                                        const defaultImage = obj.defaultImage?.url;
                                        const sku = obj.sku;
                                        const addToCartUrl = obj.addToCartUrl;
                                        const basePrice = obj.prices.basePrice.value;
                                        const salePrice = obj.prices.salePrice?.value;

                                        let priceHtml = "";
                                        if(typeof salePrice != "undefined" && salePrice != null){
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax"><span data-product-price-with-tax="" class="price price--withTax">${symbol}${salePrice.toFixed(2)}</span></div>`;
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax rrp-price--withTax"><span data-product-rrp-with-tax="" class="price price--rrp">${symbol}${basePrice.toFixed(2)}</span></div>`;
                                        }else{
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax"><span data-product-price-with-tax="" class="price price--withTax">${symbol}${basePrice.toFixed(2)}</span></div>`;
                                        }


                                        let addToCartUrl_html = "";
                                        if(productOptions.length > 0){
                                            addToCartUrl_html += `<a href="${path}">Choose Options</a>`;
                                        }else{
                                            addToCartUrl_html += `<a href="${addToCartUrl}">Add to Cart</a>`;
                                        }
                                        child_html_2 += `<div class="mp-card" data-id="${entityId}">
                                            <div class="mp-card-inner">
                                                <a href="${path}"><img class="mp-card-image" src="${defaultImage}" alt="${name}" width="auto" height="auto" /></a>
                                                <p class="mp-sku">${sku}</p>
                                                <h4 class="mp-title"><a href="${path}">${name}</a></h4>
                                                <div class="mp-price">${priceHtml}</div>
                                                <p class="mp-action">${addToCartUrl_html}</p>
                                            </div>
                                        </div>`;           
                                    }                  
                                })
                            });
                            child_html_2 += "</div>";
                            $(".product_section.mp-pro-data-2").html(child_html_2);
                        }

                        //slider 3
                        if(mp_slider_3_data != ""){
                            let child_html_3 = `<div class="mp-child-slider">`;
                            const mp_slider_3_data_spt = mp_slider_3_data.split(',');
                            mp_slider_3_data_spt.length > 0 && mp_slider_3_data_spt.map((ids)=>{
                                productsGq.length > 0 && productsGq.map((list) => {
                                    const obj = list.node;
                                    const entityId = obj.entityId;
                                    if(ids == entityId){
                                        const path = obj.path;
                                        const name = obj.name;
                                        const productOptions = obj.productOptions.edges;
                                        const defaultImage = obj.defaultImage?.url;
                                        const sku = obj.sku;
                                        const addToCartUrl = obj.addToCartUrl;
                                        const basePrice = obj.prices.basePrice.value;
                                        const salePrice = obj.prices.salePrice?.value;

                                        let priceHtml = "";
                                        if(typeof salePrice != "undefined" && salePrice != null){
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax"> <span data-product-price-with-tax="" class="price price--withTax">${symbol}${salePrice.toFixed(2)}</span></div>`;
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax rrp-price--withTax"> <span data-product-rrp-with-tax="" class="price price--rrp">${symbol}${basePrice.toFixed(2)}</span></div>`;
                                        }else{
                                            priceHtml += `<div class="price-section d-inline-block price-section--withTax"><span data-product-price-with-tax="" class="price price--withTax">${symbol}${basePrice.toFixed(2)}</span></div>`;
                                        }


                                        let addToCartUrl_html = "";
                                        if(productOptions.length > 0){
                                            addToCartUrl_html += `<a href="${path}">Choose Options</a>`;
                                        }else{
                                            addToCartUrl_html += `<a href="${addToCartUrl}">Add to Cart</a>`;
                                        }
                                        child_html_3 += `<div class="mp-card" data-id="${entityId}">
                                            <div class="mp-card-inner">
                                                <a href="${path}"><img class="mp-card-image" src="${defaultImage}" alt="${name}" width="auto" height="auto" /></a>
                                                <p class="mp-sku">${sku}</p>
                                                <h4 class="mp-title"><a href="${path}">${name}</a></h4>
                                                <div class="mp-price">${priceHtml}</div>
                                                <p class="mp-action">${addToCartUrl_html}</p>
                                            </div>
                                        </div>`;           
                                    }                  
                                })
                            });
                            child_html_3 += "</div>";
                            $(".product_section.mp-pro-data-3").html(child_html_3);
                        }

                        $(".product_section .mp-child-slider").slick(({arrows: false,dots: true, slidesToShow: 1,slidesToScroll: 1}));   
                        
                    }
                });     
            }
        }
        home_most_popular_products_child_slider();


        //Dots Click
        $(".home_most_popular_products").on('click', '.image_section .dots', function(){
            $(this).parent().find('.dots').removeClass('active');
            $(this).addClass('active');
            const productId =  $(this).attr('data-id');
            const cardIndex = $(this).parent().parent().find('.product_section .mp-card:not(.slick-cloned)[data-id="'+productId+'"]').attr('data-slick-index');
            const finalNumber = parseInt(cardIndex) + 1;
            $(this).parent().parent().find('.product_section .mp-child-slider .slick-dots li:nth-child('+finalNumber+') button').click();
        })

        //Slider slick-dots Click
        $(".home_most_popular_products").on('click', '.mp-child-slider .slick-dots button', function(){
            const radioId =  $(this).attr('id');
            const productId = $('.product_section .mp-child-slider .mp-card[aria-describedby="'+radioId+'"]').attr('data-id');
            $('.mp_product_list .image_section .dots').removeClass('active')
            $('.mp_product_list .image_section .dots[data-id="'+productId+'"]').addClass('active')
        })
    }
    //most_popular Slider Dots click show product End


    //hide_recently_viewed_popup start
    if(hide_recently_viewed_popup){
        if(document.cookie.indexOf('bc_recently_viewed') != -1) {
            const productIds_spt = getCookie('bc_recently_viewed');
            const productIds = productIds_spt.split(",");  

            if(graphql_token != "" && graphql_token != "undefined") { 
                fetch("/graphql?setCurrencyId="+active_currency_id, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+graphql_token },
                    body: JSON.stringify({query: `query productById { site { currency(currencyCode: ${active_currency_code}){ display{ symbol } } products(entityIds: [${productIds}]) { edges{ node { entityId name sku path defaultImage{ url(width:100) } addToCartUrl productOptions{ edges{ node{ displayName } } } prices{ basePrice { value } salePrice { value } } } } } } }
                    `}),}).then(res => res.json())
                .then((res) => {
                    if(res.data != null){
                        
                        const productsGq = res.data.site.products.edges;
                        const symbol = res.data.site.currency.display.symbol;
                        let rv_html = ``;

                        productsGq.length > 0 && productsGq.map((list) => {
                            const obj = list.node;
                            const entityId = obj.entityId;
                            const path = obj.path;
                            const name = obj.name;
                            const basePrice = obj.prices.basePrice.value;
                            const salePrice = obj.prices.salePrice?.value;
                            const productOptions = obj.productOptions.edges;
                            const defaultImage = obj.defaultImage?.url;
                            const sku = obj.sku;
                            const addToCartUrl = obj.addToCartUrl;

                            let addToCartUrl_html = "";
                            if(productOptions.length > 0){
                                addToCartUrl_html += `<a href="${path}">Choose Options</a>`;
                            }else{
                                addToCartUrl_html += `<a href="${addToCartUrl}">Add to Cart</a>`;
                            }
                            let priceHtml = "";
                            if(typeof salePrice != "undefined" && salePrice != null){
                                priceHtml += `<div class="price-section d-inline-block price-section--withTax"><span data-product-price-with-tax="" class="price price--withTax">${symbol}${salePrice.toFixed(2)}</span></div>`;
                                priceHtml += `<div class="price-section d-inline-block price-section--withTax rrp-price--withTax"><span data-product-rrp-with-tax="" class="price price--rrp">${symbol}${basePrice.toFixed(2)}</span></div>`;
                            }else{
                                priceHtml += `<div class="price-section d-inline-block price-section--withTax"><span data-product-price-with-tax="" class="price price--withTax">${symbol}${basePrice.toFixed(2)}</span></div>`;
                            }

                            rv_html += `<div class="rv-card-slides"><div class="rv-card" data-id="${entityId}">
                            <div class="rv-card-inner">
                                <div class="rv-product-section">
                                    <h4 class="rv-title"><a href="${path}">${name}</a></h4>
                                    <div class="rv-price">${priceHtml}</div>
                                    <p class="rv-action">${addToCartUrl_html}</p>
                                </div>
                                <div class="rv-image-section">
                                    <a href="${path}"><img class="rv-card-image" src="${defaultImage}" alt="${name}" width="auto" height="auto" /></a>
                                </div>
                            </div>
                        </div></div>`;                        
                        })
                        $(".rv-in-porduct .rv-product-list").html(rv_html);

                        if(productIds.length >= 4){
                            $(".rv-in-porduct .rv-product-list").addClass('is-slider');
                            $(".rv-in-porduct .rv-product-list").slick({
                                infinite: false,
                                vertical: true,
                                verticalSwiping: true,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                prevArrow: `<svg class="prev-icon" width="30" height="20" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-up" role="img" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-up fa-w-14 fa-2x"><path fill="currentColor" d="M4.465 366.475l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L224 178.053l195.494 195.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.051c-4.686-4.686-12.284-4.686-16.971 0L4.465 349.505c-4.687 4.686-4.687 12.284 0 16.97z" class=""/></svg>`,
                                nextArrow: `<svg class="next-icon" width="30" height="20" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-down" role="img" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14 fa-2x"><path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" class=""/></svg>`
                            })
                        }

                        $(".sidebar-recently-view").addClass('is-active');
                        
                    }
                });     
            }
        }else{
            $(".sidebar-recently-view .rv-in-porduct .rv-no-product").show();
            $(".rv-in-porduct .rv-product-list").remove();
            $(".sidebar-recently-view").addClass('is-active');
        }

        //Icon Click to Hide Sliderbar
        $(".sidebar-recently-view").on('click', '.collapse-icon', function(){
            $(".sidebar-recently-view").removeClass('is-active');
            $(".sidebar-recently-collapse").addClass('is-active');
        });
        //Icon Click to Hide Sliderbar
        $(".sidebar-recently-collapse .iconEx").on('click', function(){
            $(".sidebar-recently-collapse").removeClass('is-active');
            $(".sidebar-recently-view").addClass('is-active');
        });

    }
    //hide_recently_viewed_popup end


    //Instagram Feed - Start

    if(hide_instagram && $(".home_instagram_feed_main").length > 0){
        if(ig_access_token != ""){
        const url = "https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,username,timestamp&access_token="+ig_access_token+ig_access_token_1+ig_access_token_2+ig_access_token_3+"&limit=20";
        $.ajax({
            url:url,
            type:'GET',
            dataType:'json',
            success: function(res){
                const feed = res.data;
                if(feed.length > 0){
                    var html = "";
                    html += `<div class="IGFeeds">`;
                    for (let i = 0; i < feed.length; i++){
                        const media_type = feed[i].media_type;
                        const media_url = feed[i].media_url;
                        const permalink = feed[i].permalink;
                        if(media_type != "VIDEO"){
                            html += `<ul>`;
                            html += `<li class="IGFeed">`;
                            html += `<a class="IGFeed_link" href="${permalink}">`;
                                html += `<img src="${media_url}" alt="Image">`
                                html += `<div class="IGFees_hover">`;
                                    html += `<div>`;
                                        html += `<span class="IG_icon"><svg><use xlink:href="#icon-instagram"></use></svg></span>`;
                                        html += `<button class="button" href="${permalink}" onclick="window.open(this.getAttribute('href')); return false;">Shop the Look</button>`;
                                    html += `</div>`;
                                html += `</div>`;
                            html += `</a>`;
                            html += `</li>`;
                            html += `</ul>`;
                        }
                    }
                    html += `</div>`;
                    html += `<div class="all-btn recent-post">                
                    <button class="js-product-prev-arrow-insta slick-prev slick-arrow" aria-label="slick-prev"><svg width="38px" height="26px"><use xlink:href="#arrow-left"></use></svg></button>
                    <button class="js-product-next-arrow-insta slick-next slick-arrow" aria-label="slick-next"><svg width="38px" height="26px"><use xlink:href="#arrow-right"></use></svg></button>            
                </div>`;
                    $('#instafeed').append(html);
                    const feed_box = $('#instafeed .IGFeed').length;
                    if(feed_box > 6){
                        $('#instafeed .IGFeeds').slick({
                            prevArrow: ".js-product-prev-arrow-insta",
                            nextArrow: ".js-product-next-arrow-insta",
                            dots: false,
                            arrows: true,
                            infinite: true,
                            speed: 500,
                            slidesToShow: 6,
                            slidesToScroll: 6,
                            responsive: 
                            [
                                {breakpoint: 1350,settings: {slidesToShow: 5,slidesToScroll: 5}},
                                {breakpoint: 1200,settings: {slidesToShow: 4,slidesToScroll: 4}},
                                {breakpoint: 992,settings: {slidesToShow: 3,slidesToScroll: 3}},
                                {breakpoint: 601,settings: {slidesToShow: 2,slidesToScroll: 2}},
                                {breakpoint: 451,settings: {slidesToShow: 1,slidesToScroll: 1}}
                            ] 
                        });
                    }
                }
            }
        });
        }
    }
    //Instagram Feed - End


    //Recently bougth Products - Start
    const recently_bougth_popup = (status) => {
        if(document.cookie.indexOf('bc_recently_bougth') === -1) {
            if(status && enable_recently_bougth_popup){
                const rb_text = rb_popup_text;
                const rb_info = rb_popup_info;
                const rb_switch_time = 1000 * Number(rbp_product_switch);
                const rb_productID = JSON.parse("[" + rb_popup_productid + "]");
                const rb_hours = JSON.parse("[" + rb_popup_hours + "]");
                const city_country_1 = rb_popup_city_country_1;
                const city_country_2 = rb_popup_city_country_2;
                const city_country_3 = rb_popup_city_country_3;
                const city_country_4 = rb_popup_city_country_4;
                const city_country_5 = rb_popup_city_country_5;
                const city_country_6 = rb_popup_city_country_6;
                const city_country_7 = rb_popup_city_country_7;
                const city_country_8 = rb_popup_city_country_8;
                const city_country_9 = rb_popup_city_country_9;
                const city_country_10 = rb_popup_city_country_10;
                const cc_city_country_arr = [city_country_1, city_country_2, city_country_3, city_country_4, city_country_5, city_country_6, city_country_7, city_country_8, city_country_9, city_country_10];
                fetch("/graphql", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+graphql_token },
                    body: JSON.stringify({
                        query: `
                        query RecentlyBougthProducts {
                            site {
                                products(entityIds: [${rb_productID}] ) {
                                    edges {
                                        node {
                                            entityId
                                            name
                                            path
                                            defaultImage {
                                                url(width:320)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `
                    }),
                })
                .then(res => res.json())
                .then((res) => {
                    const prod_length = res.data.site.products.edges;
                    if(prod_length.length > 0){
                        var html = "";
                        html += `<div class="RB_Items">`;
                        for(let p = 0; p < prod_length.length; p++){
                            const common_random = Math.floor(Math.random() * rb_hours.length);
                            const currentCity = cc_city_country_arr[common_random];
                            const currentHours = rb_hours[common_random];
                            const entityId = prod_length[p].node.entityId;
                            const p_name = prod_length[p].node.name;
                            const p_path = prod_length[p].node.path;
                            const defaultImage = prod_length[p].node.defaultImage;
                            const imageNull = "https://dummyimage.com/320x320/ccc/000000.jpg&text=Coming+Soon";
                            html += `<div id="RB_`+entityId+`" class="RB_Item" style="display:none; left:-500px;">`;
                            html += `<a href="javascript:void(0)" class="RB_close_btn"><svg class="icon"><use xlink:href="#icon-close"></svg></a>`;
                            html += `<div class="RB_inner">`;
                            html += `<a href="`+p_path+`">`;
                            if(defaultImage == null){
                                html += `<img src="`+imageNull+`" />`;
                            }else{
                                html += `<img src="`+defaultImage.url+`" />`;
                            }
                            html += `</a>`;
                            html += `<div class="RB_product_info">`;
                            html += `<p class="text_wrap"><span class="text">`+rb_text+`</span><span class="rb_product_name"><a href="`+p_path+`">`+p_name+`</a></span>`;
                            html += `</p>`;
                            html += `<div class="location_info">`+currentHours+" "+rb_info+" "+currentCity+`</div>`;
                            html += `</div>`;
                            html += `</div>`;
                            html += `</div>`;
                        }
                        html += `</div>`;
                        $('#recentlyBougthProducts').html(html);
                    }
                    setInterval(function(){
                        const animateLoop = Math.floor(Math.random() * rb_productID.length);
                        setTimeout(function(){
                            $('#recentlyBougthProducts .RB_Items .RB_Item').fadeOut('slow').css("left","-500px");
                        }, rb_switch_time - 1500);
                        $('#recentlyBougthProducts .RB_Items #RB_'+rb_productID[animateLoop]).show().css("left","0");
                    }, rb_switch_time);
                    $('body').on('click', '.RB_close_btn', function(){
                        $("#recentlyBougthProducts").remove();
                        const date = new Date();
                        date.setDate(date.getDate() + 1);
                        document.cookie = `bc_recently_bougth=Close;expires=${date.toGMTString()}; path=/`;
                    });
                });
            }            
        }
    }
    if(enable_recently_bougth_popup_mobile == false && window.innerWidth < 992){
        recently_bougth_popup(false)
    } else if(enable_recently_bougth_popup_mobile == true  && window.innerWidth < 992){
        recently_bougth_popup(true)
    } else{
        recently_bougth_popup(true)
    }
    //Recently bougth Products - Start

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    $(window).scroll(function(){
        if($(window).scrollTop() > 200){
            $(".sidebar-recently-view .rv-cart").attr('style','border-bottom:1px solid #ccc;');
            $(".sidebar-recently-view .rv-cart, .sidebar-recently-view .rv-top").css('height','40px');
            
        }else{
            $(".sidebar-recently-view .rv-cart, .sidebar-recently-view .rv-top").css('height','0');
            $(".sidebar-recently-view .rv-cart").attr('style','border-bottom:none;');
        }
    });
    
    
    $(".rv-top, .sidebar-recently-collapse .iconTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 2000);
        return false;
    });

}
