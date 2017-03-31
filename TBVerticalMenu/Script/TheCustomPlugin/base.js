Handlebars.registerHelper('join', function (items, block) { //block 代表指代的json子节点。
    var delimiter = block.hash.delimiter || ",",
        start = start = block.hash.start || 0,
        len = items ? items.length : 0,
        end = block.hash.end || len,
        out = "";

    if (end > len) end = len;

    if ('function' === typeof block.fn) { //由于版本差异现在需要使用block.fn来指代模块对象
        for (i = start; i < end; i++) {
            if (i > start) out += delimiter;
            if ('string' === typeof items[i])
                out += items[i];
            else
                out += block.fn(items[i]);
        }
        return out;
    } else {
        return [].concat(items).slice(start, end).join(delimiter);
    }
});