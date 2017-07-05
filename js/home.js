/**
 * Created by HASEE on 2017/5/23.
 */
(function () {
    var $swp = $("#wrap").find(".swiper .swp"),
        $flash = $("#bg").find(".bg1 object"),
        $video = $("#wrap").find(".videoPlay"),
        $massageLi = $("#wrap2").find(".massage ul li");

    //flash加载
    $($flash).ready(function () {
        $(this).css("display" , "block");
    })

    //滑入效果
    $swp.eq(0).animate({
        left : 0,
        opacity : 1
    },3000);
    $swp.eq(1).animate({
        right : 0,
        opacity : 1
    },3000);
    $swp.eq(2).animate({
        top : 150,
        opacity : 1
    },1500);
    $swp.eq(3).animate({
        top : 680,
        opacity : 1
    },1500);
    //视频按钮点击
    $video.click(function () {
        $("#videoWrap").show();
    })
   $("#video").find(".close").click(function () {
      $("#videoWrap").hide();
   });
})();
//新版本详情
(function () {
    var $massageLi = $("#wrap2").find(".massage ul li "),//新版本情报盒子
        $detail = $("#detail"),//详情页
        $detailBox = $("#showDetail").find(".detailBox"),//六个详情页盒子
        $detailTxt = $("#showDetail").find(".detailBox .detailTxt"),//放置内容的盒子
        $detailTxtCon = $("#showDetail").find(".detailBox .detailTxt .txt"),//文字内容
        $detailScroll = $("#showDetail").find(".detailBox .detailTxt .scroll"),//自定义滚动条
        $detailBar = $("#showDetail").find(".detailBox .detailTxt .scroll .bar"),//滚动条的...bar
        $detailBtnLeft = $("#detail").find(".toLeft"),
        $detailBtnRight = $("#detail").find(".toRight"),
        $detailClose = $("#closeShow");
    var index = 0;
    //点击图片出现
    $massageLi.each(function (i) {

        $(this).click(function () {
            index = i;
            $detail.show();
            $detailBox.eq(index).show();
            //取消默认滚轮事件
            $detail.mousewheel(function (e,d) {
                return false;
            });

            initBar(index);
            barMove(index);
            mouWheel(index);

        })
    });
    //点击切换
    $detailBtnLeft.click(function () {
        $detailBox.eq(index).hide();
        index--;
        index = index<0?5:index;
        $detailBox.eq(index).show();

        //一些功能函数
        initBar(index);//初始化bar的大小
        barMove(index);//点击拖动bar
        // $detailBar.eq(index).css("top",0);//初始化滚轮
        // $detailTxtCon.eq(index).css("top",0);//初始化内容
        mouWheel(index);//滚轮事件

    })
    $detailBtnRight.click(function () {
        $detailBox.eq(index).hide();
        index++;
        index = index>5?0:index;
        $detailBox.eq(index).show();
        initBar(index);
        barMove(index);
        // $detailBar.eq(index).css("top",0);//初始化滚轮
        // $detailTxtCon.eq(index).css("top",0);//初始化内容
        mouWheel(index);
    })
    //关闭
    $detailClose.click(function () {
        $detailBox.eq(index).hide();
        $detail.hide();
        index = 0;
    })

    //滚轮
    //滚动条初始化
    function initBar(index) {
        $detailBar.height($detailTxt.eq(index).height()/$detailTxtCon.eq(index).height()*$detailScroll.eq(index).height());
    }
    //拖动滚动条
    function barMove(index) {
        $detailBar.eq(index).mousedown(function (e) {
            var $This = $(this),
                sY = e.clientY,//点击时的鼠标Y值
                sT = $(this).position().top,//获取bar当前的top值
                $TxtCon = $(this).parent().siblings(),
                topMax = 400-$(this).height(),
                topMin = 0;
            $(document).mousemove(function (e) {
                var nY = e.clientY,
                    top = nY - sY + sT;//移动到xx高度
                top = Math.min(top,topMax);
                top = Math.max(top,topMin);
                $This.css("top",top);
                //内容移动
                $TxtCon.css("top",-top/topMax*($TxtCon.height()-400));

                return false;
            }).mouseup(function () {
               $(this).off("mousemove").off("mouseup");
            });
        })
    };
    //滚轮滚动
    function mouWheel(index) {
        $detailTxt.eq(index).mousewheel(function (e,d) {
            var top = $detailBar.eq(index).position().top,
                top2 = $detailTxtCon.eq(index).position().top,
                move = ($detailTxtCon.eq(index).height()-400)/(($detailScroll.eq(index).height()-$detailBar.eq(index).height())/10);
            if (d>0){
                top -= 10;
                top2 += move;
            }else {
                top += 10;
                top2 -= move;
            }
            top = Math.min(top,400-$detailBar.eq(index).height());
            top = Math.max(top,0);
            top2 = Math.min(top2,0);
            top2 = Math.max(top2,-($detailTxtCon.eq(index).height()-400));
            $detailBar.eq(index).css("top",top);
            $detailTxtCon.eq(index).css("top",top2);
            return false;
        });
    }
    
})();

