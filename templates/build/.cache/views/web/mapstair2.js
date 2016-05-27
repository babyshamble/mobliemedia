/*TMODJS:{"version":4,"md5":"0af2f631e4b2accd4403d6798fd457fc"}*/
template('views/web/mapstair2',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,mapstair=$data.mapstair,map=$data.map,$index=$data.$index,$escape=$utils.$escape,$out='';$each(mapstair,function(map,$index){
$out+=' <li data-mid="';
$out+=$escape(map.id);
$out+='" data-code="';
$out+=$escape(map.code);
$out+='" data-sid="';
$out+=$escape(map.sid);
$out+='">';
$out+=$escape(map.name);
$out+='</li> ';
});
return new String($out);
});