// 轮播图
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