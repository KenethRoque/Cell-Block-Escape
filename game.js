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

canvas.width = COLS * TILE;
canvas.height = ROWS * TILE;


// ==========================================================
// ELEMENTS
// ==========================================================

const levelDisplay =
    document.getElementById("levelDisplay");

const totalLevelsDisplay =
    document.getElementById("totalLevelsDisplay");

const modeDisplay =
    document.getElementById("modeDisplay");

const areaDisplay =
    document.getElementById("areaDisplay");

const difficultyDisplay =
    document.getElementById("difficultyDisplay");

const livesDisplay =
    document.getElementById("livesDisplay");

const timerDisplay =
    document.getElementById("timerDisplay");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const highScoreDisplay =
    document.getElementById("highScoreDisplay");

const multiplayerHud =
    document.getElementById("multiplayerHud");

const p1KeyDisplay =
    document.getElementById("p1KeyDisplay");

const p2KeyDisplay =
    document.getElementById("p2KeyDisplay");

const levelSelectButton =
    document.getElementById("levelSelectButton");

const mainMenuButton =
    document.getElementById("mainMenuButton");

const settingsButton =
    document.getElementById("settingsButton");

const singleControls =
    document.getElementById("singleControls");

const multiControls =
    document.getElementById("multiControls");


// ==========================================================
// MENUS
// ==========================================================

const gameModeMenu =
    document.getElementById("gameModeMenu");

const onePlayerButton =
    document.getElementById("onePlayerButton");

const twoPlayerButton =
    document.getElementById("twoPlayerButton");

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

const helpButton =
    document.getElementById("helpButton");

const helpMenu =
    document.getElementById("helpMenu");

const backToSettingsButton =
    document.getElementById("backToSettingsButton");

const aboutButton =
    document.getElementById("aboutButton");

const aboutMenu =
    document.getElementById("aboutMenu");

const backFromAboutButton =
    document.getElementById("backFromAboutButton");

const creditsButton =
    document.getElementById("creditsButton");

const creditsMenu =
    document.getElementById("creditsMenu");

const backFromCreditsButton =
    document.getElementById("backFromCreditsButton");

const levelSelectMenu =
    document.getElementById("levelSelectMenu");

const levelGrid =
    document.getElementById("levelGrid");

const previousLevelsButton =
    document.getElementById("previousLevelsButton");

const nextLevelsButton =
    document.getElementById("nextLevelsButton");

const levelPageDisplay =
    document.getElementById("levelPageDisplay");

const closeLevelSelectButton =
    document.getElementById("closeLevelSelectButton");


// ==========================================================
// AUDIO
// ==========================================================

const backgroundMusic =
    new Audio("audio/prison-theme.mp3");

const keySound =
    new Audio("audio/key.mp3");

const caughtSound =
    new Audio("audio/caught.mp3");

const escapeSound =
    new Audio("audio/escape.mp3");

const alertSound =
    new Audio("audio/alert.mp3");

const footstep1 =
    new Audio("audio/footstep1.mp3");

const footstep2 =
    new Audio("audio/footstep2.mp3");

backgroundMusic.loop = true;

let musicEnabled = true;
let sfxEnabled = true;


// ==========================================================
// GAME VARIABLES
// ==========================================================

let gameMode = 0;

let gameState = "menu";

let previousGameState = "menu";

let currentLevel = 0;

let currentMap = singlePlayerLevels[0];

let currentMultiplayerMap = -1;

let player1 = null;
let player2 = null;

let guards = [];

let key1 = null;
let key2 = null;

let exit1 = null;
let exit2 = null;

let hidingSpots = [];

let player1HasKey = false;
let player2HasKey = false;

let winner = null;

let lives = 3;

let score = 0;

let gameStartTime = 0;
let elapsedTime = 0;
let pausedTime = 0;
let pauseStartedAt = 0;

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
    Math.max(
        1,
        Math.min(
            highestUnlockedLevel,
            singlePlayerLevels.length
        )
    );

const keys = {};


// ==========================================================
// CHARACTER
// ==========================================================

function createCharacter(
    col,
    row,
    speed,
    playerNumber = 0
) {

    return {
        x: col * TILE + 7,
        y: row * TILE + 5,

        spawnX: col * TILE + 7,
        spawnY: row * TILE + 5,

        width: 26,
        height: 30,

        speed,

        playerNumber,

        direction: "down",

        moving: false,

        walkFrame: 0,

        animationTimer: 0,

        hidden: false,

        hidingSpot: null
    };
}


// ==========================================================
// DIFFICULTY
// ==========================================================

