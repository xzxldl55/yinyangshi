/**
 * Created by HASEE on 2017/5/23.
 */

//头部fixed导航
(function () {
    var $nav = $("#nav"),
        $btn = $nav.find(".mainList .mBtn"),
        // $trangle = $btn.find(".trangle"),
        $hide = $nav.find(".hide"),
        $hideList = $hide.find("li"),
        $navLogo = $nav.find(".navLogo"),
        $hideListA = $hideList.find("a.hideList"),
        index;



    //移入移出显示隐藏
    $btn.hover(function () {
        index = $(this).index(".mainList li.mBtn");
        $(this).addClass("hover");
        $nav.addClass("hover");
        $hide.stop().slideDown();
        $hideList.eq(index).stop().fadeIn();
    },function () {
        $(this).removeClass("hover");
        $nav.removeClass("hover");
        $hide.stop().slideUp();
        $hideList.eq(index).stop().fadeOut();
    });
    $hide.hover(function () {
        $nav.addClass("hover");
        $hide.stop().slideDown();
        $hideList.eq(index).stop().fadeIn();
    },function () {
        $nav.removeClass("hover");
        $hide.stop().slideUp();
        $hideList.eq(index).stop().fadeOut();
    })

    //移入向上动
    $hideListA.hover(function () {
       $(this).animate({
           marginTop: -20
       },300)
    },function () {
        $(this).animate({
            marginTop: 0
        },300)
    });

    //hLogo
    var $logo = $("#header").find("#hLogo");
    $logo.delay(1000).queue(function () {//妙用queue使得css也可以用delay延迟
        $(this).css({
            left:40,
            opacity:1
        })
    });

    //向下滚动时导航隐藏层出现
    $(window).scroll(function (e) {
        //noinspection JSValidateTypes
        if ($(document).scrollTop()){
            $nav.addClass("scroll");
            $navLogo.addClass("scroll");
            $logo.addClass("scale");
        }else {
            $nav.removeClass("scroll");
            $navLogo.removeClass("scroll");
            $logo.removeClass("scale");
        }
    });

})();
//角色动画
(function () {
    var $rol1 = $("#role").find(".rol1"),
        $rol2 = $("#role").find(".rol2"),
        $btn = $("#role").find(".rolBtn"),
        index = 0;

    change($rol1,$rol2);

    $btn.click(function () {
        index ? change($rol2, $rol1) : change($rol1, $rol2);
    });

    function change($rol1,$rol2) {
        var $mana = $rol1.find(".man"),//要显示的
            $manr = $rol2.find(".man");//要消失的
        $manr.addClass("hide");


        //有点小BUG
        $mana.stop().delay(1000).queue(function () {
            $(this).removeClass("hide");
        });
        setTimeout(function () {
            index = index+1>1?0:1;
        },1000);

    };
})();

//服务器列表
(function () {
    var $open = $("#role").find(".serveImg"),
        $serve = $("#serve"),
        $sBg = $serve.find(".sBg"),
        $btn = $sBg.find(".btnClose");
    $open.click(function () {
        $serve.removeClass("hide");
        setTimeout(function () {
            $sBg.removeClass("hide");
        },50);
        // document.onmousewheel = function (e) {
        //     e = e || window.event;
        //     e.cancelBubble = true;
        // }
    });
    $btn.click(function () {
       $sBg.addClass("hide");
       setTimeout(function () {
           $serve.addClass("hide");
       },600)
    });

})();
//日历
(function(){
    var $content = $("#content"),
        $saoma = $content.find(".saoma"),
        $saomaShow = $saoma.find(".saomaShow"),
        $shouhui = $saomaShow.find(".shouhui"),
        $xiaode = $saoma.find(".xiaode");
    //扫码板块
    //收起
    $shouhui.click(function () {
        $saoma.animate({
            marginLeft:194,
            width:350
        },500);
        $saomaShow.stop().delay(450).queue(function () {
            $saomaShow.addClass("hide");
            $xiaode.removeClass("hide");
        });
    })
    //展开
    $xiaode.click(function () {
        $saoma.animate({
            marginLeft:-143,
            width:375
        },500);
        $xiaode.stop().delay(450).queue(function () {
            $xiaode.addClass("hide");
            $saomaShow.removeClass("hide");
        });
    })
    //右侧列表移入移出
    var $calendar = $content.find(".calendar"),
        $pHover = $calendar.find(".hover");
    //依次为：挑战副本、御魂副本、式神委派、集结之境、挑战BOSS、斗技
    var pImg = [0,0,0,0,"0px 0px","0 -376px","-327px -669px","-621px -669px","-311px 0","-758px -4px"],
        yPImg = [0,0,0,0,"-3px -1300px","-330px -1053px","-301px -1193px","-308px -1300px","-618px -1300px","-660px -1044px"];
    $pHover.stop().hover(function () {
        $(this).css("backgroundPosition",pImg[$(this).index()]);
        $(this).addClass("show");
    },function () {
        $(this).removeClass("show");
        $(this).stop().delay(250).queue(function () {
            $(this).css("backgroundPosition",yPImg[$(this).index()]);
        })
    })
})();

