function PIXI_TEXT_HELPER(_text, _font, _x, _y, _anchor){
	if(_anchor === undefined){
		_anchor = 0;
	}
	var pixi_text = new PIXI.Text(_text, _font);
	pixi_text.x = _x;
	pixi_text.y = _y;
	if(_anchor != 0){
		pixi_text.anchor.set(_anchor);
	}
	return pixi_text;
}

function PIXI_SPRITE_HELPER(_res, _x, _y, _width, _height, _function, _function2){
	if(_x === undefined){
		_x = null;
	}
	if(_y === undefined){
		_y = null;
	}
	if(_width === undefined){
		_width = null;
	}
	if(_height === undefined){
		_height = null;
	}
	if(_function === undefined){
		_function = "";
	}
	if(_function2 === undefined){
		_function2 = "";
	}

	var pixi_sprite;
	if(_res == ""){
		pixi_sprite = new PIXI.Sprite();
	}else if(typeof(_res) == "string"){
		pixi_sprite = new PIXI.Sprite(PIXI.Texture.fromImage(_res));
	}else{
		pixi_sprite = new PIXI.Sprite(_res);
	}

	if(_x != null)
		pixi_sprite.x = _x;
	if(_y != null)
		pixi_sprite.y = _y;
	if(_width != null)
		pixi_sprite.width = _width;
	if(_height != null)
		pixi_sprite.height = _height;

	if(typeof(_function) == "function"){
		pixi_sprite.interactive = true;
		pixi_sprite.buttonMode = true;
//		pixi_sprite.on('mousedown', _function);
//		pixi_sprite.on('touchstart', _function);
		pixi_sprite.on('pointerdown', _function);
	}

	if(typeof(_function2) == "function"){
		pixi_sprite.interactive = true;
		pixi_sprite.buttonMode = true;
//		pixi_sprite.on('mouseup', _function2);
//		pixi_sprite.on('touchend', _function2);
		pixi_sprite.on('pointerup', _function2);
	}

	return pixi_sprite;
}

function PIXI_ADDCHILD_HELPER(_stage, _res){
	_stage.addChild(_res);
	return _res;
}

function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

function pg_rect(_stage, _x, _y, _width, _height){
	var pixi_graphics = new PIXI.Graphics();
	pixi_graphics.beginFill(0x0000ff, 1);
	pixi_graphics.lineStyle(0);
	pixi_graphics.drawRect(_x, _y, _width, _height);

	_stage.addChild(pixi_graphics);
	return pixi_graphics;
}

function pg_circle(_stage, _x, _y, _rad){
	var pixi_graphics = new PIXI.Graphics();
	pixi_graphics.beginFill(0x0000ff, 1);
	pixi_graphics.drawCircle(_x, _y, _rad);

	_stage.addChild(pixi_graphics);
	return pixi_graphics;
}

function pg_arc(_stage, _x, _y, _rad, _start, _end, _anticlockwise){
	if(typeof(_anticlockwise) === "undefined"){
		_anticlockwise = false;
	}
	var pixi_graphics = new PIXI.Graphics();
	pixi_graphics.beginFill(0x0000ff, 1);
	pixi_graphics.moveTo(_x, _y);
	pixi_graphics.arc(_x, _y, _rad, _start, _end, _anticlockwise);

	_stage.addChild(pixi_graphics);
	return pixi_graphics;
}


function paht(_stage, _text, _font, _x, _y, _options, _function){
	if(_options === undefined){
		_options = "";
	}
	if(_function === undefined){
		_function = ""
	}
	var pixi_text = new PIXI.Text(_text, _font);
	pixi_text.x = _x;
	pixi_text.y = _y;
	if(typeof(_function) == "function"){
		pixi_text.interactive = true;
		pixi_text.buttonMode = true;
		pixi_text.on('pointerdown', _function);
	}

	if(typeof(_options.anchor) == "object"){
		pixi_text.anchor.set(_options.anchor[0], _options.anchor[1]);
	}else if(typeof(_options.anchor) == "number"){
		pixi_text.anchor.set(_options.anchor);
	}else{
		pixi_text.anchor.set(0, 0);
	}

	_stage.addChild(pixi_text)
	return pixi_text;
}

