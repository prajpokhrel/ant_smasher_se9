const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

let antsArray;
let totalAnts = 30;
let score = 0;

// Setting up collision area
const antSmashingArea = {
    canvas: document.querySelector('canvas'),
    start: function () {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.context = this.canvas.getContext('2d');

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener('resize', function() {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;

            init();
        }.bind(this));
    }
}


function init() {
    antSmashingArea.start();
    antsArray = [];

    const aliveAnt = new Image();
    aliveAnt.src = 'images/aliveAnt.gif';

    for (let i = 0; i < totalAnts; i++) {
        const radius = 50;
        let x = generateRandomIntFromRange(radius, antSmashingArea.canvas.width - radius);
        let y = generateRandomIntFromRange(radius, antSmashingArea.canvas.height - radius);
        let mass = 1;

        if (i !== 0) {
            for (let j = 0; j < antsArray.length; j++) {
                if (calculateDistance(x, y, antsArray[j].x, antsArray[j].y) - radius * 2 < 0) {
                    x = generateRandomIntFromRange(radius, antSmashingArea.canvas.width - radius);
                    y = generateRandomIntFromRange(radius, antSmashingArea.canvas.height - radius);

                    j = -1;
                }
            }
        }

        antsArray.push(new Ant(x, y, radius, aliveAnt, mass));
    }
}

function startCollision() {
    requestAnimationFrame(startCollision);
    const ctx = antSmashingArea.context;

    ctx.clearRect(0, 0, antSmashingArea.canvas.width, antSmashingArea.canvas.height);

    antsArray.forEach(function(ant) {
        ant.update(antsArray, score);
    });
}

init();
startCollision();

// Smash the ants and sets new score
antSmashingArea.canvas.addEventListener('click', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    for (let i = 0; i < antsArray.length; i++) {
        if (mouse.x >= antsArray[i].x
            && mouse.x <= antsArray[i].x + (antsArray[i].radius * 2)
            && mouse.y >= antsArray[i].y
            && mouse.y <= antsArray[i].y + (antsArray[i].radius * 2)) {
            antsArray.splice(i, 1);
            score++;
        }
    }
});



