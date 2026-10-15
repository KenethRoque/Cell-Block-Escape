// ==========================================================
// CELL BLOCK ESCAPE
// ==========================================================


// ==========================================================
// CANVAS
// ==========================================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// ==========================================================
// HUD
// ==========================================================

const levelDisplay =
    document.getElementById("levelDisplay");

const difficultyDisplay =
    document.getElementById("difficultyDisplay");

const keyDisplay =
    document.getElementById("keyDisplay");

const gateDisplay =
    document.getElementById("gateDisplay");

const livesDisplay =
    document.getElementById("livesDisplay");


// ==========================================================
// MAP SETTINGS
// ==========================================================

const TILE = 40;

const COLS = 20;
const ROWS = 15;

canvas.width =
    COLS * TILE;

canvas.height =
    ROWS * TILE;


// ==========================================================
// KEYBOARD
// ==========================================================

const keys = {};

window.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();

        keys[key] = true;


        if (
            key === "arrowup" ||
            key === "arrowdown" ||
            key === "arrowleft" ||
            key === "arrowright" ||
            event.code === "Space"
        ) {

            event.preventDefault();
        }


        // START

        if (
            gameState === "start" &&
            (
                key === "enter" ||
                event.code === "Space"
            )
        ) {

            gameState = "playing";

            return;
        }


        // RESTART LEVEL

        if (
            key === "r" &&
            gameState === "playing"
        ) {

            loadLevel(currentLevel);

            return;
        }


        // GAME OVER RESTART

        if (
            gameState === "gameover" &&
            key === "enter"
        ) {

            lives = 3;

            loadLevel(0);

            gameState = "playing";

            return;
        }


        // VICTORY RESTART

        if (
            gameState === "victory" &&
            key === "enter"
        ) {

            lives = 3;

            loadLevel(0);

            gameState = "playing";
        }
    }
);


window.addEventListener(
    "keyup",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = false;
    }
);


// ==========================================================
// LEVEL MAPS
//
// # = WALL
// . = FLOOR
// P = PLAYER
// 1 = GUARD
// 2 = GUARD
// K = KEY
// E = EXIT
// ==========================================================

const levels = [

[
"####################",
"#P.................#",
"#.######.########..#",
"#......#...........#",
"######.#.#########.#",
"#......#.......K...#",
"#.########.######..#",
"#........#.........#",
"#.######.#.######..#",
"#.#......#......#..#",
"#.#.##########.#...#",
"#.......1..........#",
"#.###########.###..#",
"#.........2.......E#",
"####################"
],

[
"####################",
"#P....#............#",
"#.##..#.##########.#",
"#.....#..........#.#",
"#####.##########.#.#",
"#...............#..#",
"#.############..##.#",
"#.#.......1........#",
"#.#.###########.##.#",
"#.#.............#..#",
"#.##########.####..#",
"#......2...#....K..#",
"#.########.#.#####.#",
"#.................E#",
"####################"
],

[
"####################",
"#P.....#...........#",
"#####..#.#########.#",
"#......#.........#.#",
"#.###########.##.#.#",
"#.........1...#....#",
"#.###########.#.##.#",
"#.#.........#.#....#",
"#.#.#######.#.####.#",
"#.#.......#.#......#",
"#.#######.#.######.#",
"#.....2...#.....K..#",
"#.###########.####.#",
"#.................E#",
"####################"
],

[
"####################",
"#P........#........#",
"#.######..#.######.#",
"#.#.......#......#.#",
"#.#.############.#.#",
"#.#..............#.#",
"#.########.#########",
"#......1...........#",
"######.##########..#",
"#......#...........#",
"#.######.#########.#",
"#....2........K....#",
"#.###############..#",
"#.................E#",
"####################"
],

[
"####################",
"#P.................#",
"#.####.###########.#",
"#......#............#",
"#####..#.#########.#",
"#......#....1.......#",
"#.####.###########.#",
"#..................#",
"#.########.#######.#",
"#........#.........#",
"#.######.#.#######.#",
"#....2...#......K..#",
"#.######..........##",
"#.................E#",
"####################"
],

[
"####################",
"#P.................#",
"#.################.#",
"#.................1#",
"#.###############..#",
"#.#................#",
"#.#.##############.#",
"#.#................#",
"#.###############..#",
"#.........2........#",
"#.################.#",
"#..............K...#",
"#.################.#",
"#.................E#",
"####################"
],

[
"####################",
"#P.....#...........#",
"#.####.#.#########.#",
"#.#....#...........#",
"#.#.##############.#",
"#.#........1.......#",
"#.###############..#",
"#..................#",
"#.###############..#",
"#.....2............#",
"#.###############..#",
"#............K.....#",
"#.###############..#",
"#.................E#",
"####################"
],

[
"####################",
"#P........#........#",
"#.######..#.######.#",
"#......#..#......#.#",
"######.#..######.#.#",
"#....1.#.........#.#",
"#.####.#########.#.#",
"#.#...............##",
"#.#.#############..#",
"#.#..........2.....#",
"#.###############..#",
"#.........K........#",
"#.###############..#",
"#.................E#",
"####################"
],

[
"####################",
"#P.................#",
"#.################.#",
"#..................#",
"#.###############..#",
"#....1.............#",
"#.###############..#",
"#..................#",
"#.###############..#",
"#............2.....#",
"#.###############..#",
"#..........K.......#",
"#.###############..#",
"#.................E#",
"####################"
],

[
"####################",
"#P....#............#",
"#.##..#.##########.#",
"#.....#............#",
"#####.############.#",
"#.........1........#",
"#.###############..#",
"#..................#",
"#.###############..#",
"#.......2..........#",
"#.###############..#",
"#.............K....#",
"#.###############..#",
"#.................E#",
"####################"
]

];


