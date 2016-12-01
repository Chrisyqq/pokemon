/**
 * Created by Chris on 16/9/12.
 */


(function () {
    var percentage="80";
    var PokeMon="<div class='pokemon-head-iframe'>" +
        "<div class='pokemon-page-head' id='pokemonpagehead'>" +
        "<span>最新活动</span>" +
        "<div id='pokemonClose' class='pokemon-close'></div>" +
        "</div>" +
        "<div id='pokemonIframe' class='pokemon-iframe'>" +
        "<iframe class='iframe-move' id='asas' src='newactive.html' name='iFrame' scrolling='yes' frameborder='no' marginwidth='0' marginheight='0' allowtransparency='yes'></iframe>" +
        "</div>" +
        "</div>" +
        "<div id='pokemon' class='pokemonbox'>" +
        "<div class='pokemonbox-inside'>" +
        "<div id='pokemonboxInsideLeft' class='pokemonbox-inside-left'>" +
        "<div class='inside-left-serve'>" +
        "<a href='roadbank.html' target='iFrame'>" +
        "<div class='serve-box active'>" +
        "<div class='serve-box-img roadbank'></div>" +
        "<span>流量银行</span>" +
        "</div>" +
        "</a>" +
        "<a href='newactive.html' target='iFrame'>" +
        "<div class='serve-box'>" +
        "<div class='serve-box-img newactive'></div>" +
        "<span>最新活动</span>" +
        "</div>" +
        "</a>" +
        "<a href='vip.html' target='iFrame'>" +
        "<div class='serve-box'>" +
        "<div class='serve-box-img vip'></div>" +
        "<span>VIP</span>" +
        "</div>" +
        "</a>" +
        "<a href='collect.html' target='iFrame'>" +
        "<div class='serve-box'>" +
        "<div class='serve-box-img collect'></div>" +
        "<span>收藏</span>" +
        "</div>" +
        "</a>" +
        "<a href='more.html' target='iFrame'>" +
        "<div class='serve-box red-point-tishi'>" +
        "<div class='serve-box-img more'></div>" +
        "<span>更多</span>" +
        "</div>" +
        "</a>" +
        "</div>" +
        "<!--<div class='out-border-circle' style=''></div>-->" +
        "</div>" +
        "<div id='allbk' class='bk bkbase'>" +
        "</div>" +
        "<div id='bigbk' class='big-bk'></div>" +
        "<div id='' class='pokemonbox-inside-right'>" +
            "<div class='pokemonbox-inside-right-bk'>" +
                "<div id='flowMoveBox' class='pokemonbox-inside-right-bkblue'>" +
                "</div>" +
            "</div>" +
            "<div class='out'>" +
                "<div id='wave' class='wave'>" +
                    "<p><span id='horizontallinenum' style='font-size: 14px'>80</span>%</p>" +
                "</div>" +
            "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    document.body.innerHTML+=PokeMon;

})();

//拖动球
var dateStart,dateEnd,starw,starh,wavebk,waveN;
var FreeHeight=0;//这里可以调整高度
var FreeWeight=0;//这里可以左右移动