function getDifficulty() {

    const level =
        currentLevel + 1;

    if (gameMode === 2) {
        return {
            name: "RACE",
            guardSpeed: 1.25,
            patrolSpeed: 0.8,
            detectionRange: 190,
            pathDelay: 18
        };
    }

    if (level <= 5) {
        return {
            name: "EASY",
            guardSpeed: 1,
            patrolSpeed: .65,
            detectionRange: 150,
            pathDelay: 24
        };
    }

    if (level <= 10) {
        return {
            name: "NORMAL",
            guardSpeed: 1.2,
            patrolSpeed: .8,
            detectionRange: 180,
            pathDelay: 20
        };
    }

    if (level <= 15) {
        return {
            name: "HARD",
            guardSpeed: 1.4,
            patrolSpeed: .9,
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
// THEME
// ==========================================================

function getLevelTheme() {

    const maximum =
        gameMode === 1 &&
        currentLevel + 1 >= 10;

    if (!maximum) {

        return {
            name:
                gameMode === 2
                    ? "RACE BLOCK"
                    : "OLD PRISON",

            floor1: "#d9ad3b",
            floor2: "#d2a336",

            floorLine:
                "rgba(100,65,10,.20)",

            wallOuter: "#4b2b16",
            wallMain: "#754421",
            wallLight: "#986039",
            wallDark: "#3b210f",
            wallLine: "#4a2813"
        };
    }

    return {
        name: "MAXIMUM SECURITY",

        floor1: "#777",
        floor2: "#686868",

        floorLine:
            "rgba(20,20,20,.30)",

        wallOuter: "#050505",
        wallMain: "#151515",
        wallLight: "#303030",
        wallDark: "#000",
        wallLine: "#424242"
    };
}


// ==========================================================
// RANDOM MULTIPLAYER MAP
// ==========================================================

function chooseRandomMultiplayerMap() {

    let index;

    do {

        index =
            Math.floor(
                Math.random() *
                twoPlayerLevels.length
            );

    } while (
        index === currentMultiplayerMap &&
        twoPlayerLevels.length > 1
    );

    currentMultiplayerMap = index;

    return index;
}


// ==========================================================
// LOAD MAP
// ==========================================================

function loadMap(map, levelIndex = 0) {

    currentMap = map;

    if (gameMode === 1) {
        currentLevel = levelIndex;
    }

    player1 = null;
    player2 = null;

    guards = [];

    key1 = null;
    key2 = null;

    exit1 = null;
    exit2 = null;

    hidingSpots = [];

    player1HasKey = false;
    player2HasKey = false;

    winner = null;

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

                player1 =
                    createCharacter(
                        col,
                        row,
                        1.5,
                        1
                    );
            }

            if (tile === "Q") {

                player2 =
                    createCharacter(
                        col,
                        row,
                        1.5,
                        2
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

                guard.state = "patrol";

                guard.patrolTarget = null;

                guard.patrolWait =
                    Math.floor(
                        Math.random() * 50
                    );

                guard.lastSeenPlayer = null;

                guards.push(guard);
            }

            if (tile === "K") {

                key1 = {
                    x: col * TILE + 10,
                    y: row * TILE + 10,

                    width: 20,
                    height: 20,

                    collected: false
                };
            }

            if (tile === "L") {

                key2 = {
                    x: col * TILE + 10,
                    y: row * TILE + 10,

                    width: 20,
                    height: 20,

                    collected: false
                };
            }

            if (tile === "E") {

                exit1 = {
                    x: col * TILE,
                    y: row * TILE,

                    width: TILE,
                    height: TILE
                };
            }

            if (tile === "X") {

                exit2 = {
                    x: col * TILE,
                    y: row * TILE,

                    width: TILE,
                    height: TILE
                };
            }

            if (tile === "H") {

                hidingSpots.push({
                    x: col * TILE + 5,
                    y: row * TILE + 5,

                    width: TILE - 10,
                    height: TILE - 10,

                    col,
                    row
                });
            }
        }
    }

    updatePageTheme();

    updateHUD();
}


// ==========================================================
// START 1 PLAYER
// ==========================================================

function startSinglePlayer(
    level = 0
) {

    gameMode = 1;

    lives = 3;

    score = 0;

    elapsedTime = 0;
    pausedTime = 0;

    gameModeMenu.classList.add(
        "hidden"
    );

    multiplayerHud.classList.add(
        "hidden"
    );

    multiControls.classList.add(
        "hidden"
    );

    singleControls.classList.remove(
        "hidden"
    );

    levelSelectButton.classList.remove(
        "hidden"
    );

    loadMap(
        singlePlayerLevels[level],
        level
    );

    gameStartTime = Date.now();

    gameState = "playing";

    playMusic();
}


// ==========================================================
// START 2 PLAYER
// ==========================================================

function startTwoPlayer() {

    gameMode = 2;

    elapsedTime = 0;
    pausedTime = 0;

    gameModeMenu.classList.add(
        "hidden"
    );

    multiplayerHud.classList.remove(
        "hidden"
    );

    singleControls.classList.add(
        "hidden"
    );

    multiControls.classList.remove(
        "hidden"
    );

    levelSelectButton.classList.add(
        "hidden"
    );

    const index =
        chooseRandomMultiplayerMap();

    loadMap(
        twoPlayerLevels[index]
    );

    gameStartTime = Date.now();

    gameState = "playing";

    playMusic();
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
        isWallAtPixel(x, y) ||

        isWallAtPixel(
            x + width - 1,
            y
        ) ||

        isWallAtPixel(
            x,
            y + height - 1
        ) ||

        isWallAtPixel(
            x + width - 1,
            y + height - 1
        )
    );
}