// ==========================================================
// GAME VARIABLES
// ==========================================================

let currentLevel = 0;

let currentMap;

let lives = 3;

let hasKey = false;

let gameState = "start";

let player;

let guards = [];

let keyItem;

let exitGate;


// ==========================================================
// DIFFICULTY
// ==========================================================

function getDifficulty() {

    const level =
        currentLevel + 1;


    if (level <= 3) {

        return {

            name: "EASY",

            guardSpeed: 1.05,

            patrolSpeed: 1.0,

            detectionRange: 170,

            pathDelay: 22
        };
    }


    if (level <= 6) {

        return {

            name: "MEDIUM",

            guardSpeed: 1.80,

            patrolSpeed: 1.5,

            detectionRange: 210,

            pathDelay: 16
        };
    }


    if (level <= 9) {

        return {

            name: "HARD",

            guardSpeed: 2.20,

            patrolSpeed: 1.70,

            detectionRange: 250,

            pathDelay: 12
        };
    }


    return {

        name: "MAXIMUM",

        guardSpeed: 3.0,

        patrolSpeed: 2.15,

        detectionRange: 290,

        pathDelay: 8
    };
}


// ==========================================================
// CREATE CHARACTER
// ==========================================================

function createCharacter(
    col,
    row,
    speed
) {

    return {

        x:
            col * TILE + 7,

        y:
            row * TILE + 5,

        width: 26,

        height: 30,

        speed: speed,

        direction: "down",

        moving: false,

        walkFrame: 0,

        animationTimer: 0
    };
}


// ==========================================================
// LOAD LEVEL
// ==========================================================

function loadLevel(index) {

    currentLevel = index;

    currentMap =
        levels[currentLevel];

    hasKey = false;

    guards = [];

    keyItem = null;

    exitGate = null;


    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            const tile =
                currentMap[row][col];


            // PLAYER

            if (tile === "P") {

                player =
                    createCharacter(
                        col,
                        row,
                        2.8
                    );
            }


            // GUARDS

            if (
                tile === "1" ||
                tile === "2"
            ) {

                const difficulty =
                    getDifficulty();


                const guard =
                    createCharacter(
                        col,
                        row,
                        difficulty.patrolSpeed
                    );


                guard.path = [];

                guard.pathTimer = 0;

                guard.state = "patrol";

                guard.chasing = false;

                guard.patrolTarget = null;

                guard.patrolWait =
                    Math.floor(
                        Math.random() * 50
                    );

                guard.lastSeenPlayer = null;


                guards.push(guard);
            }


            // KEY

            if (tile === "K") {

                keyItem = {

                    x:
                        col * TILE + 10,

                    y:
                        row * TILE + 10,

                    width: 20,

                    height: 20,

                    collected: false
                };
            }


            // EXIT

            if (tile === "E") {

                exitGate = {

                    x:
                        col * TILE,

                    y:
                        row * TILE,

                    width: TILE,

                    height: TILE
                };
            }
        }
    }


    updateHUD();
}


// ==========================================================
// HUD
// ==========================================================

function updateHUD() {

    const difficulty =
        getDifficulty();


    levelDisplay.textContent =
        currentLevel + 1;


    difficultyDisplay.textContent =
        difficulty.name;


    livesDisplay.textContent =
        lives;


    if (hasKey) {

        keyDisplay.textContent =
            "FOUND";

        keyDisplay.style.color =
            "#69f0ae";


        gateDisplay.textContent =
            "OPEN";

        gateDisplay.style.color =
            "#69f0ae";

    } else {

        keyDisplay.textContent =
            "NOT FOUND";

        keyDisplay.style.color =
            "#ff8a80";


        gateDisplay.textContent =
            "LOCKED";

        gateDisplay.style.color =
            "#ff8a80";
    }
}


