var width = 750;
var height = 1334;

var renderer = new PIXI.WebGLRenderer(width, height, {});


var container = new PIXI.Container();

document.body.appendChild(renderer.view);

var ball;
var ballBody;
var backGround;
var exit;
// matter Init and Link Object
function Init() {
    var Engine = Matter.Engine,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies;

    var engine = Engine.create();
    var runner = Runner.create();

    ballBody = Bodies.circle(380, 100, 40, 10);
    var ground = Bodies.rectangle(400, 1050, 810, 60, {isStatic: true});

    World.add(engine.world, [ballBody, ground]);

    Engine.run(engine);
    Runner.run(runner, engine);

    backGround = pah(container, "./static/Img/backGround.png", 0, 0, 750, 1344);
    ball = pah(container, "./static/Img/ball.png", ballBody.x, ballBody.y, ballBody.xOffset, ballBody.yOffset);
    exit = pah(container, "./static/Img/Exit.png", 287, 1000, 177, 167);
}

Init();
Loop();

function Loop() {
    requestAnimationFrame(Loop);
    renderer.render(container);

    console.log(ballBody.position.x);

    ball.position.x = ballBody.position.x;
    ball.position.y = ballBody.position.y;
}