function rectanglesTouch(a, b) {

    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}


// ==========================================================
// MOVEMENT
// ==========================================================

function movePlayer(
    character,
    controls
) {

    if (
        !character ||
        character.hidden
    ) {
        return;
    }

    let dx = 0;
    let dy = 0;

    character.moving = false;

    if (keys[controls.up]) {
        dy -= character.speed;
        character.direction = "up";
        character.moving = true;
    }

    if (keys[controls.down]) {
        dy += character.speed;
        character.direction = "down";
        character.moving = true;
    }

    if (keys[controls.left]) {
        dx -= character.speed;
        character.direction = "left";
        character.moving = true;
    }

    if (keys[controls.right]) {
        dx += character.speed;
        character.direction = "right";
        character.moving = true;
    }

    if (
        dx !== 0 &&
        dy !== 0
    ) {
        dx *= .7071;
        dy *= .7071;
    }

    if (
        !collidesWithWall(
            character.x + dx,
            character.y,
            character.width,
            character.height
        )
    ) {
        character.x += dx;
    }

    if (
        !collidesWithWall(
            character.x,
            character.y + dy,
            character.width,
            character.height
        )
    ) {
        character.y += dy;
    }

    updateWalkAnimation(
        character
    );
}


function updatePlayers() {

    movePlayer(
        player1,

        gameMode === 1
            ? {
                up: "w",
                down: "s",
                left: "a",
                right: "d"
            }
            : {
                up: "w",
                down: "s",
                left: "a",
                right: "d"
            }
    );

    if (gameMode === 2) {

        movePlayer(
            player2,
            {
                up: "arrowup",
                down: "arrowdown",
                left: "arrowleft",
                right: "arrowright"
            }
        );
    }
}


// ==========================================================
// WALK ANIMATION
// ==========================================================

function updateWalkAnimation(character) {

    if (character.moving) {

        character.animationTimer++;

        if (character.animationTimer >= 12) {

            character.walkFrame =
                character.walkFrame === 0 ? 1 : 0;

            character.animationTimer = 0;


            // Only prisoners make footstep sounds.
            // Guards will not use these sounds.
            if (character.playerNumber === 1 ||
                character.playerNumber === 2) {

                if (character.walkFrame === 0) {

                    playFootstep(footstep1);

                } else {

                    playFootstep(footstep2);
                }
            }
        }

    } else {

        character.walkFrame = 0;

        character.animationTimer = 0;
    }
}
function playFootstep(sound) {

    if (!sfxEnabled) {
        return;
    }

    sound.pause();

    sound.currentTime = 0;

    sound.play().catch(error => {
        console.log(
            "Footstep sound could not play:",
            error
        );
    });
}

// ==========================================================
// HIDING
// ==========================================================

function toggleHiding(
    character
) {

    if (!character) return;

    if (character.hidden) {

        character.hidden = false;

        character.hidingSpot = null;

        return;
    }

    for (
        const spot
        of hidingSpots
    ) {

        if (
            rectanglesTouch(
                character,
                spot
            )
        ) {

            character.hidden = true;

            character.hidingSpot = spot;

            character.x =
                spot.x +
                spot.width / 2 -
                character.width / 2;

            character.y =
                spot.y +
                spot.height / 2 -
                character.height / 2;

            return;
        }
    }
}


// ==========================================================
// TILE
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
// PATHFINDING
// ==========================================================

function findPath(
    start,
    target
) {

    const queue = [{
        col: start.col,
        row: start.row,
        path: []
    }];

    const visited =
        new Set([
            `${start.col},${start.row}`
        ]);

    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    while (queue.length) {

        const current =
            queue.shift();

        if (
            current.col === target.col &&
            current.row === target.row
        ) {
            return current.path;
        }

        for (
            const [dc, dr]
            of directions
        ) {

            const col =
                current.col + dc;

            const row =
                current.row + dr;

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
                `${col},${row}`;

            if (visited.has(id)) {
                continue;
            }

            visited.add(id);

            queue.push({
                col,
                row,

                path: [
                    ...current.path,
                    { col, row }
                ]
            });
        }
    }

    return [];
}


// ==========================================================
// GUARD VISION
// ==========================================================

