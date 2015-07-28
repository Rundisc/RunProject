$(function(){
	var page = 1;
    var i = 1; //每版放4个图片
    //向后 按钮
    $("span.next").click(function(){    //绑定click事件
    	var content = $("div#content"); 
    	var content_list = $("div#content_list");
    	var v_width = content.width();
    	var len = content.find("li").length;
		var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
		var myVideo = document.getElementsByTagName('video')[page-1];

		// if (myVideo.paused){
		// 	myVideo.play();
		 //}
		 //else{

		 	myVideo.pause();
		 //}
		 if( !content_list.is(":animated") ){    //判断“内容展示区域”是否正在处于动画
			  if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
				content_list.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面

				page = 1;
			}else{
				content_list.animate({ left : '-='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
				page++;
			}
		}
	});
    //往前 按钮
    $("span.prev").click(function(){
    	var content = $("div#content"); 
    	var content_list = $("div#content_list");
    	var v_width = content.width();
    	var len = content.find("li").length;
		 var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
		 var myVideo = document.getElementsByTagName('video')[page-1];
		 myVideo.pause();

		 if(!content_list.is(":animated") ){    //判断“内容展示区域”是否正在处于动画
		 	 if(page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
		 	 	content_list.animate({ left : '-='+v_width*(page_count-1) }, "slow");
		 	 	page = page_count;
		 	 }else{
		 	 	content_list.animate({ left : '+='+v_width }, "slow");
		 	 	page--;
		 	 }
		 	}
		 });

    //startmarquee(44,30,3000); 

//文字滚动
function startmarquee(lh,speed,delay){ 
	var t; 
	var p=false; 
	var o=document.getElementById("marqueebox"); 
	//o.innerHTML+=o.innerHTML; 
	o.onmouseover=function(){p=true} 
	o.onmouseout=function(){p=false} 
	o.scrollTop = 0; 
	function start(){ 
		t=setInterval(scrolling,speed); 
		if(!p){ o.scrollTop += 1;} 
	} 
	function scrolling(){ 
		if(o.scrollTop%lh!=0){ 
			o.scrollTop += 1; 
			if(o.scrollTop>=o.scrollHeight/2) o.scrollTop = 0; 
		}else{ 
			clearInterval(t); 
			setTimeout(start,delay); 
		} 
	} 
	setTimeout(start,delay); 
} 


window.onload=function(){
	new Marquee(
    "marqueebox",  //容器ID<br />
    0,  //滚动方向(0向上 1向下 2向左 3向右)<br />
    4,  //滚动步长<br />
    490,  //滚动区域宽度<br />
    44,  //滚动区域高度<br />
    50,  //定时器 数值越小，滚动的速度越快(1000=1秒,建议不小于20)<br />
    2000,  //停顿时间(0为不停顿,1000=1秒)<br />
    1000,  //开始等待时间(0为不等待,1000=1秒)<br />
    44  //间歇滚动间距(可选)<br />
    );
};
function Marquee(){
	this.ID=document.getElementById(arguments[0]);
	this.Direction=arguments[1];
	this.Step=arguments[2];
	this.Width=arguments[3];
	this.Height=arguments[4];
	this.Timer=arguments[5];
	this.WaitTime=arguments[6];
	this.StopTime=arguments[7];
	if(arguments[8]){this.ScrollStep=arguments[8];}else{this.ScrollStep=this.Direction>1?this.Width:this.Height;}
	this.CTL=this.StartID=this.Stop=this.MouseOver=0;
	this.ID.style.overflowX=this.ID.style.overflowY="hidden";
	this.ID.noWrap=true;
	this.ID.style.width=this.Width;
	this.ID.style.height=this.Height;
	this.ClientScroll=this.Direction>1?this.ID.scrollWidth:this.ID.scrollHeight;
	this.ID.innerHTML+=this.ID.innerHTML;
	this.Start(this,this.Timer,this.WaitTime,this.StopTime);
}
Marquee.prototype.Start=function(msobj,timer,waittime,stoptime){
	msobj.StartID=function(){msobj.Scroll();}
	msobj.Continue=function(){
		if(msobj.MouseOver==1){setTimeout(msobj.Continue,waittime);}
		else{clearInterval(msobj.TimerID); msobj.CTL=msobj.Stop=0; msobj.TimerID=setInterval(msobj.StartID,timer);}
	}
	msobj.Pause=function(){msobj.Stop=1; clearInterval(msobj.TimerID); setTimeout(msobj.Continue,waittime);}
	msobj.Begin=function(){
		msobj.TimerID=setInterval(msobj.StartID,timer);
		msobj.ID.onmouseover=function(){msobj.MouseOver=1; clearInterval(msobj.TimerID);}
		msobj.ID.onmouseout=function(){msobj.MouseOver=0; if(msobj.Stop==0){clearInterval(msobj.TimerID); msobj.TimerID=setInterval(msobj.StartID,timer);}}
	}
	setTimeout(msobj.Begin,stoptime);
}
Marquee.prototype.Scroll=function(){
	switch(this.Direction){
		case 0:
		this.CTL+=this.Step;
		if(this.CTL>=this.ScrollStep&&this.WaitTime>0){this.ID.scrollTop+=this.ScrollStep+this.Step-this.CTL; this.Pause(); return;}
		else{if(this.ID.scrollTop>=this.ClientScroll) this.ID.scrollTop-=this.ClientScroll; this.ID.scrollTop+=this.Step;}
		break;
		case 1:
		this.CTL+=this.Step;
		if(this.CTL>=this.ScrollStep&&this.WaitTime>0){this.ID.scrollTop-=this.ScrollStep+this.Step-this.CTL; this.Pause(); return;}
		else{if(this.ID.scrollTop<=0) this.ID.scrollTop+=this.ClientScroll; this.ID.scrollTop-=this.Step;}
		break;
		case 2:
		this.CTL+=this.Step;
		if(this.CTL>=this.ScrollStep&&this.WaitTime>0){this.ID.scrollLeft+=this.ScrollStep+this.Step-this.CTL; this.Pause(); return;}
		else{if(this.ID.scrollLeft>=this.ClientScroll) this.ID.scrollLeft-=this.ClientScroll; this.ID.scrollLeft+=this.Step;}
		break;
		case 3:
		this.CTL+=this.Step;
		if(this.CTL>=this.ScrollStep&&this.WaitTime>0){this.ID.scrollLeft-=this.ScrollStep+this.Step-this.CTL; this.Pause(); return;}
		else{if(this.ID.scrollLeft<=0) this.ID.scrollLeft+=this.ClientScroll; this.ID.scrollLeft-=this.Step;}
		break;
	}
}

});