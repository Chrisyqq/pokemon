/**
 * Created by Chris on 16/9/12.
 */

//拖动球
var dateStart,dateEnd,starw,starh;

var FreeHeight=0;//这里可以调整高度
var FreeWeight=0;//这里可以左右移动
(function () {
    var obj=document.getElementById("pokemon");
    var flowMoveBox=document.getElementById("flowMoveBox");
    var objWH=obj.clientHeight;
    var horizontalLineNum=document.getElementById("horizontallinenum").innerText;
    var flowIn=document.getElementById("flowin");
    var allBk=document.getElementById("allbk");
    var bigBk=document.getElementById("bigbk");
    var pokemonboxInsideLeft=document.getElementById("pokemonboxInsideLeft");
    var pokemonIframe=document.getElementById("pokemonIframe");
    var pokemonPageHead=document.getElementById("pokemonpagehead");

    //初始位置居中
    var originalPlaceY=parseInt(window.innerHeight*0.13)+FreeHeight;//
    var originalPlaceYt=parseInt(window.innerHeight*0.87)-68-FreeHeight;
    var originalPlaceX=parseInt(window.innerWidth*0.5)-300/2+FreeWeight;

    var event = event || window.event;
    //隐藏
    function hiddenball() {
        if(obj.clientWidth==objWH){
            allBk.style.opacity="0.4";
        }
    }

    flowIn.style.top=(100-horizontalLineNum)+"%";

    //判断是否第一次打开这个浏览器,并且保存位置
    if (localStorage.getItem('msgw')==null){
        obj.style.bottom=originalPlaceY;
        obj.style.right=originalPlaceX;
    }else {
        obj.style.left=localStorage.getItem('msgw');
        obj.style.top=localStorage.getItem('msgh');
    }

    //判断流量数据,配置不同的颜色
    if(horizontalLineNum<=20){
        obj.setAttribute("name","red");
        obj.className += " pokemonbox-bright-red";
        flowMoveBox.className = "pokemonbox-inside-right-bkred";

    }else if(horizontalLineNum>20 && horizontalLineNum<=50){
        obj.setAttribute("name","yellow");
        obj.className += " pokemonbox-bright-yellow";
        flowMoveBox.className = "pokemonbox-inside-right-bkyellow";
    }else if(horizontalLineNum>50){
        obj.setAttribute("name","blue");
        obj.className += " pokemonbox-bright-blue";
        flowMoveBox.className = "pokemonbox-inside-right-bkblue";
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
                obj.style.left = parseInt(event.touches[0].pageX)-starw;
            }
            if(starh<=y && y<=dy){
                obj.style.top = parseInt(event.touches[0].pageY)-starh;
            }
        }else{
            event.preventDefault();
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
                //ifream
                // obj.style.top=originalPlaceYt;
                // obj.style.left=originalPlaceX;
                obj.style.opacity="1";
                $('#pokemon').animate({left:originalPlaceX,top:originalPlaceYt},500);
                var ballStyle=obj.getAttribute("name");
                // pokemonboxInsideLeft.style.display="block";

                // bigBk.style.display="block";
                // switch (ballStyle)
                // {
                //     case "red":
                //         obj.className = "pokemonbox pokemon-small-color-red";
                //         break;
                //     case "yellow":
                //         obj.className = "pokemonbox pokemon-small-color-yellow";
                //         break;
                //     case "blue":
                //         obj.className = "pokemonbox pokemon-small-color-blue";
                //         break;
                // }
                // obj.className +=" pokemonbox-big";
                $('#allbk').removeClass('bk');
                $('.pokemonbox').css({
                    'border':'1px solid #dfdfdf',
                    'background':'#ffffff',
                    'box-shadow':'0 5px 8px #dfdfdf',
                    'height':'66px'
                });
                $('.pokemonbox-inside').css({
                    'border-left':'1px solid #dfdfdf',
                    'border-top':'1px solid #dfdfdf',
                    'border-bottom':'1px solid #dfdfdf',
                    'width':'262px',
                    'height':'52px',
                    'margin-top':'6px',
                    'margin-left':'6px',
                    'border-top-left-radius':'30px',
                    'border-bottom-left-radius':'30px',
                    'background':'#ffffff',
                    'box-shadow':'0 0 2px #dfdfdf',
                    'z-index':'100'
                });
                $('.pokemonbox-inside-right').css({
                    'background':'#ffffff',
                    'z-index':'200',
                    'height':'52px',
                    'width':'52px',
                    'margin-top':'-1px',
                    'overflow':'hidden'
                });
                $('.out-circle').css({
                    'display':'block'
                });
                $('.in-over').addClass('in-over-two');
                $('.pokemonbox').animate(
                    {width:'300px'},300,
                    function () {
                        $('.pokemonbox-inside-left').animate({opacity:'1',top:'8px'},300,function () {
                            $('.pokemon-iframe').css({'right':originalPlaceX+6,'bottom':originalPlaceY+10,'display':'block'});
                            $('.pokemon-page-head').css({'right':originalPlaceX+6,'bottom':originalPlaceY+280,'display':'block'});
                            $('.pokemon-iframe').animate({opacity:'1',bottom:originalPlaceY+35},100);
                            $('.pokemon-page-head').animate({opacity:'1',bottom:originalPlaceY+305},100);
                        });
                        $('.pokemonbox-inside-left').css('z-index','350')
                    }
                );

            }else{
                //判断张开后 点击是否在小圆球内
                if(starw>0 && starw<60){
                    $('.pokemon-page-head').css({opacity:'0',display:'none'});
                    $('.pokemon-iframe').css({opacity:'0',display:'none'});
                    $('#allbk').addClass('bk');
                    $('.pokemonbox').css({
                        'border':'none',
                        'background':'none',
                        'box-shadow':'none',
                        'height':'68px'
                    });
                    $('.pokemonbox-inside').css({
                        'border-left':'none',
                        'border-top':'none',
                        'border-bottom':'none',
                        'width':'262px',
                        'height':'54px',
                        'margin-top':'6px',
                        'margin-left':'6px',
                        'border-top-left-radius':'30px',
                        'border-bottom-left-radius':'30px',
                        'background':'#ffffff',
                        'box-shadow':'none',
                        'z-index':'100'
                    });
                    $('.pokemonbox-inside-right').css({
                        'border-left':'none',
                        'border-top':'none',
                        'border-bottom':'none',
                        'background':'none',
                        'box-shadow':'none',
                        'z-index':'200',
                        'height':'52px',
                        'width':'52px',
                        'margin-top':'-1px',
                        'overflow':'hidden',
                        'opcaity':'0'
                    });
                    $('.in-over').removeClass('in-over-two');
                    $('.pokemonbox-inside-left').css({opacity:'0'});
                    $('.pokemonbox').animate({width:'70px','box-shadow':'none'},300);
                    obj.style.left=localStorage.getItem('msgw');
                    obj.style.top=localStorage.getItem('msgh');
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
                var strw = obj.offsetLeft;
                var strh = obj.offsetTop;
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