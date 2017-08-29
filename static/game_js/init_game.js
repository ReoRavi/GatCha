var user = {};
var user_options = {
	sound : true
};

var rankData = [];

// socket start

//var socket = io("https://kittencompany.co.kr:4000");



// 144hz -> 60hz

var funcsList = [];

var requestAnimationFrame_backup = requestAnimationFrame;
requestAnimationFrame = function(_target){
	funcsList.push(_target);
}

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function looper(){
	requestAnimationFrame_backup(looper);
	now = Date.now();
	delta = now - then;
	if(delta > interval){
		then = now - (delta % interval);
		var length = funcsList.length;
		for(var i=0;i<length;i++){
			funcsList.shift()();
		}
	}
}
looper();


// pixi renderer start

var ratio = window.devicePixelRatio;
var ratio2 = window.devicePixelRatio;
var width = window.innerWidth*ratio;
var height = window.innerHeight*ratio;
if(width > 750){
	height = height * 750 / width;
	width = 750;
	ratio2 = width / window.innerWidth;
}

//if(width / height > 750 / 1334){
//	height = width / 750 * 1334;
//}

//var renderer = new PIXI.autoDetectRenderer(width, height, {
//});
var renderer = new PIXI.WebGLRenderer(width, height, {
});


var target = new PIXI.Container();

document.body.appendChild(renderer.view);
$(renderer.view).css('position', 'absolute');

$(document).ready(function(){
	$(renderer.view).css('width', '100%');
//	$(renderer.view).css('height', '100%');
//	$(renderer.view).css('left', '50%');
//	$(renderer.view).css('transform', 'translate(-50%, 0%)');
});



//var meter = new FPSMeter();

animate();
function animate() {
    requestAnimationFrame(animate);
	renderer.render(target);
//	meter.tick();
}


//pah(target, "./static/img/scene-title/titlebg.jpg", 0, 0, width, height);
var loadingText = paht(target, "Loading...", {font: width / 750 * 60 + 'px CooperBlackStd',	fill: '#3d5d32'}, width / 2, height - width / 750 * 299, {anchor : 0.5});

// Loader Start



//console.log('load start');


var playerFacebookID = -1;
var playerFacebookName = 0;
var playerFacebookImage = 0;
var playerData = null;

var isFbSdkLoaded = 0;


if(isFb == 1){
	FBInstant.initializeAsync().then(function() {
	  // Many properties will be null until the initialization completes.
	  // This is a good place to fetch them:
	  var locale = FBInstant.getLocale(); // 'en_US'
	  var platform = FBInstant.getPlatform(); // 'IOS', 'ANDROID' or 'WEB'
	  var sdkVersion = FBInstant.getSDKVersion(); // '2.0'
	  var playerID = FBInstant.player.getID();
	  var playerName = FBInstant.player.getName();
	  var playerImage = FBInstant.player.getPhoto();
		playerFacebookID = playerID;
		playerFacebookName = playerName;
		playerFacebookImage = playerImage;
		playerData = FBInstant.getEntryPointData();

		isFbSdkLoaded = 1;
	});
}



