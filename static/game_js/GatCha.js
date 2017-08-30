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

var ballMaxCount;

var exit;
// matter Init and Link Object
function Init() {
    var Engine = Matter.Engine,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies;

    var engine = Engine.create();
    var runner = Runner.create();

    backGround2 = Bodies.polygon(200, 460, 3, 60);

    var ground = Bodies.rectangle(width / 2, 1060, 80, 20, {isStatic: true});

    backGround2 = Bodies.rectangle(150, 844, 524, 20, { isStatic: true, angle: Math.PI * 0.26 });
    backGround3 = Bodies.rectangle((width) - 150, 844, 524, 20, { isStatic: true, angle: -Math.PI * 0.26 });

    Engine.run(engine);
    Runner.run(runner, engine);

    backGround = pah(container, "./static/Img/BackGround.png", 0, 0, 750, 1344);

    var xCount = 60;
    var yCount = 0;

    ballMaxCount = 50;

    for (var i = 0; i < ballMaxCount ; i++) {
        if (xCount > width) {
            yCount += 80;
            xCount = 0;
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

    /*for (var i = 0; i < ballMaxCount - 10; i++)
    {
        if (xCount > width) {
            yCount += 60;
            xCount = 0;
        }

        ballBody[i] = Bodies.circle((xCount), (yCount), 30);
        ball[i] = pah(container, "./static/Img/ball.png", ballBody[i].x, ballBody[i].y, 60, 60, {anchor:  0.5});
        World.add(engine.world, ballBody[i]);

        xCount += 60;
    }

    for (var i = ballMaxCount - 10; i < ballMaxCount; i++)
    {
        if (xCount > width) {
            yCount += 80;
            xCount = 0;
        }

        ballBody[i] = Bodies.circle((xCount), (yCount), 40);
        ball[i] = pah(container, "./static/Img/BigBall.png", ballBody[i].x, ballBody[i].y, 80, 80, {anchor : 0.5});
        World.add(engine.world, ballBody[i]);

        xCount += 80;
    }*/

    exit = pah(container, "./static/Img/Exit.png", 287, 1010, 177, 167);

    World.add(engine.world, [ground, backGround2, backGround3]);

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
}

Init();
Loop();

function Loop() {
    requestAnimationFrame(Loop);
    renderer.render(container);

    for (var i = 0; i < ballMaxCount; i++) {
        ball[i].position.x = ballBody[i].position.x;
        ball[i].position.y = ballBody[i].position.y;
    }
}