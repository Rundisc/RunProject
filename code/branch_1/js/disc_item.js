window.onload = function() {
  initFlag();
  initHeight();
}
var viewportheight=0;
var viewportwidth=0;
function initHeight(){
	
	// var viewWidth =0;
	if (typeof window.innerWidth != 'undefined')
	{
		viewportheight = window.innerHeight;
		viewportwidth = window.innerWidth;
		 
	}
	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != undefined &&
			 document.documentElement.clientWidth != 0)
	{
		viewportheight = document.documentElement.clientHeight;
		viewportwidth = document.documentElement.clientWidth;
	}
	else
	{
		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
	}
	// var rate = viewportheight/
	$("#main_section").css("height",(viewportheight-90-40-35)+"px");
}

function initFlag(){
  // 标题前的图标不显示 斜杠
  $(".top_item_img").before("<span></span>")
}