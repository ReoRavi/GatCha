// Game Rate Sorted By height
// Game Width, Height
var width = 750;
var height = 1334;

// fixedRate
var fixedRate = window.innerHeight / height;
;
// Fixed Width, Height
var fixedWidthRate = (fixedRate) * width;
var fixedHeightRate = (fixedRate) * height;

if (fixedHeightRate >= height) {
    fixedWidthRate = width;
    fixedHeightRate = height;
}

var renderer = new PIXI.WebGLRenderer(fixedWidthRate, fixedHeightRate, {});
var container = new PIXI.Container();

document.body.appendChild(renderer.view);

// 0 : load
// 1 : Game
// 2 : Get
// 3 : Wait Click Reward
var gameState = 0;

// Ball Pixi Sprite Array
var ball = new Array();
// Ball Matter Body Array
var ballBody = new Array();

// BackGround
var backGround;
// Exit
var exit;
// Exit Bar
var exitBar;

// Button
var kickButton;
var getButton;

// Exit Bar Rotate
var rotateValue;

// Reward Values
var rewardBackGround;
var rewardIndex = 0;
var reward;
var isBigBall;

// Matter Engine Instance
var engine;

// Create Matter Rectangle Collider
function CreateRectangle(x, y, width, height, option, rate) {
    return Matter.Bodies.rectangle(x * rate, y * rate, width * rate, height * rate, option);
}

// Create Matter Circle Collider
function CreateCircle(x, y, radius, option, rate) {
    return Matter.Bodies.circle(x * rate, y * rate, radius * rate, option);
}

// Create Pixi Sprite
function CreatePixiSprite(container, path, x, y, width, height, rate, options){
    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage(path));

    if (x != undefined)
        sprite.x = x * rate;
    if (y != undefined)
        sprite.y = y * rate;
    if (width != undefined)
        sprite.width = width * rate;
    if (height != undefined)
        sprite.height = height * rate;

    if(options != undefined){
        if (options.anchor != 0)
        {
            sprite.anchor.set(options.anchor);
        }
    }

    container.addChild(sprite);

    return sprite;
}

// Matter Init and Link Object
function Init() {
    // Set Objects Image
    backGround = pah(container, "./static/Img/BackGround.png", 0, 0, 750 * fixedRate, 1344 * fixedRate);

    // Set Buttons
    kickButton = pah(container, "./static/Img/Kick.png", 100 * fixedRate, 1175 * fixedRate, 104 * fixedRate, 102 * fixedRate);
    kickButton.interactive = true;
    kickButton.buttonMode = true;
    kickButton.on('pointerdown', KickButtonClick);

    getButton = pah(container, "./static/Img/Get.png", 550 * fixedRate, 1175 * fixedRate, 104 * fixedRate, 102 * fixedRate);
    getButton.interactive = true;
    getButton.buttonMode = true;
    getButton.on('pointerdown', GetButtonClick);

    // Initialize Matter
    var Engine = Matter.Engine;
    var Runner = Matter.Runner;
    var World = Matter.World;
    var Render = Matter.Render;

    engine = Engine.create();
    var runner = Runner.create();

    // Create Ground Collider
    var ground = CreateRectangle(width / 2, 1070, 80, 20, {isStatic: true}, fixedRate);
    var ground2 = CreateRectangle(150, 844, 524, 20, {isStatic: true, angle: Math.PI * 0.26}, fixedRate);
    var ground3 = CreateRectangle((width) - 150, 844, 524, 20, {isStatic: true, angle: -Math.PI * 0.26}, fixedRate);
    var ground4 = CreateRectangle(0, 320, 20, 700, {isStatic: true}, fixedRate);
    var ground5 = CreateRectangle(width, 320, 20, 700, {isStatic: true}, fixedRate);

    World.add(engine.world, [ground, ground2, ground3, ground4, ground5]);

    // Create Ball Collider
    var xCount = 60;
    var yCount = 0;

    for (var i = 0; i < 50; i++) {
        if (xCount > width) {
            yCount += 80;
            xCount = 60;
        }

        if (i % 5 == 0) {
            ballBody[i] = CreateCircle((xCount), (yCount), 40, {}, fixedRate);
            ball[i] = CreatePixiSprite(container, "./static/Img/BigBall.png", ballBody[i].x, ballBody[i].y, 80, 80, fixedRate, {anchor: 0.5});
            World.add(engine.world, ballBody[i]);

            xCount += 80;
        }
        else {
            ballBody[i] = CreateCircle((xCount), (yCount), 30, {}, fixedRate);
            ball[i] = CreatePixiSprite(container, "./static/Img/ball.png", ballBody[i].x, ballBody[i].y, 60, 60, fixedRate, {anchor: 0.5});
            World.add(engine.world, ballBody[i]);

            xCount += 80;
        }
    }

    Engine.run(engine);
    Runner.run(runner, engine);

    // Create Matter Renderer
    /*var render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {

            width: fixedWidthRate,
            height: fixedHeightRate,
            showCollisions: true,
            showPositions: true,
            showBounds: true,
            showIds: true,
        }
    });

    Render.run(render);*/

    exit = CreatePixiSprite(container, "./static/Img/Exit.png", 287, 1010, 177, 167, fixedRate);
    exitBar = CreatePixiSprite(container, "./static/Img/ExitBar.png", 377, 1065, 200, 140, fixedRate, {anchor: 0.5});

    // Set Game State to Play
    gameState = 1;
}

