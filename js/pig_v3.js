/**
 * @author monkindey
 * @update 2014-09-21
 * @attention
 * (1).down 状态 <----> rise 状态 来控制飞扬的猪位置
 * 其实就是改变 #pig 元素的 "top" 属性
 * (2).通过管道 ---- 未通过管道  取决于 飞扬的猪的位置
 * (3).速率的单位为 px/s
 */

var pig = (function() {

	var DOC = document;
	var _pig = $("#pig");
	//_pigEl.css("top")返回的是 **px
	var _pigElTop = parseInt(_pig.css("top"));
	// 下降的时间间隔
	var DOWNTIMEGAP = 80;
	var RISETIMEGAP = 80;
	// 下降的极限高度
	var MAXHEIGHT = $("#flappy").height() + $("#pig").height();
	var DOWN = true;
	var RISE = false;

	var TIMER = 0;

	// 竖直上抛运动 公式
	// 因为下降的速度是一定的，为20/0.08 = 250
	// v = v0 - gt  h = v0 - 1/2(gt^2)  h = v0^2/2g 我设成最高高度为50px
	// 模拟重力加速度 px/(s^2)
	var G = 625;

	var start = function() {
		initEvent();
		down();
	};

	var reset = function() {
		_pig.css('top', '260px');
		_pigElTop = parseInt(_pig.css("top"));
		pig.DIE = false;
	};

	// 下降就是不停改变飞扬的猪(绝对定位)的top属性
	function down() {
		RISE = false;
		setTimeout(function() {
			// 下降的速率为 20/DOWNTIMEGAP,也就是说它不支持
			// 自由落体运动的
			_pigElTop = _pigElTop + 20;
			_pig.css("top", _pigElTop);
			if (_pigElTop < MAXHEIGHT && !RISE) {
				setTimeout(arguments.callee, DOWNTIMEGAP);
				// debug(_pigElTop);
			} else if (_pigElTop >= MAXHEIGHT) {
				pig.DIE = true;
			}
		}, DOWNTIMEGAP);
	}

	function initEvent() {
		$(DOC).off('keyup');
		// 每次按空格键都可以上升
		$(DOC).on('keyup', function(e) {
			var space = parseInt(event.keyCode) === 32 ? true : false;
			if (space) {
				if (RISE) {
					clearTimeout(TIMER);
				}
				rise();
			}
		});
	}

	function rise() {
		var riseTime = 0;
		// 20 / 0.08
		var firstSpeed = 250;
		var speed = 0;
		var h = 0;
		var preH = 0;

		RISE = true;
		TIMER = setTimeout(function() {
			riseTime += RISETIMEGAP;
			// 上升速度 v = v0 - gt
			speed = firstSpeed - G * riseTime / 1000;
			if (speed > 0) {
				preH = h;
				// h = (v0^2 - v^2)/2g
				h = (Math.pow(firstSpeed, 2) - Math.pow(speed, 2)) / (2 * G);
				_pigElTop = _pigElTop - (h - preH);
				_pig.css("top", _pigElTop);
				TIMER = setTimeout(arguments.callee, RISETIMEGAP);
			} else {
				// 速度为0 或 小于 0 时就下降 
				down();
			}
		}, RISETIMEGAP);
	}

	return {
		start: start,
		down: down,
		reset: reset
	}

})()