// ==========================================================
// WALL CHECK
// ==========================================================

function isWallAtPixel(x, y) {

    const col =
        Math.floor(
            x / TILE
        );

    const row =
        Math.floor(
            y / TILE
        );


    if (
        row < 0 ||
        row >= ROWS ||
        col < 0 ||
        col >= COLS
    ) {

        return true;
    }


    return (
        currentMap[row][col]
        === "#"
    );
}


// ==========================================================
// WALL COLLISION
// ==========================================================

function collidesWithWall(
    x,
    y,
    width,
    height
) {

    return (

        isWallAtPixel(
            x,
            y
        )

        ||

        isWallAtPixel(
            x + width - 1,
            y
        )

        ||

        isWallAtPixel(
            x,
            y + height - 1
        )

        ||

        isWallAtPixel(
            x + width - 1,
            y + height - 1
        )
    );
}


// ==========================================================
// RECTANGLE COLLISION
// ==========================================================

function rectanglesTouch(a, b) {

    return (

        a.x <
        b.x + b.width

        &&

        a.x + a.width >
        b.x

        &&

        a.y <
        b.y + b.height

        &&

        a.y + a.height >
        b.y
    );
}


// ==========================================================
// WALK ANIMATION
// ==========================================================

function updateWalkAnimation(
    character
) {

    if (character.moving) {

        character.animationTimer++;


        if (
            character.animationTimer >= 7
        ) {

            character.walkFrame =
                character.walkFrame === 0
                    ? 1
                    : 0;


            character.animationTimer = 0;
        }

    } else {

        character.walkFrame = 0;

        character.animationTimer = 0;
    }
}


// ==========================================================
// PLAYER MOVEMENT
// ==========================================================

function updatePlayer() {

    let dx = 0;

    let dy = 0;


    player.moving = false;


    // UP

    if (
        keys["w"] ||
        keys["arrowup"]
    ) {

        dy -= player.speed;

        player.direction = "up";

        player.moving = true;
    }


    // DOWN

    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {

        dy += player.speed;

        player.direction = "down";

        player.moving = true;
    }


    // LEFT

    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        dx -= player.speed;

        player.direction = "left";

        player.moving = true;
    }


    // RIGHT

    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        dx += player.speed;

        player.direction = "right";

        player.moving = true;
    }


    // DIAGONAL SPEED FIX

    if (
        dx !== 0 &&
        dy !== 0
    ) {

        dx *= 0.7071;

        dy *= 0.7071;
    }


    // X COLLISION

    const newX =
        player.x + dx;


    if (
        !collidesWithWall(
            newX,
            player.y,
            player.width,
            player.height
        )
    ) {

        player.x = newX;
    }


    // Y COLLISION

    const newY =
        player.y + dy;


    if (
        !collidesWithWall(
            player.x,
            newY,
            player.width,
            player.height
        )
    ) {

        player.y = newY;
    }


    updateWalkAnimation(
        player
    );
}


// ==========================================================
// GET CHARACTER TILE
// ==========================================================

function getCharacterTile(
    character
) {

    return {

        col:
            Math.floor(
                (
                    character.x +
                    character.width / 2
                )
                /
                TILE
            ),

        row:
            Math.floor(
                (
                    character.y +
                    character.height / 2
                )
                /
                TILE
            )
    };
}


// ==========================================================
// PATHFINDING
// ==========================================================

function findPath(
    start,
    target
) {

    const queue = [

        {

            col:
                start.col,

            row:
                start.row,

            path: []
        }
    ];


    const visited =
        new Set();


    visited.add(
        start.col +
        "," +
        start.row
    );


    const directions = [

        {
            col: 1,
            row: 0
        },

        {
            col: -1,
            row: 0
        },

        {
            col: 0,
            row: 1
        },

        {
            col: 0,
            row: -1
        }
    ];


    while (
        queue.length > 0
    ) {

        const current =
            queue.shift();


        if (
            current.col ===
            target.col

            &&

            current.row ===
            target.row
        ) {

            return current.path;
        }


        for (
            const direction
            of directions
        ) {

            const col =
                current.col +
                direction.col;


            const row =
                current.row +
                direction.row;


            if (
                row < 0 ||
                row >= ROWS ||
                col < 0 ||
                col >= COLS
            ) {

                continue;
            }


            if (
                currentMap[row][col]
                === "#"
            ) {

                continue;
            }


            const id =
                col +
                "," +
                row;


            if (
                visited.has(id)
            ) {

                continue;
            }


            visited.add(id);


            queue.push({

                col: col,

                row: row,

                path: [

                    ...current.path,

                    {
                        col: col,
                        row: row
                    }
                ]
            });
        }
    }


    return [];
}


