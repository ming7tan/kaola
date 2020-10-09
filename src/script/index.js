// banner图轮播
! function($) {
    class Lunbo {
        constructor() {
            this.lunbo = $('.m-module');
            this.piclist = $('#show_pic li');
            this.btnlist = $('.m-module ol li');
            this.leftarrow = $('.prev');
            this.rightarrow = $('.next');
            this.index = 0;
            this.timer = null;
        }
        init() {
            // 1.鼠标移入lunbo，显示左右箭头，反之隐藏
            // 事件里的this指向当前操作的元素对象。方法里面的this指向实例
            let _this = this; //实例对象
            this.lunbo.hover(function() {
                _this.leftarrow.show();
                _this.rightarrow.show();
                // 停止自动轮播
                clearInterval(_this.timer);

            }, function() {
                _this.leftarrow.hide();
                _this.rightarrow.hide();
                // 自动轮播
                // clearInterval(_this.timer);
                _this.timer = window.setInterval(function() {
                    _this.rightarrowclick();
                }, 5000);
            });

            // 2.点击对应的小圈圈，当前点击的小圈圈添加类名，其他隐藏(和小圈圈对应的图片显示)
            this.btnlist.on('mouseover', function() {
                _this.index = $(this).index(); //将当前按钮对应的索引存储下来
                _this.tabswitch();
            });

            // 3.点击左右箭头进行图片切换

            this.rightarrow.on('click', function() {
                _this.rightarrowclick();
            });
            this.leftarrow.on('click', function() {
                _this.leftarrowclick();
            });

            // 4.自动轮播
            this.timer = window.setInterval(function() {
                _this.rightarrowclick();
            }, 2000);
        }


        tabswitch() {
            this.btnlist.eq(this.index).addClass('active').siblings().removeClass('active');
            this.piclist.eq(this.index).stop(true).animate({
                opacity: 1
            }).siblings().stop(true).animate({
                opacity: 0
            });
        }
        rightarrowclick() {
            this.index++;
            if (this.index > this.btnlist.size() - 1) {
                this.index = 0;
            }
            this.tabswitch();
        }
        leftarrowclick() {
            this.index--;
            if (this.index < 0) {
                this.index = this.btnlist.size() - 1;
            }
            this.tabswitch();
        }
    }
    new Lunbo().init();
}(jQuery)

// 二级菜单
! function($) {
    // 1.鼠标经过li ,cartlist显示，否则隐藏
    $('#menu li').hover(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.cartlist').show();

        // 3.切换li元素，cartlist里面的内容跟着切换(索引匹配)
        $('.cartlist .item').eq($(this).index()).show().siblings().hide();

        // 4.切换li元素，cartlist始终全部显示
        $(window).on('scroll', function() {
            let bannertop = $('.navitm-cats').offset().top; //banner的top
            // let scrolltop = $(window).scrollTop(); //滚动条的top值
            // if (scrolltop > bannertop) {
            //     $('.cartlist').css({
            //         top: scrolltop - bannertop
            //     });
            // } else {
            $('.cartlist').css({
                top: 0
            });
            // }
        })

    }, function() {
        $('.cartlist').hide();
    });

    // 2.cartlist显示，鼠标经过cartlist，显示自身，否则隐藏
    $('.cartlist').hover(function() {
        $(this).show();
    }, function() {
        $(this).hide();
    });
}(jQuery)

// 顶部悬浮
! function($) {
    $(window).on('scroll', function() {
        let $top = $(window).scrollTop(); //滚动条顶部的偏移
        if ($top >= 200) {
            $('#docHead').addClass('topTabBoxFixed')
                // $('.topTabBoxFixed').css({ "position": "fixed", "left": "0", "top": "0", "width": "100%", "height": "50px", "backgrond": "#fff", })
        } else {
            $('#docHead').removeClass('topTabBoxFixed')

        }
    })
}(jQuery)

// 热卖品牌点击关注
$(".follow").click(function() {
    $(this).addClass('followed'),
        $(this).parent(".pic").children(".toast").stop(true).animate({
            opacity: 1
        })
})
$(".follow").on('mouseout', function() {
    $(".toast").stop(true).animate({
        opacity: 0
    })
})