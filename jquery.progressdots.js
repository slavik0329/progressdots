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
                var dot = $('<div class="swoopDot"></div>');
                dots.push(dot);
                dotBox.append(dot);
            }

            dotsSelelector = dotBox.find( ".swoopDot" ).css({
                'background-color': settings.dotColor, 
                width:settings.dotSize, 
                height:settings.dotSize,
                'border-radius': settings.radius
            });
        }

        function swoop(left) {
            if (!running) return false;
            
            clearInterval(timer);

            var addClass = left?"swoopReverse":"swoopActive";

            dotsSelelector.removeClass( "swoopReverse swoopActive");

            if ( left && settings.randomColors ) {
                dotsSelelector.css( { "background-color": randomColor() } );
            }

            for (i = settings.numDots - 1; i >= 0; i--) {

                var dot = dots[i];
                var percent = (i + 1) * (100 / (settings.numDots + 1));

                dot.css({
                    left: (left ? "-" : "") + percent + "%"
                });

                timerPause = (settings.numDots + 2 - i) * settings.swoopPause;

                timer = setTimeout(function (dot, sel) {
                    sel.addClass(addClass);
                    if (left) {
                        dotIndex = dots.indexOf(dot);
                        percent = ( dotIndex + 1 ) * ( 100 / (settings.numDots + 1 ) );
                    }
                    dot.css({
                        left: (left ? percent : "100") + "%"
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