// ==========================================================
// CHOOSE PATROL TARGET
// ==========================================================

function choosePatrolTarget(
    guard
) {

    const guardTile =
        getCharacterTile(
            guard
        );


    const possibleTiles =
        [];


    const patrolRadius = 6;


    for (
        let row =
            Math.max(
                1,
                guardTile.row -
                patrolRadius
            );

        row <=
            Math.min(
                ROWS - 2,
                guardTile.row +
                patrolRadius
            );

        row++
    ) {

        for (
            let col =
                Math.max(
                    1,
                    guardTile.col -
                    patrolRadius
                );

            col <=
                Math.min(
                    COLS - 2,
                    guardTile.col +
                    patrolRadius
                );

            col++
        ) {

            if (
                currentMap[row][col]
                === "#"
            ) {

                continue;
            }


            const distance =
                Math.abs(
                    col -
                    guardTile.col
                )
                +
                Math.abs(
                    row -
                    guardTile.row
                );


            if (
                distance < 3
            ) {

                continue;
            }


            possibleTiles.push({

                col: col,

                row: row
            });
        }
    }


    if (
        possibleTiles.length === 0
    ) {

        return null;
    }


    const randomIndex =
        Math.floor(
            Math.random() *
            possibleTiles.length
        );


    return (
        possibleTiles[
            randomIndex
        ]
    );
}


// ==========================================================
// GUARD LINE OF SIGHT
// ==========================================================

function guardCanSeePlayer(
    guard
) {

    const difficulty =
        getDifficulty();


    const guardCenterX =
        guard.x +
        guard.width / 2;


    const guardCenterY =
        guard.y +
        guard.height / 2;


    const playerCenterX =
        player.x +
        player.width / 2;


    const playerCenterY =
        player.y +
        player.height / 2;


    const dx =
        playerCenterX -
        guardCenterX;


    const dy =
        playerCenterY -
        guardCenterY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    // TOO FAR

    if (
        distance >
        difficulty.detectionRange
    ) {

        return false;
    }


    // WALL BLOCKING VISION

    const steps =
        Math.ceil(
            distance / 8
        );


    for (
        let i = 1;
        i < steps;
        i++
    ) {

        const t =
            i / steps;


        const checkX =
            guardCenterX +
            dx * t;


        const checkY =
            guardCenterY +
            dy * t;


        if (
            isWallAtPixel(
                checkX,
                checkY
            )
        ) {

            return false;
        }
    }


    return true;
}


// ==========================================================
// MOVE GUARD ALONG PATH
// ==========================================================

function moveGuardAlongPath(
    guard
) {

    if (
        !guard.path ||
        guard.path.length === 0
    ) {

        guard.moving = false;

        return;
    }


    const next =
        guard.path[0];


    const targetX =
        next.col * TILE
        +
        TILE / 2
        -
        guard.width / 2;


    const targetY =
        next.row * TILE
        +
        TILE / 2
        -
        guard.height / 2;


    const dx =
        targetX -
        guard.x;


    const dy =
        targetY -
        guard.y;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (
        distance < 1
    ) {

        guard.x =
            targetX;

        guard.y =
            targetY;

        guard.path.shift();

        return;
    }


    if (
        Math.abs(dx) >
        Math.abs(dy)
    ) {

        guard.direction =
            dx > 0
                ? "right"
                : "left";

    } else {

        guard.direction =
            dy > 0
                ? "down"
                : "up";
    }


    guard.moving = true;


    const movement =
        Math.min(
            guard.speed,
            distance
        );


    guard.x +=
        dx /
        distance *
        movement;


    guard.y +=
        dy /
        distance *
        movement;


    if (
        distance <=
        guard.speed + 0.5
    ) {

        guard.x =
            targetX;

        guard.y =
            targetY;

        guard.path.shift();
    }
}


// ==========================================================
// GUARD AI
//
// PATROL -> CHASE -> SEARCH -> PATROL
// ==========================================================

