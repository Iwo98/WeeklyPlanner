'use strict';

$(function (){

    const slider = function () {

        $('.slider').each(function (){

            let $slider = $(this);
            let $slideList = $('.slider__list', $slider);
            let $slide = $(".slider__item", $slider);
            let $btnPrev = $(".arrow--left", $slider);
            let $btnNext = $(".arrow--right", $slider);
            let index=0;
            let firstId;
            let slideLastIndex;
            let slideLength;
          
            $slide.each(function () {
                $(this).attr('data-id', index);
                index++;
            });

            $slide.first().attr("data-status", "active");
           // $slide.first().fadeIn(500);

            firstId = $slide.first().data("id");
            slideLastIndex = $slide.last().data("id");
            slideLength = slideLastIndex;

            $btnNext.on("click", function (e) {
                var slideGoTo = $("[data-status='active']", $slider).data("id");
                e.preventDefault();
                
                slideGoTo++;
                changeSlide($slider, slideGoTo);
            });

            $btnPrev.on("click", function (e) {
                var slideGoTo = $("[data-status='active']", $slider).data("id");
                e.preventDefault();
              
                slideGoTo--;
                changeSlide($slider, slideGoTo);
            });

            function changeSlide(slider, indexGoTo) {
                var $slider = slider;
                var $activeSlide;
                var $prevSlide;
                var prevIndex = $("[data-status='active']", $slider).data("id");

                if (indexGoTo > slideLength) {
                    indexGoTo = firstId;
                }

                if (indexGoTo < firstId) {
                    indexGoTo = slideLength;
                    prevIndex = firstId;
                }

                $activeSlide = $('.slider__item[data-id=' + indexGoTo + ']', $slider);
                $prevSlide = $('.slider__item[data-id=' + prevIndex + ']', $slider);

                $prevSlide.attr("data-status", "");
                $activeSlide.attr("data-status", "active");
            
                $prevSlide.toggleClass("hidden");
                $activeSlide.toggleClass("hidden");     
            }     
        });  
    }

    const popup = function(){

        let $clone;

        $('.box-js').each(function (){
            const $box = $(this);
            const $openButton = $(".button--open", $box);
            const $textBox = $(".textbox-js", $box);
            let $text;
            
            let $closeButton = $(".button--close");
            let $addButton = $(".button--add")
            let $popup = $(".modal");
            let $inputText = $(".input-js");
            let $body = $(document.body);
            let $window = $(window);
            $text = $(".text-js");
            
            let iScrollHeight;

            $openButton.on("click", function(e){     
                iScrollHeight = $window.scrollTop();
                let attribute = $textBox.data("attr");
                $clone = $(".clone").clone();
                $clone.removeClass("clone");
                e.preventDefault();

                if(attribute==="slider"){
                    $clone.removeClass("day__text");
                    $clone.addClass("slider__text");
                }
                

                $popup.css("top",iScrollHeight + "px");
                $popup.removeClass("hidden");  
                $body.css("overflow-y","hidden");

                $addButton.on("click", function(e){
                    let inputText;
                    e.preventDefault();

                    
                   
                    

                    inputText = $inputText.val();
                    $clone.text(inputText);
                    $clone.appendTo($textBox);
                    $text = $(".text-js");

                    deleteRegistration($text);
                    closePopup();
                });
                $inputText.val("");
            });

            $closeButton.on("click", function(e){
                e.preventDefault();
                closePopup();               
            });  

           const closePopup = function(){
                $popup.addClass("hidden");  
                $body.css("overflow-y","auto");
           }                
        });
    }

    const deleteRegistration = function(text){

        text.on("click",function(e){
            $(this).remove();
        });
    }

    deleteRegistration($(".text-js"));
    popup();
    slider();
});