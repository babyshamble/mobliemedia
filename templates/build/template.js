/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    template.helper("dateFormat", function(date, format) {
        date = new Date(+date);
        var map = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            q: Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        return format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            return void 0 !== v ? (all.length > 1 && (v = "0" + v, v = v.substr(v.length - 2)), 
            v) : "y" === t ? (date.getFullYear() + "").substr(4 - all.length) : all;
        });
    }), template.helper("parseInt", function(a, b) {
        return parseInt(a, b || 10);
    }), template.helper("min", function(a, b) {
        return Math.min(a, b);
    }), template.helper("max", function(a, b) {
        return Math.max(a, b);
    }), template.helper("stripImages", function(c) {
        return c.replace(/<img[^>]*\/?>/g, "");
    }), template.helper("escape", function(c) {
        return escape(c);
    }), template.helper("col", function(a) {
        return 1 + parseInt(a, 10);
    }), template.helper("firstImg", function(s) {
        return s ? s.split("||")[0].split("/^/^")[0] : "";
    }), /*v:1*/
    template("views/artcle/read", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, ptime = $data.ptime, $string = $utils.$string, art = $data.art, $out = "";
        return $out += '<h2 class="article-title">', $out += $escape(name), $out += '</h2> <div class="article-meta"> <span class="article-time">', 
        $out += $escape(ptime), $out += '</span> </div> <div class="article-content">', 
        $out += $string(art), $out += "</div> ", new String($out);
    }), /*v:1*/
    template("views/artcle/recommend", ""), /*v:78*/
    template("views/config/config", '<div> 高对比度 </div> <ul id="config_color_list" class="clearfix"> <li class="config_color_item" id="config_color_gray" mask="gray">开启</li> <li class="config_color_item active" id="config_color_red" mask="red">关闭</li> </ul> <div> 字体设置 </div> <ul id="config_font_list" class="clearfix"> <li class="config_font_item" id="config_font_big">放大</li> <li class="config_font_item active" id="config_font_small">缩小</li> </ul> <div> 语音设置 </div> <ul id="config_reader_list" class="clearfix"> <li class="config_reader_item active" id="config_reader_start">开启</li> <li class="config_reader_item" id="config_reader_stop">关闭</li> </ul>'), 
    /*v:54*/
    template("views/list/item-with-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), thumbnail = $data.thumbnail, name = $data.name, id = $data.id, submap = $data.submap, ptime = $data.ptime, $out = "";
        return $out += '<li class="list-item list-repair" data-image="', $out += $escape(thumbnail[0]), 
        $out += '"> <div class="list-thumbnail" style="background-image: none"> <div class="list-thu-title">', 
        $out += $escape(name), $out += '</div> </div> <div class="list-thu-start" data-id="', 
        $out += $escape(id), $out += '" mask="art-media-', $out += $escape(id), $out += '"> </div> <!-- <div class="list-footprint"> <span class="list-source">', 
        $out += $escape(submap), $out += '</span> <span class="list-date">', $out += $escape(ptime), 
        $out += '</span> </div> --> <div class="art-media-cont animated" id="art-media-', 
        $out += $escape(id), $out += '-cont"> <div class="art-media animated" id="art-media-', 
        $out += $escape(id), $out += '"></div> </div> </li> ', new String($out);
    }), /*v:48*/
    template("views/list/item-without-thumbnail", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, info = $data.info, id = $data.id, submap = $data.submap, ptime = $data.ptime, $out = "";
        return $out += '<li class="list-item nothumbnail"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">', 
        $out += $escape(name), $out += '</div> <p class="list-brief">', $out += $escape(info), 
        $out += '</p> </div> <div class="list-start" data-id="', $out += $escape(id), $out += '" mask="art-media-', 
        $out += $escape(id), $out += '"> </div> <!-- <div class="list-footprint"> <span class="list-source">', 
        $out += $escape(submap), $out += '</span> <span class="list-date">', $out += $escape(ptime), 
        $out += '</span> </div> --> <div class="art-media-cont animated" id="art-media-', 
        $out += $escape(id), $out += '-cont"> <div class="art-media animated" id="art-media-', 
        $out += $escape(id), $out += '"></div> </div> </li> z', new String($out);
    }), /*v:1*/
    template("views/list/list", function($data, $filename) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, include = ($data.item, 
        $data.ii, function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }), $out = "";
        return $each(list, function(item) {
            $out += " ", "thumbnail" === item.type && ($out += " ", include("./item-with-thumbnail", item), 
            $out += " "), $out += " ", "nothumbnail" === item.type && ($out += " ", include("./item-without-thumbnail", item), 
            $out += " "), $out += " ", "multithumbnails" === item.type && ($out += " ", include("./item-with-multi-thumbnails", item), 
            $out += " "), $out += " ";
        }), $out += " ", new String($out);
    }), /*v:1*/
    template("views/list/read", function($data, $filename) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), name = $data.name, ptime = $data.ptime, content = $data.content, include = function(filename, data) {
            data = data || $data;
            var text = $utils.$include(filename, data, $filename);
            return $out += text;
        }, $out = "";
        return $out += '<h2 class="article-title">', $out += $escape(name), $out += '</h2> <div class="article-meta"> <span class="article-time">', 
        $out += $escape(ptime), $out += '</span> </div> <div class="article-content">', 
        $out += $escape(content), $out += "</div> ", include("./recommend"), $out += " ", 
        new String($out);
    }), /*v:1*/
    template("views/web/aside-system-list", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, systems = $data.systems, $escape = ($data.system, 
        $data.si, $utils.$escape), counter2 = $data.counter2, $out = ($data.site, $data.ssi, 
        "");
        return counter = 0, $out += " ", $each(systems, function(system) {
            $out += " ", counter++, $out += ' <div class="header">', $out += $escape(system.name), 
            $out += '</div> <ul class="menu"> ', counter2 = 0, $out += " ", $each(system.sites, function(site) {
                $out += " ", counter2++, $out += ' <li data-wid="', $out += $escape(site.id), $out += '"> <a href="#web_section?wid=', 
                $out += $escape(site.id), $out += '" target="section">', $out += $escape(site.name), 
                $out += "</a> </li> ";
            }), $out += " ", 0 === counter2 && ($out += " <li>此分类下暂时没有数据</li> "), $out += " </ul> ";
        }), $out += " ", 0 === counter && ($out += ' <div id="web-aside-nodata"> <p>暂时没有数据</p> </div> '), 
        $out += " ", new String($out);
    }), /*v:1*/
    template("views/web/loading", "<h1>正在努力的加载中...</h1> "), /*v:7*/
    template("views/web/mapstair", function($data) {
        "use strict";
        var $utils = this, counter = ($utils.$helpers, $data.counter), $each = $utils.$each, mapstair = $data.mapstair, $escape = ($data.map, 
        $data.mi, $utils.$escape), $out = "";
        return counter = 0, $out += " ", $each(mapstair, function(map) {
            $out += " <li ", 0 === counter++ && ($out += 'class="active"'), $out += ' data-mid="', 
            $out += $escape(map.id), $out += '" data-sid="', $out += $escape(map.sid), $out += '"data-code="', 
            $out += $escape(map.code), $out += '">', $out += $escape(map.name), $out += "</li> ";
        }), $out += " ", new String($out);
    }), /*v:4*/
    template("views/web/mapstair2", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), mapstair = $data.mapstair, $escape = ($data.map, 
        $data.$index, $utils.$escape), $out = "";
        return $each(mapstair, function(map) {
            $out += ' <li data-mid="', $out += $escape(map.id), $out += '" data-code="', $out += $escape(map.code), 
            $out += '" data-sid="', $out += $escape(map.sid), $out += '">', $out += $escape(map.name), 
            $out += "</li> ";
        }), new String($out);
    }), /*v:1*/
    template("views/web/network-error", "<h1>服务不可用...</h1> "), /*v:1*/
    template("views/web_section", '<section id="web_section" data-transition="flip"> <header> <nav class="right"> </nav> <h1 class="title">网站服务</h1> <nav class="left"> <a data-target="menu" data-icon="menu" href="#aside_web_system"></a> </nav> <nav class="right"> <a data-target="menu" data-icon="cog" href="#app_config" id=""></a> </nav> </header> <div id="web-status" class=""> <div id="web-loading-system" class="web-statu"> <div> <div class="la-ball-fussion"> <div></div> <div></div> <div></div> <div></div> </div> </div> </div> <div id="web-loading-map" class="web-statu"> <div> <div class="la-ball-fussion"> <div></div> <div></div> <div></div> <div></div> </div> </div> </div> <div id="web-loading-list" class="web-statu"> <div> <div class="la-ball-fussion"> <div></div> <div></div> <div></div> <div></div> </div> </div> </div> <div id="web-nocontent-system" class="web-statu"> <div> <h3>暂时没有体系内容</h3> <p>点击重试</p> </div> </div> <div id="web-nocontent-map" class="web-statu"> <div> <h3>暂时没有目录内容</h3> <p>点击重试</p> </div> </div> <div id="web-nocontent-list" class="web-statu"> <div> <h3>暂时没有列表内容</h3> <p>点击重试</p> </div> </div> </div> <nav class="header-secondary"> <div id="web-map-stair" class="web-map-stair"> <ul id="control-group1" class="control-group" style="width: 500px;"></ul> </div> </nav> <nav id="header-secondary2"> <div id="web-map-stair2" class="web-map-stair"> <ul id="control-group2" class="control-group" style="width: 500px;"></ul> </div> </nav> <article class="active" id="web_shelter" data-scroll="true"> <div> <ul class="applist card"></ul> </div> </article> </section> ');
}();