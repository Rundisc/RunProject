window.onerror = function(err) {
	console.log(err);
};
/**
 * JS与IOS建桥
 * @param callback
 */
function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge);
		}, false);
	}
}
connectWebViewJavascriptBridge(function(bridge) {
	function log(message, data) {
		
	}
	bridge.init(function(message, responseCallback) {
		var data = { 'Javascript Responds':'Wee!' };
		responseCallback(data);
	});
});

/**
 * 封装IOS方法的对象
 */
function IOSApi(){
	/**
	 * js调用ISO方法
	 * @param method 请求方法名
	 * @param data 请求发送参数
	 * @param callBackFunction 回调函数
	 */
	this.callIos = function(method,data,callBackFunction){
		connectWebViewJavascriptBridge(function(bridge) {
			bridge.callHandler(method, data, function(response) {
				callBackFunction(response);
				return response;
			});
		});
		return null;
	};
	
	/**
	 * js向 IOS发送请求
	 * @param method 请求方法名
	 * @param data 请求发送参数
	 * @param callBackFunction 回调函数
	 */
	this.sendIos = function(method,data,callBackFunction){
		connectWebViewJavascriptBridge(function(bridge) {
			
			bridge.send(data, function(responseData) {
				callBackFunction(responseData);
				return responseData;
			});
		});
		return null;
	};
	
	/**
	 * js获取ios调用请求
	 * @param method 请求方法名
	 * @param data 请求发送参数
	 */
	this.getIos = function(method,callBack){
		connectWebViewJavascriptBridge(function(bridge) {
			bridge.registerHandler(method, function(data, responseCallback) {
				callBack(data);
				return data;
			});
		});
		return null;
	};
	
	/**
	 * 调用返回上一页方法
	 */
	this.goBackPage = function(){
		this.callIos("backBtnPressed",null,null);
	};
	/**
	 * 设置全局变量
	 * @param key 字符串
	 * @param value Object
	 */
	this.setGlobal = function(key,value){
		var data = {
			"key":key,
			"value":value
		};
		this.callIos("saveNSUserDefaults", data, null);
	};
	
	/**
	 * 获取全局变量
	 * @param key 字符串数组
	 * @returns Array
	 */
	this.getGlobal = function(key,callBackFunction){
		this.callIos("readNSUserDefaults", {"key":key}, callBackFunction);
	};
	/**
	 * 返回登录界面
	 */
	this.toLogin = function(){
		this.callIos("returnLogin",null,null);
	};
	
	/**
	 * 禁止webview滚动
	 */
	this.stopViewScroll = function(){
		this.callIos("unBounces",null,null);
	};
	
	/**
	 * 跳转到拨号界面
	 */
	this.toCallMain = function(){
		this.callIos("dailpad",null,null);
	};
	
	this.openNewPage = function(data, callBackFunction){
		this.callIos("opennewpage", data, callBackFunction);
	};
	
	/**
	 * tabBar跳转
	 * @param flag 
	 * 	data  格式 {flag:3-首页 4-个人中心,url:}
	 */
	this.changeTabBar = function(data){
		this.callIos("go2TabBar", data, null);
	};
	
	/**
	 * 发送信息
	 * @param message 待发送的信息
	 */
	this.sendSMS = function(message){
		this.callIos("sendMsg", message, null);
	};
	
	/**
	 * 拨打电话
	 * @param callNo 要拨打的电话号码
	 */
	this.callout = function(callNo){
		this.callIos("callout", callNo, null);
	};
	
	
	/**
	 * 注销
	 */
	this.logout = function(){
		this.callIos("logout", null, null);
	};
	
	
	/**
	 * 隐藏底部菜单
	 */
	this.hiddenTabbar=function(){
		this.callIos("hiddenTabbar", null, null);
	};
	
	/**
	 * 显示底部菜单
	 */
	this.showTabbar=function(){
		this.callIos("showTabbar", null, null);
	};
	
	/**
	 * 从主页打开页面
	 * {html:url}
	 */
	this.openFromMain=function(url){
		this.callIos("openRecharge", {html:url}, null);
	};
	
	/**
	 * 返回主页面
	 */
	this.backToMain=function(){
		this.callIos("returnHome", null, null);
	};
	
	/**
	 * 获取通信录信息
	 */
	this.getContacts=function(callBackFunction){
		this.callIos("getContacts",null,callBackFunction);
	};
	
};