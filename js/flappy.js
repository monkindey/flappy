/**
 * @author monkindey
 * @update 2014-09-21
 * @description 入口
 */
var flappy = (function(DOC) {

	function init() {
		initPage();
		initEvent();
	}

	function initPage() {
		// 界面半透明 飞扬猪停止 显示按tab开始
		$('#flappy').addClass('init');
		$('#ad').show();
		$('#pipeNum').html(0);
		$('#gameover').hide();
		pillar.reset();
		pig.reset();
	}

	function initEvent() {
		$(DOC).off('keyup');
		$(DOC).on('keyup', function(event) {
			//检查是否按下为空格键
			var isSpace = parseInt(event.keyCode) === 32 ? true : false;
			if(isSpace){
				$('#flappy').removeClass('init');
				$('#ad').hide();
				// 猪开始向下
				pig.start();
				// pipe管道开始朝猪方向过来
				pillar.start();	
			}
		});
	}

	return {
		init: init
	}	
})(document);