(function ($) {
    //以下是widget中的详细内容。
    $.widget("ui.VerticalMenu", {
        
        options: {
            //option
            template: null,
            data: null,
            templateUrl: "plugin_tmp.html",


        },

        //The constructor
        _create: function () {
            //_create function 初始化
            var $target = this;
            //_create function 初始化
            if (this.options.template == null) {
                this._initTemplateAjax($target);
            } else {
                this._elementInit($target);
            }
        },
        _initTemplateAjax: function ($target) {
            $.ajax({
                type: "GET",
                contentType: "json", //这是上传时的数据类型
                url: $target.options.templateUrl,
                dataType: "html", //这是得到的响应数据类型
                success: function (data) {
                    $target.options.template = data;
                    $target._elementInit($target)
                },
                error: function () {
                    alert("服务端错误！");
                }
            });
        },
        _elementInit: function ($target) {
            var template = Handlebars.compile($target.options.template);
            var thehtml = template($target.options.data);
            $(thehtml).appendTo($target.element);
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