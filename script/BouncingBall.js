// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = 320;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//实例化小球对象
//初始坐标 x，y 
//水平和垂直速度 velX，velY
//以及颜色和大小
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

//给小球原型加上 draw() 方法
Ball.prototype.draw = function() {
    //声明开始画图
    ctx.beginPath();
    //小球颜色定义颜色
    ctx.fillStyle = this.color;
    //位置和大小，以及画一段 0 - 2pi 的圆弧
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //声明结束
    ctx.fill();
}

//给小球原型加上 update（）方法，处理小球撞边的情况，以及动起来位置问题
Ball.prototype.update = function() {
    //小球运动到边缘，反向运动
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}


//碰撞检测
Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    //判断不是和自己比较，写法可以参考
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

//储存小球
var balls = [];

//每一帧自动更新视图
function loop() {
    //整个画布的颜色设置成半透明的黑色
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    //循环创建小球
    while (balls.length < 15) {
        var ball = new Ball(
        random(0,width),
        random(0,height),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        random(10,20)
        );
        //将新 ball 加入 balls 数组
        balls.push(ball);
    }

    //调用每个小球自己的 draw() 和 update() 方法
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    //递归，再一次调用自己，退出条件不理解，有待查看
    requestAnimationFrame(loop);
}

loop();