function updateGuards() {

    const difficulty =
        getDifficulty();


    for (
        const guard
        of guards
    ) {

        guard.moving = false;


        const canSeePlayer =
            guardCanSeePlayer(
                guard
            );


        // ==============================================
        // PLAYER SEEN
        // ==============================================

        if (canSeePlayer) {

            guard.state =
                "chase";

            guard.chasing =
                true;

            guard.lastSeenPlayer =
                getCharacterTile(
                    player
                );
        }


        // ==============================================
        // CHASE
        // ==============================================

        if (
            guard.state ===
            "chase"
        ) {

            guard.speed =
                difficulty.guardSpeed;


            if (canSeePlayer) {

                guard.pathTimer--;


                if (
                    guard.pathTimer <= 0
                ) {

                    guard.path =
                        findPath(

                            getCharacterTile(
                                guard
                            ),

                            getCharacterTile(
                                player
                            )
                        );


                    guard.pathTimer =
                        difficulty.pathDelay;
                }

            } else {

                guard.state =
                    "search";

                guard.chasing =
                    false;


                if (
                    guard.lastSeenPlayer
                ) {

                    guard.path =
                        findPath(

                            getCharacterTile(
                                guard
                            ),

                            guard.lastSeenPlayer
                        );
                }
            }


            moveGuardAlongPath(
                guard
            );
        }


        // ==============================================
        // SEARCH
        // ==============================================

        else if (
            guard.state ===
            "search"
        ) {

            guard.speed =
                difficulty.guardSpeed;


            if (canSeePlayer) {

                guard.state =
                    "chase";

                guard.chasing =
                    true;

            } else {

                moveGuardAlongPath(
                    guard
                );


                if (
                    guard.path.length === 0
                ) {

                    guard.state =
                        "patrol";

                    guard.lastSeenPlayer =
                        null;

                    guard.patrolTarget =
                        null;

                    guard.patrolWait =
                        45;
                }
            }
        }


        // ==============================================
        // PATROL
        // ==============================================

        else if (
            guard.state ===
            "patrol"
        ) {

            guard.chasing =
                false;


            guard.speed =
                difficulty.patrolSpeed;


            if (
                guard.patrolWait > 0
            ) {

                guard.patrolWait--;

            } else {

                if (
                    !guard.patrolTarget
                ) {

                    guard.patrolTarget =
                        choosePatrolTarget(
                            guard
                        );


                    if (
                        guard.patrolTarget
                    ) {

                        guard.path =
                            findPath(

                                getCharacterTile(
                                    guard
                                ),

                                guard.patrolTarget
                            );


                        // If target can't be reached,
                        // choose another later.

                        if (
                            guard.path.length === 0
                        ) {

                            guard.patrolTarget =
                                null;

                            guard.patrolWait =
                                10;
                        }
                    }
                }


                moveGuardAlongPath(
                    guard
                );


                if (
                    guard.patrolTarget &&
                    guard.path.length === 0
                ) {

                    guard.patrolTarget =
                        null;


                    guard.patrolWait =
                        25 +
                        Math.floor(
                            Math.random()
                            * 50
                        );
                }
            }
        }


        // WALK ANIMATION

        updateWalkAnimation(
            guard
        );


        // PLAYER CAUGHT

        if (
            rectanglesTouch(
                player,
                guard
            )
        ) {

            playerCaught();

            return;
        }
    }
}


// ==========================================================
// PLAYER CAUGHT
// ==========================================================

function playerCaught() {

    lives--;


    if (
        lives <= 0
    ) {

        lives = 0;

        gameState =
            "gameover";

        updateHUD();

        return;
    }


    loadLevel(
        currentLevel
    );
}


// ==========================================================
// KEY
// ==========================================================

function updateKey() {

    if (
        !keyItem ||
        keyItem.collected
    ) {

        return;
    }


    if (
        rectanglesTouch(
            player,
            keyItem
        )
    ) {

        keyItem.collected =
            true;

        hasKey = true;

        updateHUD();
    }
}


// ==========================================================
// EXIT
// ==========================================================

function updateExit() {

    if (
        !hasKey ||
        !exitGate
    ) {

        return;
    }


    if (
        rectanglesTouch(
            player,
            exitGate
        )
    ) {

        nextLevel();
    }
}


// ==========================================================
// NEXT LEVEL
// ==========================================================

function nextLevel() {

    if (
        currentLevel >=
        levels.length - 1
    ) {

        gameState =
            "victory";

        return;
    }


    loadLevel(
        currentLevel + 1
    );
}


// ==========================================================
// DRAW FLOOR
// YELLOW BACKGROUND
// ==========================================================

