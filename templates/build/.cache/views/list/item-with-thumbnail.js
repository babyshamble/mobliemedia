/*TMODJS:{"version":54,"md5":"f0511ffe0686727671e8cd346ecf280c"}*/
template('views/list/item-with-thumbnail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,thumbnail=$data.thumbnail,name=$data.name,id=$data.id,submap=$data.submap,ptime=$data.ptime,$out='';$out+='<li class="list-item list-repair" data-image="';
$out+=$escape(thumbnail[0]);
$out+='"> <div class="list-thumbnail" style="background-image: none"> <div class="list-thu-title">';
$out+=$escape(name);
$out+='</div> </div> <div class="list-thu-start" data-id="';
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
$out+='"></div> </div> </li> ';
return new String($out);
});