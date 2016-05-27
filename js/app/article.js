(function() {
    var activeAID,
        container;

    var
        chapters = []
        ,TRANSFORMER = /<p[^>]*>|<\/p[^>]*>|<font[^>]*>|<\/font[^>]*>|<div[^>]*>|<\/div[^>]*>|<br[^>]*>|<span[^>]*>|<\/span[^>]*>|<table[^>]*>|<\/table[^>]*>|<tbody[^>]*>|<\/tbody[^>]*>|<td[^>]*>|<\/td[^>]*>|<tr[^>]*>|<\/tr[^>]*>|\n/g // 用于分割段落
        ,SECTENCE = /。|，|？|！|；|,|:|!/g // 用于分句
        ,LONGER = /。|？|！|!/g ;

    var Proxy;

    // 渲染文章正文中的图片
    function renderArticleImages($listContainer) {
        $listContainer.find('.picture').not('.ready').each(function() {
            var $this = $(this), imageSrc;

            imageSrc = this.getAttribute('data-image');

            loadImg(imageSrc, function(src) {
                $this.css('background-image', 'url(' + src + ')');
                $this.addClass('ready');
            });
        });
    }

    YX.Tools.article = function(id, cont) {
        if (id && cont) {
            activeAID = id;
            container = cont;
            load();
        } else {
            return;
        }
    };

    YX.Tools.artInit = function() {
        $('.animeteMask').removeClass('fadeInRight').addClass('fadeOutRight');
        $('.art-media-cont').removeClass('animeteMask');
        $('.list-start').removeClass('art-stop');
        $('.list-thu-start').removeClass('art-stop');
        $('.art-media').html('');
        
        if (artpointer) {
            clearTimeout(artpointer);
            artpointer = undefined;
        }
        App.speaker.stop();
        chapterId = 0;
        chaptersLength = 0;
        artHtml = [];
        cacheStrLength = 0;
        row = 0; col = 0;
    };

    /*
     * 加载数据
     *
     * @method load
     * @access public
     * @return {Void}
     */
    function load() {
        var self = this, text, refinedData;

        App.load.article(activeAID, 'sart')
            .then(function(data) {
                YX.Tools.artInit();
                Proxy = data.imgProxy;
                refineArticleData(data);
            
                $('#'+container).html(artHtml[0].html);
                $('#'+container+'-cont').prev().addClass('art-stop');
                $('#'+container+'-cont').removeClass('fadeOutRight').addClass('fadeInRight animeteMask');
                $('#'+container+'-cont').show();

                foucsChapterTap();
                $('#'+container).children().eq(0).trigger('tap');
            })
            .catch(function(err) {
                switch (err) {
                    case 'ESERVERFAIL':
                        $articleStatus.addClass('nocontent');
                        break;
                    case 'ENOTREADY':
                        $articleStatus.addClass('nocontent');
                        break;
                    default:
                        break;
                }
            });
    };

    function refineArticleData(data) {
        var  cache = data.data.art, at = [];
            cache = cache.replace(/<img[^>]*?(src="[^"]*?")[^>]*?>/g, '<img $1 />').replace(/(&quot;)/ig,"\"").replace(/(&gt;)/ig,">").replace(/(&lt;)/ig,"<").replace(/(&nbsp;)/ig,"").split(TRANSFORMER);
        artHtml = [];

        for (var i in cache) {
            if (cache[i] != '') {
                at.push(cache[i]);
            }
        }

        getChapters(at);
    };  

    function getChapters(e) {
        var
            div, node, nodes;
            artRefinedData = [];
        
        var 
            g, str, length, pt = 100, num;

        for (var i=0; i<e.length; i++) {
            div = document.createElement('div');
            div.innerHTML = e[i];
            nodes = $('img', div);

            if (nodes.length > 0) {  //说明包含img标签
                for (var n=0; n<div.childNodes.length; n++){
                    node = div.childNodes[n];
                    if (node.nodeName == 'IMG' || node.nodeName == 'img') {
                        node.src = Proxy + node.src;
                        artRefinedData.push({type: 'img', value: node.src});
                    }
                    else if (node.nodeName == '#text') { 
                        //这是文本直接把p里的内容丢进
                        node.nodeValue = node.nodeValue.replace(/\s+/ig, '');
                        if (node.nodeValue != '') {
                            length = node.nodeValue.length;
                            num = Math.ceil(length / pt);
                            
                            if (length > pt) {
                                for (g=0; g< num; g++) {
                                    str = node.nodeValue.substr(g*pt, pt);
                                    if (str.length == 1 && SECTENCE.test(str)) {
                                        artRefinedData[artRefinedData.length-1]+str;
                                    } else {
                                        artRefinedData.push({type: 'text', value: str});
                                    }
                                }
                            } else {
                                  artRefinedData.push({type: 'text', value: node.nodeValue});
                            }
                        }
                    }
                }
            }
            else { //说明不包含img标签
                e[i] = e[i].replace(/\s+/ig, '');
                length = e[i].length;
                num = Math.ceil(length / pt);

                if (e[i].length > pt) {
                    for (g=0; g< num; g++) {
                        str = e[i].substr(g*pt, pt);
                        if (str.length == 1 && SECTENCE.test(str)) {
                            artRefinedData[artRefinedData.length-1]+str;
                        } else {
                            artRefinedData.push({type: 'text', value: str});
                        }
                    }

                } else {
                    artRefinedData.push({type: 'text', value: e[i]});
                }
            }
        }

        productArtHtml(artRefinedData);
    }; 

    var 
        artHtml = [],
        cacheStrLength = 0,
        row = 0, col = 0, count = 60;

    function productArtHtml(data) {
        if (row >= data.length) {
            return;
        };
        
        if (data[row].type == 'img') {
            var html = '<div class="art-main-img" style="background-image: url(' + data[row].value + ') "/></div>';
     
            artHtml.push({html: html, read:''});
            row++; col = 0; cacheStrLength = 0;
            productArtHtml(data);
            return;
        }

        if (data[row].type == 'text') {   
            var str = data[row].value.substr(col, count - cacheStrLength);
            
            if (str.length == 0) {
                row++; col = 0;
                productArtHtml(data);
                return;
            }

            if (data[row].value.length > col + count - cacheStrLength) {
                col = col + count - cacheStrLength;
            } else {
                row++; col = 0;
            }

            if (cacheStrLength == 0) {// 目前是开启新的一个div 不需要继续拼接
                var html = '<p class="art-main-p">'+ str +'</p>';
                artHtml.push({html: html, read: str});

                if (str.length == count) {
                    cacheStrLength = 0;
                    productArtHtml(data);
                    return;
                }

                if (str.length < count) {
                    cacheStrLength = str.length;// 缓存这部分不够 count 的字节
                    productArtHtml(data);
                    return;
                }

                if (str.length > count) {
                    cacheStrLength = 0;
                    productArtHtml(data);
                    return;
                }
            }

            if (cacheStrLength != 0) { // 无论如何是要在最后一个html 进行拼接
                var html = '<p class="art-main-p">'+ str +'</p>';
                artHtml[artHtml.length - 1].html += html;
                artHtml[artHtml.length - 1].read += str;

                if (artHtml[artHtml.length - 1].read.length == count) { // 目前长度 + 缓存长度 = count
                    cacheStrLength = 0;
                    productArtHtml(data);
                    return;
                }

                if (artHtml[artHtml.length - 1].read.length < count) {
                    cacheStrLength = artHtml[artHtml.length - 1].read.length;
                    productArtHtml(data);
                    return;
                }

                if (artHtml[artHtml.length - 1].read.length > count) {
                    cacheStrLength = 0;
                    productArtHtml(data);
                    return;
                }
             }
        }
    };

    /*
    ****************** 阅读部分******************
    */

    var 
        chapterId = 0,
        chaptersLength = 0,
        artcomplete = false,
        artpointer = undefined;

    function foucsChapterTap() {
        $('.art-main-p').on('tap', function(e) {
            reader();
        });

        $('.art-main-img').on('tap', function(e) {
            var time = setTimeout(function(){
                SetCurrentReadingIndex();
                clearTimeout(time);
            },2000);
        });
    };
  
    function reader(isFirst) {
        if (chaptersLength == 0) {
            chapters = artHtml;
            chaptersLength = chapters.length - 1;
        }

        var currentChapter, nextChapter;
    
        currentChapter = chapters[chapterId].read;

        if (currentChapter == '') {
            var time = setTimeout(function(){
                SetCurrentReadingIndex();
                clearTimeout(time);
            },2000);
        }

        if (chapterId >= chaptersLength) {
            nextChapter = null;
        }
        else {
            nextChapter = chapters[chapterId+1].read;
        }
   
        isFirst = (undefined === isFirst) ? true : !!isFirst;

        App.speaker.continueRead(
            currentChapter,
            nextChapter,
            function () {
            },
            SetCurrentReadingIndex,
            isFirst,
            function () {
            }
        );

        if (nextChapter) {
            var sp = currentChapter.length > 20 ? (currentChapter.length / 2 * 1000) : currentChapter.length;
            sp = sp <= 5 ? 5 : sp;
            startFix(sp*1000);
        } else {
            if (artpointer) {
                clearTimeout(artpointer);
                artpointer = undefined;
            }
            artcomplete = true;
        }
    };

    function startFix(sp) {
        artpointer = setTimeout(function() {
            SetCurrentReadingIndex();
        }, sp);
    };

    function SetCurrentReadingIndex() {
        if (artpointer) {
            clearTimeout(artpointer);
            artpointer = undefined;
        }

        if (chapterId <= chaptersLength) {
            chapterId++;
            $('.art-media').removeClass('fadeInDown').addClass('fadeOutDown');

            var time = setTimeout(function(){
                $('#'+container).html(artHtml[chapterId].html);
                clearTimeout(time);
                $('.art-media').removeClass('fadeOutDown').addClass('fadeInDown');
            },500);

            
        }
        else {
            chapterId = 0;
            App.speaker.stop();
            return;
        }

        reader(false);
    };

    this.hide = function() {
        App.speaker.stop();
    };

})();
