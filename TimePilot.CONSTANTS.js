define("TimePilot.CONSTANTS", function () {

    var CONSTS = {
        player: {
            src: "./sprites/player/player.png",
            width: 32,
            height: 32,
            hitRadius: 8,
            explosion: {
                src: "./sprites/player/explosion.png",
                width: 64,
                height: 32,
                frames: 4,
                frameLimiter: 8
            }
        },
        limits: {
            props: 20,
            spawningRadius: 450,
            despawnRadius: 500
        },
        levels: {
            1: {
                arena: {
                    introText: "A.D 1910",
                    backgroundColor: "#007",
                    spawningArc: 90,
                    spawningRadius: 450,
                    despawnRadius: 500
                },
                player: {
                    velocity: 5,
                    turnInterval: 5,
                    projectile: {
                        velocity: 7,
                        size: 4,
                        color: "#FFF"
                    }
                },
                enemies: {
                    basic: {
                        src: "./sprites/enemies/basic/level1.png",
                        velocity: 3,
                        turnLimiter: 25,
                        width: 32,
                        height: 32,
                        firingChance: 0.2,
                        hitRadius: 8,
                        canRotate: true,
                        projectile: {
                            velocity: 5,
                            size: 6,
                            color: "#FF9"
                        },
                        explosion: {
                            src: "./sprites/enemies/basic/explosion.png",
                            width: 32,
                            height: 32,
                            frames: 4,
                            frameLimiter: 5
                        }
                    }
                },
                props: [
                    {
                        src: "./sprites/props/cloud1.png",
                        width: 32,
                        height: 18,
                        relativeVelocity: 0.5,
                        layer: 1,
                        reversed: false
                    },
                    {
                        src: "./sprites/props/cloud2.png",
                        width: 60,
                        height: 28,
                        relativeVelocity: 0.25,
                        layer: 1,
                        reversed: false
                    },
                    {
                        src: "./sprites/props/cloud3.png",
                        width: 92,
                        height: 32,
                        relativeVelocity: 0,
                        layer: 2,
                        reversed: false
                    }
                ]
            }
        }
    };

    return CONSTS;
});
