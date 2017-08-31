var width = 750;
var height = 1334;

var renderer = new PIXI.WebGLRenderer(width, height, {});


var container = new PIXI.Container();

document.body.appendChild(renderer.view);

var ball = new Array();
var ballBody = new Array();

var backGround;
var backGround2;
var backGround3;
var backGround4;
var backGround5;

var ballMaxCount;

// 0 : load
// 1 : Game
// 2 : Get
// 3 : Wait Click Reward
var gameState = 0;

var exit;

var kickButton;
var getButton;

var engine;
var runner;

var Engine, Runner, World, Bodies;

// matter Init and Link Object
function Init() {
    Engine = Matter.Engine,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies;

    engine = Engine.create();
    runner = Runner.create();

    backGround2 = Bodies.polygon(200, 460, 3, 60);

    var ground = Bodies.rectangle(width / 2, 1060, 80, 20, {isStatic: true});

    backGround2 = Bodies.rectangle(150, 844, 524, 20, { isStatic: true, angle: Math.PI * 0.26 });
    backGround3 = Bodies.rectangle((width) - 150, 844, 524, 20, { isStatic: true, angle: -Math.PI * 0.26 });
    backGround4 = Bodies.rectangle(0, 320, 20, 700,  { isStatic: true });
    backGround5 = Bodies.rectangle(width, 320, 20, 700, { isStatic: true });

    Engine.run(engine);
    Runner.run(runner, engine);

    backGround = pah(container, "./static/Img/BackGround.png", 0, 0, 750, 1344);

    var xCount = 60;
    var yCount = 0;

    ballMaxCount = 50;

    for (var i = 0; i < ballMaxCount ; i++) {
        if (xCount > width) {
            yCount += 80;
            xCount = 60;
        }

        if (i % 5 == 0) {
            ballBody[i] = Bodies.circle((xCount), (yCount), 40);
            ball[i] = pah(container, "./static/Img/BigBall.png", ballBody[i].x, ballBody[i].y, 80, 80, {anchor : 0.5});
            World.add(engine.world, ballBody[i]);

            xCount += 80;
        }
        else
        {
            ballBody[i] = Bodies.circle((xCount), (yCount), 30);
            ball[i] = pah(container, "./static/Img/ball.png", ballBody[i].x, ballBody[i].y, 60, 60, {anchor: 0.5});
            World.add(engine.world, ballBody[i]);

            xCount += 80;
        }

    }


    exit = pah(container, "./static/Img/Exit.png", 287, 1010, 177, 167);

    World.add(engine.world, [ground, backGround2, backGround3, backGround4, backGround5]);

    // create renderer
    var render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {

            width: width,
            height: height,
            showCollisions: true,
            showPositions: true,
            showBounds: true,
            showIds: true,
        }
    });

    Matter.Render.run(render);

    kickButton = pah(container, "./static/Img/Kick.png", 100, 1175, 104, 102);
    getButton = pah(container, "./static/Img/Get.png", 550, 1175, 104, 102);

    gameState = 1;

    kickButton.interactive = true;
    kickButton.buttonMode = true;
    kickButton.on('pointerdown', KickButtonClick);

    getButton.interactive = true;
    getButton.buttonMode = true;
    getButton.on('pointerdown', GetButtonClick);
}

Init();
Loop();

function Loop() {
    requestAnimationFrame(Loop);
    renderer.render(container);

    for (var i = 0; i < ball.length; i++) {
        if (ballBody[i].position.y >= height)
            console.log(i);

        ball[i].position.x = ballBody[i].position.x;
        ball[i].position.y = ballBody[i].position.y;
    }

    switch (gameState) {
        case 1 :

            break;

        case 2 :
            console.log(1);

            if (ball[selectedIndex].position.y < 1180) {
                ball[selectedIndex].position.x = width / 2;
                ball[selectedIndex].position.y += 2;
                ballBody[selectedIndex].position.y += 2;
            }
            else
            {
                ball[selectedIndex].interactive = true;
                ball[selectedIndex].buttonMode = true;
                ball[selectedIndex].on('pointerdown', GetReward);

                gameState = 3;
            }

            break;
    }
}

function KickButtonClick() {

}


var selectedIndex = 0;
function GetButtonClick() {
    var selectedBall;

    gameState = 2;

    selectedBall = ballBody[0];


    for (var i = 0; i < ballBody.length; i++)
    {
        if (selectedBall.position.y < ballBody[i].position.y)
        {
            selectedIndex = i;
            selectedBall = ballBody[i];
            console.log(i + "y : " + selectedBall.position.y);
        }
    }

    console.log(selectedIndex);

    World.remove(engine.world, selectedBall);
}

function GetReward() {
    ball[selectedIndex].destroy();
    ball.splice(selectedIndex, 1);
    ballBody.splice(selectedIndex, 1);
    console.log("length : " + ball.length);
    gameState = 1;
    engine.world.gravity.y = 1;
}