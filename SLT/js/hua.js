function Swiper(obj) {
    this.wrape = obj.dem;
    this.car = obj.car;
    this.left = obj.left;
    this.right = obj.right;
    this.callback = obj.callback;
    this.type = obj.type;

    this.lock = false;
    this._init();
    this._initDom();
    this._initEvent();

}
Swiper.prototype = {
    _init: function () {
        this.w = $(window).height();

    },
    _initDom: function () {
        this.item = $(this.wrape).find(".wrapper"); //每一张图片所在地
        this.len = this.item.length;
        this.index = 0;
        this.offsetX = 0;
        this.moveX = 0;
        this.startX = 0;

        var w = this.w;
        for (var i = 0; i < this.len; i++) {
            $(this.item[i]).css('-webkit-transform', 'translate3d(0,' + w * i + 'px,0)');
        }
    },
    _initEvent: function () {
        var that = this;

        $(this.car).on("touchstart", function (e) {
            that._start("+1", that.callback)
        })

        this.item.on("touchstart", function (e) {
            e.preventDefault();
            that.startX = e.touches[0].screenY;
            that.moveX = 0;
            that.offsetX = 0;
        });
        this.item.on("touchmove", function (e) {
            e.preventDefault();
            that.moveX = e.touches[0].screenY;
            w = that.w;
            that.offsetX = that.moveX - that.startX;

        });
        this.item.on("touchend", function (e) {
            e.preventDefault();
            var offx = that.offsetX;
            //console.log(offx)

            /* 加锁 */
            if (that.lock) {
                return false;
            }

            if (offx > 0) {
                that._start("-1", that.callback); //向左
            } else if (offx < 0) {
                that._start("+1", that.callback) //向右
            }


        });
        $(this.left).on("click", function (e) {
            that._start("-1", e.type);
        });
        $(this.right).on("click", function (e) {
            self._start("+1", e.type);
        })
    },
    _start: function (num, callback) {
        var nowp = 0,
            w = this.w,
            index = this.index,
            len = this.len;
        if (typeof (num) == "number") {
            nowp = num;
        } else if (typeof (num) == "string") {
            nowp = index + num * 1;
        }

        if (nowp < 0) {
            nowp = 0;
        } else if (nowp > len - 1) {
            nowp = len - 1;
        }

        $(this.item[nowp - 1]) && $(this.item[nowp - 1]).css({
            "-webkit-transition": "-webkit-transform 1s",
            "-webkit-transform": "translate3d(0," + (-w) + "px,0)"
        });
        $(this.item[nowp]) && $(this.item[nowp]).css({
            "-webkit-transition": "-webkit-transform 1s",
            "-webkit-transform": "translate3d(0,0,0)"

        });
        $(this.item[nowp + 1]) && $(this.item[nowp + 1]).css({
            "-webkit-transition": "-webkit-transform 1s",
            "-webkit-transform": "translate3d(0," + w + "px,0)"

        });
        this.index = nowp;

        //console.log(this.index);

        /*$(this.item[nowp]).show();
        $(this.item[nowp - 1]).hide();
        $(this.item[nowp + 1]).hide();*/
        $(this.item[nowp]).find("img").show();
        $(this.item[nowp + 1]).find("img").hide();
        $(this.item[nowp - 1]).find("img").hide();

        callback && this.callback(nowp, w);
        //console.log(index);
    }
}