function Ant(x, y, radius, aliveAnt, mass) {
    this.x = x;
    this.y = y;
    this.aliveAnt = aliveAnt;
    this.mass = mass;

    // Assigning random velocities to ants
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    };
    this.radius = radius;


    this.draw = function(score) {
        const ctx = antSmashingArea.context;
        ctx.drawImage(this.aliveAnt, this.x, this.y, this.radius, this.radius);

        ctx.font = "30px Consolas";
        ctx.fillStyle = "#F45D22";
        ctx.fillText(`Ant Smashed: ${score}`, 10, 50);
    };

    this.checkBorderCollision = function () {
        if (this.x - this.radius <= 0
            || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0
            || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        }
    }

    this.update = function(particles, score) {
        this.draw(score);

        for (let i = 0; i < particles.length; i++) {
            let particle = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                let otherParticle = particles[j];
                if (calculateDistance(particle.x, particle.y, otherParticle.x, otherParticle.y) - this.radius * 2 < 0) {
                    detectCircularCollision(particle, otherParticle);
                }
            }
        }

        this.checkBorderCollision();

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}