function pah(_stage, _res, _x, _y, _width, _height, _options, _function, _function2){
	if(_x === undefined){
		_x = null;
	}
	if(_y === undefined){
		_y = null;
	}
	if(_width === undefined){
		_width = null;
	}
	if(_height === undefined){
		_height = null;
	}
	if(_function === undefined){
		_function = "";
	}
	if(_function2 === undefined){
		_function2 = "";
	}
	if(_options === undefined){
		_options = "";
	}

	var pixi_sprite;
	if(_res == ""){
		pixi_sprite = new PIXI.Sprite();
	}else if(typeof(_res) == "string"){
//		if(_res.search('static') > 0){
//			pixi_sprite = new PIXI.Sprite.fromFrame(_res.replace('./static/img/', ''));
//		}else{
			pixi_sprite = new PIXI.Sprite(PIXI.Texture.fromImage(_res));
//		}
	}else{
		pixi_sprite = new PIXI.Sprite(_res);
	}

	if(_x != null)
		pixi_sprite.x = _x;
	if(_y != null)
		pixi_sprite.y = _y;
	if(_width != null)
		pixi_sprite.width = _width;
	if(_height != null)
		pixi_sprite.height = _height;


	if(typeof(_options.anchor) == "object"){
		pixi_sprite.anchor.set(_options.anchor[0], _options.anchor[1]);
	}else if(typeof(_options.anchor) == "number"){
		pixi_sprite.anchor.set(_options.anchor);
	}else{
		pixi_sprite.anchor.set(0, 0);
	}


	if(typeof(_options.button) === "boolean" && _options.button == true){
		var _spriteButtonAnim = new anim();
		_spriteButtonAnim.isPreserve = 1;
		pixi_sprite.interactive = true;
		pixi_sprite.buttonMode = true;
		pixi_sprite.on('pointerdown', function(){
			sound_play('button_sound');
			_spriteButtonAnim.tween.clear();
			_spriteButtonAnim.add(1, 0.9, 0.5, Elastic.easeOut.config(2.5, 0.3), function(x){
				pixi_sprite.width = _width * x;
				pixi_sprite.height = _height * x;
				pixi_sprite.x = _x + (_width - pixi_sprite.width) * (0.5 - pixi_sprite.anchor.x);
				pixi_sprite.y = _y + (_height - pixi_sprite.height) * (0.5 - pixi_sprite.anchor.y);
			});
		});
		pixi_sprite.on('pointerup', function(){
			_spriteButtonAnim.tween.clear();
			_spriteButtonAnim.add(0.9, 1, 0.5, Elastic.easeOut.config(2.5, 0.3), function(x){
				pixi_sprite.width = _width * x;
				pixi_sprite.height = _height * x;
				pixi_sprite.x = _x + (_width - pixi_sprite.width) * (0.5 - pixi_sprite.anchor.x);
				pixi_sprite.y = _y + (_height - pixi_sprite.height) * (0.5 - pixi_sprite.anchor.y);
			});
		});
	}

	if(typeof(_function) == "function"){
		pixi_sprite.interactive = true;
		pixi_sprite.buttonMode = true;
		pixi_sprite.on('pointerdown', _function);
	}

	if(typeof(_function2) == "function"){
		pixi_sprite.interactive = true;
		pixi_sprite.buttonMode = true;
		pixi_sprite.on('pointerup', _function2);
	}

	if(typeof(_options) == "object"){
		
	}

	_stage.addChild(pixi_sprite);

	return pixi_sprite;
}

var animList = [];

var animIdx = 0;

function anim(){
	this.me = this;
	this.tween = new TimelineMax();
	this.funcList = [];
	this.func2List = [];
	this.call = 0;
	this.isPreserve = 0;
	animList.push(this);

	this.add = function add(){
		_from = arguments[0];
		_to = arguments[1];
		_duration = arguments[2];
		_ease = arguments[3];
		_function = arguments[4];
		_function2 = arguments[5];
		var me = this;
		
		me.funcList.push(_function);
		me.func2List.push(_function2);

		this.call++;

		var test = {};
		test.x = _from;

		if(_ease == ""){
			_ease = Linear.easeNone;
		}
		var tmp = this.call;
		this.tween = this.tween.to(test, _duration, {
			x : _to,
			ease:_ease,
			onUpdate : function(){
				me.funcList[tmp-1](test.x);
			},
			onComplete : function(){
				if(me.func2List[tmp-1] != undefined){
					me.func2List[tmp-1]();
				}

				if(me.isPreserve == 1){
				}else{
					var animIdx = animList.indexOf(me);
					if(animIdx != -1 && tmp == me.funcList.length){
						animList.splice(animIdx, 1);
					}
				}
			}
		});
		return this.me;
	}
}