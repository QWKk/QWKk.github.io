window.onload = function () {
    var canvas = document.getElementById('canvas'),  
        ctx = canvas.getContext('2d'), 
        centerX = canvas.width / 2,   
        centerY = canvas.height / 2, 
        rad = Math.PI * 2 / 100, 
        speed = 0.1; 
    // 白色外圈
    function blueCircle(n) {
        ctx.save();
        ctx.strokeStyle = "#fff"; 
        ctx.lineWidth = 5; 
        ctx.beginPath();
        ctx.arc(centerX, centerY, 100, -Math.PI / 2, -Math.PI / 2 + n * rad, false); 
        ctx.stroke(); 
        ctx.closePath();
        ctx.restore();
    }
    //绘制白色外圈
    function whiteCircle() {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2; 
        ctx.strokeStyle = "red";
        ctx.arc(centerX, centerY, 100, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    //百分比文字绘制
    function text(n) {
        ctx.save(); 
        ctx.strokeStyle = "#fff"; 
        ctx.font = "40px Arial"; 
        
        ctx.strokeText(n.toFixed(0) + "%", centerX - 25, centerY + 10);
        ctx.stroke(); 
        ctx.restore();
    }
    //动画循环
    (function drawFrame() {
        window.requestAnimationFrame(drawFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        whiteCircle();
        text(speed);
        blueCircle(speed);
        if (speed > 100) speed = 0;
        speed += 0.1;
    }());
}
