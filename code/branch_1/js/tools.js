/**
 * Tools提供一些常用的静态的js方法
 * 使用时先引入tools.js，然后通过[Tools.方法名(参数)]的方式进行调用
 */
function Tools(){}

/**
 * 将json对象转换成json字符串
 * @param jsonobj json对象
 * @returns json字符串
 */
Tools.toJsonString = function(jsonobj){
	return JSON.stringify(jsonobj);
};

/**
 * 将json字符串转换成json对象
 * @param jsonstr json字符串
 * @returns json对象
 */
Tools.toJsonObject = function(jsonstr){
	return JSON.parse(jsonstr);
};

/**
 * 获取页面窗口的高度
 */
Tools.getViewPortHeight = function(){
	var viewportheight=0;
	if (typeof window.innerWidth != 'undefined'){
		viewportheight = window.innerHeight;
	}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != undefined &&
			 document.documentElement.clientWidth != 0){
		viewportheight = document.documentElement.clientHeight;
	}else{
		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	}
	return viewportheight;
};

Tools.getViewPortWidth = function(){
	var viewportWidth=0;
	if (typeof window.innerWidth != 'undefined'){
		viewportWidth = window.innerWidth;
	}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != undefined &&
			 document.documentElement.clientWidth != 0){
		viewportWidth = document.documentElement.clientWidth;
	}else{
		viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
	}
	return viewportWidth;
};
/**
 * 判断字符串是否为空
 * 
 * @param value
 * @returns {Boolean}
 */
Tools.isEmpty = function(value){
	return (value == undefined ||value == "undefined" || value == null || value == "" || value == "null" || $.trim(value)=="");
};

/**
 * 返回有效的字符串
 * 若字符串为空或undefined，返回空字符串，否则返回原字符串
 * @param str 待检测的字符串
 * @returns 
 */
Tools.getValidStr = function(str){
	if(Tools.isEmpty(str)){
		return "";
	}else{
		return str;
	}
};

/**
 * 检查密码格式是否正确
 * @param value 密码
 * 如果通过验证返回true,否则返回false
 */
Tools.checkPwd=function(value){
	var reg = "^[0-9a-zA-Z]{6,}$";
	var re = new RegExp(reg);
    if (re.test(value)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * 检查输入手机号码是否正确 
 * @param strMobile 手机号码
 * @returns 如果通过验证返回true,否则返回false
 */
Tools.checkMobile = function( strMobile ){
    var regu = /^[1][0-9]{10}$/;
    var re = new RegExp(regu);
    if (re.test(strMobile)) {
        return true;
    }
    else {
        return false;
    }
};


/**
 * 校验整数
 * 
 * @param src
 *            待校验的字符
 * @param et_gtZero
 *            是否需要校验大于等于0
 * @returns {Boolean}
 */
Tools.isInteger = function(src, et_gtZero) {
	var reg = /^-?\d+$/;
	if (!reg.test(src)) {
		return false;
	}
	if (et_gtZero) {
		if (parseFloat(src) < 0) {
			return false;
		}
	}
	return true;
};


/**
 * 校验数字
 * 
 * @param src
 *            待校验的字符
 * @param et_gtZero
 *            是否需要校验大于等于0
 * @returns {Boolean}
 */
Tools.isNum = function( src ,et_gtZero){
	var reg = /^-?\d+(\.?\d+)?$/;
	if (!reg.test(src)) {
		return false;
	}
	if (et_gtZero) {
		if (parseFloat(src) < 0) {
			return false;
		}
	}
	return true;
};

/**
 * 金额格式校验
 * 
 * @param src
 *            待校验的字符
 * @returns {Boolean}
 */
Tools.isMoney = function( str ){
	if(Tools.isNum(str,true)){
		if(str.indexOf(".") != -1){
			var regExp = /^[0-9]\d*.\d{1,2}$/;
			return regExp.test(money);
		}else{
			return true;
		}
	}
	return false;
};

Tools.getScrollPageHeight1 = function(){
	return Tools.getViewPortHeight()-44;
};

Tools.getScrollPageHeight2 = function(){
	return Tools.getViewPortHeight()-44;
};


/**
 * 画布中添加文字
 * @value 显示值
 * @fontValue 包括字体大小，样式
 * @textBaselineValue
 * @fontColor 字体颜色
 * @pointx 起始横坐标
 * @pointy 起始纵坐标
 */
Tools.drawFont = function(id,value,fontValue,textBaselineValue,textAlignValue,fontColor,pointx,pointy){
	if(!value) return;
	
	var oC =document.getElementById(id);  
    var oGC = oC.getContext('2d'); 
    
    if(!Tools.isEmpty(fontValue)){
    	oGC.font = fontValue;
    }
    if(!Tools.isEmpty(textBaselineValue)){
    	oGC.textBaseline = textBaselineValue;
    }
    if(!Tools.isEmpty(fontColor)){
    	oGC.fillStyle = fontColor;
    }
    if(!Tools.isEmpty(textAlignValue)){
    	oGC.textAlign = textAlignValue;
    }
    
    oGC.fillText(value, pointx, pointy); 
};

/**
 * 画布中添加文字
 * @value 显示值
 * @fontValue 包括字体大小，样式
 * @textBaselineValue
 * @fontColor 字体颜色
 * @pointx 起始横坐标
 * @pointy 起始纵坐标
 */
Tools.drawFont2 = function(context,value,fontValue,textBaselineValue,textAlignValue,fontColor,pointx,pointy){
	if(!value) return;
	 
    if(!Tools.isEmpty(fontValue)){
    	context.font = fontValue;
    }
    if(!Tools.isEmpty(textBaselineValue)){
    	context.textBaseline = textBaselineValue;
    }
    if(!Tools.isEmpty(fontColor)){
    	context.fillStyle = fontColor;
    }
    if(!Tools.isEmpty(textAlignValue)){
    	context.textAlign = textAlignValue;
    }
    
    context.fillText(value, pointx, pointy); 
};

/**
 * 画布上添加图片
 * @id 画布id
 * @obj 图片
 * @pointx 画图开始横坐标
 * @pointy 画图开始纵坐标
 * @width 画图宽度
 * @height 画图高度
 */
Tools.draw = function(id,obj,pointx,pointy,width,height){  
	var oC =document.getElementById(id);  
    var oGC = oC.getContext('2d');  
    oGC.drawImage(obj,pointx,pointy,width,height);      
};

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    var min_size = Math.min(w, h);
    if (r > min_size / 2) r = min_size / 2;
    // 开始绘制
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
};

Tools.clearCanvas = function(id,pointx,pointy,widthValue,heightValue){
	var oC =document.getElementById(id);  
    var oGC = oC.getContext('2d');  
    oGC.clearRect(pointx, pointy, widthValue, heightValue);
};

/**
 * 获取多选的值和文本
 * @param id select 元素id
 * @returns [文本,值]
 */
Tools.getMultipleSelectValue = function(id){
	var valueLs = $("#"+id).val();
	var labels = "";
	var values = "";
	if(!Tools.isEmpty(valueLs)){
		for ( var i = 0; i < valueLs.length; i++) {
			$("#"+id).children().each(function(){
				if(this.value == valueLs[i]){
					labels += this.innerHTML+",";
					values += this.value+",";
				};
			});
		};
		
		if(labels.length > 0){
			var temp = labels.charAt(labels.length-1);
			if(temp == ","){
				labels = labels.substring(0, labels.length-1);
			}
		}
		if(values.length > 0){
			var temp = values.charAt(values.length-1);
			if(temp == ","){
				values = values.substring(0, values.length-1);
			}
		}
	}
	return [labels,values];
};


