/*TMODJS:{"version":7,"md5":"fb936be7fc58935734865d7e661f4990"}*/
template('views/web/mapstair',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,counter=$data.counter,$each=$utils.$each,mapstair=$data.mapstair,map=$data.map,mi=$data.mi,$escape=$utils.$escape,$out='';if(counter = 0){
}
$out+=' ';
$each(mapstair,function(map,mi){
$out+=' <li ';
if(counter++ === 0){
$out+='class="active"';
}
$out+=' data-mid="';
$out+=$escape(map.id);
$out+='" data-sid="';
$out+=$escape(map.sid);
$out+='"data-code="';
$out+=$escape(map.code);
$out+='">';
$out+=$escape(map.name);
$out+='</li> ';
});
$out+=' ';
return new String($out);
});