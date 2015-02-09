function Pillar(left) {
	this.left = left;
}
Mkey.apply(Pillar.prototype, {
	isCrash : false,
	translate : function() {
		var div = this.div, me = this, pipeNum = Mkey.getDom("pipeNum");

		setTimeout(function() {
			var left = parseInt(div.style.left);
			div.style.left = left - 5 + "px";
			if (left > -40) {
				if (left < 70) {
					var pigEl = pig.el;
					ptop = parseInt(pigEl.style.top), ttop = parseInt(me.tdiv.style.top), btop = parseInt(me.bdiv.style.bottom);
					if (ptop > (600 + ttop) && ptop < (Math.abs(btop))) {
						if (left == -10) {
							
							num = parseInt(pipeNum.textContent
									|| pipeNum.innerText);
							pipeNum.innerHTML = num + 1;
						}
					} else {// gameover猪碰到柱子了
						Pillar.prototype.isCrash = true;
						document.body.onkeyup = null;
						Mkey.getDom("flappy").className = "crash";
						Mkey.getDom("gameover").style.display = "block";
						pig.down();
					}
				}
				if (!me.isCrash) {// 猪没碰到柱子了
					setTimeout(arguments.callee, 100);
				}
			} else {
				var p = new Pillar(680);
				p.create();
				p.translate();
			}
		}, 100)
	},
	create : function() {
		var th = Math.random() * 400 + 100, // top height
		bh = 700 - th, // bottom height
		tdiv, bdiv;
		this.div = document.createElement("div");
		var div = this.div, me = this;
		Mkey.apply(div.style, {
					height : 600 + "px",
					width : 45 + "px",
					position : "absolute"
				});
		me.tdiv = tdiv = div.cloneNode(true);
		me.bdiv = bdiv = div.cloneNode(true);
		div.style.left = me.left + "px";
		Mkey.apply(tdiv.style, {
					top : -th + "px",
					background : "url(image/pillar.png) "
				});
		Mkey.apply(bdiv.style, {
					bottom : -bh + "px",
					background : "url(image/pillar.png) no-repeat 0 -600px"
				});
		div.appendChild(tdiv);
		div.appendChild(bdiv);
		Mkey.getDom("flappy").appendChild(div);
	}
})
for (var i = 350; i < 1000;) {
	var p = new Pillar(i);
	p.create();
	p.translate();
	i += 250;
}