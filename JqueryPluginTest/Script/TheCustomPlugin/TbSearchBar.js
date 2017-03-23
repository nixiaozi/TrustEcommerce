/// <reference path="../js/handlebars-v4.0.5.js" />
///<reference path="../js/jquery-min.js" />

(function ($) {
    //以下是widget中的详细内容。
    $.widget("ui.TbSearchBar", {
        
        options: {
            //option
            template: null,
            data: null,
            templateUrl: "plugin_tmp.html",

            //callback
            barSearch:null,
        },

        //The constructor
        _create: function () {
            var $target = this;
            //_create function 初始化
            if (this.options.template == null) {
                this._initTemplateAjax($target);
            } else {
                this._elementInit($target);
            }
        },
        _initTemplateAjax($target){
            $.ajax({
                type: "GET",
                contentType:"json", //这是上传时的数据类型
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
        _elementInit($target) {
            var template = Handlebars.compile($target.options.template);
            var thehtml = template($target.options.data);
            $(thehtml).appendTo($target.element);
            //alert("GEt done!");
            $target.element.find("button").bind("click", function () {
                var theval = $target.element.find("input").val();
                alert("Plugin Button Test:"+theval);
            });
        },
        _refreash: function () {
            //_refreash 刷新函数初始化
            alert("fsda!");
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