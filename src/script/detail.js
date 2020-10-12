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
                // console.log(data);

                $('#smallpic').attr('src', data.url);
                $('#bpic').attr('src', data.url);
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
                $(this).children('#menu').css({ "display": "block" });
            })
            $('#topCats').on('mouseout', function() {
                $(this).children('#menu').css({ "display": "none" });
            })
        }(),
    }
})