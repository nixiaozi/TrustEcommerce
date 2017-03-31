(function ($) {
    //以下是widget中的详细内容。
    $.widget("ui.VerticalMenu", {
        
        options: {
            //option
            template: null,
            data: null,

        },

        //The constructor
        _create: function () {
            //_create function 初始化
        },
        _refreash: function () {
            //_refreash 刷新函数初始化
        },
        _destroy: function () {
            //_destory 还原控件对象
        },
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },
        _setOption: function (key, vaule) {
            //set the Option
            this.super(key, vaule);
        }

    });



})(jQuery);