PIXI.loader
	.add("./static/img/black.png")
	.add("./static/img/transparent.png")
	.add("./static/img/white.png")

	.add("./static/img/crane/crane01.png")
	.add("./static/img/crane/crane02.png")
	.add("./static/img/crane/crane03.png")
	.add("./static/img/crane/crane04.png")
	.add("./static/img/crane/crane05.png")
	.add("./static/img/crane/crane06.png")
	.add("./static/img/crane/crane07.png")
	.add("./static/img/crane/crane08.png")
	.add("./static/img/crane/crane09.png")
	.add("./static/img/crane/crane10.png")
	.add("./static/img/crane/crane11.png")
	.add("./static/img/crane/crane12.png")
	.add("./static/img/crane/crane13.png")
	.add("./static/img/crane/crane14.png")
	.add("./static/img/crane/crane15.png")
	.add("./static/img/crane/crane16.png")
	.add("./static/img/crane/crane17.png")
	.add("./static/img/crane/crane18.png")
	.add("./static/img/crane/crane19.png")
	.add("./static/img/crane/crane20.png")
	.add("./static/img/crane/crane21.png")

	.add("./static/img/scene-main/allclearwindow.png")
	.add("./static/img/scene-main/buttonclose.png")
	.add("./static/img/scene-main/buttonshare.png")
	.add("./static/img/scene-main/coilline.png")
	.add("./static/img/scene-main/glassbox.png")
	.add("./static/img/scene-main/lvbar.png")
	.add("./static/img/scene-main/lvbar-bg.png")
	.add("./static/img/scene-main/lvbarend.png")
	.add("./static/img/scene-main/lvupwindow-fb.png")
	.add("./static/img/scene-main/main-bg.jpg")
	.add("./static/img/scene-main/playwithfriends.png")
	.add("./static/img/scene-main/rankwindowbottom.png")
	.add("./static/img/scene-main/takebt.png")
	.add("./static/img/scene-main/timelinebar.png")
	.add("./static/img/scene-main/timelineclose.png")
	.add("./static/img/scene-main/timerbox.png")

	.add("./static/img/scene-main/exp-count/0.png")
	.add("./static/img/scene-main/exp-count/1.png")
	.add("./static/img/scene-main/exp-count/2.png")
	.add("./static/img/scene-main/exp-count/3.png")
	.add("./static/img/scene-main/exp-count/4.png")
	.add("./static/img/scene-main/exp-count/5.png")
	.add("./static/img/scene-main/exp-count/6.png")
	.add("./static/img/scene-main/exp-count/7.png")
	.add("./static/img/scene-main/exp-count/8.png")
	.add("./static/img/scene-main/exp-count/9.png")
	.add("./static/img/scene-main/exp-count/p.png")

	.add("./static/img/scene-play/캐릭터/small/small01.png")
	.add("./static/img/scene-play/캐릭터/small/small02.png")
	.add("./static/img/scene-play/캐릭터/small/small03.png")
	.add("./static/img/scene-play/캐릭터/small/small04.png")
	.add("./static/img/scene-play/캐릭터/small/small05.png")
	.add("./static/img/scene-play/캐릭터/small/small06.png")
	.add("./static/img/scene-play/캐릭터/small/small07.png")
	.add("./static/img/scene-play/캐릭터/small/small08.png")
	.add("./static/img/scene-play/캐릭터/small/small09.png")
	.add("./static/img/scene-play/캐릭터/small/small10.png")
	.add("./static/img/scene-play/캐릭터/small/small11.png")
	.add("./static/img/scene-play/캐릭터/small/small12.png")
	.add("./static/img/scene-play/캐릭터/small/small13.png")
	.add("./static/img/scene-play/캐릭터/small/small14.png")
	.add("./static/img/scene-play/캐릭터/small/small15.png")
	.add("./static/img/scene-play/캐릭터/small/small16.png")
	.add("./static/img/scene-play/캐릭터/small/small17.png")
	.add("./static/img/scene-play/캐릭터/small/small18.png")
	.add("./static/img/scene-play/캐릭터/small/small19.png")
	.add("./static/img/scene-play/캐릭터/small/small20.png")
	.add("./static/img/scene-play/캐릭터/small/small21.png")

	.add("./static/svg/crane01.svg")
	.add("./static/svg/crane02.svg")
	.add("./static/svg/crane03.svg")
	.add("./static/svg/crane04.svg")
	.add("./static/svg/crane05.svg")
	.add("./static/svg/crane06.svg")
	.add("./static/svg/crane07.svg")
	.add("./static/svg/crane08.svg")
	.add("./static/svg/crane09.svg")
	.add("./static/svg/crane10.svg")
	.add("./static/svg/crane11.svg")
	.add("./static/svg/crane12.svg")
	.add("./static/svg/crane13.svg")
	.add("./static/svg/crane14.svg")
	.add("./static/svg/crane15.svg")
	.add("./static/svg/crane16.svg")
	.add("./static/svg/crane17.svg")
	.add("./static/svg/crane18.svg")
	.add("./static/svg/crane19.svg")
	.add("./static/svg/crane20.svg")
	.add("./static/svg/crane21.svg")

	.add("./static/svg/timerbox1.svg")
	.add("./static/svg/timerbox2.svg")


	.load(function(){
		isStart = 1;
		loadingText.text = "Loading End!";

		ajax("checkLogin2", {
			facebookID : playerFacebookID,
			facebookName : playerFacebookName,
			facebookImage : playerFacebookImage
		}, function(d){
			sound_play('bgm_all_sound', {loop : true});
			start_game();
			console.log('checkLogin : ' , d);
			if(typeof d.user !== 'undefined'){
				user = d.user;
				if(isFb == 1){

					function fbLoaded(){
						var connectedPlayers = FBInstant.player.getConnectedPlayersAsync()
						.then(function(players2) {
							ajax("rankdata_fb", {
								players : JSON.stringify(players2),
								idx : playerFacebookID
							}, function(d){
								rankData = d;
								FBInstant.startGameAsync().then(function() {
									curtain(title_page);
								});
							});
						});
					}

					if(isFbSdkLoaded == 0){
						var fbTimer = setInterval(function(){
							if(isFbSdkLoaded == 1){
								clearInterval(fbTimer);
								fbLoaded();
							}
						}, 1000 / 60);
					}else{
						fbLoaded();
					}



				}else{
					ajax("rankdata", "", function(d){
						console.log('rankData', d);
						rankData = d;
						curtain(title_page);
					});
				}
			}else{
				var accessToken = "";
				try{
					accessToken = location.href.split('access_token=')[1].split('&')[0];
				}catch(e){

				}
				if(accessToken == ""){
					window.location = "https://www.facebook.com/v2.9/dialog/oauth?client_id=510759675982209&redirect_uri=https://prena.io/toybox3/&response_type=token";
				}else{
					ajax("login/facebook_login", {
						'accessToken' : accessToken
					},function(d){
						console.log(d);
						if(d.facebookID == -1){
							window.location = "https://www.facebook.com/v2.9/dialog/oauth?client_id=510759675982209&redirect_uri=https://prena.io/toybox3/&response_type=token";
						}else{
							playerFacebookID = d.facebookID;
							playerFacebookName = d.facebookName;
							playerFacebookImage = d.facebookImage;
							ajax("checkLogin2", {
								facebookID : playerFacebookID,
								facebookName : playerFacebookName,
								facebookImage : playerFacebookImage
							}, function(d){
								user = d.user;
								ajax("rankdata", "", function(d){
									console.log('rankData', d);
									rankData = d;
									curtain(title_page);
								});
							});
						}

					});
				}
			}
		});

		sound = {
			bgm_all_sound : new Howl({
				src: ['./static/sound/pangyabgm1.mp3'],
				loop: true
			}),
			button_sound : new Howl({
				src: ['./static/sound/buttonsound.mp3']
			}),
			craneclose : new Howl({
				src: ['./static/sound/crane-close.mp3']
			}),
			craneend : new Howl({
				src: ['./static/sound/crane-end.mp3']
			}),
			cranerill : new Howl({
				src: ['./static/sound/crane-rill.mp3']
			}),
			cranestop : new Howl({
				src: ['./static/sound/crane-stop.mp3']
			}),
			cranetick : new Howl({
				src: ['./static/sound/crane-tick.mp3']
			}),
			stopsd : new Howl({
				src: ['./static/sound/stopsd.wav']
			}),
			win_sound : new Howl({
				src: ['./static/sound/winvoice.mp3']
			}),
			toyplus : new Howl({
				src: ['./static/sound/toyplus.mp3']
			}),
			success : new Howl({
				src: ['./static/sound/success.mp3']
			}),
			cranebgm : new Howl({
				src: ['./static/sound/cranebgm.mp3']
			})
		};
	})

	.onProgress.add(function(info){
		loadingText.text = "Loading..." + Math.floor(info.progress) + '%';
		if(isFb == 1){
			FBInstant.setLoadingProgress(Math.floor(info.progress));
		}
	});

fontSpy('CooperBlackStd', {
	success: function(){
		//start_game();
	}
});






var isStart = 0;

var startIndex = 0;
function start_game(){
	//startIndex++;
	//if(startIndex == 2){

	//}
}

