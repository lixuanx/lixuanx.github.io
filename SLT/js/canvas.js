var obj = {
    init: function () {
        this._initDOM();
        this._initEvent();
    },
    _initDOM: function () {
        this._cv = document.getElementById("can");
        this._ctx = this._cv.getContext("2d");
        this._x = $(".x");
        this._s = $(".s");
        this._z = $(".z");
        this._y = $(".y");
        this._back = $("#back");
        this.timer = null;
        this.time = null;
        //console.log(this._back)

    },
    _initEvent: function () {
        var self = this;

        function line(arr, num) {
            var i = 0;
            self.timer = setTimeout(function () {
                num++;
                if (num >= arr.length) {
                    clearInterval(this.timer);
                    return false;
                }
                line(arr, num);
            }, 1060);
            self.time = setInterval(function () {
                i++;
                if (i > 10) {
                    clearInterval(this.time);
                    return false;
                }
                self._ctx.beginPath();
                self._ctx.lineWidth = 2;
                self._ctx.strokeStyle = "#f00";
                self._ctx.lineCap = "square";
                if (arr[num].toX == 0) {
                    self._ctx.moveTo(arr[num].moveX, arr[num].moveY);
                    self._ctx.lineTo(arr[num].moveX, arr[num].moveY - arr[num].toY / 10 * i);
                } else {
                    self._ctx.moveTo(arr[num].moveX, arr[num].moveY);
                    self._ctx.lineTo(arr[num].moveX + arr[num].toX / 10 * i, arr[num].moveY);
                }
                self._ctx.stroke();
                self._ctx.closePath();
            }, 100);
        }

        function clear() {
            self._ctx.clearRect(0, 0, self._cv.width, self._cv.height);
            clearTimeout(self.timer);
            clearInterval(self.time);

        }
        /*返回按钮*/
        this._back.on("tap", function () {
            clear();
            $(".fx").show();


        })
        this._s.on("tap", function () {


            line(arr1, 0);

            $(this).show().siblings(".fx").hide();

        })
        this._z.on("tap", function () {


            line(arr2, 0);
            $(this).show().siblings(".fx").hide();
        })
        this._x.on("tap", function () {

            line(arr3, 0);
            $(this).show().siblings(".fx").hide();
        })
        this._y.on("tap", function () {

            line(arr4, 0);
            $(this).show().siblings(".fx").hide();
        })


    }
}
obj.init();