/**
 * banner对象的封装！！！！
 *
 * ***/
(function(){
    //非自动移入切换banner
    function Banner($wrap,$pic,$tab) {
        this.wrap = $wrap;
        this.pic = $pic;
        this.tab = $tab;
        this.length = $tab.length;
        this.leftIndex = $wrap.width();
        this.index = 0;
    }
    Banner.prototype = {
        exe :
            function () {
                this.info();
                this.Tab();
            },
        //初始化
        info :
            function () {
                this.tab.eq(0).addClass("on");
                this.pic.css("left",0);
            },
        Tab :
            function () {
                var This = this;
                for (var i=0;i<this.length;i++){
                    // this.tab.eq(i).attr("index",i);//用来存放其索引值-->相当于原生Js中利用自定义属性来....
                    this.tab.eq(i).stop().delay(200).queue(function () {
                        $(this).hover(function () {
                            $(this).siblings().removeClass("on");
                            $(this).addClass("on");
                            This.index = This.tab.index($(this));//方法一
                            // This.index = $(this).attr("index");方法二
                            This.change(This.index);
                        })
                    })
                }
            },
        change : 
            function (index) {
                this.pic.stop().animate({
                    "left": -this.leftIndex*index
                },350);
            }

    };




    //自动移入切换banner
    /*
    *继承
    * */
    //属性继承
    function BannerAuto($wrap,$pic,$tab) {
        Banner.call(this,$wrap,$pic,$tab);
        this.timer = null;
    };
    //原型继承
    function Fn() {};
    Fn.prototype = Banner.prototype;
    BannerAuto.prototype = new Fn();


    //新增auto方法
    BannerAuto.prototype.auto = function () {
        var This = this;
        this.timer = setInterval(function () {
                        This.index++;
                        This.index %= This.length;
                        This.change(This.index);
                        This.tab.removeClass("on");
                        This.tab.eq(This.index).addClass("on");
                    },3500);
    };
    //鼠标移入停止运动
    BannerAuto.prototype.stopAuto = function () {
            var This = this;
            this.wrap.mouseenter(function () {
                clearInterval(This.timer);
            });
            this.wrap.mouseleave(function () {
                This.auto();
            });
    };
    //中介法将auto、stopAuto方法加入新的对象
    BannerAuto.prototype.mid = BannerAuto.prototype.exe;
    BannerAuto.prototype.exe = function () {
        this.mid();
        this.auto();
        this.stopAuto();
    };


    //将Banner对象变为全局对象
    window.Banner = Banner;
    window.BannerAuto = BannerAuto;
})();

//主题内容1
(function () {
    //banner1
    //实例化
    var banner1 = new  BannerAuto($("#content").find(".MainContent .banner1"),$("#content").find(".MainContent .banner1 .ban1"),$("#content").find(".MainContent .banner1 .tab li"));
    banner1.exe();
})();

