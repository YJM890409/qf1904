
!function () {
    class xuanran {
        constructor() {
            this.picurl = $('.jqzoom img');//取元素
            this.biaoti=$('.bag_money span em');
        
        }
        init() {
            var _this = this;
            var num= location.search.substr(location.search.indexOf('=')+1,1) ;//取到？后面唯一的sid
          
            $.ajax({
                url: "http://10.31.164.62/xiangmu/xm/php/details.php",//连接后端接口
                dataType: 'json',//转成json格式
                data:'sid='+num
            }).done(function (e) {//e就是后台的数据
                //{sid: "3", img: "https://cdnimg.ocj.com.cn/item_images/item/15/30/3829/15303829-L.jpg", money: "99", miaoshu: "罗技 G402 有线光电发光游戏鼠标宏笔记本电脑电竞CF专用LOL"}
                console.log(e)
                _this.picurl.attr('src',e.img)
                _this.biaoti.html(e.money)
            })
        }
    }

    new xuanran().init();


}();
