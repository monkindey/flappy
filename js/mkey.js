Mkey = {
	author: "monkindey",
	email: "monkindey@163.com",
	version: Number.NEGATIVE_INFINITY
}
/**
 * 觉得自己写文档很糟糕
 * 负责把c里面的属性复制到o对象中,记住它只是浅复制
 * @param {} o object 获取属性目的对象
 * @param {} c config 属性的源对象
 */
Mkey.apply = function(o, c) {
	// 跟Ext比起来我少了检测函数列表
	for (var p in c) {
		o[p] = c[p];
	}
	return o
}

Mkey.apply(Mkey, {
	getDom: function(id) {
		if (!id) return null;
		return document.getElementById(id);
	},
	/**
	 * [extend description]借鉴Ext的extend
	 * @param  {[function]} sp     [父类构造函数]
	 * @param  {[object]} config [可以为子类构造函数配置一些属性]
	 * @return {[function]}        [子类构造函数]
	 */
	extend: function(sp, config) {
		/**
		 * 没有下面这句代码的话，在用Mkey.extend方法实现继承时，不能再config对象中配置constructor,
		 * 配置后没效果的
		 */
		var sb = (config.constructor != Object.prototype.constructor ? config.constructor : function() {
			sp.apply(this, arguments)
		});
		var F = function() {},
			sbp,
			spp = sp.prototype;
		F.prototype = spp;
		sbp = sb.prototype = new F();
		sbp.constructor = sb;
		Mkey.apply(sbp, config);
		sb.superclass = spp;
		return sb;
	},
	/**
	 * [each description]
	 * @param  {[Array]}   arr [遍历元素数组]
	 * @param  {Function} fn  [每一项配置的函数]
	 * @return {[type]}       [description]
	 */
	each: function(arr, fn) {
		if (!Mkey.isArray(arr)) {
			return;
		}
		for (var i = 0, len = arr.length; i < len; i++) {
			if (fn.call(arr[i], arr[i], i, arr) === false) {
				return i;
			}
		};
	},
	/**
	 * [namespace description]
	 * 代码主要是参考Ext，它写的太好了。
	 * 创建命名空间，API可以参考Ext
	 * @return {[type]} [description]
	 */
	namespace: function() {
		var o, d, ns = Mkey.arrayify(arguments);
		Mkey.each(ns, function(v) {
			d = v.split(".");
			o = window[d[0]] = window[d[0]] || {};
			Mkey.each(d.slice(1), function(v2) {
				o = o[v2] = o[v2] || {};
			})
		})
		return o;
	},
	isArray: function(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	},
	arrayify: function(val) {
		return [].slice.call(val);
	}
});

Mkey.ns = Mkey.namespace;
Mkey.ns("Mkey.util");