function generateRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function calculateDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 * @param velocity
 * @param angle
 */

function rotate(velocity, angle) {
    return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}