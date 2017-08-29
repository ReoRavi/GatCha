window.fbAsyncInit = function() {
	FB.init({
		appId      : '510759675982209',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.8'
	});
};

(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/ko_KR/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function FaceBookSend(res){
	ajax("login/facebook_login", {
		'accessToken' : res.authResponse.accessToken
	},function(d){
		ajax("checkLogin", "", function(d){
			user = d.user;
			curtain(title_page);
		});
	});
}

function login_page(){
	var stage = new PIXI.Container();
	target.addChild(stage);
	var accessToken = "";
	try{
		accessToken = location.href.split('access_token=')[1].split('&')[0];
	}catch(e){

	}
	pah(stage, "./static/img/scene-title/titlebg.jpg", 0, 0, width, height);

/*
	FBInstant.player
	.getDataAsync(['toyCount', 'remainToyCount', 'remainToyTime'])
	.then(function(data) {
		console.log(data);
		if(typeof data['toyCount'] == "undefined"){


			FBInstant.player
			.setDataAsync({
				toyCount: 0,
				remainToyCount : 0,
				remainToyTime : moment().format("YYYY-MM-DD HH:mm:ss")
			}).then(function() {
				console.log('set data finished');
				user = {
					id : playerFacebookID,
					name : playerFacebookName,
					photo : {
						uri : playerFacebookImage	
					},
					toyCount : 0,
					remainToyCount : 0,
					remainToyTime : moment().format("YYYY-MM-DD HH:mm:ss"),
				};
				curtain(title_page);
			});
		}else{
			user = {
				id : playerFacebookID,
				name : playerFacebookName,
				photo : {
					uri : playerFacebookImage	
				},
				toyCount : data['toyCount'],
				remainToyCount : data['remainToyCount'],
				remainToyTime : data['remainToyTime'],
			};
			curtain(title_page);
		}
	});
*/


	ajax("checkLogin2", {
		facebookID : playerFacebookID,
		facebookName : playerFacebookName,
		facebookImage : playerFacebookImage
	}, function(d){
//		console.log('checkLogin : ' , d);
		if(typeof d.user !== 'undefined'){
			user = d.user;
			curtain(title_page);
		}else{
			if(accessToken == ""){
				var loginFacebookBt = pah(stage, "./static/img/scene-title/facebook_bt.png", width / 2, height - width / 750 * 339 + width / 750 * 140 / 2, width / 750 * 596, width / 750 * 140, {button:true, anchor:0.5}, '', function(){
					window.location = "https://www.facebook.com/v2.9/dialog/oauth?client_id=510759675982209&redirect_uri=https://prena.io/toybox3/&response_type=token";
//					location.href = "https://www.facebook.com/v2.9/dialog/oauth?client_id=510759675982209&redirect_uri=https://prena.io/toybox/&response_type=token";
				});

				pah(stage, "./static/img/scene-title/guest_bt.png", width / 2 - width / 750 * 254 / 2, height - width / 750 * 179, width / 750 * 254, width / 750 * 22, {}, function(){
					playerFacebookID = 1337796626316431;
					playerFacebookName = "권순조";
					playerFacebookImage = "https://fb-s-b-a.akamaihd.net/h-ak-fbx/v/t1.0-1/p50x50/16508980_12290843705…2b09d8a03f&oe=59CC427C&__gda__=1506839588_a5351dfd77a5e067c63634fcfdacf080";
					ajax("checkLogin2", {
						facebookID : playerFacebookID,
						facebookName : playerFacebookName,
						facebookImage : playerFacebookImage
					}, function(d){
						user = d.user;
						curtain(title_page);
					});
				});
			}else{
				ajax("login/facebook_login", {
					'accessToken' : accessToken
				},function(d){
//					console.log(d);
					if(d.facebookID == -1){
						var loginFacebookBt = pah(stage, "./static/img/scene-title/facebook_bt.png", width / 2, height - width / 750 * 339 + width / 750 * 140 / 2, width / 750 * 596, width / 750 * 140, {button:true, anchor:0.5}, '', function(){
							window.location = "https://www.facebook.com/v2.9/dialog/oauth?client_id=510759675982209&redirect_uri=https://prena.io/toybox3/&response_type=token";
		//					location.href = "https://www.facebook.com/v2.9/dialog/oauth?client_id=510759675982209&redirect_uri=https://prena.io/toybox/&response_type=token";
						});

						pah(stage, "./static/img/scene-title/guest_bt.png", width / 2 - width / 750 * 254 / 2, height - width / 750 * 179, width / 750 * 254, width / 750 * 22, {}, function(){
							playerFacebookID = 1337796626316431;
							playerFacebookName = "권순조";
							playerFacebookImage = "https://fb-s-b-a.akamaihd.net/h-ak-fbx/v/t1.0-1/p50x50/16508980_12290843705…2b09d8a03f&oe=59CC427C&__gda__=1506839588_a5351dfd77a5e067c63634fcfdacf080";
							ajax("checkLogin2", {
								facebookID : playerFacebookID,
								facebookName : playerFacebookName,
								facebookImage : playerFacebookImage
							}, function(d){
								user = d.user;
								curtain(title_page);
							});
						});
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
							pah(stage, "./static/img/scene-title/touchtoplay.png", width / 2 - width / 750 * 448 / 2, height - width / 750 * 299, width / 750 * 448, width / 750 * 54, {}, function(){
								curtain(title_page);
							});
						});
					}

				});
			}
		}
	});

}