// Game Loop
function Loop() {
    requestAnimationFrame(Loop);
    renderer.render(container);

    for (var i = 0; i < ball.length; i++) {
        ball[i].position.x = ballBody[i].position.x;
        ball[i].position.y = ballBody[i].position.y;
    }

    switch (gameState) {
        // Play
        case 1 :

            break;

        // Get Reward
        case 2 :
            if (ball[rewardIndex].position.y < 1180 * fixedRate) {
                ball[rewardIndex].position.x = fixedWidthRate / 2;
                ball[rewardIndex].position.y += 2;
                ballBody[rewardIndex].position.y += 2;

                if (rotateValue <= 6.2) {
                    exitBar.rotation += 0.1;
                    rotateValue += 0.1;
                }
            }
            else {
                ball[rewardIndex].position.x = fixedWidthRate / 2;
                ball[rewardIndex].interactive = true;
                ball[rewardIndex].buttonMode = true;
                ball[rewardIndex].on('pointerdown', ShowReward);

                gameState = 3;
            }

            break;

        // Click Reward and Show Result
        case 3 :
            exitBar.rotation = 0;
            ball[rewardIndex].position.x = fixedWidthRate / 2;

            break;
    }
}

// Kick Button CallBack
function KickButtonClick() {
    var force = fixedWidthRate * 0.0002;

    for (var i = 0; i < ball.length; i++) {
        Matter.Body.applyForce(ballBody[i], ballBody[i].position, {x: 0, y: -force / 2});
    }
}

// Get Button Call Back
function GetButtonClick() {
    if (gameState != 1)
        return;

    var selectedBall = ballBody[0];

    for (var i = 0; i < ballBody.length; i++) {
        if (selectedBall.position.y < ballBody[i].position.y) {
            rewardIndex = i;
            selectedBall = ballBody[i];
        }
    }

    if (selectedBall.position.y <= 1020 * fixedRate)
        return;

    if (ball[rewardIndex].width == 80 * fixedRate)
        isBigBall = true;
    else
        isBigBall = false;

    rotateValue = 0;

    gameState = 2;

    ball[rewardIndex].position.y = 1120 * fixedRate;
    Matter.World.remove(engine.world, selectedBall);
}

// Show Reward Call Back
function ShowReward() {
    rewardBackGround = pah(container, "./static/Img/RewardBackGround.png", 0, 0, 750 * fixedRate, 1344 * fixedRate);
    rewardBackGround.interactive = true;
    rewardBackGround.buttonMode = true;
    rewardBackGround.on('pointerdown', CloseReward);

    var ballPath;

    if (isBigBall)
        ballPath = "./static/Img/BigBall.png";
    else
        ballPath = "./static/Img/ball.png";

    reward = CreatePixiSprite(container, ballPath, width / 2, height / 2, 100, 100, fixedRate, {anchor : 0.5});

    ball[rewardIndex].destroy();

    ball.splice(rewardIndex, 1);
    ballBody.splice(rewardIndex, 1);
    gameState = 1;
}

// Close Reward Call Back
function CloseReward() {
    rewardBackGround.destroy();
    reward.destroy();
}

Init();
Loop();