//滚轮延迟
(function () {
    var $wrap2 = $("#wrap2"),
        $wrap3 = $("#wrap3"),
        $title2 = $wrap2.find(".title"),
        $title3 = $wrap3.find(".title"),
        $massageLi = $wrap2.find(".massage ul li"),
        $banLi = $wrap3.find(".banner") ,
        objArr = [];

    init($title2,$title3,$massageLi,$banLi);

    $(window).scroll(function () {
        var height = $(document).scrollTop() + $(window).height();
        for (var i=objArr.length-1;i>=0;i--){
            var obj = objArr[i];
            if (height >= obj.oddTop){
                (function () {
                    var $This = $(obj);
                    setTimeout(function () {
                        $This.removeClass("hide");
                    },($This.index()%3)*200);
                    objArr.slice(i,1);
                })();
            }
        }
    });

    //初始化-->将要滚轮延迟的元素加上
    function init() {
        for (var i=0,length = arguments.length;i<length;i++){//arguments是传入的每一个JQ对象
            arguments[i].each(function () {
                this.oddTop = $(this).offset().top;
                objArr.push(this);
            });
        }
    }
})();
//wrap3-->banner
(function () {
    var $banLi = $("#wrap3").find(".banner li"),
        $btn = $("#wrap3").find(".banner .btn"),
        index = 0;
    //点击自身切换
    $banLi.click(function () {
        if (!($(this).index() == index)){
            index = $(this).index();
            var lindex = index - 1,
                rindex = index + 1;
            lindex = lindex<0?4:lindex;
            rindex = rindex>4?0:rindex;
            $banLi.removeClass("mid left right");
            $(this).addClass("mid");
            $banLi.eq(lindex).addClass("left");
            $banLi.eq(rindex).addClass("right");
        }
    })

    //点击按钮切换
    $btn.click(function () {
        if ($(this).index(".btn")){//真则为next
            index--;
            index = index<0?4:index;
            var lindex = index - 1,
                rindex = index + 1;
            lindex = lindex<0?4:lindex;
            rindex = rindex>4?0:rindex;
            $banLi.removeClass("mid left right");
            $banLi.eq(index).addClass("mid");
            $banLi.eq(lindex).addClass("left");
            $banLi.eq(rindex).addClass("right");
        }else {
            index++;
            index = index>4?0:index;
            var lindex = index - 1,
                rindex = index + 1;
            lindex = lindex<0?4:lindex;
            rindex = rindex>4?0:rindex;
            $banLi.removeClass("mid left right");
            $banLi.eq(index).addClass("mid");
            $banLi.eq(lindex).addClass("left");
            $banLi.eq(rindex).addClass("right");
        }
    })
})();
