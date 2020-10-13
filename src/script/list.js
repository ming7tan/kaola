define([], function() {
    return {
        render: ! function() { //渲染
            //排序
            let array_default = []; //排序前的li数组
            let array = []; //排序中的数组
            //冒泡排序，比较相邻的两个数字。
            let prev = null; //前一个商品价格
            let next = null; //后一个商品价格
            $.ajax({
                url: 'http://localhost/Kaola-Projects/php/list.php',
                dataType: 'json'
            }).done(function(data) {
                //进行渲染结构代码。
                let strhtml = '';
                $.each(data, function(index, value) {
                    strhtml += `
                <li class="goods colorsku">
                <div class="goodswarp">
                <a class="pic" href="detail.html?sid=${value.sid}" target="_blank">
                <div class="img">
                <img class="imgtag lazy" data-original="${value.url}">
                <div class="activityflag">
                <span class="hot">热销</span>
                </div>
                </div>
                </a>
                <div class="m-skulist"></div>
                <div class="desc">
                <p class="price">
                    <i class="bigPriceMoneyIcon">￥</i>
                    <span class="bigPrice">${value.price}
                </p>
                <p class="price">
                    <img class="blackCardImg" src="https://img.alicdn.com/tfs/TB14A2jcAcx_u4jSZFlXXXnUFXa-156-48.png">
                    <span class="blackCardPrice">
                    <i class="blackCardMoneyIcon">￥</i>
                    ${value.grayPrice}
                    </span>
                </p>
                <div class="titlewrap">
                    <a class="title" href="detail.html?sid=${value.sid}" target="_blank">
                    <h2>${value.title}</h2>
                    </a>
                </div>
                <p class="saelsinfo">
                <span class="activity z-self">自营</span>
                <span class="activity z-benefit">包税</span>
                <span class="activity z-benefit">特卖</span>
                </p>
                <p class="goodsinfo">
                <a targrt="_blank" href="javascript:;" class="comments">
                <span class="icon"></span>
                ${value.comment}
                </a>
                <span class="proPlace ellipsis">${value.place}</span>
                </p>
                <p class="selfflag">
                <span>${value.self}</span>
                </p>
                </div>
                </div>
                </li>
              `
                })
                $('.m-result .clearfix').html(strhtml);
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });

                //排序
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                //冒泡排序，比较相邻的两个数字。
                prev = null; //前一个商品价格
                next = null; //后一个商品价格
                $('.m-result .goods').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
            // 分页
            $('.page').pagination({
                pageCount: 6, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页', //将图标改成上一页下一页。
                nextContent: '下一页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前的点击的页码。
                    $.ajax({
                        url: 'http://localhost/Kaola-Projects/php/list.php',
                        data: {
                            page: api.getCurrent() //传输数据
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        //进行渲染结构代码。
                        let strhtml = '<ul class="clearfix">';
                        $.each(data, function(index, value) {
                            strhtml += `
                        <li class="goods colorsku">
                        <div class="goodswarp">
                        <a class="pic" href="detail.html?sid=${value.sid}" target="_blank">
                        <div class="img">
                        <img class="imgtag lazy" data-original="${value.url}">
                        <div class="activityflag">
                        <span class="hot">热销</span>
                        </div>
                        </div>
                        </a>
                        <div class="m-skulist"></div>
                        <div class="desc">
                        <p class="price">
                            <i class="bigPriceMoneyIcon">￥</i>
                            <span class="bigPrice">${value.price}
                        </p>
                        <p class="price">
                            <img class="blackCardImg" src="https://img.alicdn.com/tfs/TB14A2jcAcx_u4jSZFlXXXnUFXa-156-48.png">
                            <span class="blackCardPrice">
                            <i class="blackCardMoneyIcon">￥</i>
                            ${value.grayPrice}
                            </span>
                        </p>
                        <div class="titlewrap">
                            <a class="title" href="detail.html?sid=${value.sid}" target="_blank">
                            <h2>${value.title}</h2>
                            </a>
                        </div>
                        <p class="saelsinfo">
                        <span class="activity z-self">自营</span>
                        <span class="activity z-benefit">包税</span>
                        <span class="activity z-benefit">特卖</span>
                        </p>
                        <p class="goodsinfo ">
                        <a targrt="_blank" href="javascript:;" class="comments">
                        <span class="icon"></span>
                        ${value.comment}
                        </a>
                        <span class="proPlace ellipsis">${value.place}</span>
                        </p>
                        <p class="selfflag">
                        <span>${value.self}</span>
                        </p>
                        </div>
                        </div>
                        </li>
                      `
                        });
                        strhtml += '</ul>'
                        $('.m-result .clearfix').html(strhtml);
                        $("img.lazy").lazyload({
                            effect: "fadeIn" //图片显示方式
                        });

                        //排序
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        //冒泡排序，比较相邻的两个数字。
                        prev = null; //前一个商品价格
                        next = null; //后一个商品价格
                        $('.m-result .goods').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }
            })

            // 排序
            $('.sorting button').eq(0).on('click', function() {
                $.each(array_default, function(index, value) {
                    $('.m-result .clearfix').append(value);
                });
                return;
            });
            // 升序
            $('.sorting button').eq(1).on('click', function() {
                console.log(array);
                console.log(1);
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.bigPrice').html()); //取上个价格
                        next = parseFloat(array[j + 1].find('.bigPrice').html()); //下一个的价格
                        // //通过价格的判断，改变的是数组li的位置。
                        console.log(prev, next);
                        console.log(array);
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $('.m-result .clearfix').empty();
                $.each(array, function(index, value) {
                    $('.m-result .clearfix').append(value);
                });
            });
            // 降序
            $('.sorting button').eq(2).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.bigPrice').html()); //取上个价格
                        next = parseFloat(array[j + 1].find('.bigPrice').html()); //下一个的价格
                        //通过价格的判断，改变的是数组li的位置。

                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $('.m-result .clearfix').empty();
                $.each(array, function(index, value) {
                    $('.m-result .clearfix').append(value);
                });
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
    }
})