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
                            var $clonebox = $('.m-goods:hidden').clone(true, true);
                            $clonebox.find('.col12').find('img').attr('src', value.url);
                            $clonebox.find('.col12').find('img').attr('sid', value.sid);
                            $clonebox.find('.txtwrap').find('a').html(value.title);
                            $clonebox.find('.col13').find('.priceNew').html(value.price);
                            $clonebox.find('.col14').find('.ipt').val(num);
                            $clonebox.find('.col15').find('.sumrow').html(value.price * num);
                            $clonebox.css('display', 'block');
                            $('.goods').append($clonebox);
                        }
                    });


                    //     let strhtml = '';
                    //     strhtml += `

                    //     <ul class="m-goods">
                    //         <li class="gooditem">
                    //             <div class="col col10">
                    //                 <input type="checkbox" checked="" class="u-chk">
                    //             </div>
                    //             <div class="col col12">
                    //                 <a href="detail.html" target="_blank" class="imgwrap">
                    //                     <img src="${value.url}" alt="">
                    //                 </a>
                    //                 <div class="txtwrap">
                    //                     <h2 class="goodtlt">
                    //                         <a href="detail.html" target="_blank">${value.title}</a>
                    //                     </h2>
                    //                 </div>
                    //             </div>
                    //             <div class="col col13">
                    //                 <div class="priceNew">${value.price}</div>
                    //             </div>
                    //             <div class="col col14">
                    //                 <span class="u-setcount">
                    //                     <a href="javascript:;" class="minus">-</a>
                    //                     <input type="text" min="1" max="99" name="" value="${num}" class="ipt" id="">
                    //                     <a href="javascript:;" class="plus">+</a>
                    //             </span>
                    //             </div>
                    //             <div class="col col15">
                    //                 <span class="sum sumrow">${value.price*num}</span>
                    //             </div>
                    //             <div class="col col16">
                    //                 <a href="javascript:;" class="u-opt">删除</a>
                    //                 <span class="u-opt">移入我的收藏</span>
                    //             </div>
                    //         </li>
                    //   </ul>


                    //     `;
                    //     $('.m-cart .goods').append(strhtml);
                    calc();

                })
            };

            // 计算商品的总价和总的件数
            function calc() {
                let allprice = 0; //总价
                let allcount = 0; //总的数量
                $('.m-goods:visible').each(function(index, element) {
                    if ($(this).find('input').prop('checked')) { //复选框选中。
                        allcount += parseInt($(this).find('.u-setcount input').val()); //总的件数
                        allprice += parseInt($(this).find('.sumrow').html()); //总价
                    }
                });
                $('.allgoods .num').html(allcount);
                $('.totalprice').html(allprice);
            }
            // 全选操作
            $('.selectAll').on('change', function() {
                $('.m-goods:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.selectAll').prop('checked', $(this).prop('checked'));
                calc(); //取消选项，重算总和。
            });

            var $inputs = $('.col10').find('input');
            $inputs.on('click', function() { //事件的委托的this指向被委托的元素
                console.log(1)
                if ($('.m-goods').find('input:checkbox').length == $('.m-goods').find('input:checked').size()) {
                    $('.selectAll').prop('checked', true);
                } else {
                    $('.selectAll').prop('checked', false);
                }

                calc(); //取消选项，重算总和。
            });

            // 商品数量的改变

            $('.plus').on('click', function() {
                // alert('点击');
                var $count = $(this).siblings('input').val(); //值
                // console.log($(this).siblings('input').val());
                $count++;
                if ($count >= 99) {
                    $count = 99;
                }
                $(this).parents('.m-goods').find('.u-setcount input').val($count); //赋值回去
                $(this).parents('.m-goods').find('.sumrow').html(singlegoodsprice($(this))); //改变后的价格
                // console.log($(this).parents('.m-goods').find('.u-setcount').html());
                calc(); //重新计算总和。
                setcookie($(this));
                // $.cookie('cookienum', $new, { expires: 10, path: '/' }); //将改变的数量重新添加到cookie
                // var arrNew = [];
                // $('.m-goods:visible').each(function(index, element) {
                //     arrNew.push($(this).find('.u-setcount').find('input').val());
                // })
                // console.log(arrNew);
                // $.cookie('cookienum', arrNew, { expires: 10, path: '/' });
            });

            $('.minus').on('click', function() {
                var $count = $(this).parents('.m-goods').find('.u-setcount input').val(); //值
                // console.log($count);
                $count--;
                if ($count < 1) {
                    $count = 1;
                }
                $(this).parents('.m-goods').find('.u-setcount input').val($count); //赋值回去
                $(this).parents('.m-goods').find('.sumrow').html(singlegoodsprice($(this))); //改变后的价格
                calc(); //重新计算总和。
                setcookie($(this));
                // var arrNew2 = [];
                // $('.m-goods:visible').each(function(index, element) {
                //     arrNew2.push($(this).find('.u-setcount').find('input').val());
                // })
                // console.log(arrNew2);
                // $.cookie('cookienum', arrNew2, { expires: 10, path: '/' });
            });
            // 直接输入改变数量
            $('.u-setcount input').on('input', function() {
                var $reg = /^\d+$/g; //只能输入数字
                var $value = parseInt($(this).val());
                if ($reg.test($value)) { //是数字
                    if ($value >= 99) { //限定范围
                        $(this).val(99);
                    } else if ($value <= 0) {
                        $(this).val(1);
                    } else {
                        $(this).val($value);
                    }
                } else { //不是数字
                    $(this).val(1);
                }
                $(this).parents('.gooditem').find('.sumrow').html(singlegoodsprice($(this))); //改变后的价格
                calc();
                // var arrNew3 = [];
                // $('.m-goods:visible').each(function(index, element) {
                //     arrNew3.push($(this).find('.u-setcount').find('input').val());
                // })
                // console.log(arrNew3);
                // $.cookie('cookienum', arrNew3, { expires: 10, path: '/' });
                setcookie($(this));
            });


            //计算数量改变后单个商品的价格
            function singlegoodsprice(obj) { //obj:当前元素
                var $dj = parseInt(obj.parents('.m-goods').find('.priceNew').html()); //单价
                var $cnum = parseInt(obj.parents('.m-goods').find('.u-setcount input').val()); //数量
                return ($dj * $cnum); //结果
            }
            // 删除单个商品
            $('.u-opt').on('click', function(ev) {
                cookietoarray(); //得到数组,上面的删除cookie需要。
                if (confirm('你确定要删除吗？')) {
                    $(this).parents('.m-goods').remove(); //通过当前点击的元素找到整个一行列表，删除

                    delgoodslist($(this).first().parents('.m-goods').find('img').attr('sid'), arrsid);
                    calc();
                }
            });

            // 将改变后的数量的值存放到cookie
            var arrsid = [];
            var arrnum = [];

            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在,获取cookie转成数组
                    arrsid = $.cookie('cookiesid').split(','); //[1,2,3]
                    arrnum = $.cookie('cookienum').split(','); //[100,200,300]
                }
            }

            function setcookie(obj) {
                cookietoarray();
                var $index = obj.parents('.m-goods').find('img').attr('sid');
                arrnum[$.inArray($index, arrsid)] = obj.parents('.m-goods').find('.u-setcount input').val();
                // console.log(arrnum);
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' })
            }

            // 删除操作
            // 删除cookie
            function delgoodslist(sid, arrsid) {
                var $index = -1;
                $.each(arrsid, function(index, value) {
                    if (sid == value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);
                $.cookie('cookiesid', arrsid, { expires: 10, path: '/' })
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' })
            }
            // 删除全部商品
            $('.lt .opt').on('click', function() {
                cookietoarray();
                if (confirm('你确定要全部删除吗？')) {
                    $('.m-goods:visible').each(function() {
                        if ($(this).find('input:checkbox').is(':checked')) {
                            $(this).remove();
                            delgoodslist($(this).find('img').attr('sid'), arrsid);
                        }
                    });
                    calc();
                }
            })

        }(),
    }
});