/*
       用面向对象的思维来开发
        定义一个气球对象
        属性和方法：   载体（盒子）div
        		半径 r
        		位置 left top
        		背景 bg
        		速度 speedx speedy
        将气球画出来的方法DrawBalloon()
        让气球动起来run()
*/

//定义一个气球对象
function Balloon(pic) {
    //（载体）盒子div
    this.div = document.createElement("div");


    //初始位置left top
    this.left = randomRange(0,1000);
    this.top = randomRange(0,600);
    //颜色bg
    if(pic == null){
        this.bg = randomColor();
        //半径r 范围20~80
        this.r = randomRange(20,80);
        //运行速度speedX Y
        this.speedX = randomRange(-6,6);
        this.speedY = randomRange(-6,6);
    } else {
       this.bg = pic;
       this.r = 100;
        //运行速度speedX Y
        this.speedX = randomRange(-3, 3);
        this.speedY = randomRange(-3, 3);
    }



}

//把气球绘制出来 原型
Balloon.prototype.drawBalloon = function(parent){
    this.parent = parent;
    var style = this.div.style;
    style.background = this.bg;
    style.width = this.r * 2 + "px";
    style.height = this.r * 2 + "px";
    style.left = this.left + "px";
    style.top = this.top + "px";
    parent.appendChild(this.div);
}

//封装一个指定范围的随机函数
function randomRange(min,max){
    return Math.random()*(max-min)+min;
}

//封装一个随机颜色
function randomColor(){
    var r = randomRange(0,255);
    var g = randomRange(0,255);
    var b = randomRange(0,255);
    var a = randomRange(0,1);
    return "rgba("+r+","+g+","+b+","+a+")";
}

//让气球动起来
Balloon.prototype.run = function () {
    //获取父容器的宽高
    var maxLeft = this.parent.offsetWidth - this.r * 2;
    var maxTop = this.parent.offsetHeight - this.r * 2;
    var ts = this;
    //使用定时器
    setInterval(function () {
        //获取左边移动的距离
       var left = ts.div.offsetLeft + ts.speedX;
       //获取上边移动的距离
       var top = ts.div.offsetTop + ts.speedY;

       //判断边界问题
        if(left <= 0){
            left = 0;
            ts.speedX *= -1;
        }
        if(top <= 0){
            top = 0;
            ts.speedY *= -1;
        }
        if(left >= maxLeft){
            left = maxLeft;
            ts.speedX *= -1;
        }
        if(top>= maxTop){
            top = maxTop;
            ts.speedY *= -1;
        }

       //开始移动
        ts.div.style.left = left + "px";
        ts.div.style.top = top + "px";


    },20);
}