function drawFloor(
    x,
    y,
    row,
    col
) {

    // Checker variation

    if (
        (row + col) % 2 === 0
    ) {

        ctx.fillStyle =
            "#d9ad3b";

    } else {

        ctx.fillStyle =
            "#d2a336";
    }


    ctx.fillRect(
        x,
        y,
        TILE,
        TILE
    );


    // Floor grid

    ctx.strokeStyle =
        "rgba(110,75,15,0.20)";

    ctx.lineWidth = 1;


    ctx.strokeRect(
        x,
        y,
        TILE,
        TILE
    );


    // Small cracks

    if (
        (
            row * 5 +
            col * 7 +
            currentLevel
        )
        % 9 === 0
    ) {

        ctx.strokeStyle =
            "rgba(100,65,10,.25)";


        ctx.beginPath();


        ctx.moveTo(
            x + 9,
            y + 12
        );


        ctx.lineTo(
            x + 17,
            y + 18
        );


        ctx.lineTo(
            x + 13,
            y + 25
        );


        ctx.stroke();
    }
}


// ==========================================================
// DRAW BROWN BLOCK
// ==========================================================

function drawWall(
    x,
    y,
    row,
    col
) {

    // Outer brown

    ctx.fillStyle =
        "#4b2b16";


    ctx.fillRect(
        x,
        y,
        TILE,
        TILE
    );


    // Main block

    ctx.fillStyle =
        "#754421";


    ctx.fillRect(
        x + 3,
        y + 3,
        TILE - 6,
        TILE - 6
    );


    // Highlight

    ctx.fillStyle =
        "#986039";


    ctx.fillRect(
        x + 6,
        y + 6,
        TILE - 12,
        5
    );


    // Dark bottom

    ctx.fillStyle =
        "#3b210f";


    ctx.fillRect(
        x + 5,
        y + TILE - 9,
        TILE - 10,
        5
    );


    // Brick lines

    ctx.strokeStyle =
        "#4a2813";


    ctx.lineWidth = 2;


    ctx.beginPath();


    ctx.moveTo(
        x,
        y + TILE / 2
    );


    ctx.lineTo(
        x + TILE,
        y + TILE / 2
    );


    ctx.stroke();


    // Different brick seam

    if (
        (row + col) % 2 === 0
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x + TILE / 2,
            y
        );

        ctx.lineTo(
            x + TILE / 2,
            y + TILE / 2
        );

        ctx.stroke();

    } else {

        ctx.beginPath();

        ctx.moveTo(
            x + TILE / 2,
            y + TILE / 2
        );

        ctx.lineTo(
            x + TILE / 2,
            y + TILE
        );

        ctx.stroke();
    }
}


// ==========================================================
// DRAW MAP
// ==========================================================

function drawMap() {

    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            const x =
                col * TILE;


            const y =
                row * TILE;


            if (
                currentMap[row][col]
                === "#"
            ) {

                drawWall(
                    x,
                    y,
                    row,
                    col
                );

            } else {

                drawFloor(
                    x,
                    y,
                    row,
                    col
                );
            }
        }
    }
}


// ==========================================================
// DRAW KEY
// ==========================================================

