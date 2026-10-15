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


const TILE = 40;
const COLS = 20;
const ROWS = 15;

canvas.width =
    COLS * TILE;

canvas.height =
    ROWS * TILE;


// ==========================================================
// HUD
// ==========================================================

const levelDisplay =
    document.getElementById("levelDisplay");

const totalLevelsDisplay =
    document.getElementById("totalLevelsDisplay");

const areaDisplay =
    document.getElementById("areaDisplay");

const difficultyDisplay =
    document.getElementById("difficultyDisplay");

const livesDisplay =
    document.getElementById("livesDisplay");

const keyDisplay =
    document.getElementById("keyDisplay");

const gateDisplay =
    document.getElementById("gateDisplay");

const timerDisplay =
    document.getElementById("timerDisplay");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const highScoreDisplay =
    document.getElementById("highScoreDisplay");


// ==========================================================
// SETTINGS
// ==========================================================

const settingsButton =
    document.getElementById("settingsButton");

const settingsMenu =
    document.getElementById("settingsMenu");

const resumeButton =
    document.getElementById("resumeButton");

const musicVolume =
    document.getElementById("musicVolume");

const sfxVolume =
    document.getElementById("sfxVolume");

const musicToggle =
    document.getElementById("musicToggle");

const sfxToggle =
    document.getElementById("sfxToggle");


// ==========================================================
// HELP
// ==========================================================

const helpButton =
    document.getElementById("helpButton");

const helpMenu =
    document.getElementById("helpMenu");

const backToSettingsButton =
    document.getElementById(
        "backToSettingsButton"
    );


// ==========================================================
// LEVEL SELECT
// ==========================================================

const levelSelectButton =
    document.getElementById(
        "levelSelectButton"
    );

const levelSelectMenu =
    document.getElementById(
        "levelSelectMenu"
    );

const levelGrid =
    document.getElementById(
        "levelGrid"
    );

const previousLevelsButton =
    document.getElementById(
        "previousLevelsButton"
    );

const nextLevelsButton =
    document.getElementById(
        "nextLevelsButton"
    );

const levelPageDisplay =
    document.getElementById(
        "levelPageDisplay"
    );

const closeLevelSelectButton =
    document.getElementById(
        "closeLevelSelectButton"
    );


const LEVELS_PER_PAGE = 12;

let levelSelectPage = 0;


// ==========================================================
// AUDIO
// ==========================================================

const backgroundMusic =
    new Audio(
        "audio/prison-theme.mp3"
    );

const keySound =
    new Audio(
        "audio/key.mp3"
    );

const caughtSound =
    new Audio(
        "audio/caught.mp3"
    );

const escapeSound =
    new Audio(
        "audio/escape.mp3"
    );

const alertSound =
    new Audio(
        "audio/alert.mp3"
    );

const footstep1 =
    new Audio(
        "audio/footstep1.mp3"
    );

const footstep2 =
    new Audio(
        "audio/footstep2.mp3"
    );


backgroundMusic.loop = true;


let musicEnabled = true;

let sfxEnabled = true;


let footstepTimer = 0;

let footstepNumber = 0;

const FOOTSTEP_DELAY = 300;


// ==========================================================
// LEVELS
//
// # wall
// . floor
// P player
// 1 guard
// 2 guard
// K key
// E exit
// H hiding locker
// ==========================================================

