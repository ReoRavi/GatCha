var sound = {
	bgm_all_sound : new Howl({
		src: ['./static/sound/pangyabgm1.mp3'],
		loop: true
	}),
};

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
 
function handleVisibilityChange() {
  if (document[hidden]) {
    Howler.mute(true);
  } else {
    Howler.mute(false);
  }
}

if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {

} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

function sound_play(target, options){
	if(options === undefined){
		options = {};
	}
	if(user_options.sound == true){
		if(typeof sound[target] === "undefined"){
			console.log("sound_play error : " + target);
		}else{
			sound[target].play();
			if(typeof options.loop !== "undefined"){
				sound[target].loop(options.loop);
			}
		}
	}
}

function sound_pause(target){
	sound[target].pause();
}

function sound_stop(target){
	sound[target].stop();
}

function sound_stopAll(){
	$.each(sound, function(index, value){
		value.stop();
	});
}

function sound_fade(target, from, to, duration){
	sound[target].fade(from, to, duration);
}

function sound_setVolume(target, volume){
	sound[target].volume(volume);
}

function curtain(_function, _data){
	for(var i=0;i<animList.length;i++){
		animList[i].tween.kill();
		animList[i].tween.clear();
	}
	animList = [];

	var curtain = pah(target, './static/img/black.png', 0, 0, width, height);
	curtain.alpha = 0;
	new anim().add(0, 1, 0.2, '', function(x){
		curtain.alpha = x;
	}, function(){
		for(var i=0;i<target.children.length;i++){
			target.children[i].destroy();
		}
		target.removeChildren();
		if(typeof(_data) !== "undefined"){
			_function(_data);
		}else{
			_function();
		}
		var curtain2 = pah(target, './static/img/black.png', 0, 0, width, height);
		new anim().add(1, 0, 0.2, '', function(x){
			curtain2.alpha = x;
		}, function(){
			curtain2.destroy();
//			target.removeChild(curtain2);		
		});
	});
}


function curtain_no(_function, _data){
	for(var i=0;i<animList.length;i++){
		animList[i].tween.kill();
		animList[i].tween.clear();
	}
	animList = [];

	if(typeof(_data) !== "undefined"){
		_function(_data);
	}else{
		_function();
	}
}

function number_spliter(number, center, gap){
	number = number.toString();
	var data = [];
	for(var i=0;i<number.length;i++){
		data[i] = {
			number : number[i],
			position : center - (number.length - 1) / 2 * gap + i * gap
		}
	}
	return data;
}

function number_spliter_right(number, right, gap){
	number = number.toString();
	var data = [];
	for(var i=0;i<number.length;i++){
		data[i] = {
			number : number[i],
			position : right - (number.length - i - 1) * gap
		}
	}
	return data;
}

function number_spliter_left(number, left, gap){
	number = number.toString();
	var data = [];
	for(var i=0;i<number.length;i++){
		data[i] = {
			number : number[i],
			position : left + (i) * gap
		}
	}
	return data;
}

function get_max_toy(exp){
	var level = get_level(exp).level;
	return level * 5;
}

function get_toy_size(count){
	var size = 0.7;
	if(count > 10000){
		count = 10000;
	}

	if(count < 200){
		size = 0.7 + (count - 1) / 199 * 0.8;
	}else if(count < 500){
		size = 1.5 + (count - 20) / 300 * 0.2;
	}
/*
	if(count < 100){
		size = 0.7 + (count - 1) / 99 * 0.2;
	}else if(count < 300){
		size = 0.9 + (count - 100) / 200 * 0.1;
	}else if(count < 500){
		size = 1.0 + (count - 300) / 200 * 0.1;
	}else if(count < 1000){
		size = 1.1 + (count - 500) / 500 * 0.1;
	}else{
		size = 1.2 + (count - 1000) / 9000 * 0.4
	}
*/
	return size;
}