(function (event) {
    var obj=document.getElementById("pokemon");
    var flowMoveBox=document.getElementById("flowMoveBox");
    var objWH=obj.clientHeight;
    var horizontalLineNum=document.getElementById("horizontallinenum").innerText;
    waveN=horizontalLineNum/100;
    // var flowIn=document.getElementById("flowin");
    var allBk=document.getElementById("allbk");
    var bigBk=document.getElementById("bigbk");
    var pokemonboxInsideLeft=document.getElementById("pokemonboxInsideLeft");
    var pokemonIframe=document.getElementById("pokemonIframe");
    var pokemonPageHead=document.getElementById("pokemonpagehead");

    //初始位置居中
    var originalPlaceY=parseInt(window.innerHeight*0.13)+FreeHeight;//
    var originalPlaceYt=parseInt(window.innerHeight*0.87)-68-FreeHeight;
    var originalPlaceX=parseInt(window.innerWidth*0.5)-306/2+FreeWeight;

    var event = event || window.event;
    //隐藏

    function hiddenball() {
        if(obj.clientWidth==objWH){
            obj.style.opacity="0.4";
        }
    }
    setTimeout(hiddenball,3000);

    // flowIn.style.top=(100-horizontalLineNum)+"%";
    
    //判断是否第一次打开这个浏览器,并且保存位置
    if (localStorage.getItem('msgw')==null){
        obj.style.bottom=originalPlaceY;
        obj.style.right=originalPlaceX;
    }else {
        obj.style.left=localStorage.getItem('msgw')+'px';
        obj.style.top=localStorage.getItem('msgh')+'px';
    }

    //判断流量数据,配置不同的颜色
    if(horizontalLineNum<=20){
        obj.setAttribute("name","red");
        obj.className += " pokemonbox-bright-red";
        flowMoveBox.className = "pokemonbox-inside-right-bkred";
        wavebk='img/waver.png';

    }else if(horizontalLineNum>20 && horizontalLineNum<=50){
        obj.setAttribute("name","yellow");
        obj.className += " pokemonbox-bright-yellow";
        flowMoveBox.className = "pokemonbox-inside-right-bkyellow";
        wavebk='img/wavey.png';
    }else if(horizontalLineNum>50){
        obj.setAttribute("name","blue");
        obj.className += " pokemonbox-bright-blue";
        flowMoveBox.className = "pokemonbox-inside-right-bkblue";
        wavebk='img/waveb.png';
    }

    //点击 开始
    function touchStart(event) {
        allBk.style.opacity="1";

        dateStart=new Date();
        if(obj.clientWidth==objWH){
            starw=parseInt(event.touches[0].pageX)-obj.offsetLeft;
            starh=parseInt(event.touches[0].pageY)-obj.offsetTop;
            obj.style.opacity="1";
        }else{
            starw=parseInt(event.touches[0].pageX)-obj.offsetLeft-238;
            starh=parseInt(event.touches[0].pageY)-obj.offsetTop;
        }

    }

    //点击移动
    function touchMove(event) {
        event.preventDefault();
        var x=parseInt(event.touches[0].pageX);
        var y=parseInt(event.touches[0].pageY);
        var h = parseInt(window.innerHeight);
        var w = parseInt(window.innerWidth);
        var dx=w-parseInt(obj.clientHeight)+starw;
        var dy=h-parseInt(obj.clientHeight)+starh;
        if(obj.clientWidth==objWH){
            if(starw<=x && x<=dx){
                obj.style.left = parseInt(event.touches[0].pageX)-starw+'px';
            }
            if(starh<=y && y<=dy){
                obj.style.top = parseInt(event.touches[0].pageY)-starh+'px';
            }
        }else{

        }
    }
    //点击结束
    function touchEnd(event) {
        dateEnd=new Date();
        var time=dateEnd-dateStart;
        //点击在150ms 里面
        if(0<=time && time<=150){
            //根据对象的高度 在执行不同的样式
            if(obj.clientWidth==objWH){

                obj.style.opacity="1";
                obj.style.left=originalPlaceX+"px";
                obj.style.top=originalPlaceYt+"px";
                document.getElementById("allbk").className="bkbase";
                document.getElementsByClassName("pokemonbox")[0].style.border="1px solid #dfdfdf";
                document.getElementsByClassName("pokemonbox-inside-right")[0].style.border="1px solid #dfdfdf";
                document.getElementsByClassName("pokemonbox")[0].className +=" pokemonbox-big";
                document.getElementsByClassName("pokemon-head-iframe")[0].style.display="block";
                document.getElementsByClassName("pokemonbox-inside-left")[0].style.display="block";
                document.getElementsByClassName("pokemonbox-inside-left")[0].className +=" pokemonbox-inside-left-movie";
            }else{
                //判断张开后 点击是否在小圆球内
                if(starw>0 && starw<60){
                    $('#allbk').addClass('bk');
                    document.getElementsByClassName("pokemonbox")[0].style.border="none";
                    document.getElementsByClassName("pokemonbox-inside-right")[0].style.border="none";
                    document.getElementsByClassName("out")[0].style.border="none";
                    document.getElementsByClassName("pokemonbox-inside-left")[0].style.display="none";
                    document.getElementsByClassName("pokemon-head-iframe")[0].style.display="none";

                    obj.style.left=localStorage.getItem('msgw')+'px';
                    obj.style.top=localStorage.getItem('msgh')+'px';
                    ballStyle=obj.getAttribute("name");
                    switch (ballStyle)
                    {
                        case "red":
                            obj.className = "pokemonbox pokemonbox-bright-red";
                            break;
                        case "yellow":
                            obj.className = "pokemonbox pokemonbox-bright-yellow";
                            break;
                        case "blue":
                            obj.className = "pokemonbox pokemonbox-bright-blue";
                            break;
                    }
                    setTimeout(hiddenball,3000);
                }
            }
        }
        //点击超过150秒 确认是移动然后保存位置信息
        if(time>150){
            if(obj.clientWidth==objWH){
                strw = obj.offsetLeft;
                strh = obj.offsetTop;
                localStorage.setItem('msgw', strw);
                localStorage.setItem('msgh', strh);
            }

            setTimeout(hiddenball,3000);
        }

    }


    obj.addEventListener('touchstart',touchStart,false);
    obj.addEventListener('touchmove',touchMove,false);
    obj.addEventListener('touchend',touchEnd,false);
})();

