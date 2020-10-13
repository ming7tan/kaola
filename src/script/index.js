//模块化的写法
define([], function() {
    return {
        render: ! function() { //渲染
            $.ajax({
                url: 'http://localhost/Kaola-Projects/php/index-list.php',
                dataType: 'json'
            }).done(function(data) {
                //进行渲染结构代码。
                let strhtml = '';
                $.each(data, function(index, value) {
                    strhtml += `
                    <li class="itemsale">
                    <a class="pic" href="javascript:;">
                    <img class="lazy" data-original="${value.url}">
                    </a>
                    <div class="proinfo">
                    <h3 class="tit">
                    <a class="protitle" href="javascript:;">${value.title}</a>
                    </h3>
                    <p class="curprice">
                    <span class="symbol">¥</span>
                    <strong>${value.price}</strong>
                    <span class="item2">¥<del>${value.prevprice}</del></span>
                    </div>
                    </li>
                  `
                })
                $('.itemgroup').html(strhtml);
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });
        }(),
        topeffect: ! function() { //top效果
            $('.topl').on('mouseover', function() {
                $(this).css({ "color": "#fff" }),
                    $(this).children('.m-notice').css({ "display": "block" })
            })
            $('.topl').on('mouseout', function() {
                $(this).css({ "color": "#999" }),
                    $('.m-notice').css({ "display": "none" })
            })
            $('.mcDropMenuBox').on('mouseover', function() {
                $(this).addClass('mcDropMenuBox1');
                $(this).children('.mcDropMenu').css({ "display": "block" })
            })
            $('.mcDropMenuBox').on('mouseout', function() {
                $(this).removeClass('mcDropMenuBox1');

                $(this).children('.mcDropMenu').css({ "display": "none" })
            })
            $('.mcDropMenu a').on("mouseover", function() {
                $(this).addClass('topNavHolder1')
            })
            $('.mcDropMenu a').on("mouseout", function() {
                $(this).removeClass('topNavHolder1')
            })
            $('.topNavHolder').on("mouseover", function() {
                $(this).css({ "color": "#ff1e32" })
                $(this).children('.arr').css({ "border-color": "#ff1e32 transparent transparent" })
            })
            $('.topNavHolder').on("mouseout", function() {
                $(this).css({ "color": "#999" })
                $(this).children('.arr').css({ "border-color": "#999 transparent transparent" })
            })
            $('#funcTab .navitm').on('mouseover', function() {
                $(this).addClass('active');
            })
            $('#funcTab .navitm').on('mouseout', function() {
                    $(this).removeClass('active');
                })
                // $('#docHead').on('mouseover')

        }(),
        lunbo: ! function() { //轮播效果
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
        }(),
        erjimenu: ! function() { //二级菜单
            $('#menu li').hover(function() {
                $(this).addClass('active').siblings().removeClass('active');
                $('.cartlist').show();

                $('.cartlist .item').eq($(this).index()).show().siblings().hide();


                $(window).on('scroll', function() {
                    let bannertop = $('.navitm-cats').offset().top; //banner的top

                    $('.cartlist').css({
                        top: 0
                    });

                })

            }, function() {
                $('.cartlist').hide();
            });

            $('.cartlist').hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });
        }(),
        mainEffect: ! function() { // 热卖品牌点击关注
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
        }(),
        floor_left: ! function() { //楼梯效果
            function scroll() {
                let top = $(window).scrollTop();
                top >= 525 ? $('#indexleft').show() : $('#indexleft').hide();
            }
            scroll();
            // 1.滚轮事件控制左侧楼梯的显示和隐藏
            // 滚轮事件触发
            $(window).on('scroll', function() {
                scroll();
            })

            // 2.点击左侧楼梯上面的按钮，右侧楼层运动到对应的位置
            // 求每一个楼层top位置，将固定的top值给滚动条的top值。document.documentElement.scrollTop

            $('.floor li').on('click', function() {
                // $(this).addClass('active').siblings().removeClass('active');
                let loucengtop = $('.m-floor').eq($(this).index()).offset().top;
                $('html').animate({
                    scrollTop: loucengtop
                });
            });
        }(),
        floor_right: ! function() { //右楼梯
            function scroll() {
                let top = $(window).scrollTop();
                top >= 525 ? $('#rightBarNew').show() : $('#rightBarNew').hide();
            }
            scroll();

            $(window).on('scroll', function() {
                scroll();
            })
            $('.last').on('click', function() {
                    $('html').animate({
                        scrollTop: 0
                    })
                })
                // 图标显示
            $('.checkin').on('mouseover', function() {
                $(this).children('.right-bar-icon').addClass('right-bar')
            })
            $('.checkin').on('mouseout', function() {
                $(this).children('.right-bar-icon').removeClass('right-bar')
            })
        }(),
        mainlunbo: ! function() { //轮播效果
            class Lunbotu {
                constructor() {
                    this.lunbo = $('.prolist');
                    this.piclist = $('.prolist .itemgroup');
                    this.btnlist = $('.title ol li');

                    this.index = 0;
                    this.timer = null;
                }
                init() {

                    let _this = this;
                    this.lunbo.hover(function() {
                        clearInterval(_this.timer);
                    }, function() {
                        _this.timer = window.setInterval(function() {
                            _this.rightarrowclick();
                        }, 3000);
                    });

                    this.btnlist.on('mouseover', function() {
                        _this.index = $(this).index();
                        _this.tabswitch();
                    });



                    this.timer = window.setInterval(function() {
                        _this.rightarrowclick();
                    }, 3000);
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
            new Lunbotu().init();
        }(),
        searcheffecct: ! function() { //搜索框
            let ul = $('#searchhintlist');
            const key = $('.topSearchInput');
            key.on('input', function() {
                ul.show();
                var s = $('.scriptSrc');
                if (s) {
                    $('body').removeClass('scriptSrc');
                }
                var scrip = $('body').after("<script></script>");
                scrip.attr({ src: "https://suggest.taobao.com/sug?code=utf-8&q=" + key.value + "&_ksTS=1600308396217_331&callback=taobao" });

            })

            function kaola(data) {
                let arr = data.result;
                let str = '';
                $.each(data, function(arr, value) {
                    str += `
                    <li class="j-suggest_keyword">
                    <a class="item">
                    <span class="shname">${value[0]}</span>
                    </a>
                    </li>
                    `;
                })
                $('#searchhintlist').html(str);
            }
        }(),
        // 顶部悬浮
        xuanfu: ! function() {
            $(window).on('scroll', function() {
                let $top = $(window).scrollTop(); //滚动条顶部的偏移
                if ($top >= 100) {
                    $('#docHead').addClass('topTabBoxFixed')
                    $('#topTabPlaceHolder').removeClass('f-cd');
                    $('#j-newcart_btn').hide();
                    $('.logo_kaola_new').hide();
                    // $('.topTabBoxFixed').css({ "position": "fixed", "left": "0", "top": "0", "width": "100%", "height": "50px", "backgrond": "#fff", })
                } else {
                    $('#docHead').removeClass('topTabBoxFixed')
                    $('#topTabPlaceHolder').removeClass('f-cd');
                    $('#j-newcart_btn').show();
                    $('.logo_kaola_new').show();
                }
            })
        }()

    }
});



// 顶部悬浮

// 热卖品牌点击关注