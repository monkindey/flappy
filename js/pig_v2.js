/**
 * 1. @config 配置选项
 * 		@height: 猪初始化的高度
 * 		@timegap: 时间间隔
 *
 * 2. @property 属性
 *
 * 3. @method 方法
 * 4. @event 事件
 */
Pig_v2 = Mkey.extend(Mkey.util.Observable, {
	test: "monkindey",
	isRise: true,
	//计算总共调用上升函数的次数
	riseCount: 0,
	risePreCount: 1,
	constructor: function(config) {
		Mkey.apply(this, config);
		this.addEvents("start", "stop", "over");
		this.init();
	},
	init: function() {
		var me = this;
		Mkey.apply(me, {
			//设置初始下落时间为0.5s
			downtime: 0.5,
			//设置初始速度为0
			speed: 0,
			//设置setTimeout时间间隔
			timegap: 50
		});
	},
	render: function(el) {
		var me = this;
		me.el = Mkey.getDom(el);
		me.setHeight();

	},
	setHeight: function() {
		var el = this.el,
			h = this.height;
		el.style.top = h + "px";
	}

});



function Pig(el) {
	var me = this;
	this.el = el;
	this.height = 250;
	this.time = 0.5;
	this.speed = 0;
	this.timegap = 50;
	this.riseflag = false;
	this.riseCount = 0;
	this.risePreCount = 1;
	this.setTop();
	document.body.onkeyup = function(e) {
		var e = e || window.event;
		if (e.keyCode == 32) {
			me.riseCount++;
			console.log("riseCount...." + me.riseCount);
			me.rise();
		}
	}
}
Mkey.apply(Pig.prototype, {
	getTop: function() {
		return this.offsetHeight;
	},
	setTop: function() {
		var el = this.el,
			h = this.height;
		el.style.top = h + "px";
	},
	down: function() {
		var me = this;
		setTimeout(function() {
			// h = 1/2(gt^2)
			var h = Math.floor(10 * Math.pow(me.time, 2) / 2);
			me.height += h;
			me.setTop();
			me.time += 0.1;
			//v = gt
			me.speed = 10 * me.time;
			if (me.height < 600 && !me.riseflag) {
				// argumens.callee用法在那个秘密花园中好像评价不高啊！
				setTimeout(arguments.callee, 50);
			}
		}, 50)
	},
	rise: function() {
		var riseTime = 0.5,
			me = this;
		me.riseflag = true;
		setTimeout(function() {
			var speed = me.speed;
			me.speed = speed - (10 * riseTime); // Vo-gt
			riseTime += 0.5;
			me.height -= 20;
			me.setTop();
			//有两种情况出现导致不能再设置定时器了
			//(1) pig的速度为0;(2) 在上升的情况下重复触发onkeydown事件
			if (me.speed > 0 && me.riseCount == me.risePreCount) {
				setTimeout(arguments.callee, 80);
			} else {
				me.risePreCount++;
				if (me.speed <= 0) {
					me.riseflag = false;
					me.time = 0.5;
					me.down();
				} else {
					me.rise();
				}
			}
		}, 80)
	}
});

//pig.down();