(function () {
    $('.serve-box').click(function () {
        if($(this).hasClass('active')){

        }else {
            $('.serve-box').removeClass('active');
            $(this).addClass('active');
        }
    })

})();

(function () {
    $('.serve-box').click(function () {
        $('#pokemonpagehead span').text($(this).text());
    });
    $('.pokemonbox-inside').click(function () {
    })
})();


(function () {
    var wave = (function () {
        var ctx;
        var waveImage;
        var canvasWidth;
        var canvasHeight;
        var needAnimate = false;

        function init(callback) {
            var wave = document.getElementById('wave');
            var canvas = document.createElement('canvas');
            if (!canvas.getContext) return;
            ctx = canvas.getContext('2d');

            canvasWidth = wave.offsetWidth;
            canvasHeight = wave.offsetHeight;
            canvas.setAttribute('width', canvasWidth);
            canvas.setAttribute('height', canvasHeight);
            wave.appendChild(canvas);
            waveImage = new Image();
            waveImage.onload = function () {
                waveImage.onload = null;
                callback();
            }
            waveImage.src = wavebk;
        }

        function animate() {
            var waveX = 0;
            var waveY = 0;
            var waveX_min = -42;
            var waveY_max = canvasHeight * waveN;
            var requestAnimationFrame =
                window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 60000 / 60);
                };

            function loop() {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                if (!needAnimate) return;
                if (waveY < waveY_max) waveY += 1.5;
                if (waveX < waveX_min) waveX = 0; else waveX -= 0.6;

                ctx.globalCompositeOperation = 'source-over';
                ctx.beginPath();
                ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasHeight / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = "#ffffff";
                ctx.globalCompositeOperation = 'source-in';
                ctx.drawImage(waveImage, waveX, canvasHeight - waveY);

                requestAnimationFrame(loop);
            }

            loop();
        }

        function start() {
            if (!ctx) return init(start);
            needAnimate = true;
            setTimeout(function () {
                if (needAnimate) animate();
            }, 100);
        }

        function stop() {
            needAnimate = false;
        }

        return {start: start, stop: stop};
    }());

    wave.start();
})();
