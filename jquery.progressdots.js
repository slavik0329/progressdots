(function ($) {

    $.fn.dottify = function (options) {
        var dots = [];
        var dotBox = this;
        var transitionTime = 500;
        var running = true;
        var timer;
        var settings = $.extend({
            numDots: 5, //Number of dots
            swoopPause: 200 //Pause time between dots
        }, options);

        var dotsSelelector;

        function createDots() {
            for (i = 0; i < settings.numDots; i++) {
                var dot = $('<div class="swoopDot"></div>');
                dots.push(dot);
                dotBox.append(dot);
            }

            dotsSelelector = dotBox.find( ".swoopDot" );
        }

        function swoop(left) {
            if (!running) return false;
            
            clearInterval(timer);

            if (!left) {
                var removeClass = "swoopReverse";
                var addClass = "swoopActive";
            } else {
                var removeClass = "swoopActive";
                var addClass = "swoopReverse";
            }

            dotsSelelector.removeClass(removeClass);

            for (i = settings.numDots - 1; i >= 0; i--) {
                var dot = dots[i];
                var percent = (i + 1) * (100 / (settings.numDots + 1));

                dot.css({
                    left: (left ? "-" : "") + percent + "%"
                });

                timer = setTimeout(function (dot, sel) {
                    sel.addClass(addClass);
                    if (left) {
                        i = dots.indexOf(dot);
                        percent = (i + 1) * (100 / (settings.numDots + 1));
                    }
                    dot.css({
                        left: left ? percent + "%" : "100%"
                    });
                }, (settings.numDots + 2 - i) * settings.swoopPause, dots[i], dotsSelelector);
            }

            $(dotsSelelector).first().bind( "transitionend", function () {
                $(this).unbind();
                swoop(!left);
            });

        }

        createDots();
        swoop();

        return {
            stop: function () {
                running = false;
                clearInterval(timer);
            },
            start: function () {
                running = true;
                dotsSelelector.removeClass("swoopReverse swoopActive");
                swoop();
            }
        }
    }

}(jQuery));