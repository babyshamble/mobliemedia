/*TMODJS:{"version":1,"md5":"cf6f27da0f17c7671a1e67ace501ce26"}*/
template('views/artcle/read',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,ptime=$data.ptime,$string=$utils.$string,art=$data.art,$out='';$out+='<h2 class="article-title">';
$out+=$escape(name);
$out+='</h2> <div class="article-meta"> <span class="article-time">';
$out+=$escape(ptime);
$out+='</span> </div> <div class="article-content">';
$out+=$string(art);
$out+='</div> ';
return new String($out);
});