function guardCanSee(
    guard,
    character
) {

    if (
        !character ||
        character.hidden
    ) {
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
        character.x +
        character.width / 2;

    const py =
        character.y +
        character.height / 2;

    const dx = px - gx;
    const dy = py - gy;

    const distance =
        Math.hypot(dx, dy);

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


function getGuardTarget(
    guard
) {

    const targets = [];

    if (
        guardCanSee(
            guard,
            player1
        )
    ) {
        targets.push(player1);
    }

    if (
        gameMode === 2 &&
        guardCanSee(
            guard,
            player2
        )
    ) {
        targets.push(player2);
    }

    if (!targets.length) {
        return null;
    }

    targets.sort(
        (a, b) =>
            Math.hypot(
                a.x - guard.x,
                a.y - guard.y
            )
            -
            Math.hypot(
                b.x - guard.x,
                b.y - guard.y
            )
    );

    return targets[0];
}


// ==========================================================
// PATROL TARGET
// ==========================================================

function choosePatrolTarget(
    guard
) {

    const tile =
        getCharacterTile(guard);

    const options = [];

    for (
        let row = 1;
        row < ROWS - 1;
        row++
    ) {

        for (
            let col = 1;
            col < COLS - 1;
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
                    col - tile.col
                )
                +
                Math.abs(
                    row - tile.row
                );

            if (
                distance >= 3 &&
                distance <= 7
            ) {

                options.push({
                    col,
                    row
                });
            }
        }
    }

    if (!options.length) {
        return null;
    }

    return options[
        Math.floor(
            Math.random() *
            options.length
        )
    ];
}


// ==========================================================
// GUARD MOVEMENT
// ==========================================================

function moveGuardAlongPath(
    guard
) {

    if (!guard.path.length) {

        guard.moving = false;

        return;
    }

    const next =
        guard.path[0];

    const tx =
        next.col * TILE +
        TILE / 2 -
        guard.width / 2;

    const ty =
        next.row * TILE +
        TILE / 2 -
        guard.height / 2;

    const dx =
        tx - guard.x;

    const dy =
        ty - guard.y;

    const distance =
        Math.hypot(dx, dy);

    if (distance < 1) {

        guard.x = tx;
        guard.y = ty;

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
        dx / distance *
        movement;

    guard.y +=
        dy / distance *
        movement;
}


// ==========================================================
// GUARDS
// ==========================================================

function updateGuards() {

    const difficulty =
        getDifficulty();

    for (const guard of guards) {

        const target =
            getGuardTarget(guard);

        if (target) {

            if (
                guard.state !== "chase"
            ) {
                playSFX(alertSound);
            }

            guard.state = "chase";

            guard.lastSeenPlayer =
                getCharacterTile(target);

            guard.speed =
                difficulty.guardSpeed;

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
                            target
                        )
                    );

                guard.pathTimer =
                    difficulty.pathDelay;
            }

        } else if (
            guard.state === "chase"
        ) {

            guard.state = "search";

            if (guard.lastSeenPlayer) {

                guard.path =
                    findPath(
                        getCharacterTile(
                            guard
                        ),
                        guard.lastSeenPlayer
                    );
            }

        } else if (
            guard.state === "search" &&
            guard.path.length === 0
        ) {

            guard.state = "patrol";

            guard.patrolTarget = null;
        }

        if (
            guard.state === "patrol"
        ) {

            guard.speed =
                difficulty.patrolSpeed;

            if (!guard.patrolTarget) {

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

            if (
                guard.path.length === 0
            ) {
                guard.patrolTarget = null;
            }
        }

        moveGuardAlongPath(guard);

        updateWalkAnimation(guard);

        checkGuardCatch(
            guard,
            player1
        );

        if (gameMode === 2) {

            checkGuardCatch(
                guard,
                player2
            );
        }
    }
}


// ==========================================================
// CAUGHT
// ==========================================================

function checkGuardCatch(
    guard,
    character
) {

    if (
        !character ||
        character.hidden
    ) {
        return;
    }

    if (
        !rectanglesTouch(
            guard,
            character
        )
    ) {
        return;
    }

    playSFX(caughtSound);

    if (gameMode === 2) {

        // Only reset the caught player.

        character.x =
            character.spawnX;

        character.y =
            character.spawnY;

        character.hidden = false;

        return;
    }

    lives--;

    if (lives <= 0) {

        lives = 0;

        gameState = "gameover";

        backgroundMusic.pause();

        updateHUD();

        return;
    }

    loadMap(
        singlePlayerLevels[
            currentLevel
        ],
        currentLevel
    );
}


// ==========================================================
// KEYS
// ==========================================================

function updateKeys() {

    if (
        key1 &&
        !key1.collected &&
        player1 &&
        rectanglesTouch(
            player1,
            key1
        )
    ) {

        key1.collected = true;

        player1HasKey = true;

        playSFX(keySound);
    }

    if (
        gameMode === 2 &&
        key2 &&
        !key2.collected &&
        player2 &&
        rectanglesTouch(
            player2,
            key2
        )
    ) {

        key2.collected = true;

        player2HasKey = true;

        playSFX(keySound);
    }

    updateHUD();
}


