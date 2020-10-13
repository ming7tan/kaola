define([], function() {
    return {
        rander: ! function() {

            let sid = location.search.substring(1).split('=')[1];
            //判断sid是否存在
            if (!sid) {
                sid = 1;
            }

            // 2.将获取sid传给后端，后端获取sid，将对应的数据返回给前端。
            // 获取后端传入的数据
            // http://localhost/JS2008/Day%2029-Day%2031_jquery/goodscart/php/getsid.php
            $.ajax({
                url: 'http://localhost/Kaola-Projects/php/getsid.php',
                data: {
                    datasid: sid
                },
                dataType: 'json'
            }).done(function(data) {
                $('#smallpic').attr('src', data.url);
                $('#bpic').attr('src', data.url);
                $('#smallpic').attr('sid', data.sid);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);
                console.log(data.piclisturl.split(','));
                let picarr = data.piclisturl.split(','); //数据转换成数组
                let strhtml = '';
                $.each(picarr, function(index, value) {
                    strhtml += `
                        <li>
                            <img src="${value}"/>
                        </li>
                    `;
                });
                $('#list ul').html(strhtml);
            });

        }(),
        Magnifier: ! function() {
            $('#sf').width($('#spic').width() * $('#bf').width() / $('#bpic').width());
            $('#sf').height($('#spic').height() * $('#bf').height() / $('#bpic').height());
            var bili = $('#bpic').width() / $('#spic').width();
            $('#spic').hover(function() {
                $('#sf').css('visibility', 'visible');
                $('#bf').css('visibility', 'visible');
                $(this).on('mousemove', function(ev) {
                    var $left = ev.pageX - $('.goodsinfo').offset().left - $('#sf').width() / 2;
                    var $top = ev.pageY - $('.goodsinfo').offset().top - $('#sf').height() / 2;
                    if ($left < 0) {
                        $left = 0;
                    } else if ($left >= $('#spic').width() - $('#sf').width()) {
                        $left = $('#spic').width() - $('#sf').width();
                    }
                    if ($top < 0) {
                        $top = 0;
                    } else if ($top >= $('#spic').height() - $('#sf').height()) {
                        $top = $('#spic').height() - $('#sf').height();
                    }
                    $('#sf').css('left', $left);
                    $('#sf').css('top', $top);
                    $('#bpic').css('left', -$left * bili);
                    $('#bpic').css('top', -$top * bili);
                });
            }, function() {
                $('#sf').css('visibility', 'hidden');
                $('#bf').css('visibility', 'hidden');
            });

            //点击小图切换
            $('#list ul').on('click', 'li', function() {
                var $imgurl = $(this).find('img').attr('src');
                $('#smallpic').attr('src', $imgurl);
                $('#bpic').attr('src', $imgurl);
            });

            //点击箭头进行切换
            var $num = 6; //放大镜显示6张。
            $('#right').on('click', function() {
                var $list = $('#list ul li'); //8
                if ($list.length > $num) {
                    $num++;
                    $('#left').css('color', '#333');
                    if ($list.length == $num) {
                        $('#right').css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 6) * $list.eq(0).innerWidth()
                    })
                }
            });

            $('#left').on('click', function() {
                var $list = $('#list ul li'); //8
                if ($num > 6) {
                    $num--;
                    $('#right').css('color', '#333');
                    if ($num <= 6) {
                        $('#left').css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 6) * $list.eq(0).innerWidth()
                    })
                }
            });
        }(),
        menuxianshi: ! function() {
            $('#topCats').on('mouseover', function() {
                $(this).children('.OMenu').css({ "display": "block" });
            })
            $('#topCats').on('mouseout', function() {
                $(this).children('.OMenu').css({ "display": "none" });
            })
        }(),
        Ccookie: ! function() {
            var arrsid = []; //商品的sid
            var arrnum = []; //商品的数量                


            function getcookie() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
                    arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
                    arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
                } else { //cookie不存在
                    arrsid = [];
                    arrnum = [];
                }
            }
            $('.p-btn a').on('click', function() { //点击加入购物车按钮。
                // location.reload(true);
                //判断当前的商品sid是否存在购物车(cookie)
                //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较
                // alert('beidianji');
                //获取当前的按钮对应的商品的sid

                var $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
                console.log($sid)

                getcookie(); //获取已经存在的cookie值
                if (!$sid) {
                    $sid = 1;
                }
                if ($.inArray($sid, arrsid) === -1) { //不存在，将商品的sid和数量存入cookie
                    arrsid.push($sid); //添加当前商品的sid
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                    arrnum.push($('#count').val()); //添加商品的数量
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                } else { //存在,商品的数量累加
                    //获取原来的sid对应的数量(sid和数量是对应的 ，sid的在数组的位置就是数量在数组的位置)
                    let index = $.inArray($sid, arrsid); //sid在数组中的位置
                    let num = parseInt(arrnum[index]); //sid对应的数量
                    //原来的数量+新添加数量，一起存入cookie
                    arrnum[index] = num + parseInt($('#count').val()); //原来的数量+新添加数量进行赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
                }
            });
        }(),
    }
})