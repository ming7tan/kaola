define([], function() {
    return {
        rander: ! function() {
            //1.渲染购物车列表
            //获取cookie，进行渲染。
            if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在,获取cookie转成数组
                let sid = $.cookie('cookiesid').split(','); //[1,2,3]
                let num = $.cookie('cookienum').split(','); //[100,200,300]
                for (let i = 0; i < sid.length; i++) {
                    rendercart(sid[i], num[i])
                }
            }
            //封装函数实现渲染。
            function rendercart(sid, num) { //sid:渲染的商品编号    num:渲染的商品的数量。
                $.ajax({
                    url: 'http://localhost/Kaola-Projects/php/list.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (value.sid == sid) {
                            let strhtml = '';
                            strhtml += `
                          
                            <ul class="m-goods">
                                <li class="gooditem">
                                    <div class="col col10">
                                        <input type="checkbox" checked="" class="u-chk">
                                    </div>
                                    <div class="col col12">
                                        <a href="detail.html" target="_blank" class="imgwrap">
                                            <img src="${value.url}" alt="">
                                        </a>
                                        <div class="txtwrap">
                                            <h2 class="goodtlt">
                                                <a href="detail.html" target="_blank">${value.title}</a>
                                            </h2>
                                        </div>
                                    </div>
                                    <div class="col col13">
                                        <div class="priceNew">${value.price}</div>
                                    </div>
                                    <div class="col col14">
                                        <span class="u-setcount">
                                            <a href="javascript:;" class="minus">-</a>
                                            <input type="text" min="1" max="99" name="" value="${num}" class="ipt" id="">
                                            <a href="javascript:;" class="plus">+</a>
                                    </span>
                                    </div>
                                    <div class="col col15">
                                        <span class="sum sumrow">${value.price*num}</span>
                                    </div>
                                    <div class="col col16">
                                        <a href="javascript:;" class="u-opt">删除</a>
                                        <span class="u-opt">移入我的收藏</span>
                                    </div>
                                </li>
                          </ul>
                        
                       
                            `;
                            $('.m-cart .goods').append(strhtml);
                            calc();
                        }
                    });
                })
            }



            // 计算商品的总价和总的件数
            function calc() {
                let allprice = 0; //总价
                let allcount = 0; //总的数量
                $('.gooditem').each(function(index, element) {
                    if ($('.m-goods').find('input').prop('checked')) { //复选框选中。
                        // alert('选中');
                        // console.log($(this).html())
                        allcount += parseInt($(this).find('.u-setcount input').val()); //总的件数
                        allprice += parseInt($(this).find('.sumrow').html()); //总价
                        // console.log($(this).find('.col14').find('input').val());
                        // console.log($(this).find('.sumrow').html())
                    }
                });
                $('.allgoods .num').html(allcount);
                $('.totalprice').html(allprice);
            }
            // 全选操作
            $('.selectAll').on('change', function() {
                $('.m-goods').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.selectAll').prop('checked', $(this).prop('checked'));
                calc(); //取消选项，重算总和。
            });

            var $inputs = $('.m-goods').find(':checkbox');
            $('.goods').on('change', $inputs, function() { //事件的委托的this指向被委托的元素
                if ($('.m-goods').find('input:checkbox').length == $('.m-goods').find('input:checked').size()) {
                    $('.selectAll').prop('checked', true);
                } else {
                    $('.selectAll').prop('checked', false);
                }
                calc(); //取消选项，重算总和。
            });
            // 商品数量的改变

            $('.plus').on('click', function() {
                alert('点击');
                // var $count = $(this).parents('.m-goods').find('.u-setcount input').val(); //值
                // console.log($count);
                // $count++;
                // if ($count >= 99) {
                //     $count = 99;
                // }
                // $(this).parents('.m-goods').find('.u-setcount input').val($count); //赋值回去
                // $(this).parents('.m-goods').find('.sumrow').html(singlegoodsprice($(this))); //改变后的价格
                // calc(); //重新计算总和。
                // setcookie($(this)); //将改变的数量重新添加到cookie

            });
            $('.minus').on('click', function() {
                alert('点击');
            })

            // 7.计算数量改变后单个商品的价格
            function singlegoodsprice(obj) { //obj:当前元素
                var $dj = parseFloat(obj.parents('.m-goods').find('.priceNew').html()); //单价
                var $cnum = parseInt(obj.parents('.m-goods').find('.u-setcount input').val()); //数量
                return ($dj * $cnum).toFixed(2); //结果
            }


        }(),
        carteffecct: ! function() {

        }(),
    }
});