// ==========================================================
// EXITS
// ==========================================================

function updateExits() {

    if (
        player1 &&
        exit1 &&
        player1HasKey &&
        rectanglesTouch(
            player1,
            exit1
        )
    ) {

        if (gameMode === 1) {

            nextSinglePlayerLevel();

        } else {

            finishRace(1);
        }

        return;
    }

    if (
        gameMode === 2 &&
        player2 &&
        exit2 &&
        player2HasKey &&
        rectanglesTouch(
            player2,
            exit2
        )
    ) {

        finishRace(2);
    }
}


// ==========================================================
// NEXT SINGLE PLAYER LEVEL
// ==========================================================

function nextSinglePlayerLevel() {

    playSFX(escapeSound);

    score +=
        1000 +
        (currentLevel + 1) * 100 +
        lives * 250;

    const completed =
        currentLevel + 1;

    localStorage.setItem(
        `cellBlockEscapeCompleted_${completed}`,
        "1"
    );

    if (
        completed + 1 >
        highestUnlockedLevel &&
        completed <
        singlePlayerLevels.length
    ) {

        highestUnlockedLevel =
            completed + 1;

        localStorage.setItem(
            "cellBlockEscapeUnlockedLevel",
            highestUnlockedLevel
        );
    }

    if (
        currentLevel <
        singlePlayerLevels.length - 1
    ) {

        loadMap(
            singlePlayerLevels[
                currentLevel + 1
            ],
            currentLevel + 1
        );

    } else {

        finishSinglePlayer();
    }
}


// ==========================================================
// FINISH SINGLE PLAYER
// ==========================================================

function finishSinglePlayer() {

    score +=
        Math.max(
            0,
            10000 -
            Math.floor(
                elapsedTime / 1000
            ) * 10
        );

    saveHighScore();

    gameState = "victory";

    backgroundMusic.pause();
}


// ==========================================================
// FINISH RACE
// ==========================================================

function finishRace(
    playerNumber
) {

    winner = playerNumber;

    gameState = "roundover";

    playSFX(escapeSound);

    backgroundMusic.pause();
}


// ==========================================================
// HIGH SCORE
// ==========================================================

function saveHighScore() {

    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "cellBlockEscapeHighScore",
            highScore
        );
    }
}


// ==========================================================
// TIMER
// ==========================================================

function updateTimer() {

    elapsedTime =
        Date.now() -
        gameStartTime -
        pausedTime;

    const seconds =
        Math.floor(
            elapsedTime / 1000
        );

    const minutes =
        Math.floor(
            seconds / 60
        );

    timerDisplay.textContent =
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(seconds % 60)
            .padStart(2, "0");
}


// ==========================================================
// HUD
// ==========================================================

function updateHUD() {

    const difficulty =
        getDifficulty();

    const theme =
        getLevelTheme();

    modeDisplay.textContent =
        gameMode === 2
            ? "2 PLAYER"
            : "1 PLAYER";

    levelDisplay.textContent =
        currentLevel + 1;

    totalLevelsDisplay.textContent =
        singlePlayerLevels.length;

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

    p1KeyDisplay.textContent =
        player1HasKey
            ? "FOUND"
            : "NOT FOUND";

    p2KeyDisplay.textContent =
        player2HasKey
            ? "FOUND"
            : "NOT FOUND";
}


// ==========================================================
// PAGE THEME
// ==========================================================

function updatePageTheme() {

    const maximum =
        gameMode === 1 &&
        currentLevel + 1 >= 10;

    document.body.classList.toggle(
        "maximum-security-theme",
        maximum
    );
}


// ==========================================================
// AUDIO
// ==========================================================

function playSFX(sound) {

    if (!sfxEnabled) return;

    sound.currentTime = 0;

    sound.play().catch(() => {});
}


function playMusic() {

    if (!musicEnabled) return;

    backgroundMusic.currentTime = 0;

    backgroundMusic
        .play()
        .catch(() => {});
}


function updateVolumes() {

    backgroundMusic.volume =
        Number(
            musicVolume.value
        ) / 100;

    const volume =
        Number(
            sfxVolume.value
        ) / 100;

    [
        keySound,
        caughtSound,
        escapeSound,
        alertSound,
        footstep1,
        footstep2
    ].forEach(
        sound =>
            sound.volume = volume
    );
}


// ==========================================================
// SETTINGS
// ==========================================================

