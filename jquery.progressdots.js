(function ($) {

    $.fn.dottify = function (options) {
        var dots = [];
        var dotBox = this;
        var transitionTime = 500;
        var running = true;
        var timer;

        var settings = $.extend({
            numDots: 5, //Number of dots
            swoopPause: 200, //Pause time between dots
            dotColor: "#0A78C7",
            dotSize: "12px",
            radius: "100%",
            randomColors: false //random colors on switch
        }, options);

        var dotsSelelector;

        function createDots() {
            dotBox.css({
                position: "relative",
                overflow: "hidden"
            }); 

            for (i = 0; i < settings.numDots; i++) {
                var percent = ( i + 1 ) * ( 100 / (settings.numDots + 1 ) );
                var dot = $('<div class="swoopDot" pos="' + percent + '"></div>');
                dots.push( dot.appendTo( dotBox ) );
            }

            dotsSelelector = dotBox.find( ".swoopDot" ).css({
                'background-color'  : settings.dotColor, 
                width               :settings.dotSize, 
                height              :settings.dotSize,
                'border-radius'     : settings.radius
            });
        }

        function swoop(left) {

            var addClass = left?"swoopReverse":"swoopActive";

            dotsSelelector.removeClass( "swoopReverse swoopActive");

            if ( left && settings.randomColors ) {
                dotsSelelector.css( { "background-color": randomColor() } );
            }

            for (i = settings.numDots - 1; i >= 0; i--) {

                var dot = dots[i];
                var percent = dot.attr("pos");

                dot.css({
                    left: (left ? "-100" : percent) + "%"
                });

                var timerPause = (settings.numDots + 2 - i) * settings.swoopPause;

                timer = setTimeout(function (dot, sel) {
                    sel.addClass(addClass);
                    if (left) {
                        percent = dot.attr("pos");
                    }
                    dot.css({
                        left: (left ? percent : "110") + "%"
                    });
                }, timerPause, dots[i], dotsSelelector );

            }

            $(dotsSelelector).first().bind( "transitionend", function () {
                
                $(this).unbind();
                swoop(!left);
            
            });

        }

        function randomColor() {
            return '#'+Math.floor(Math.random()*16777215).toString(16);
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