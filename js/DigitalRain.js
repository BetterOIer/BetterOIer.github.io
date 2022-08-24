(function () {
    const scripts = document.getElementsByTagName("script"),
        script = scripts[scripts.length - 1],
        fontSize = script.getAttribute("size") || 12,
        fontName = script.getAttribute("font") || "monospace";
    const canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.style.cssText = "position: fixed; top: 0; left: 0; background-color: #111; z-index: -2;";
    let W = window.innerWidth,
        H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let colunms = Math.floor(W / fontSize),
        drops = [],
        str = "QWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()1234567890qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < colunms; i++) {
        drops.push(Math.ceil(canvas.height / fontSize) + 1)
    }
    function draw(){
        context.fillStyle = "rgba(238,238,238,.08)";//遮盖层
        context.fillRect(0,0,W,H);
        //给字体设置样式
        context.font = "600 "+fontSize+"px  Georgia";
        //给字体添加颜色
        context.fillStyle = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"][parseInt(Math.random() * 10)];//randColor();可以rgb,hsl, 标准色，十六进制颜色
        //写入画布中
        for(var i=0;i<colunms;i++){
            var index = Math.floor(Math.random() * str.length);
            var x = i*fontSize;
            var y = drops[i] *fontSize;
            context.fillText(str[index],x,y);
            //如果要改变时间，肯定就是改变每次他的起点
            if(y >= canvas.height && Math.random() > 0.99){
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    function randColor(){//随机颜色
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb("+r+","+g+","+b+")";
    }
    draw();
    setInterval(draw, 35);
    window.addEventListener("resize", (function () {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        colunms = Math.floor(W / fontSize);
        drops = [];
        for (let i = 0; i < colunms; i++) {
            drops.push(Math.ceil(canvas.height / fontSize) + 1)
        }
    }))
})();