function drawKey() {

    if (
        !keyItem ||
        keyItem.collected
    ) {

        return;
    }


    const x =
        keyItem.x + 10;


    const y =
        keyItem.y + 10;


    // Glow

    ctx.fillStyle =
        "rgba(255,255,0,.25)";


    ctx.beginPath();


    ctx.arc(
        x,
        y,
        16,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // Key circle

    ctx.strokeStyle =
        "#fff200";


    ctx.lineWidth = 4;


    ctx.beginPath();


    ctx.arc(
        x - 4,
        y - 3,
        5,
        0,
        Math.PI * 2
    );


    ctx.stroke();


    // Key shaft

    ctx.beginPath();


    ctx.moveTo(
        x,
        y
    );


    ctx.lineTo(
        x + 12,
        y + 12
    );


    ctx.lineTo(
        x + 16,
        y + 8
    );


    ctx.stroke();


    ctx.lineWidth = 1;
}


// ==========================================================
// DRAW EXIT
// ==========================================================

function drawExit() {

    if (!exitGate) {

        return;
    }


    const x =
        exitGate.x;


    const y =
        exitGate.y;


    // Door

    ctx.fillStyle =
        hasKey
            ? "#2e7d32"
            : "#8b1d1d";


    ctx.fillRect(
        x + 4,
        y + 2,
        TILE - 8,
        TILE - 4
    );


    // Bars

    ctx.strokeStyle =
        "#281509";


    ctx.lineWidth = 3;


    for (
        let i = 9;
        i <= 32;
        i += 8
    ) {

        ctx.beginPath();


        ctx.moveTo(
            x + i,
            y + 4
        );


        ctx.lineTo(
            x + i,
            y + TILE - 4
        );


        ctx.stroke();
    }


    // Lock

    if (!hasKey) {

        ctx.fillStyle =
            "#ffd600";


        ctx.fillRect(
            x + 16,
            y + 17,
            9,
            9
        );
    }


    ctx.lineWidth = 1;
}


// ==========================================================
// DRAW CHARACTER
// ==========================================================

function drawCharacter(
    character,
    isGuard
) {

    const x =
        Math.round(
            character.x
        );


    const y =
        Math.round(
            character.y
        );


    let legMove = 0;


    if (
        character.moving
    ) {

        legMove =
            character.walkFrame === 0
                ? 2
                : -2;
    }


    const armMove =
        -legMove;


    ctx.save();


    // ======================================
    // SHADOW
    // ======================================

    ctx.fillStyle =
        "rgba(0,0,0,.30)";


    ctx.beginPath();


    ctx.ellipse(
        x + 13,
        y + 29,
        11,
        4,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();


    // ======================================
    // LEGS
    // ======================================

    ctx.fillStyle =
        isGuard
            ? "#143b60"
            : "#c45700";


    ctx.fillRect(
        x + 6,
        y + 20 + legMove,
        6,
        7
    );


    ctx.fillRect(
        x + 15,
        y + 20 - legMove,
        6,
        7
    );


    // ======================================
    // SHOES
    // ======================================

    ctx.fillStyle =
        "#17120f";


    ctx.fillRect(
        x + 5,
        y + 25 + legMove,
        7,
        4
    );


    ctx.fillRect(
        x + 15,
        y + 25 - legMove,
        7,
        4
    );


    // ======================================
    // ARMS
    // ======================================

    ctx.fillStyle =
        "#d69461";


    ctx.fillRect(
        x + 2,
        y + 12 + armMove,
        5,
        9
    );


    ctx.fillRect(
        x + 20,
        y + 12 - armMove,
        5,
        9
    );


    // ======================================
    // BODY
    // ======================================

    ctx.fillStyle =
        isGuard
            ? "#245f91"
            : "#f57c00";


    ctx.fillRect(
        x + 6,
        y + 10,
        15,
        14
    );


    // ======================================
    // CLOTHING DETAILS
    // ======================================

    if (isGuard) {

        // Belt

        ctx.fillStyle =
            "#181818";


        ctx.fillRect(
            x + 6,
            y + 19,
            15,
            3
        );


        // Buckle

        ctx.fillStyle =
            "#d0d0d0";


        ctx.fillRect(
            x + 12,
            y + 19,
            3,
            3
        );


        // Badge

        ctx.fillStyle =
            "#ffd740";


        ctx.fillRect(
            x + 16,
            y + 12,
            3,
            4
        );

    } else {

        // Prison uniform stripe

        ctx.fillStyle =
            "#60310d";


        ctx.fillRect(
            x + 6,
            y + 15,
            15,
            3
        );
    }


    // ======================================
    // HEAD
    // ======================================

    ctx.fillStyle =
        "#d69461";


    ctx.fillRect(
        x + 8,
        y + 2,
        12,
        10
    );


    // ======================================
    // HAIR / GUARD HAT
    // ======================================

    if (isGuard) {

        ctx.fillStyle =
            "#102d48";


        ctx.fillRect(
            x + 7,
            y,
            14,
            5
        );


        ctx.fillRect(
            x + 5,
            y + 4,
            18,
            3
        );


        // Hat badge

        ctx.fillStyle =
            "#ffd740";


        ctx.fillRect(
            x + 13,
            y + 1,
            3,
            3
        );

    } else {

        ctx.fillStyle =
            "#3b2618";


        ctx.fillRect(
            x + 8,
            y,
            12,
            4
        );
    }


    // ======================================
    // FACE DIRECTION
    // ======================================

    ctx.fillStyle =
        "#17120f";


    // DOWN

    if (
        character.direction ===
        "down"
    ) {

        ctx.fillRect(
            x + 10,
            y + 6,
            2,
            2
        );


        ctx.fillRect(
            x + 16,
            y + 6,
            2,
            2
        );
    }


    // LEFT

    else if (
        character.direction ===
        "left"
    ) {

        ctx.fillRect(
            x + 9,
            y + 6,
            2,
            2
        );
    }


    // RIGHT

    else if (
        character.direction ===
        "right"
    ) {

        ctx.fillRect(
            x + 17,
            y + 6,
            2,
            2
        );
    }


    // UP intentionally has no eyes


    ctx.restore();
}


// ==========================================================
// DRAW PLAYER
// ==========================================================

function drawPlayer() {

    drawCharacter(
        player,
        false
    );
}


// ==========================================================
// DRAW GUARD
// ==========================================================

function drawGuard(
    guard
) {

    drawCharacter(
        guard,
        true
    );
}


// ==========================================================
// GUARD ALERT
// ==========================================================

function drawGuardAlert(
    guard
) {

    if (
        guard.state ===
        "patrol"
    ) {

        return;
    }


    ctx.save();


    ctx.textAlign =
        "center";


    ctx.font =
        "bold 21px Arial";


    // CHASING

    if (
        guard.state ===
        "chase"
    ) {

        ctx.fillStyle =
            "#ff1744";


        ctx.fillText(
            "!",
            guard.x +
            guard.width / 2,

            guard.y - 7
        );
    }


    // SEARCHING

    if (
        guard.state ===
        "search"
    ) {

        ctx.fillStyle =
            "#fff176";


        ctx.fillText(
            "?",
            guard.x +
            guard.width / 2,

            guard.y - 7
        );
    }


    ctx.restore();
}


// ==========================================================
// DRAW LEVEL LABEL
// ==========================================================

function drawLevelLabel() {

    ctx.save();


    ctx.fillStyle =
        "rgba(70,35,10,.25)";


    ctx.font =
        "bold 16px monospace";


    ctx.fillText(
        "CELL BLOCK " +
        (currentLevel + 1),

        50,
        70
    );


    ctx.restore();
}


// ==========================================================
// OVERLAYS
// ==========================================================

function drawOverlay() {

    if (
        gameState ===
        "playing"
    ) {

        return;
    }


    ctx.fillStyle =
        "rgba(45,25,8,.82)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.textAlign =
        "center";


    // ======================================
    // START
    // ======================================

    if (
        gameState ===
        "start"
    ) {

        ctx.fillStyle =
            "#ffd54f";


        ctx.font =
            "bold 46px monospace";


        ctx.fillText(
            "CELL BLOCK ESCAPE",
            canvas.width / 2,
            200
        );


        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "20px monospace";


        ctx.fillText(
            "Find the key.",
            canvas.width / 2,
            275
        );


        ctx.fillText(
            "Avoid the two guards.",
            canvas.width / 2,
            310
        );


        ctx.fillText(
            "Reach the exit.",
            canvas.width / 2,
            345
        );


        ctx.fillStyle =
            "#fff176";


        ctx.font =
            "bold 22px monospace";


        ctx.fillText(
            "PRESS ENTER TO START",
            canvas.width / 2,
            420
        );
    }


    // ======================================
    // GAME OVER
    // ======================================

    else if (
        gameState ===
        "gameover"
    ) {

        ctx.fillStyle =
            "#ff5252";


        ctx.font =
            "bold 55px monospace";


        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            245
        );


        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "20px monospace";


        ctx.fillText(
            "The guards caught you.",
            canvas.width / 2,
            310
        );


        ctx.fillStyle =
            "#ffd54f";


        ctx.fillText(
            "PRESS ENTER TO TRY AGAIN",
            canvas.width / 2,
            375
        );
    }


    // ======================================
    // VICTORY
    // ======================================

    else if (
        gameState ===
        "victory"
    ) {

        ctx.fillStyle =
            "#69f0ae";


        ctx.font =
            "bold 52px monospace";


        ctx.fillText(
            "YOU ESCAPED!",
            canvas.width / 2,
            235
        );


        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "21px monospace";


        ctx.fillText(
            "All 10 cell blocks cleared!",
            canvas.width / 2,
            305
        );


        ctx.fillStyle =
            "#ffd54f";


        ctx.fillText(
            "PRESS ENTER TO PLAY AGAIN",
            canvas.width / 2,
            375
        );
    }


    ctx.textAlign =
        "left";
}


// ==========================================================
// UPDATE GAME
// ==========================================================

function update() {

    if (
        gameState !==
        "playing"
    ) {

        return;
    }


    updatePlayer();

    updateKey();

    updateExit();

    updateGuards();
}


// ==========================================================
// DRAW GAME
// ==========================================================

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawMap();

    drawLevelLabel();

    drawExit();

    drawKey();


    // Guards

    for (
        const guard
        of guards
    ) {

        drawGuardAlert(
            guard
        );


        drawGuard(
            guard
        );
    }


    // Prisoner

    drawPlayer();


    // Start/game over/victory

    drawOverlay();
}


// ==========================================================
// GAME LOOP
// ==========================================================

function gameLoop() {

    update();

    draw();


    requestAnimationFrame(
        gameLoop
    );
}


// ==========================================================
// START GAME
// ==========================================================

loadLevel(0);

gameLoop();