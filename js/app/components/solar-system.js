define('components/solar-system', [
    'jquery',
    'components/planet',
    'components/sun'
], function (

    $,
    Planet,
    Sun

) {

    var FULL_CIRCLE = 2 * Math.PI;

    function SolarSystem () {

        this.model = {
            planets : [
                {
                    name : 'Mercury',
                    distance : 58,
                    year : 58 / 365.3,
                    color : 'gray'
                },
                {
                    name : 'Venus',
                    distance : 108.2,
                    year : 224.7 / 365.3,
                    color : 'green'
                },
                {
                    name : 'Earth',
                    distance : 149.6,
                    year : 365.3 / 365.3,
                    color : 'blue'
                },
                {
                    name : 'Mars',
                    distance : 227.9,
                    year : 687 / 365.3,
                    color : '#FF5500'
                },
                {
                    name : 'Jupiter',
                    distance : 300,
                    year : 11.9,
                    color : 'brown'
                },
                {
                    name : 'Saturn',
                    distance : 350 ,
                    year : 29.46,
                    color : '#F5F5DC'
                },
                {
                    name : 'Uranus',
                    distance : 400,
                    year : 84,
                    color : '#ABACDE'
                },
                {
                    name : 'Neptune',
                    distance : 450,
                    year : 164.8,
                    color : '#8888FF'
                }
            ]
        };

        this.init();

    }

    SolarSystem.prototype = {

        init : function () {

            this.$el = $('[data-planets]');

            this.sun = new Sun();

            this.planetTpl = this.$el.find('li').get(0).outerHTML;

            this.$el.empty();

            this.createPlanets();

            this.initPainting();

            this.renderHTML();

            this.startVisualDemo();
        },

        createPlanets : function () {

            this.planetsInstances = [];

            this.model.planets.forEach(function (planetData) {

                var newPlanet = new Planet(planetData, $(this.planetTpl));

                this.planetsInstances.push(newPlanet);



            }.bind(this));

        },

        renderHTML : function () {

            this.planetsInstances.forEach(function (planet) {

                this.$el.append(planet.$el);

            }.bind(this));

        },

        initPainting : function () {

            this.canvas = $('[data-paint-area]').get(0);

            this.center = {

                x : this.canvas.width / 2,

                y : this.canvas.height / 2

            };

            this.drawCtx = this.canvas.getContext('2d');

            this.drawCtx.fillStyle = '#000000';

            this.drawCtx.strokeStyle = '#FFFFFF';

            this.drawCtx.lineWidth = 2;

            this.drawCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        },

        startVisualDemo : function () {

            this.visualLife = setInterval(this.renderCanvas.bind(this), 30);

        },

        renderCanvas : function () {
            this.drawCtx.fillStyle = '#000000';

            this.drawCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.drawCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.drawSun();

            this.drawPlanets();

        },

        drawSun : function () {

            this.drawCtx.fillStyle = '#FF0000';

            this.drawCtx.strokeStyle = '#FF0000';

            this.drawCtx.beginPath();

            this.drawCtx.arc(this.center.x, this.center.y, this.sun.radius, 0, FULL_CIRCLE);

            this.drawCtx.fill();

            this.drawCtx.stroke();

            this.drawCtx.closePath();
        },

        drawPlanets : function () {
            this.planetsInstances.forEach(function (planet) {
                planet.draw(this.drawCtx, this.center);
            }.bind(this));
        }


    };

    return SolarSystem;
});