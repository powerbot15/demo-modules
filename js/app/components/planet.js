define('components/planet', [], function () {

    var EARTH_YEARS_PER_SECOND = 0.3;

    var SYSTEM_FREQUENCY_DIVIDER = 100;

    var SYSTEM_SPEED = 1000 / EARTH_YEARS_PER_SECOND / SYSTEM_FREQUENCY_DIVIDER;

    var FULL_CIRCLE = 2 * Math.PI;

    function Planet (data, $el) {

        this.model = data;

        this.model.selfYearInEarthYear = 1 / this.model.year;

        this.model.timePartialValue = this.model.selfYearInEarthYear / SYSTEM_FREQUENCY_DIVIDER;

        this.model.yearPart = 0;

        this.$el = $el;

        this.tpl = {

            name : this.$el.find('[data-name]'),

            distance : this.$el.find('[data-distance-from-sun]'),

            yearsGone : this.$el.find('[data-times-around-sun]')

        };

        this.renderStatic();

        this.startEpoch();
    }

    Planet.prototype = {

        renderStatic : function () {

            this.tpl.name.text(this.model.name);

            this.tpl.distance.text(this.model.distance);

            this.tpl.yearsGone.text(0);
        },

        startEpoch : function () {
            this.model.yearsGone = 0;
            this.epoch = setInterval(this.countPlanetAge.bind(this), SYSTEM_SPEED);
        },

        countPlanetAge : function () {

            this.model.yearsGone += this.model.timePartialValue;

            this.renderYearsGone();
        },

        renderYearsGone : function () {
            this.tpl.yearsGone.text(this.model.yearsGone.toFixed(2));
        },

        draw : function (context, systemCenter) {

            var angle = this.model.yearsGone % 1 * FULL_CIRCLE;

            var x = this.model.distance * Math.cos(angle);

            var y = this.model.distance * Math.sin(angle);

            context.fillStyle = this.model.color;
            context.strokeStyle = this.model.color;

            context.beginPath();
            context.arc(x + systemCenter.x, y + systemCenter.y, 10, 0, FULL_CIRCLE);
            context.fill();
            //context.stroke();
            context.closePath();

        }

    };

    return Planet;

});