function saveSettings() {

    localStorage.setItem(
        "cellBlockEscapeSettings",

        JSON.stringify({
            musicVolume:
                musicVolume.value,

            sfxVolume:
                sfxVolume.value,

            musicEnabled,

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
                settings.musicVolume ?? 35;

            sfxVolume.value =
                settings.sfxVolume ?? 70;

            musicEnabled =
                settings.musicEnabled ?? true;

            sfxEnabled =
                settings.sfxEnabled ?? true;

        } catch {}
    }

    musicToggle.textContent =
        musicEnabled
            ? "ON"
            : "OFF";

    sfxToggle.textContent =
        sfxEnabled
            ? "ON"
            : "OFF";

    updateVolumes();
}


// ==========================================================
// PAUSE
// ==========================================================

function openPauseMenu(
    menu
) {

    previousGameState =
        gameState;

    if (
        gameState === "playing"
    ) {

        pauseStartedAt =
            Date.now();
    }

    gameState = "paused";

    menu.classList.remove(
        "hidden"
    );
}


function resumeFromPause() {

    if (
        previousGameState ===
        "playing" &&
        pauseStartedAt
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
    () => openPauseMenu(
        settingsMenu
    )
);


resumeButton.addEventListener(
    "click",
    () => {

        settingsMenu.classList.add(
            "hidden"
        );

        resumeFromPause();
    }
);


helpButton.addEventListener(
    "click",
    () => {

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
    () => {

        helpMenu.classList.add(
            "hidden"
        );

        settingsMenu.classList.remove(
            "hidden"
        );
    }
);


aboutButton.addEventListener(
    "click",
    () => {

        settingsMenu.classList.add(
            "hidden"
        );

        aboutMenu.classList.remove(
            "hidden"
        );
    }
);


backFromAboutButton.addEventListener(
    "click",
    () => {

        aboutMenu.classList.add(
            "hidden"
        );

        settingsMenu.classList.remove(
            "hidden"
        );
    }
);


creditsButton.addEventListener(
    "click",
    () => {

        settingsMenu.classList.add(
            "hidden"
        );

        creditsMenu.classList.remove(
            "hidden"
        );
    }
);


backFromCreditsButton.addEventListener(
    "click",
    () => {

        creditsMenu.classList.add(
            "hidden"
        );

        settingsMenu.classList.remove(
            "hidden"
        );
    }
);


musicVolume.addEventListener(
    "input",
    () => {

        updateVolumes();
        saveSettings();
    }
);


sfxVolume.addEventListener(
    "input",
    () => {

        updateVolumes();
        saveSettings();
    }
);


musicToggle.addEventListener(
    "click",
    () => {

        musicEnabled =
            !musicEnabled;

        musicToggle.textContent =
            musicEnabled
                ? "ON"
                : "OFF";

        if (!musicEnabled) {

            backgroundMusic.pause();
        }

        saveSettings();
    }
);


sfxToggle.addEventListener(
    "click",
    () => {

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
// GAME MODE EVENTS
// ==========================================================

onePlayerButton.addEventListener(
    "click",
    () => startSinglePlayer(0)
);


twoPlayerButton.addEventListener(
    "click",
    startTwoPlayer
);


mainMenuButton.addEventListener(
    "click",
    () => {

        backgroundMusic.pause();

        gameState = "menu";

        gameModeMenu.classList.remove(
            "hidden"
        );
    }
);


// ==========================================================
// KEYBOARD
// ==========================================================

window.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();

        if (
            key.startsWith("arrow")
        ) {
            event.preventDefault();
        }

        keys[key] = true;

        if (
            gameState === "playing" &&
            key === "e"
        ) {

            toggleHiding(player1);
        }

        if (
            gameState === "playing" &&
            gameMode === 2 &&
            key === "enter"
        ) {

            event.preventDefault();

            toggleHiding(player2);
        }

        if (
            gameState === "playing" &&
            gameMode === 1 &&
            key === "r"
        ) {

            loadMap(
                singlePlayerLevels[
                    currentLevel
                ],
                currentLevel
            );
        }

        if (
            gameState === "roundover" &&
            key === "enter"
        ) {

            startTwoPlayer();
        }

        if (
            (
                gameState === "gameover" ||
                gameState === "victory"
            )
            &&
            key === "enter"
        ) {

            startSinglePlayer(0);
        }
    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;
    }
);


// ==========================================================
// LEVEL SELECT
// ==========================================================

const LEVELS_PER_PAGE = 12;

let levelPage = 0;


function drawLevelSelect() {

    levelGrid.innerHTML = "";

    const start =
        levelPage *
        LEVELS_PER_PAGE;

    const end =
        Math.min(
            start +
            LEVELS_PER_PAGE,
            singlePlayerLevels.length
        );

    for (
        let i = start;
        i < end;
        i++
    ) {

        const number = i + 1;

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "level-button";

        if (
            number >
            highestUnlockedLevel
        ) {

            button.disabled = true;

            button.classList.add(
                "locked"
            );

            button.innerHTML =
                `🔒
                 <span class="level-stars">
                    ☆☆☆
                 </span>`;

        } else {

            const complete =
                localStorage.getItem(
                    `cellBlockEscapeCompleted_${number}`
                );

            button.innerHTML =
                `${number}
                 <span class="level-stars">
                    ${complete
                        ? "★★★"
                        : "☆☆☆"}
                 </span>`;

            button.addEventListener(
                "click",
                () => {

                    levelSelectMenu
                        .classList
                        .add("hidden");

                    startSinglePlayer(i);
                }
            );
        }

        if (i === currentLevel) {

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
            singlePlayerLevels.length /
            LEVELS_PER_PAGE
        );

    levelPageDisplay.textContent =
        `${levelPage + 1} / ${pages}`;

    previousLevelsButton.disabled =
        levelPage === 0;

    nextLevelsButton.disabled =
        levelPage >= pages - 1;
}


levelSelectButton.addEventListener(
    "click",
    () => {

        if (gameMode !== 1) return;

        openPauseMenu(
            levelSelectMenu
        );

        levelPage =
            Math.floor(
                currentLevel /
                LEVELS_PER_PAGE
            );

        drawLevelSelect();
    }
);


previousLevelsButton.addEventListener(
    "click",
    () => {

        if (levelPage > 0) {

            levelPage--;

            drawLevelSelect();
        }
    }
);


nextLevelsButton.addEventListener(
    "click",
    () => {

        const pages =
            Math.ceil(
                singlePlayerLevels.length /
                LEVELS_PER_PAGE
            );

        if (
            levelPage <
            pages - 1
        ) {

            levelPage++;

            drawLevelSelect();
        }
    }
);


closeLevelSelectButton.addEventListener(
    "click",
    () => {

        levelSelectMenu.classList.add(
            "hidden"
        );

        resumeFromPause();
    }
);


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
    }

    ctx.lineWidth = 1;
}


// ==========================================================
// MAP
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

            const x = col * TILE;
            const y = row * TILE;

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
// WALL-MOUNTED EXIT
// ==========================================================

function drawExit(
    exit,
    open,
    playerNumber
) {

    if (!exit) return;

    const theme =
        getLevelTheme();

    const x = exit.x;
    const y = exit.y;

    // Wall backing

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

    // Dark door frame

    ctx.fillStyle = "#25100c";

    ctx.fillRect(
        x + 7,
        y + 3,
        TILE - 14,
        TILE - 4
    );

    // Door

    ctx.fillStyle =
        open
            ? "#2e7d32"
            : "#8b1010";

    ctx.fillRect(
        x + 10,
        y + 7,
        TILE - 20,
        TILE - 11
    );

    // Player-specific frame

    ctx.strokeStyle =
        playerNumber === 2
            ? "#b388ff"
            : "#ffd600";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        x + 9,
        y + 6,
        TILE - 18,
        TILE - 9
    );

    // Handle

    ctx.fillStyle =
        playerNumber === 2
            ? "#b388ff"
            : "#ffd600";

    ctx.fillRect(
        x + TILE - 17,
        y + 20,
        4,
        5
    );

    ctx.lineWidth = 1;
}


// ==========================================================
// KEY
// ==========================================================

function drawKey(
    key,
    color
) {

    if (
        !key ||
        key.collected
    ) {
        return;
    }

    const x =
        key.x + 10;

    const y =
        key.y + 10;

    ctx.strokeStyle = color;

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

    ctx.moveTo(x, y);

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
// LOCKERS
// ==========================================================

function drawHidingSpots() {

    for (
        const spot
        of hidingSpots
    ) {

        ctx.fillStyle = "#252b2e";

        ctx.fillRect(
            spot.x,
            spot.y,
            spot.width,
            spot.height
        );

        ctx.fillStyle = "#626d72";

        ctx.fillRect(
            spot.x + 3,
            spot.y + 2,
            spot.width - 6,
            spot.height - 4
        );

        ctx.fillStyle = "#30383c";

        ctx.fillRect(
            spot.x + 8,
            spot.y + 13,
            spot.width - 16,
            2
        );

        ctx.fillRect(
            spot.x + 8,
            spot.y + 17,
            spot.width - 16,
            2
        );

        ctx.fillStyle = "#ffd54f";

        ctx.fillRect(
            spot.x +
            spot.width - 9,
            spot.y + 21,
            3,
            6
        );
    }
}


// ==========================================================
// CHARACTER
// ==========================================================

function drawCharacter(
    character,
    guard = false
) {

    if (
        !character ||
        character.hidden
    ) {
        return;
    }

    const x =
        Math.round(character.x);

    const y =
        Math.round(character.y);

    const step =
        character.moving
            ? (
                character.walkFrame
                    ? 2
                    : -2
            )
            : 0;

    // Shadow

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

    // Legs

    ctx.fillStyle =
        guard
            ? "#143b60"
            : character.playerNumber === 2
                ? "#512da8"
                : "#c45700";

    ctx.fillRect(
        x + 6,
        y + 20 + step,
        6,
        7
    );

    ctx.fillRect(
        x + 15,
        y + 20 - step,
        6,
        7
    );

    // Body

    ctx.fillStyle =
        guard
            ? "#245f91"
            : character.playerNumber === 2
                ? "#7e57c2"
                : "#f57c00";

    ctx.fillRect(
        x + 6,
        y + 10,
        15,
        14
    );

    // Head

    ctx.fillStyle = "#d69461";

    ctx.fillRect(
        x + 8,
        y + 2,
        12,
        10
    );

    // Hat/hair

    ctx.fillStyle =
        guard
            ? "#102d48"
            : "#3b2618";

    ctx.fillRect(
        x + 8,
        y,
        12,
        4
    );

    if (guard) {

        ctx.fillRect(
            x + 5,
            y + 4,
            18,
            3
        );
    }

    // Eyes

    ctx.fillStyle = "#111";

    if (
        character.direction === "down"
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
}


// ==========================================================
// GUARD ALERT
// ==========================================================

function drawGuardAlert(
    guard
) {

    if (
        guard.state === "patrol"
    ) {
        return;
    }

    ctx.textAlign = "center";

    ctx.font =
        "bold 21px Arial";

    ctx.fillStyle =
        guard.state === "chase"
            ? "#ff1744"
            : "#fff176";

    ctx.fillText(
        guard.state === "chase"
            ? "!"
            : "?",
        guard.x +
        guard.width / 2,
        guard.y - 6
    );

    ctx.textAlign = "left";
}


// ==========================================================
// OVERLAYS
// ==========================================================

function drawOverlay() {

    if (
        gameState === "playing" ||
        gameState === "paused" ||
        gameState === "menu"
    ) {
        return;
    }

    ctx.fillStyle =
        "rgba(0,0,0,.85)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";

    if (
        gameState === "roundover"
    ) {

        ctx.fillStyle =
            winner === 1
                ? "#ff9800"
                : "#b388ff";

        ctx.font =
            "bold 52px monospace";

        ctx.fillText(
            `PLAYER ${winner} WINS!`,
            canvas.width / 2,
            220
        );

        ctx.fillStyle = "#fff";

        ctx.font =
            "20px monospace";

        ctx.fillText(
            "FIRST PRISONER TO ESCAPE!",
            canvas.width / 2,
            285
        );

        ctx.fillStyle = "#ffd54f";

        ctx.fillText(
            "PRESS ENTER FOR A RANDOM REMATCH",
            canvas.width / 2,
            360
        );
    }

    if (
        gameState === "gameover"
    ) {

        ctx.fillStyle = "#ff5252";

        ctx.font =
            "bold 55px monospace";

        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            220
        );

        ctx.fillStyle = "#ffd54f";

        ctx.font =
            "20px monospace";

        ctx.fillText(
            "PRESS ENTER TO TRY AGAIN",
            canvas.width / 2,
            330
        );
    }

    if (
        gameState === "victory"
    ) {

        ctx.fillStyle = "#69f0ae";

        ctx.font =
            "bold 50px monospace";

        ctx.fillText(
            "YOU ESCAPED!",
            canvas.width / 2,
            190
        );

        ctx.fillStyle = "#fff";

        ctx.font =
            "20px monospace";

        ctx.fillText(
            "ALL 20 LEVELS CLEARED",
            canvas.width / 2,
            250
        );

        ctx.fillStyle = "#ffd54f";

        ctx.fillText(
            `SCORE: ${score}`,
            canvas.width / 2,
            300
        );

        ctx.fillText(
            `HIGH SCORE: ${highScore}`,
            canvas.width / 2,
            340
        );
    }

    ctx.textAlign = "left";
}


// ==========================================================
// UPDATE
// ==========================================================

function update() {

    if (
        gameState !== "playing"
    ) {
        return;
    }

    updateTimer();

    updatePlayers();

    updateKeys();

    updateExits();

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

    drawExit(
        exit1,
        player1HasKey,
        1
    );

    if (gameMode === 2) {

        drawExit(
            exit2,
            player2HasKey,
            2
        );
    }

    drawKey(
        key1,
        "#fff200"
    );

    if (gameMode === 2) {

        drawKey(
            key2,
            "#b388ff"
        );
    }

    for (
        const guard
        of guards
    ) {

        drawCharacter(
            guard,
            true
        );

        drawGuardAlert(
            guard
        );
    }

    drawCharacter(
        player1
    );

    if (gameMode === 2) {

        drawCharacter(
            player2
        );
    }

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
// INITIALIZE
// ==========================================================

loadSettings();

highScoreDisplay.textContent =
    highScore;

loadMap(
    singlePlayerLevels[0],
    0
);

gameState = "menu";

gameLoop();