/*TMODJS:{"version":48,"md5":"9a144cb0ffe78916f7ef1b9092dbeacd"}*/
template('views/list/item-without-thumbnail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,info=$data.info,id=$data.id,submap=$data.submap,ptime=$data.ptime,$out='';$out+='<li class="list-item nothumbnail"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">';
$out+=$escape(name);
$out+='</div> <p class="list-brief">';
$out+=$escape(info);
$out+='</p> </div> <div class="list-start" data-id="';
$out+=$escape(id);
$out+='" mask="art-media-';
$out+=$escape(id);
$out+='"> </div> <!-- <div class="list-footprint"> <span class="list-source">';
$out+=$escape(submap);
$out+='</span> <span class="list-date">';
$out+=$escape(ptime);
$out+='</span> </div> --> <div class="art-media-cont animated" id="art-media-';
$out+=$escape(id);
$out+='-cont"> <div class="art-media animated" id="art-media-';
$out+=$escape(id);
$out+='"></div> </div> </li> z';
return new String($out);
});