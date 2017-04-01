(function ($) {
    //以下是widget中的详细内容。
    $.widget("ui.VerticalMenu", {
        
        options: {
            //option
            template: null,
            data: null,
            templateUrl: "plugin_tmp.html",
            detailtemplate: null,
            detailtempUrl: "plugin_detail_tmp.html",


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

            //移出元素区域取消选择 并且隐藏详情框
            $target._on($target.element.find(".container"), {
                mouseout: function (event) {
                    if($(event.target).is("div.container")){
                        $('.mainmenu-li.active').removeClass("active");
                        $target.element.find(".mainmenu-detail").hide();
                    }
                }
            });

            //mouseover菜单条目事件 修改详情框内容并显示
            $target._on($target.element.find(".mainmenu-li"), {
                mouseover: function (event) {
                    var $eventarget = $(event.target);
                    if ($eventarget.is("li")) {
                        $('.mainmenu-li.active').removeClass("active");
                        $eventarget.addClass("active");
                        var getid = parseInt($eventarget.attr("data-id"));
                        this._getdetailtempAndDo(getid);
                        $target.element.find(".mainmenu-detail").show();
                    }

                }
            });

        },
        //根据Data中的数据初始化显示数据
        _detailinit:function(itemid){
            this.element.find(".mainmenu-detail").html("");
            var itemdata = this.options.data.Mainmenu[itemid];
            
            var template = Handlebars.compile(this.options.detailtemplate);
            var thehtml = template(itemdata);

            this.element.find(".mainmenu-detail").html(thehtml);
        },
        //获得详细信息并且执行
        _getdetailtempAndDo:function(itemid) {
            var $target = this;
            if (this.options.detailtemplate != null) {
                $target._detailinit(itemid);//必须要指定this 否则无法找到该函数
            } else {
                $.ajax({
                    type: "GET",
                    contentType: "json", //这是上传时的数据类型
                    url: $target.options.detailtempUrl,
                    dataType: "html", //这是得到的响应数据类型
                    success: function (data) {
                        $target.options.detailtemplate = data;
                        $target._detailinit(itemid);
                    },
                    error: function () {
                        alert("服务端错误！");
                    }
                });
            }
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