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
        _initTemplateAjax:function($target){
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
        _elementInit:function($target) {
            var template = Handlebars.compile($target.options.template);
            var thehtml = template($target.options.data);
            $(thehtml).appendTo($target.element);
            //alert("GEt done!");
            //查看当前元素的位置确定显示的方式

            $target.element.find("li:first").attr("class", "searchbar-li active")

            $target._on($target.element.find("button"),{
                click: function (event) {
                    var theval = $target.element.find("input").val();
                    alert("Plugin Button Test:"+theval);
                },
                
            });

            $target._on($target.element.find(".searchbar-ul"), {
                click: this._searchBarevent,
            })

            //isScrolledIntoView 区分绑定li click event
            if (!$target.isScrolledIntoView()) {
                $target._on($target.element.find(".searchbar-fix-ul"), {
                    mouseout: this._searchFixBarOutevent,
                    mouseover:this._searchFixBarOverevent,
                });
            } 

            $target._on(window, {
                scroll: function () {
                    if ($target.isScrolledIntoView()) {
                        $target.element.find(".searchbar-inputdiv-searchicon").show();
                        $('.searchbar-fix-ul').addClass('searchbar-ul').removeClass('searchbar-fix-ul');
                        $('.searchbar-fix-li').addClass('searchbar-li').removeClass('searchbar-fix-li');
                        this.element.find('.searchbar-li').css("display", "inline-block")
                        this.element.find('.searchbar-li:not(.active)').show();
                        $target._off($target.element.find(".searchbar-fix-ul"), "mouseout");
                        $target._off($target.element.find(".searchbar-fix-ul"), "onmouseover");
                        //alert("true scroll");
                    } else {
                        $target.element.find(".searchbar-inputdiv-searchicon").hide();
                        $('.searchbar-ul').addClass('searchbar-fix-ul').removeClass('searchbar-ul');
                        $('.searchbar-li').addClass('searchbar-fix-li').removeClass('searchbar-li');
                        this.element.find('.searchbar-fix-li:not(.active)').hide();
                        $target._off($target.element.find(".searchbar-fix-ul"), "mouseout");
                        $target._off($target.element.find(".searchbar-fix-ul"), "onmouseover");
                        $target._on($target.element.find(".searchbar-fix-ul"), {
                            mouseout: this._searchFixBarOutevent,
                            mouseover: this._searchFixBarOverevent,
                        });
                        //alert("false scroll");
                    }
                }
            })

            //$target.element.find("button").bind("click", function () {
            //    var theval = $target.element.find("input").val();
            //    alert("Plugin Button Test:"+theval);
            //});
        },
        //_searchBarevent;
        _searchBarevent:function(event){
            $li = $(event.target);
            this.element.find("li.active").removeClass("active");
            $li.addClass("active");
            this._trigger("mouseout");
        },
        //_searchFixBarevent
        _searchFixBarOverevent:function(){
            this.element.find('.searchbar-fix-li').css("display", "list-item");
            this.element.find('.searchbar-fix-li:not(.active)').show();
        },
        _searchFixBarOutevent:function(){
            this.element.find('.searchbar-fix-li:not(.active)').hide();
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
        },

        //isScrolledIntoView
        isScrolledIntoView: function () {
            var $target = this;
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $target.element.offset().top;
            var elemBottom = elemTop + $target.element.height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

    });

})(jQuery);