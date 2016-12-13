define('components/sun', [], function () {

    var RADIUS = 30;

    function Sun () {

        this.radius = RADIUS;

        this.startLife();

    }

    Sun.prototype = {

        startLife : function () {
            this.life = setInterval(this.pulse.bind(this), 400);
        },

        pulse : function () {
            this.radius = RADIUS * (1 + (Math.random() / 10));
        }

    };

    return Sun;

});