const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

// 进度度长度
let progress = 0;
// drawProgress();
// let pro = 0;
let frames = 0;
let bolls = [];
let barColor = [randomNum(0, 255, true), randomNum(0, 255, true), randomNum(0, 255, true)];

let rad = Math.PI * 2 / 100;
let speed = 0.1;

//随机数 m-n
function randomNum(m, n, int) {
    if (int) {
        return Math.floor(Math.random() * (n - m) + m);
    } else {
        return Math.random() * (n - m) + m;
    }
}

//随机颜色
function randomColor() {
    return `rgba(${randomNum(50, 205, true)},${randomNum(50, 205, true)},${randomNum(50, 205, true)})`;
}

class Boll {
    constructor(...values) {
        [this.x, this.y, this.r, this.c] = values;
    }
    // 小球球
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.c;
        ctx.fill();
    }
    // 初速度
    generateSpeed(m, n, int) {
        this.sx = -randomNum(m, n, int) / 2;
        this.sy = -randomNum(m, n, int);
    }

    move() {
        this.x = this.x + this.sx;
        this.y = this.y + this.sy;
    }

    // 更新小球速度 半径
    updateBoll() {
        this.sy = this.sy + 0.5;
        this.r = this.r - 0.02;
        if (this.r <= 0) {
            this.r = 0;
        }
    }
}

let id = setInterval(() => {
    frames++
    progress += 0.5

    // 清空画布
    ctx.clearRect(0, 0, 500, 500)

    //每10帧 生成小球球
    if (frames % 1 === 0) {
        let b = new Boll(progress + 30, 30, 2.5, randomColor())
        bolls.push(b)
        b.draw()
        b.generateSpeed(2, 4, false)
    }

    // 小球球移动 新小球球生成 更新小球球速度
    for (boll of bolls) {
        boll.move();
        boll.draw();
        boll.updateBoll();
    }
    //半径小于等于0 就删掉
    bolls.forEach((boll, index, bolls) => {
        if (boll.r <= 0) {
            bolls.splice(index, 1);
        }
    });

    if (progress >= 400) {
        clearInterval(id);
    }

    // 绘制进度条底层
    ctx.fillStyle = "lightgray";
    ctx.fillRect(30, 30, 400, 10);

    // 绘制进度条
    ctx.fillStyle = "green";
    ctx.fillRect(30, 30, progress, 10);

    // 进度圆圈背景
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.arc(215, 85, 30, 0, Math.PI * 2, Math.PI * 2,false);
    ctx.stroke();
    ctx.fillStyle = "#54c1c8";
    ctx.fill();

    // 运动进度圆圈
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    // ctx.arc(225, 97, 28, 0, -Math.PI / 2, -Math.PI / 2+progress*rad,false);
    ctx.arc(215, 85, 30, -Math.PI / 2, -Math.PI / 2 + (progress / 4) * (Math.PI * 2 / 100), false);
    ctx.stroke();
    ctx.fillStyle = "#54c1c8";
    ctx.fill();


    // 进度百分比文体
    ctx.fillStyle = "#4a4a4a";
    ctx.font = '16px sans-serif';
    ctx.fillText(parseInt(progress / 4) + "%", 200, 90);

}, 30);