const levels = [

    // LEVEL 1
    [
        "####################",
        "#P.................#",
        "#.######.########..#",
        "#......#...........#",
        "#.####.#.#########.#",
        "#......#...........#",
        "#.########.######..#",
        "#...K....#.........#",
        "#.######.#.######..#",
        "#.#......#......#..#",
        "#.#.###H######..#..#",
        "#.......1..........#",
        "#.###########.###..#",
        "#.........2.......E#",
        "####################"
    ],

    // LEVEL 2
    [
        "####################",
        "#P....#............#",
        "#.##..#.##########.#",
        "#.....#..........#.#",
        "#.###.#.########.#.#",
        "#.....#....K.....#.#",
        "#.##########.###.#.#",
        "#........H........1#",
        "#.###########.####.#",
        "#..................#",
        "#.######.#########.#",
        "#....2.#...........#",
        "#.####.#.########..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 3
    [
        "####################",
        "#P.................#",
        "#.######.#########.#",
        "#......#...........#",
        "#.####.#.#########.#",
        "#...K..#.....1.....#",
        "#.#######.########.#",
        "#......H...........#",
        "#.###########.####.#",
        "#.............#....#",
        "#.######.####.#.##.#",
        "#..2.....#....#....#",
        "#.######.#.##H####.#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 4
    [
        "####################",
        "#P........#........#",
        "#.######..#.######.#",
        "#......#..#........#",
        "######.#..########.#",
        "#......#.....1.....#",
        "#.####.###########.#",
        "#..K...............#",
        "#.##########.######.",
        "#.......H..........#",
        "#.##########.#####.#",
        "#....2.............#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 5
    [
        "####################",
        "#P.................#",
        "#.####.###########.#",
        "#......#...........#",
        "#.###..#.#########.#",
        "#..K...#....1......#",
        "#.####.###########.#",
        "#........H.........#",
        "#.########.#######.#",
        "#........#.........#",
        "#.######.#.#######.#",
        "#....2...#.........#",
        "#.######......H...##",
        "#.................E#",
        "####################"
    ],

    // LEVEL 6
    [
        "####################",
        "#P.................#",
        "#.################.#",
        "#.................1#",
        "#.###############..#",
        "#.#....H...........#",
        "#.#.##############.#",
        "#.#......K.........#",
        "#.###############..#",
        "#.........2........#",
        "#.################.#",
        "#..........H.......#",
        "#.################.#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 7
    [
        "####################",
        "#P.....#...........#",
        "#.####.#.#########.#",
        "#......#...........#",
        "#.###############..#",
        "#.....K..1.........#",
        "#.###############..#",
        "#.........H........#",
        "#.###############..#",
        "#.....2............#",
        "#.########.######..#",
        "#........H.........#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 8
    [
        "####################",
        "#P........#........#",
        "#.######..#.######.#",
        "#......#..#........#",
        "######.#..########.#",
        "#..K.1.#...........#",
        "#.####.###########.#",
        "#.......H..........#",
        "#.###############..#",
        "#..........2.......#",
        "#.######.#########.#",
        "#......H...........#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 9
    [
        "####################",
        "#P.................#",
        "#.################.#",
        "#.......K..........#",
        "#.###############..#",
        "#....1.............#",
        "#.###############..#",
        "#.......H..........#",
        "#.###############..#",
        "#............2.....#",
        "#.###############..#",
        "#........H.........#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // ======================================
    // MAXIMUM SECURITY
    // ======================================

    // LEVEL 10
    [
        "####################",
        "#P....#............#",
        "#.##..#.##########.#",
        "#.....#............#",
        "#.###.#.##########.#",
        "#..K..#....1.......#",
        "#.###.###########..#",
        "#.......H..........#",
        "#.###############..#",
        "#........2.........#",
        "#.###############..#",
        "#...........H......#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 11
    [
        "####################",
        "#P.................#",
        "#.######.#########.#",
        "#......#...........#",
        "#.####.#.#########.#",
        "#..K...#....1......#",
        "#.####.#.#########.#",
        "#......H...........#",
        "#.########.#######.#",
        "#........#.........#",
        "#.######.#.#######.#",
        "#....2.........H...#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 12
    [
        "####################",
        "#P....#............#",
        "#.##..#.##########.#",
        "#.....#............#",
        "#.#####.##########.#",
        "#..K........1......#",
        "#.#########.######.#",
        "#.......H..........#",
        "#.######.#########.#",
        "#......#...........#",
        "#.####.#.#########.#",
        "#..2.......H.......#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 13
    [
        "####################",
        "#P.................#",
        "#.################.#",
        "#...K..............#",
        "#.###############..#",
        "#......1...........#",
        "#.###############..#",
        "#......H...........#",
        "#.###############..#",
        "#..........2.......#",
        "#.###############..#",
        "#........H.........#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 14
    [
        "####################",
        "#P.....#...........#",
        "#.####.#.#########.#",
        "#......#...........#",
        "#.###########.####.#",
        "#..K......1........#",
        "#.###########.####.#",
        "#.......H..........#",
        "#.####.###########.#",
        "#....#.............#",
        "#.##.#.###########.#",
        "#....2.....H.......#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 15
    [
        "####################",
        "#P........#........#",
        "#.######..#.######.#",
        "#......#..#........#",
        "######.#..########.#",
        "#..K.1.#...........#",
        "#.####.###########.#",
        "#......H...........#",
        "#.###############..#",
        "#.......2..........#",
        "#.###############..#",
        "#...........H......#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 16
    [
        "####################",
        "#P.................#",
        "#.################.#",
        "#..K...............#",
        "#.#########.######.#",
        "#.......1..........#",
        "#.###############..#",
        "#.....H............#",
        "#.######.#########.#",
        "#......#....2......#",
        "#.####.#.#########.#",
        "#.........H........#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 17
    [
        "####################",
        "#P....#............#",
        "#.##..#.##########.#",
        "#.....#............#",
        "#.###.#.##########.#",
        "#..K..#.....1......#",
        "#.###.###########..#",
        "#......H...........#",
        "#.###############..#",
        "#.........2........#",
        "#.###############..#",
        "#..........H.......#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 18
    [
        "####################",
        "#P.................#",
        "#.######.#########.#",
        "#......#...........#",
        "#.####.###########.#",
        "#..K.#.......1.....#",
        "#.##.###########...#",
        "#.......H..........#",
        "#.###############..#",
        "#.....2............#",
        "#.###############..#",
        "#..........H.......#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 19
    [
        "####################",
        "#P........#........#",
        "#.######..#.######.#",
        "#......#..#........#",
        "######.#..########.#",
        "#..K.1.#...........#",
        "#.####.###########.#",
        "#......H...........#",
        "#.#########.######.#",
        "#.........#........#",
        "#.#######.#.######.#",
        "#....2......H......#",
        "#.###############..#",
        "#.................E#",
        "####################"
    ],

    // LEVEL 20
    [
        "####################",
        "#P....#............#",
        "#.##..#.##########.#",
        "#.....#............#",
        "#.###.#.##########.#",
        "#K....#....1.......#",
        "#.###.###########..#",
        "#......H...........#",
        "#.###############..#",
        "#........2.........#",
        "#.###############..#",
        "#.........H........#",
        "#.###########.####.#",
        "#.................E#",
        "####################"
    ]

];


totalLevelsDisplay.textContent =
    levels.length;


// ==========================================================
// GAME VARIABLES
// ==========================================================

let currentLevel = 0;

let currentMap;

let lives = 3;

let hasKey = false;

let gameState = "start";

let previousGameState = "start";


let player;

let guards = [];

let keyItem = null;

let exitGate = null;

let hidingSpots = [];

let playerHidden = false;

let currentHidingSpot = null;


// ==========================================================
// SCORE / TIMER
// ==========================================================

let gameStartTime = 0;

let elapsedTime = 0;

let pausedTime = 0;

let pauseStartedAt = 0;

let score = 0;


let highScore =
    Number(
        localStorage.getItem(
            "cellBlockEscapeHighScore"
        )
    ) || 0;


let highestUnlockedLevel =
    Number(
        localStorage.getItem(
            "cellBlockEscapeUnlockedLevel"
        )
    ) || 1;


highestUnlockedLevel =
    Math.min(
        Math.max(
            highestUnlockedLevel,
            1
        ),
        levels.length
    );


highScoreDisplay.textContent =
    highScore;


// ==========================================================
// LEVEL THEME
// ==========================================================

function getLevelTheme() {

    const level =
        currentLevel + 1;


    if (level <= 9) {

        return {

            name:
                "OLD PRISON",

            floor1:
                "#d9ad3b",

            floor2:
                "#d2a336",

            floorLine:
                "rgba(100,65,10,.20)",

            wallOuter:
                "#4b2b16",

            wallMain:
                "#754421",

            wallLight:
                "#986039",

            wallDark:
                "#3b210f",

            wallLine:
                "#4a2813"
        };
    }


    return {

        name:
            "MAXIMUM SECURITY",

        floor1:
            "#777777",

        floor2:
            "#686868",

        floorLine:
            "rgba(20,20,20,.30)",

        wallOuter:
            "#050505",

        wallMain:
            "#151515",

        wallLight:
            "#303030",

        wallDark:
            "#000000",

        wallLine:
            "#424242"
    };
}


// ==========================================================
// DIFFICULTY
// ==========================================================

function getDifficulty() {

    const level =
        currentLevel + 1;


    if (level <= 5) {

        return {
            name: "EASY",
            guardSpeed: 1,
            patrolSpeed: 0.65,
            detectionRange: 150,
            pathDelay: 24
        };
    }


    if (level <= 10) {

        return {
            name: "NORMAL",
            guardSpeed: 1.2,
            patrolSpeed: 0.8,
            detectionRange: 180,
            pathDelay: 20
        };
    }


    if (level <= 15) {

        return {
            name: "HARD",
            guardSpeed: 1.4,
            patrolSpeed: 0.9,
            detectionRange: 220,
            pathDelay: 15
        };
    }


    if (level <= 19) {

        return {
            name: "VERY HARD",
            guardSpeed: 1.6,
            patrolSpeed: 1,
            detectionRange: 250,
            pathDelay: 11
        };
    }


    return {
        name: "MAXIMUM",
        guardSpeed: 1.8,
        patrolSpeed: 1.1,
        detectionRange: 290,
        pathDelay: 8
    };
}


// ==========================================================
// CHARACTER
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

    hidingSpots = [];

    playerHidden = false;

    currentHidingSpot = null;


    const difficulty =
        getDifficulty();


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


            if (tile === "P") {

                player =
                    createCharacter(
                        col,
                        row,
                        1.5
                    );
            }


            if (
                tile === "1" ||
                tile === "2"
            ) {

                const guard =
                    createCharacter(
                        col,
                        row,
                        difficulty.patrolSpeed
                    );


                guard.path = [];

                guard.pathTimer = 0;

                guard.state =
                    "patrol";

                guard.patrolTarget =
                    null;

                guard.patrolWait =
                    Math.floor(
                        Math.random() * 50
                    );

                guard.lastSeenPlayer =
                    null;


                guards.push(
                    guard
                );
            }


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


            if (tile === "H") {

                hidingSpots.push({

                    x:
                        col * TILE + 5,

                    y:
                        row * TILE + 5,

                    width:
                        TILE - 10,

                    height:
                        TILE - 10,

                    col: col,

                    row: row
                });
            }
        }
    }


    updatePageTheme();

    updateHUD();
}


// ==========================================================
// PAGE THEME
// ==========================================================

function updatePageTheme() {

    if (
        currentLevel + 1 >= 10
    ) {

        document.body.classList.add(
            "maximum-security-theme"
        );

    } else {

        document.body.classList.remove(
            "maximum-security-theme"
        );
    }
}


// ==========================================================
// HUD
// ==========================================================

function updateHUD() {

    const difficulty =
        getDifficulty();

    const theme =
        getLevelTheme();


    levelDisplay.textContent =
        currentLevel + 1;


    areaDisplay.textContent =
        theme.name;


    difficultyDisplay.textContent =
        difficulty.name;


    livesDisplay.textContent =
        lives;


    scoreDisplay.textContent =
        score;


    highScoreDisplay.textContent =
        highScore;


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
            key.startsWith("arrow") ||
            event.code === "Space"
        ) {

            event.preventDefault();
        }


        if (
            gameState === "start" &&
            (
                key === "enter" ||
                event.code === "Space"
            )
        ) {

            startNewGame();

            return;
        }


        if (
            gameState === "playing" &&
            key === "e"
        ) {

            toggleHiding();

            return;
        }


        if (
            gameState === "playing" &&
            key === "r"
        ) {

            loadLevel(
                currentLevel
            );

            return;
        }


        if (
            (
                gameState === "gameover" ||
                gameState === "victory"
            )
            &&
            key === "enter"
        ) {

            startNewGame();
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
// NEW GAME
// ==========================================================

function startNewGame() {

    lives = 3;

    score = 0;

    elapsedTime = 0;

    pausedTime = 0;

    pauseStartedAt = 0;


    timerDisplay.textContent =
        "00:00";


    loadLevel(0);


    gameStartTime =
        Date.now();


    gameState =
        "playing";


    if (musicEnabled) {

        backgroundMusic.currentTime = 0;

        backgroundMusic
            .play()
            .catch(() => {});
    }
}


// ==========================================================
// COLLISION
// ==========================================================

function isWallAtPixel(x, y) {

    const col =
        Math.floor(x / TILE);

    const row =
        Math.floor(y / TILE);


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

function updateWalkAnimation(character) {

    if (character.moving) {

        character.animationTimer++;


        if (
            character.animationTimer >= 10
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
// FOOTSTEPS
// ==========================================================

function updateFootsteps() {

    if (
        !player.moving ||
        playerHidden ||
        !sfxEnabled
    ) {

        return;
    }


    const now =
        Date.now();


    if (
        now - footstepTimer <
        FOOTSTEP_DELAY
    ) {

        return;
    }


    const sound =
        footstepNumber === 0
            ? footstep1
            : footstep2;


    sound.currentTime = 0;


    sound
        .play()
        .catch(() => {});


    footstepNumber =
        footstepNumber === 0
            ? 1
            : 0;


    footstepTimer = now;
}


// ==========================================================
// PLAYER MOVEMENT
// ==========================================================

function updatePlayer() {

    if (playerHidden) {

        player.moving = false;

        return;
    }


    let dx = 0;

    let dy = 0;


    player.moving = false;


    if (
        keys["w"] ||
        keys["arrowup"]
    ) {

        dy -= player.speed;

        player.direction =
            "up";

        player.moving =
            true;
    }


    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {

        dy += player.speed;

        player.direction =
            "down";

        player.moving =
            true;
    }


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        dx -= player.speed;

        player.direction =
            "left";

        player.moving =
            true;
    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        dx += player.speed;

        player.direction =
            "right";

        player.moving =
            true;
    }


    if (
        dx !== 0 &&
        dy !== 0
    ) {

        dx *= 0.7071;

        dy *= 0.7071;
    }


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

        player.x =
            newX;
    }


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

        player.y =
            newY;
    }


    updateWalkAnimation(
        player
    );


    updateFootsteps();
}


// ==========================================================
// HIDING
// ==========================================================

function toggleHiding() {

    if (playerHidden) {

        playerHidden = false;

        currentHidingSpot =
            null;

        return;
    }


    for (
        const spot
        of hidingSpots
    ) {

        if (
            rectanglesTouch(
                player,
                spot
            )
        ) {

            playerHidden =
                true;


            currentHidingSpot =
                spot;


            player.x =
                spot.x +
                spot.width / 2 -
                player.width / 2;


            player.y =
                spot.y +
                spot.height / 2 -
                player.height / 2;


            player.moving =
                false;


            return;
        }
    }
}


// ==========================================================
// TILE POSITION
// ==========================================================

function getCharacterTile(character) {

    return {

        col:
            Math.floor(
                (
                    character.x +
                    character.width / 2
                ) / TILE
            ),

        row:
            Math.floor(
                (
                    character.y +
                    character.height / 2
                ) / TILE
            )
    };
}


// ==========================================================
// BFS PATHFINDING
// ==========================================================

function findPath(start, target) {

    const queue = [

        {
            col: start.col,
            row: start.row,
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

        { col: 1, row: 0 },

        { col: -1, row: 0 },

        { col: 0, row: 1 },

        { col: 0, row: -1 }

    ];


    while (
        queue.length > 0
    ) {

        const current =
            queue.shift();


        if (
            current.col === target.col &&
            current.row === target.row
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
                col + "," + row;


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
// PATROL
// ==========================================================

function choosePatrolTarget(guard) {

    const guardTile =
        getCharacterTile(
            guard
        );


    const possible =
        [];


    const radius = 6;


    for (
        let row =
            Math.max(
                1,
                guardTile.row -
                radius
            );

        row <=
            Math.min(
                ROWS - 2,
                guardTile.row +
                radius
            );

        row++
    ) {

        for (
            let col =
                Math.max(
                    1,
                    guardTile.col -
                    radius
                );

            col <=
                Math.min(
                    COLS - 2,
                    guardTile.col +
                    radius
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
                distance >= 3
            ) {

                possible.push({
                    col: col,
                    row: row
                });
            }
        }
    }


    if (
        possible.length === 0
    ) {

        return null;
    }


    return possible[
        Math.floor(
            Math.random() *
            possible.length
        )
    ];
}


// ==========================================================
// GUARD VISION
// ==========================================================

function guardCanSeePlayer(guard) {

    if (playerHidden) {

        return false;
    }


    const difficulty =
        getDifficulty();


    const gx =
        guard.x +
        guard.width / 2;


    const gy =
        guard.y +
        guard.height / 2;


    const px =
        player.x +
        player.width / 2;


    const py =
        player.y +
        player.height / 2;


    const dx =
        px - gx;


    const dy =
        py - gy;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (
        distance >
        difficulty.detectionRange
    ) {

        return false;
    }


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


        if (
            isWallAtPixel(
                gx + dx * t,
                gy + dy * t
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

function moveGuardAlongPath(guard) {

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
        next.col * TILE +
        TILE / 2 -
        guard.width / 2;


    const targetY =
        next.row * TILE +
        TILE / 2 -
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


    if (distance < 1) {

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


        if (canSeePlayer) {

            if (
                guard.state !==
                "chase"
            ) {

                playSFX(
                    alertSound
                );
            }


            guard.state =
                "chase";


            guard.lastSeenPlayer =
                getCharacterTile(
                    player
                );
        }


        // CHASE

        if (
            guard.state === "chase"
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


        // SEARCH

        else if (
            guard.state === "search"
        ) {

            guard.speed =
                difficulty.guardSpeed;


            if (canSeePlayer) {

                guard.state =
                    "chase";

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


        // PATROL

        else {

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
                            Math.random() *
                            50
                        );
                }
            }
        }


        updateWalkAnimation(
            guard
        );


        if (
            !playerHidden &&
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

    playSFX(
        caughtSound
    );


    lives--;


    if (
        lives <= 0
    ) {

        lives = 0;

        gameState =
            "gameover";

        backgroundMusic.pause();

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


        hasKey =
            true;


        playSFX(
            keySound
        );


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
// SCORE
// ==========================================================

function calculateLevelScore() {

    const level =
        currentLevel + 1;


    return (
        1000 +
        level * 100 +
        lives * 250
    );
}


// ==========================================================
// NEXT LEVEL / UNLOCKING
// ==========================================================

function nextLevel() {

    playSFX(
        escapeSound
    );


    score +=
        calculateLevelScore();


    const completedLevel =
        currentLevel + 1;


    localStorage.setItem(
        "cellBlockEscapeCompleted_" +
        completedLevel,
        "1"
    );


    const nextNumber =
        completedLevel + 1;


    if (
        nextNumber <=
        levels.length &&
        nextNumber >
        highestUnlockedLevel
    ) {

        highestUnlockedLevel =
            nextNumber;


        localStorage.setItem(
            "cellBlockEscapeUnlockedLevel",
            highestUnlockedLevel
        );
    }


    if (
        currentLevel <
        levels.length - 1
    ) {

        loadLevel(
            currentLevel + 1
        );

    } else {

        finishGame();
    }
}


// ==========================================================
// FINISH GAME
// ==========================================================

function finishGame() {

    const totalSeconds =
        Math.floor(
            elapsedTime / 1000
        );


    score +=
        Math.max(
            0,
            10000 -
            totalSeconds * 10
        );


    if (
        score >
        highScore
    ) {

        highScore =
            score;


        localStorage.setItem(
            "cellBlockEscapeHighScore",
            highScore
        );
    }


    updateHUD();


    gameState =
        "victory";


    backgroundMusic.pause();
}


// ==========================================================
// TIMER
// ==========================================================

function updateTimer() {

    elapsedTime =
        Date.now() -
        gameStartTime -
        pausedTime;


    const totalSeconds =
        Math.floor(
            elapsedTime / 1000
        );


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    timerDisplay.textContent =
        String(
            minutes
        ).padStart(
            2,
            "0"
        )
        +
        ":"
        +
        String(
            seconds
        ).padStart(
            2,
            "0"
        );
}


// ==========================================================
// AUDIO
// ==========================================================

function playSFX(sound) {

    if (!sfxEnabled) {

        return;
    }


    sound.currentTime = 0;


    sound
        .play()
        .catch(() => {});
}


function updateSFXVolume() {

    const volume =
        Number(
            sfxVolume.value
        ) / 100;


    keySound.volume =
        volume;

    caughtSound.volume =
        volume;

    escapeSound.volume =
        volume;

    alertSound.volume =
        volume;


    footstep1.volume =
        volume * 0.45;

    footstep2.volume =
        volume * 0.45;
}


// ==========================================================
// SETTINGS STORAGE
// ==========================================================

function saveSettings() {

    localStorage.setItem(
        "cellBlockEscapeSettings",

        JSON.stringify({

            musicVolume:
                musicVolume.value,

            sfxVolume:
                sfxVolume.value,

            musicEnabled:
                musicEnabled,

            sfxEnabled:
                sfxEnabled
        })
    );
}


function loadSettings() {

    const saved =
        localStorage.getItem(
            "cellBlockEscapeSettings"
        );


    if (saved) {

        try {

            const settings =
                JSON.parse(saved);


            musicVolume.value =
                settings.musicVolume ??
                35;


            sfxVolume.value =
                settings.sfxVolume ??
                70;


            musicEnabled =
                settings.musicEnabled ??
                true;


            sfxEnabled =
                settings.sfxEnabled ??
                true;

        } catch (error) {

            console.log(
                "Settings could not be loaded."
            );
        }
    }


    backgroundMusic.volume =
        Number(
            musicVolume.value
        ) / 100;


    updateSFXVolume();


    musicToggle.textContent =
        musicEnabled
            ? "ON"
            : "OFF";


    sfxToggle.textContent =
        sfxEnabled
            ? "ON"
            : "OFF";
}


// ==========================================================
// PAUSE HELPERS
// ==========================================================

function pauseGameForMenu() {

    previousGameState =
        gameState;


    if (
        gameState ===
        "playing"
    ) {

        pauseStartedAt =
            Date.now();
    }


    gameState =
        "paused";
}


function resumeGameFromMenu() {

    if (
        previousGameState ===
        "playing"
        &&
        pauseStartedAt > 0
    ) {

        pausedTime +=
            Date.now() -
            pauseStartedAt;
    }


    pauseStartedAt = 0;


    gameState =
        previousGameState;
}


// ==========================================================
// SETTINGS EVENTS
// ==========================================================

settingsButton.addEventListener(
    "click",
    function() {

        pauseGameForMenu();


        settingsMenu.classList.remove(
            "hidden"
        );
    }
);


resumeButton.addEventListener(
    "click",
    function() {

        settingsMenu.classList.add(
            "hidden"
        );


        resumeGameFromMenu();
    }
);


helpButton.addEventListener(
    "click",
    function() {

        settingsMenu.classList.add(
            "hidden"
        );


        helpMenu.classList.remove(
            "hidden"
        );
    }
);


backToSettingsButton.addEventListener(
    "click",
    function() {

        helpMenu.classList.add(
            "hidden"
        );


        settingsMenu.classList.remove(
            "hidden"
        );
    }
);


musicVolume.addEventListener(
    "input",
    function() {

        backgroundMusic.volume =
            Number(
                this.value
            ) / 100;


        saveSettings();
    }
);


sfxVolume.addEventListener(
    "input",
    function() {

        updateSFXVolume();

        saveSettings();
    }
);


musicToggle.addEventListener(
    "click",
    function() {

        musicEnabled =
            !musicEnabled;


        musicToggle.textContent =
            musicEnabled
                ? "ON"
                : "OFF";


        if (!musicEnabled) {

            backgroundMusic.pause();

        } else if (
            previousGameState ===
            "playing"
        ) {

            backgroundMusic
                .play()
                .catch(() => {});
        }


        saveSettings();
    }
);


sfxToggle.addEventListener(
    "click",
    function() {

        sfxEnabled =
            !sfxEnabled;


        sfxToggle.textContent =
            sfxEnabled
                ? "ON"
                : "OFF";


        saveSettings();
    }
);


// ==========================================================
// LEVEL SELECT
// ==========================================================

function getLevelStars(
    levelNumber
) {

    const completed =
        localStorage.getItem(
            "cellBlockEscapeCompleted_" +
            levelNumber
        );


    return completed
        ? "★★★"
        : "☆☆☆";
}


function drawLevelSelect() {

    levelGrid.innerHTML =
        "";


    const start =
        levelSelectPage *
        LEVELS_PER_PAGE;


    const end =
        Math.min(
            start +
            LEVELS_PER_PAGE,
            levels.length
        );


    for (
        let i = start;
        i < end;
        i++
    ) {

        const levelNumber =
            i + 1;


        const button =
            document.createElement(
                "button"
            );


        button.className =
            "level-button";


        if (
            levelNumber >
            highestUnlockedLevel
        ) {

            button.classList.add(
                "locked"
            );


            button.disabled =
                true;


            button.innerHTML =
                `
                🔒
                <span class="level-stars">
                    ☆☆☆
                </span>
                `;

        } else {

            button.innerHTML =
                `
                ${levelNumber}
                <span class="level-stars">
                    ${getLevelStars(levelNumber)}
                </span>
                `;


            button.addEventListener(
                "click",
                function() {

                    selectLevel(i);
                }
            );
        }


        if (
            i === currentLevel
        ) {

            button.classList.add(
                "current"
            );
        }


        levelGrid.appendChild(
            button
        );
    }


    const pages =
        Math.ceil(
            levels.length /
            LEVELS_PER_PAGE
        );


    levelPageDisplay.textContent =
        (levelSelectPage + 1)
        +
        " / "
        +
        pages;


    previousLevelsButton.disabled =
        levelSelectPage === 0;


    nextLevelsButton.disabled =
        levelSelectPage >=
        pages - 1;
}


levelSelectButton.addEventListener(
    "click",
    function() {

        pauseGameForMenu();


        levelSelectPage =
            Math.floor(
                currentLevel /
                LEVELS_PER_PAGE
            );


        drawLevelSelect();


        levelSelectMenu.classList.remove(
            "hidden"
        );
    }
);


previousLevelsButton.addEventListener(
    "click",
    function() {

        if (
            levelSelectPage > 0
        ) {

            levelSelectPage--;

            drawLevelSelect();
        }
    }
);


nextLevelsButton.addEventListener(
    "click",
    function() {

        const pages =
            Math.ceil(
                levels.length /
                LEVELS_PER_PAGE
            );


        if (
            levelSelectPage <
            pages - 1
        ) {

            levelSelectPage++;

            drawLevelSelect();
        }
    }
);


closeLevelSelectButton.addEventListener(
    "click",
    function() {

        levelSelectMenu.classList.add(
            "hidden"
        );


        resumeGameFromMenu();
    }
);


function selectLevel(index) {

    if (
        index + 1 >
        highestUnlockedLevel
    ) {

        return;
    }


    levelSelectMenu.classList.add(
        "hidden"
    );


    lives = 3;

    score = 0;

    elapsedTime = 0;

    pausedTime = 0;

    pauseStartedAt = 0;


    loadLevel(index);


    gameStartTime =
        Date.now();


    gameState =
        "playing";


    if (musicEnabled) {

        backgroundMusic
            .play()
            .catch(() => {});
    }
}


// ==========================================================
// DRAW FLOOR
// ==========================================================

function drawFloor(
    x,
    y,
    row,
    col
) {

    const theme =
        getLevelTheme();


    ctx.fillStyle =
        (row + col) % 2 === 0
            ? theme.floor1
            : theme.floor2;


    ctx.fillRect(
        x,
        y,
        TILE,
        TILE
    );


    ctx.strokeStyle =
        theme.floorLine;


    ctx.strokeRect(
        x,
        y,
        TILE,
        TILE
    );


    if (
        currentLevel + 1 >= 10 &&
        (
            row * 5 +
            col * 7 +
            currentLevel
        ) % 8 === 0
    ) {

        ctx.strokeStyle =
            "rgba(20,20,20,.5)";


        ctx.beginPath();

        ctx.moveTo(
            x + 8,
            y + 10
        );

        ctx.lineTo(
            x + 16,
            y + 17
        );

        ctx.lineTo(
            x + 12,
            y + 25
        );

        ctx.lineTo(
            x + 21,
            y + 29
        );

        ctx.stroke();
    }
}


// ==========================================================
// DRAW WALL
// ==========================================================

function drawWall(
    x,
    y,
    row,
    col
) {

    const theme =
        getLevelTheme();


    ctx.fillStyle =
        theme.wallOuter;


    ctx.fillRect(
        x,
        y,
        TILE,
        TILE
    );


    ctx.fillStyle =
        theme.wallMain;


    ctx.fillRect(
        x + 3,
        y + 3,
        TILE - 6,
        TILE - 6
    );


    ctx.fillStyle =
        theme.wallLight;


    ctx.fillRect(
        x + 5,
        y + 5,
        TILE - 10,
        5
    );


    ctx.fillStyle =
        theme.wallDark;


    ctx.fillRect(
        x + 5,
        y + TILE - 9,
        TILE - 10,
        5
    );


    ctx.strokeStyle =
        theme.wallLine;


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


    if (
        currentLevel + 1 >= 10
    ) {

        ctx.fillStyle =
            "#666";


        ctx.fillRect(
            x + 6,
            y + 6,
            3,
            3
        );


        ctx.fillRect(
            x + TILE - 9,
            y + 6,
            3,
            3
        );


        ctx.fillRect(
            x + 6,
            y + TILE - 9,
            3,
            3
        );


        ctx.fillRect(
            x + TILE - 9,
            y + TILE - 9,
            3,
            3
        );
    }


    ctx.lineWidth = 1;
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
// DRAW HIDING LOCKERS
// ==========================================================

function drawHidingSpots() {

    for (
        const spot
        of hidingSpots
    ) {

        const x =
            spot.x;

        const y =
            spot.y;


        ctx.fillStyle =
            "#252b2e";


        ctx.fillRect(
            x,
            y,
            spot.width,
            spot.height
        );


        ctx.fillStyle =
            "#626d72";


        ctx.fillRect(
            x + 3,
            y + 2,
            spot.width - 6,
            spot.height - 4
        );


        ctx.fillStyle =
            "#899398";


        ctx.fillRect(
            x + 6,
            y + 5,
            spot.width - 12,
            4
        );


        ctx.fillStyle =
            "#30383c";


        ctx.fillRect(
            x + 8,
            y + 13,
            spot.width - 16,
            2
        );


        ctx.fillRect(
            x + 8,
            y + 17,
            spot.width - 16,
            2
        );


        ctx.fillStyle =
            "#ffd54f";


        ctx.fillRect(
            x + spot.width - 9,
            y + 21,
            3,
            6
        );
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


    ctx.strokeStyle =
        "#111";

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


    if (character.moving) {

        legMove =
            character.walkFrame === 0
                ? 2
                : -2;
    }


    const armMove =
        -legMove;


    ctx.save();


    ctx.fillStyle =
        "rgba(0,0,0,.3)";


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


    // LEGS

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


    // SHOES

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


    // ARMS

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


    // BODY

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


    if (isGuard) {

        ctx.fillStyle =
            "#181818";


        ctx.fillRect(
            x + 6,
            y + 19,
            15,
            3
        );


        ctx.fillStyle =
            "#ffd740";


        ctx.fillRect(
            x + 16,
            y + 12,
            3,
            4
        );

    } else {

        ctx.fillStyle =
            "#60310d";


        ctx.fillRect(
            x + 6,
            y + 15,
            15,
            3
        );
    }


    // HEAD

    ctx.fillStyle =
        "#d69461";


    ctx.fillRect(
        x + 8,
        y + 2,
        12,
        10
    );


    // HAT / HAIR

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


    // EYES

    ctx.fillStyle =
        "#17120f";


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

    } else if (
        character.direction ===
        "left"
    ) {

        ctx.fillRect(
            x + 9,
            y + 6,
            2,
            2
        );

    } else if (
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


    ctx.restore();
}


// ==========================================================
// GUARD ALERT
// ==========================================================

function drawGuardAlert(guard) {

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
// OVERLAY
// ==========================================================

function drawOverlay() {

    if (
        gameState ===
        "playing" ||
        gameState ===
        "paused"
    ) {

        return;
    }


    ctx.fillStyle =
        "rgba(20,15,10,.85)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.textAlign =
        "center";


    if (
        gameState ===
        "start"
    ) {

        ctx.fillStyle =
            "#ffd54f";


        ctx.font =
            "bold 45px monospace";


        ctx.fillText(
            "CELL BLOCK ESCAPE",
            canvas.width / 2,
            180
        );


        ctx.fillStyle =
            "#fff";


        ctx.font =
            "20px monospace";


        ctx.fillText(
            "20 LEVEL PRISON ESCAPE",
            canvas.width / 2,
            240
        );


        ctx.fillText(
            "Find the key. Hide. Escape.",
            canvas.width / 2,
            285
        );


        ctx.fillStyle =
            "#fff176";


        ctx.fillText(
            "PRESS ENTER TO START",
            canvas.width / 2,
            370
        );
    }


    if (
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
            210
        );


        ctx.fillStyle =
            "#fff";


        ctx.font =
            "20px monospace";


        ctx.fillText(
            "LEVEL: " +
            (currentLevel + 1),
            canvas.width / 2,
            275
        );


        ctx.fillText(
            "SCORE: " +
            score,
            canvas.width / 2,
            315
        );


        ctx.fillStyle =
            "#ffd54f";


        ctx.fillText(
            "PRESS ENTER TO TRY AGAIN",
            canvas.width / 2,
            390
        );
    }


    if (
        gameState ===
        "victory"
    ) {

        ctx.fillStyle =
            "#69f0ae";


        ctx.font =
            "bold 48px monospace";


        ctx.fillText(
            "YOU ESCAPED!",
            canvas.width / 2,
            150
        );


        ctx.fillStyle =
            "#fff";


        ctx.font =
            "20px monospace";


        ctx.fillText(
            "ALL 20 LEVELS CLEARED",
            canvas.width / 2,
            210
        );


        ctx.fillStyle =
            "#ffd54f";


        ctx.fillText(
            "TIME: " +
            timerDisplay.textContent,
            canvas.width / 2,
            265
        );


        ctx.fillText(
            "SCORE: " +
            score,
            canvas.width / 2,
            305
        );


        ctx.fillText(
            "HIGH SCORE: " +
            highScore,
            canvas.width / 2,
            345
        );


        ctx.fillStyle =
            "#fff";


        ctx.fillText(
            "PRESS ENTER TO PLAY AGAIN",
            canvas.width / 2,
            415
        );
    }


    ctx.textAlign =
        "left";
}


// ==========================================================
// HIDDEN MESSAGE
// ==========================================================

function drawHiddenMessage() {

    if (!playerHidden) {

        return;
    }


    ctx.save();


    ctx.fillStyle =
        "rgba(0,0,0,.7)";


    ctx.fillRect(
        canvas.width / 2 - 150,
        12,
        300,
        35
    );


    ctx.fillStyle =
        "#69f0ae";


    ctx.textAlign =
        "center";


    ctx.font =
        "bold 15px monospace";


    ctx.fillText(
        "HIDDEN - PRESS E TO LEAVE",
        canvas.width / 2,
        35
    );


    ctx.restore();
}


// ==========================================================
// UPDATE
// ==========================================================

function update() {

    if (
        gameState !==
        "playing"
    ) {

        return;
    }


    updateTimer();

    updatePlayer();

    updateKey();

    updateExit();

    updateGuards();
}


// ==========================================================
// DRAW
// ==========================================================

function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawMap();

    drawHidingSpots();

    drawExit();

    drawKey();


    for (
        const guard
        of guards
    ) {

        drawGuardAlert(
            guard
        );


        drawCharacter(
            guard,
            true
        );
    }


    if (!playerHidden) {

        drawCharacter(
            player,
            false
        );
    }


    drawHiddenMessage();

    drawOverlay();
}


// ==========================================================
// LOOP
// ==========================================================

function gameLoop() {

    update();

    draw();


    requestAnimationFrame(
        gameLoop
    );
}


// ==========================================================
// START
// ==========================================================

loadSettings();

loadLevel(0);

gameLoop();