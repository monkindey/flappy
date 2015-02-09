/**
 * @author monkindey
 * @date {
 *       2014-11-10 60%
 *       2014-11-11 90%
 *       2014-11-12 99%
 *       .....
 * }
 * @description 管道的生成
 * @difficulty {
 *             1. 管道的生成是无限循环的
 *             2. 检测碰撞
 * }
 */

/**
 * 管道类
 * 1.生命周期
 * 2.检测碰撞
 */
function Pillar() {
	this.pillarHtml = $('#pillar').html();
	this.$dom = $(this.pillarHtml);
	this.id = Pillar.id++;

	$(this).on('stop', function() {
		pig.down();
		Pillar.STOP = true;
		// gameover
		$('#gameover').show();
		$('#flappy').addClass('init');
		$(document).off('keyup');
		$(document).on('keyup', function() {
			flappy.init();
		});
	});

	$(this).one('pass', function() {
		Pillar.passCount++;
		$('#pipeNum').html(Pillar.passCount);
	});
}

Pillar.HEIGHT = 600;
Pillar.STOP = false;
Pillar.id = 0;
Pillar.passCount = 0;

// 有关生命周期、碰撞的事情
Pillar.prototype.translate = function() {
	var TRANSLATE_TIME_GAP = 100;
	var PILLAR_WIDTH = 45;
	var $trap = this.$dom;
	var left = ($trap.position()).left;
	var me = this;
	setTimeout(function() {
		left -= 5;
		$trap.css('left', left + 'px');
		me.left = left;
		left = parseInt($trap.css('left'));
		var isCrashed = me.isCrash();

		if (me.isPass()) {
			$(me).trigger('pass');
		}

		if (left >= -PILLAR_WIDTH && !isCrashed && !Pillar.STOP && !pig.DIE) {
			setTimeout(arguments.callee, TRANSLATE_TIME_GAP);
		} else if (left < -PILLAR_WIDTH) {
			me.$dom.remove();
			new Pillar().render({
				left: 660
			}).translate();
		} else if (isCrashed || pig.DIE) {
			// 碰撞到的话就是停止
			$(me).trigger('stop');
		}
	}, TRANSLATE_TIME_GAP);
};

Pillar.prototype.isPass = function() {
	return this.left <= -10;
};

// 检测猪是否碰撞
Pillar.prototype.isCrash = function() {
	var $pig = $('#pig');
	var pigLoc = parseInt($pig.css('top'));

	// 进入危险区域
	if (this.left <= 60 && this.left >= -10) {
		// alert('进入危险区域');
		if ((Pillar.HEIGHT - this.top) < pigLoc && this.bottom > pigLoc) {
			console.log('success');
			return false;
		} else {
			console.log('failness');
			return true;
		}
	}

};

Pillar.prototype.render = function(config) {
	config = config || {};
	var left = config.left;
	var $trap = this.$dom;

	var _getCoordinate = function() {
		// 150 ~ 550
		var _top = 150 + (Math.random() * 400);
		var _bottom = 1300 - _top - 600;
		this.top = _top;
		this.bottom = _bottom;
		return {
			top: _top,
			bottom: _bottom
		};
	};

	_getCoordinate.call(this);

	$('#flappy').append(this.$dom);
	$trap.css('left', left + 'px');
	$trap.find('.top').css('top', '-' + this.top + 'px');
	$trap.find('.bottom').css('bottom', '-' + this.bottom + 'px');
	return this;
};

var pillar = (function() {
	function start() {
		var left = 400;
		for (var i = 0; i < 3; i++) {
			// 创建管道
			new Pillar().render({
				left: left
			}).translate();
			left += 225;
		}
	}

	function reset() {
		$('.trap').each(function(index, item) {
			$(item).remove();
		});
		Pillar.STOP = false;
		Pillar.passCount = 0;
	}

	return {
		start: start,
		reset: reset
	}
})()