function Pig(el) {
	var me = this;
	this.el = el;
	this.parent = el.parentNode;
	this.height = 250;
	this.time = 0.5;
	this.speed = 0;
	this.timegap = 100;
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
			var h = Math.floor(10 * Math.pow(me.time, 2) / 2);
			me.height += h;
			me.setTop();
			me.time += (me.timegap / 500);
			me.speed = 10 * me.time;
			console.log(h);
			if (me.height < 600 && !me.riseflag) {
				// argumens.callee用法在那个秘密花园中好像评价不高啊！
				setTimeout(arguments.callee, me.timegap);
			}
		}, me.timegap)
	},
	rise: function() { 
		var riseTime = 0.5,
			me = this;
		this.riseflag = true;
		setTimeout(function() {
			var speed = me.speed,
				h = 2 * Math.floor(speed * riseTime - 0.5 * 10 * Math.pow(riseTime, 2)); // Vot-(1/2
			// gt^2)
			console.log("speed...." + speed);
			console.log("height...." + h);
			me.speed = speed - (10 * riseTime); // Vo-gt
			riseTime += me.timegap / 100;
			//me.height -= h;
			me.height -= 15;
			me.setTop();
			//有两种情况出现导致不能再设置定时器了
			//(1) pig的速度为0;(2) 重复触发onkeydown事件
			if (me.speed > 0 && me.riseCount == me.risePreCount) {
				setTimeout(arguments.callee, me.timegap);
			} else {
				if (me.speed <= 0) {
					me.riseflag = false;
					me.time = 0.5;
					me.down();
				} else {
					me.risePreCount++;
					//me.speed += 10;
					me.rise();
				}
			}
		}, me.timegap)
	}
});

//pig.down();