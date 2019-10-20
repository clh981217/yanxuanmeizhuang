function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}	

//创建所有的li标签，并且添加到box里
function createLi(num,boxname){
    
    for(let i=1;i<=num;i++){
        let liDom = document.createElement("li");
        liDom.innerHTML="自然堂";
        
        liDom.style.cssText=`
            width:100px;
            height:20px;
        `;
        $(boxname).appendChild(liDom);//appendChild完成了代码的添加，但是图片不能立即显示在网页上（即渲染需要时间）
    }
}

function showLi(boxname){
    //每张图片的宽度
    let liWidth = 150;
    //计算列数；
    let clientWidth =document.documentElement.clientWidth || document.body.clientWidth;
    let colums = parseInt(clientWidth/liWidth);

    //数组存储每一列的当前高度
    // let arr = [0,0,0,0,0,0,0,0];
    let arr = [];
    for(let i=0;i<colums;i++){
        arr.push(0);
    }
    let liDoms = $(boxname).children;
    for(let i=1;i<liDoms.length;i++){
        let colIndex = (i-1)%colums ;//列下标
        liDoms[i].style.left = `${colIndex*liWidth}px`;
        liDoms[i].style.top = `${arr[colIndex]}px`;
        arr[colIndex] += liDoms[i].offsetHeight;//offsetHeight:计算出来的高度（必须等图片显示在网页上，才能计算出来）。
    }
}
//轮播图效果
//1、自动播放
let currIndex = 0;//当前显示的图片的下标。
let myTimer = null;
//自动播放伦比图
function autoPlay(){
    if(myTimer!=null){//已经启动过定时器
        return;
    }
    myTimer = setInterval(()=>{
        goImg(currIndex+1);
     },3000);

}

//2、停止播放
function stopPlay(){
    window.clearInterval(myTimer);
    myTimer = null;
}

//4、跳转到指定的图片上
function goImg(ord){
 //一、数据处理
    //1、改变数据
    let outIndex = currIndex;
    currIndex = ord;
    //2、边界处理
    if(currIndex>4){
        currIndex=0;
    }
    //二、外观呈现
    render(outIndex,currIndex);
}

function render(outIndex,currIndex){
    let imgDoms = $("#introducePic").firstElementChild.children;    
    console.log("出："+outIndex+",进："+currIndex);
   
    fadeInOut(imgDoms[outIndex],imgDoms[currIndex],1000);

    let liDoms = $("#btnBox").children;
    liDoms[outIndex].style.backgroundColor= "white";
    liDoms[currIndex].style.backgroundColor= "#B4A078";
}

//两张图片的淡入淡出效果
function fadeInOut(outImg,inImg,timeLong){
    var opacity1 = 0;
    var timeSpace = 10;
    var step = 1/(timeLong/timeSpace);
    var myTimer =  setInterval(function(){
        opacity1+=step;
        if(opacity1>=1){
            opacity1 = 1;
            window.clearInterval(myTimer);
        }
        inImg.style.opacity = opacity1;
        outImg.style.opacity = 1-opacity1;
    },timeSpace)
}
