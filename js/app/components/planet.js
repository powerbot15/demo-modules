define('components/planet', [], function () {

    var EARTH_YEARS_PER_SECOND = 3;

    var SYSTEM_FREQUENCY = 1000 / EARTH_YEARS_PER_SECOND;

    function Planet (data, $el) {

        this.model = data;

        this.model.selfYearInEarthYear = 1 / this.model.year;

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
            this.epoch = setInterval(this.countPlanetAge.bind(this), SYSTEM_FREQUENCY);
        },

        countPlanetAge : function () {
            this.model.yearsGone += this.model.selfYearInEarthYear;
            this.renderYearsGone();
        },

        renderYearsGone : function () {
            this.tpl.yearsGone.text(this.model.yearsGone.toFixed(2));
        }

    };

    return Planet;

});