﻿(function ($) {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget("custom.colorize", {
        // default options
        options: {
            red: 255,
            green: 0,
            blue: 0,

            // Callbacks
            change: null,
            random: null
        },

        // The constructor
        _create: function () {
            this.element
              // add a class for theming
              .addClass("custom-colorize");

            this.changer = $("<button>", {  //这里为对象定义了一个新的属性changer包括一个按钮节点以及集成button的event
                text: "change",
                "class": "custom-colorize-changer"
            })
            .appendTo(this.element)
            .button();
            console.log("_create click bind!");
            // Bind click events on the changer button to the random method
            this._on(this.changer, {
                // _on won't call random when widget is disabled
                click: "random" //这里的random是在所有wedgit的public函数random
            });
            this._refresh();
        },

        // Called when created, and later when changing options
        _refresh: function () {
            this.element.css("background-color", "rgb(" +
              this.options.red + "," +
              this.options.green + "," +
              this.options.blue + ")"
            );

            // Trigger a callback/event
            this._trigger("change");
        },

        // A public method to change the color to a random value
        // can be called directly via .colorize( "random" )
        random: function (event) {
            var colors = {
                red: Math.floor(Math.random() * 256),
                green: Math.floor(Math.random() * 256),
                blue: Math.floor(Math.random() * 256)
            };
            console.log("public random All");
            // Trigger an event, check if it's canceled
            if (this._trigger("random", event, colors) !== false) { //这里的Random是在option中的callback
                console.log("public random before option");
                this.option(colors);  //这个重新设置控件的属性值会自动调用_refush 方法
                console.log("public random after option");
            }
        },

        // Events bound via _on are removed automatically
        // revert other modifications here
        _destroy: function () {
            // remove generated elements
            this.changer.remove();

            this.element
              .removeClass("custom-colorize")
              .enableSelection()
              .css("background-color", "transparent");
        },

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            // prevent invalid color values
            if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
                return;
            }
            this._super(key, value);
        }
    });
})(jQuery);
/*
    
*/