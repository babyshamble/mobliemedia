/*TMODJS:{"version":1,"md5":"951e7469bbbbf38456770577bfb53e39"}*/
template('views/Noffice/site-list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,sites=$data.sites,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$each(sites,function(item,$index){
$out+=' <li class="square_item" data-id="';
$out+=$escape(item.id);
$out+='"> <a href="#Nolist_section?lid=';
$out+=$escape(item.id);
$out+='" data-target="section"> <table> <tbody> <tr> <td> ';
$out+=$escape(item.name);
$out+=' </td> </tr> </tbody> </table> </a> </li> ';
});
return new String($out);
});