function get_level(exp){
	var level = 1;
	var nextExp = 20;
	var nowExp = 0;
	if(exp == undefined){
		nowExp = user.exp;
	}else{
		nowExp = exp;
	}
	while(nowExp >= nextExp){
		level++;
		nowExp -= nextExp;
		nextExp *= 1.3;
		nextExp = Math.floor(nextExp);
	}
	return {level : level, nowExp : nowExp, nextExp : nextExp};
}

/*
function get_doll_level(exp){
	var level = 1;
	var nextExp = 3;
	var nowExp = 0;
	if(exp == undefined){
		nowExp = user.exp;
	}else{
		nowExp = exp;
	}
	while(nowExp >= nextExp){
		level++;
		nowExp -= nextExp;
		nextExp += 1;
	}

	if(level > 10){
		level = 10;
		nowExp = 1;
		nextExp = 1;
	}

	return {level : level, nowExp : nowExp, nextExp : nextExp};
}
*/

function get_doll_level(exp, key){
	var dollData = dollInfo[key];

	var data = {
		initLevel : 0,
		initExp : dollData.requireExp_init,
		upExp : dollData.requireExp_up,
		maxLevel : dollData.maxLevel
	}

	var level = data.initLevel;
	var nextExp = data.initExp;
	var nowExp = 0;
	if(exp == undefined){
		nowExp = user.exp;
	}else{
		nowExp = exp;
	}
	while(nowExp >= nextExp){
		level++;
		nowExp -= nextExp;
		nextExp += data.upExp;
	}

	if(level > data.maxLevel){
		level = data.maxLevel;
		nowExp = 1;
		nextExp = 1;
	}

	return {level : level, nowExp : nowExp, nextExp : nextExp};
}

var dollInfo = {
	"01" : {
		name : "Moi",
		desc : "Princess of Toyland. Everytoy loves her smilely face. She wears a hat with ears because her head is earless.",
		skill : "플레이시간",
		skill_initValue : 0.5,
		skill_upValue : 0.5,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"02" : {
		name : "Moongki",
		desc : "Always looking for someone to hang out with becasue Moongki cannot stand being alone.",
		skill : "뽑기확률",
		skill_initValue : 1,
		skill_upValue : 1,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"03" : {
		name : "Tomo",
		desc : "Prince of Toyland. He loves get attention from others. He thinks he is a celebrity.",
		skill : "크레인속도",
		skill_initValue : 0.25,
		skill_upValue : 0.25,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"04" : {
		name : "Lollie",
		desc : "Very shy toy. He likes to stay in a box all by himself. Also he knows very top secret of Toyland but too shy to speak.",
		skill : "피버획득량",
		skill_initValue : 0.025,
		skill_upValue : 0.025,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"05" : {
		name : "Benti",
		desc : "Everyone think he is father of Moi but he is not. (!?)",
		skill : "피버시간",
		skill_initValue : 0.5,
		skill_upValue : 0.5,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"06" : {
		name : "Noober",
		desc : "Eat, sleep, and eat again. This is how Noober lives his life.",
		skill : "코인획득량",
		skill_initValue : 5,
		skill_upValue : 5,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"07" : {
		name : "Vincent",
		desc : "All he thinks is how to escape from the Toy box to show how fast he is. ",
		skill : "플레이시간",
		skill_initValue : 0.5,
		skill_upValue : 0.5,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"08" : {
		name : "Nero",
		desc : "Nero is a puppy with shape of kitten. He may look silly but has eyes with full of ambition.",
		skill : "뽑기확률",
		skill_initValue : 1,
		skill_upValue : 1,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"09" : {
		name : "Yan",
		desc : "The youngest one in Toyland. She may look nice but once you disappoint her, there is no way to make it up to her. ",
		skill : "크레인속도",
		skill_initValue : 0.25,
		skill_upValue : 0.25,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},
	"10" : {
		name : "",
		desc : "",
		skill : "크레인속도",
		skill_initValue : 0,
		skill_upValue : 0,
		requireExp_init : 5,
		requireExp_up : 2,
		maxLevel : 5, 
	},


}