//新闻板块
(function(){
    var $newsCon = $(".news1Content"),
        $newsBox = $newsCon.find(".ListBox"),
        $newsList = $newsBox.find(".news1List"),
        $newsTab = $('.news1 .tit li');
    $newsTab.hover(function () {
       $(this).addClass("on").siblings().removeClass("on");
    });
    $newsList.each(function (i) {
        var num = 0;//计算创建标签个数
        //循环遍历Data数据
        for (var j=0,length = newData.length;j<length;j++){
            //最新或者每个tab对应的新闻-->true
            if (!i || newData[j].typeX === (i-1)){
                //创建对应标签,并加入肯德基豪华午餐
                $(this).append("<li><p><a href=''>"+newData[j].title+"</a></p><span>"+newData[j].time+"</span></li>");
                num++;//创建一个加一次
                if (num === 5) break;//满五个结束
            }
        }
    });

    //实例化
    var banner = new Banner($newsCon,$newsBox,$newsTab);
    banner.exe();
})();
//式神列表
(function(){
    var $shishenBox = $(".shishenContent"),
        $shishenUl = $shishenBox.find("ul");//all、ssr、sr、r、n
    /*
    * 遍历式神列表
    * */
    //式神计数器，第一个为all依次下去，
    // 每行第一个元素为该选区式神个数，第二个元素用于生成li标签来存放式神图标
    var midcont = [[0,null],[0,null],[0,null],[0,null],[0,null]];
    for (var i=0,length = shishenData.length;i<length;i++){
        var index = 0;//用于判断当前数据是属于哪个式神区
        switch (shishenData[i].level){
            case "SSR":
                index = 1;
                break;
            case  "SR":
                index = 2;
                break;
            case  "R":
                index = 3;
                break;
            case  "N":
                index = 4;
                break
        }
        midcont[0][0]++;//计数All所以每次遍历都会加
        midcont[index][0]++;//对应等级式神++
        //创建li标签，并放进对应的ul里面
        if (midcont[0][0] % 2){//当all中式神个数不是二的倍数时说明是每个li的第一个则要添加一个li标签
            midcont[0][1] = $("<li></li>");
            $shishenUl.eq(0).append(midcont[0][1]);
        }
        if (midcont[index][0] % 2){//同上咯，略略略
            midcont[index][1] = $("<li></li>");
            $shishenUl.eq(index).append(midcont[index][1]);
        }
        //判断是否是“新"
        var $p = shishenData[i].isNew?$("<p><img src='images/index/shishen/"+shishenData[i].id+".png' alt=''><span></span><i><em>"+shishenData[i].name+"</em></i></p>"):$("<p><img src='images/index/shishen/"+shishenData[i].id+".png' alt=''><i><em>"+shishenData[i].name+"</em></i></p>");
        var $clone = $p.clone();
        midcont[0][1].append($p);
        midcont[index][1].append($clone);
    };
    /*
    *式神列表左右点击事件&&选择等级
    * */
    var $tit = $(".shishen .tit span.t"),
        $tab = $(".shishen .shishenContent .tab"),
        width = $shishenBox.outerWidth(),
        index = 0,
        Ulength = [],
        Clength = [];
    $shishenUl.each(function (i) {
        var length = 0;
        for (var j = 0;j<$(this).children().length;j++){
            length += $(this).children().eq(j).outerWidth();
        }
        if (length>width){
            $tab.eq(1).addClass("show");
        }
        Ulength[i] = Math.ceil(length/810)-1;
    });
    $tit.click(function () {
        index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $shishenUl.eq(index).addClass("show").siblings().removeClass("show");
        //是否要显示下一页的按钮
        var length = 0;
        for (var j = 0;j<$shishenUl.eq(index).children().length;j++){
            length += $shishenUl.eq(index).children().eq(j).outerWidth();
        }
        if (length>width){
            $tab.eq(1).addClass("show");
        }
        change(index);
    });
    //克隆一份计数表
    for (var i=0;i<Ulength.length;i++) {
        Clength[i] = Ulength[i];
    }
    //分析显示/隐藏按钮
    function change(index) {
        $tab.addClass("show");
        if (Clength[index]==Ulength[index]){
            $tab.eq(0).removeClass("show");
        }
        if (!Clength[index]){
            $tab.eq(1).removeClass("show");
        }
    }
    //点击列表切换
    $tab.eq(1).click(function () {
        var Left = Number($shishenUl.eq(index).position().left)-width;
        $shishenUl.eq(index).animate({
            left:Left
        },300);
        Clength[index]--;
        change(index);
    });
    $tab.eq(0).click(function () {
        var Left = Number($shishenUl.eq(index).position().left)+width;
        $shishenUl.eq(index).animate({
            left: Left
        }, 300);
        Clength[index]++;
        change(index);
    })

})();
//阴阳师列表！！！
(function(){
    var $btns = $(".yinyangshi .leftList p.lls"),
        $massage = $(".yinyangshi .rightList li");
    $btns.click(function () {
        var index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $massage.eq(index).addClass("on").siblings().removeClass("on");
    })
})();
//点击切换阴阳师列表和式神列表
(function(){
    var $btn = $(".pingan .Boxqiehuan"),
        $box = $(".shishenBox>div");
    $btn.click(function () {
        var index = $(this).index(".Boxqiehuan");
        $(this).addClass("on").siblings().removeClass("on");
        $box.eq(index).addClass("show").siblings().removeClass("show");
    });
})();

//问题界面的Banner
(function(){
    var $wrap = $(".wentiBanner"),
        $Ul = $wrap.find(".wentiBan"),
        $tab = $(".wentiTab li");

    var Banner3 = new BannerAuto($wrap,$Ul,$tab);
    Banner3.exe();
})();

//攻略文章遍历
(function(){
    var $glContent = $(".glContent"),
        $glBox = $glContent.find(".glMoveBox .glBox");
    var glClass = ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"];
    $glBox.each(function (i) {
        for (var j = 0,length = strateData.length;j<length;j++){
            var data = strateData[j],
                Reg = new RegExp(i-1);//正则匹配标题类型对应文章
            if (!0 || Reg.test(data.type)){//第一项最新，和后面的其他项（所以要i-1）
                var index = !i?data.type.charAt(data.type.length-1):i-1;//用来取data类型对应文字，最新项则取最后一项！
                $(this).append("<p><a href=''><strong></strong><span>【"+glClass[index]+"】"+data.title+"</span><i>"+data.author+"</i></a></p>")
            }
        }
    });
})();
//攻略的banner效果
(function(){
    var $glContent = $(".glContent"),
        $glMove = $glContent.find(".glMoveBox"),
        $tab = $(".gltit li.gll");
    var $banner4 = new Banner($glContent,$glMove,$tab);
    $banner4.exe();
})();

//同人Banner效果
(function(){
    var $wrap = $(".trShow"),
        $moveBox = $wrap.find(".trMoveBox"),
        $tab = $(".fuTit li");
    var Banner5 = new Banner($wrap,$moveBox,$tab);
    Banner5.exe();

})();

//返回顶部！！！
(function(){
    var $return = $('.codeAre .returnTop');
    $return.click(function () {
        $("html,body").animate({
            scrollTop:0
        },500)
    });
})();


