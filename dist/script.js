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
    slider();
});