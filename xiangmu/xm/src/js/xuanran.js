
!function () {
    class xuanran {
        constructor() {
            this.yingji = $('.f-1-lt01 ul li');//取元素
            this.str = '';
        }
        init() {
            var _this = this;
            $.ajax({
                url: "http://10.31.164.62/xiangmu/xm/php/xuanran.php",//连接后端接口
                dataType: 'json'
            }).done(function (e) {//e就是后台的数据
                // 0: { sid: "1", img: "https://cdnimg.ocj.com.cn/item_images/item/15/23/8676/15238676-L.jpg", money: "89", miaoshu: "罗技 G402 有线光电发光游戏鼠标宏笔记本电脑电竞CF专用LOL" }
                // 1: { sid: "2", img: "https://cdnimg.ocj.com.cn/item_images/item/15/29/8940/15298940-L.jpg", money: "25", miaoshu: "罗技 G402 有线光电发光游戏鼠标宏笔记本电脑电竞CF专用LOL" }
                // 2: { sid: "3", img: "https://cdnimg.ocj.com.cn/item_images/item/15/30/3829/15303829-L.jpg", money: "99", miaoshu: "罗技 G402 有线光电发光游戏鼠标宏笔记本电脑电竞CF专用LOL" }


                $.each(e, function (i, v) {//循坏遍历所有数据
                    _this.str = `

                    <a href="Blessingpackage.html"><img src="${v.img}"
                    style=" margin:0 auto; display:block; width:220px; height:220px"></a>
            <light1>
                <img src="images/saoguang.png">
            </light1>
            <span>￥${v.money}</span>
            <a href="Blessingpackage.html">
                <p>${v.miaoshu} </p>
            </a>
            <em>
                <a href="#">收藏</a>
                <a href="javascript:void(0)" class="add_scar">加入购物车</a>
            </em> 
                    `
                    $(_this.yingji[i]).html(_this.str);//把所有子元素内容添加到父元素

                });




            })
        }
    }

    new xuanran().init();


}();
