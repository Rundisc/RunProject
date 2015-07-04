function Base(clientType) {
	this.clientType = clientType;// 客户端类型（1-PC;2-Android;3-IOS）
	this.domain = "http://192.168.0.43:8080/dht";// 项目访问地址
	// 获取请求地址
	this.getDomain = function() {
		return this.domain;
	};
	/**
	 * 初始化系统类型
	 */
	this.initPlatform = function() {
		var appVersion = navigator.appVersion;
		appVersion = appVersion.toLocaleLowerCase();
		if (appVersion.indexOf("android") != -1) {
			this.clientType = 2;
		} else if (appVersion.indexOf("iphone") != -1) {
			this.clientType = 3;
		} else {
			this.clientType = 1;
		}
	};

	/**
	 * ajax通讯
	 * 
	 * @param async
	 *            是否异步（true/false）
	 * @param url
	 *            请求的URL
	 * @param sendData
	 *            JSON格式的请求数据
	 * @param method
	 *            请求方法(get/post)
	 * @param callbackHandler
	 *            回调函数名
	 */
	this.ajax = function(async, url, sendData, method, callbackHandler, flag) {
		url = this.domain + url;
		if (!flag) {
			flag = "1";
		}

		if (this.clientType == 2) {// android
			var str = sendData;
			try {
				str = Tools.toJsonString(sendData);
			} catch (e) {
			}
			if (Tools.isEmpty(str)) {
				str = "{}";
			}
			window.TIT.sendRequest(url, str, callbackHandler, method, flag);
		} else {
			$.ajax({
				async : async,
				type : method,
				url : url,
				data : sendData,
				dataType : 'json',
				success : function(data) {
					if (callbackHandler) {
						var func = eval(callbackHandler);
						var temp = data;
						try {
							temp = JSON.parse(temp);
						} catch (e) {

						}
						new func(temp);
					}
				},
				error:function(data){
					if(data.responseText.indexOf("你没有访问权限")!=-1){
						alert("您的账号在别处登录,请重新登录!");
						base.logout();
					}
				}
			});
		}
	};
	/**
	 * 数据封装
	 */
	this.dataPackage = function(obj) {

	};

	/**
	 * 设置全局变量
	 * 
	 * @param key
	 *            字符串
	 * @param value
	 *            Object
	 */
	this.setGlobal = function(key, value) {
		if(Tools.isEmpty(value)){
			value = "";
		}
		if (this.clientType == 1) {
			sessionStorage[key] = value;
		} else if (this.clientType == 2) {
			window.TIT.setGlobal(key, value);
		} else if (this.clientType == 3) {
			new IOSApi().setGlobal([ key, value ]);
		}
	};

	/**
	 * 获取全局变量
	 * 
	 * @param key
	 *            字符串数组
	 * @param callBackFunction
	 * @returns
	 */
	this.getGlobal = function(key, callBackFunction) {
		var result = new Array();
		if (this.clientType == 1) {
			for ( var i = 0; i < key.length; i++) {
				result[i] = sessionStorage[key[i]];
			}
			callBackFunction(result);
		} else if (this.clientType == 2) {
			for ( var i = 0; i < key.length; i++) {
				result[i] = window.TIT.getGlobal(key[i]);
				// try{
				// temp = JSON.parse(temp);
				// }catch(e){
				//					
				// }
				// result[i] = temp;
			}
			callBackFunction(result);
		} else if (this.clientType == 3) {
//			var keys = "{";
//			for ( var i = 0; i < key.length; i++) {
//				keys += key[i];
//				if (i != (key.length - 1)) {
//					keys += ",";
//				}
//			}
//			keys += "}";
			new IOSApi().getGlobal(key, callBackFunction);
		}
	};

	/**
	 * 设置图片路径
	 * 
	 * @param id
	 *            控件id
	 * @param path
	 *            图片相对于根目录的相对路径
	 * @param isLocal
	 *            android客户端时使用，表示图片是否在本地（true/false）
	 */
	this.setImgPath = function(id, path, isLocal) {
		var realPath = "";
		if (this.clientType == 1) {// pc端
			realPath = this.domain + path;
		} else if (this.clientType == 2) {
			var myapi = new myAPI("");
			if (isLocal == true) {
				realPath = myapi.getImagePath + path;// apk
			} else {
				realPath = myapi.CPath + path;// 网络端
			}
		}
		document.getElementById(id).src = realPath;
	};

	/**
	 * 页面跳转
	 * 
	 * @param data
	 *            传递给壳的参数{title:"",html:""}
	 * @param callBackFunction
	 *            回调函数
	 */
	this.openNewPage = function(data, callBackFunction) {
		if (this.clientType == 1) {
			window.open(data.html);
		} else if (this.clientType == 2) {
			window.TIT.changeHtml(data.html, data.title);
		} else if (this.clientType == 3) {
			new IOSApi().openNewPage(data, callBackFunction);
		}
	};

	/**
	 * 上传通信录
	 */
	this.getContacts = function(callBackFunction){
		var result;
		if (this.clientType == 1) {
			
		}else if (this.clientType == 2) {
			result = window.TIT.getContacts();
			callBackFunction(result);
		}else if(this.clientType == 3){
			new IOSApi().getContacts(callBackFunction);
		}
	};
	/**
	 * 返回登录页面
	 */
	this.toLogin = function() {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {

		} else if (this.clientType == 3) {
			new IOSApi().toLogin();
		}
	};

	/**
	 * 跳转到拨号界面
	 */
	this.toCallMain = function() {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {
			window.TIT.turnToActivity();
		} else if (this.clientType == 3) {
			new IOSApi().toCallMain();
		}
	};
	/**
	 * 图片上传控件
	 */
	this.getLocalImage = function(callBack) {
		if (this.clientType == 2) {
			window.TIT.selectPicture(callBack);
		}
	};

	/**
	 * 日期控件
	 */
	this.getDatePicker = function(callBack, dataFormate) {
		if (this.clientType == 2) {
			window.TIT.dataDialog(callBack, dataFormate);
		}
	};

	/**
	 * 切换底部菜单栏
	 * 
	 * @param flag(0-主页；1-个人中心)
	 * @param url
	 *            加载地址
	 * 
	 */
	this.changeTabBar = function(flag, url) {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {
			window.TIT.changePage(url, flag);
			// window.TIT.changePage(this.domain+"/view/mobile/gerenzhongxin/guwen/guwengerenzhongxinmain.html","1");
		} else if (this.clientType == 3) {
			if (flag == "0") {
				flag = "3";
			} else if (flag == "1") {
				flag = "4";
			}
			new IOSApi().changeTabBar({
				flag : flag,
				url : url
			});
		}
	};

	/**
	 * 发送信息
	 * 
	 * @param message
	 *            待发送的信息
	 */
	this.sendSMS = function(message) {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {
			window.TIT.sendMessage(message);
		} else if (this.clientType == 3) {
			new IOSApi().sendSMS(message);
		}
	};

	/**
	 * 拨打电话
	 * 
	 * @param callNo
	 *            要拨打的电话号码
	 */
	this.callout = function(callNo) {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {
			window.TIT.callPhone(callNo);
		} else if (this.clientType == 3) {
			new IOSApi().callout(callNo);
		}
	};

	/**
	 * 注销
	 */
	this.logout = function() {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {
			window.TIT.Cancellation();
		} else if (this.clientType == 3) {
			new IOSApi().logout();
		}
	};

	/**
	 * 显示菜单栏
	 */
	this.openTwoPage = function() {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {
			window.TIT.displayMenu();
		} else if (this.clientType == 3) {
			new IOSApi().showTabbar();
		}
	};
	/**
	 * 隐藏菜单栏
	 */
	this.closeTwoPage = function() {
		if (this.clientType == 1) {

		} else if (this.clientType == 2) {
			window.TIT.hiddenMenu();
		} else if (this.clientType == 3) {
			new IOSApi().hiddenTabbar();
		}
	};

	this.openFromMain = function(url) {
		url = this.domain + "/view/mobile/" + url;
		if (this.clientType == 1) {
			window.open(url, "_self");
		} else if (this.clientType == 2) {
			window.open(url, "_self");
		} else if (this.clientType == 3) {
			new IOSApi().openFromMain(url);
		}
	};

	this.backToMain = function() {
		if (this.clientType == 1) {
			window.open(this.domain + "/view/mobile/index.html", "_self");
		} else if (this.clientType == 2) {
			window.open(this.domain + "/view/mobile/index.html", "_self");
		} else if (this.clientType == 3) {
			new IOSApi().backToMain();
		}
	};

};
/**
 * Android版日期控件参数
 */
Base.prototype.AndroidDateOptions = {
	preset : 'date', // 日期
	theme : 'android-ics light', // 皮肤样式
	display : 'bottom', // 显示方式
	mode : 'scroller', // 日期选择模式
	dateFormat : 'yy/mm/dd', // 日期格式
	setText : '确定', // 确认按钮名称
	cancelText : '取消',// 取消按钮名籍我
	dateOrder : 'yymmdd', // 面板中日期排列格式
	lang : "zh",
	animate : 'slideup',
	dayText : '日',
	monthText : '月',
	yearText : '年', // 面板中年月日文字
	endYear : 2100
// 结束年份
};
