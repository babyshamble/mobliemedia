if(typeof undefined === typeof YX) YX = {};
if(typeof undefined === typeof YX.Mobile) YX.Mobile = {};

//主题替换
YX.Mobile.Theme = function(){
	var
		theme = this;

	var
		$HEAD = undefined
		,$SCRIPT = undefined
		,$LINK = undefined;

	theme.init = function(){

	};

	theme.apply = function(tname, tns, tpath){
		prepare();
		clearTheme(tname, tns);
		load(tname, tpath, tns);
	};

	theme.release = function(tname, tns){
		clearTheme(tname, tns);
	};

	theme.Scriptapply = function(tname, tns, tpath){
		prepare();
		clearScriptTheme(tname, tns);
		load(tname, tpath, tns);
	};

	theme.Scriptrelease = function(tname, tns){
		clearScriptTheme(tname, tns);
	};

	function prepare(){
		$HEAD = document.getElementsByTagName('head')[0];
		$LINK = document.getElementsByTagName('link');
		$SCRIPT = document.getElementsByTagName('script');
	};

	function load(name, path, ns){
		debugger
		var link = document.createElement('link');

		link.rel = 'stylesheet';
		link.id = ns + '-' + name;
		link.setAttribute('theme-name', name);
		link.setAttribute('theme-namespace', ns);
		link.href = path;

		link.onload = function(){
			loaded(name, ns, true);
		};

		link.onerror = function(){
			loaded(name, ns, false);
		};

		link.onabort = function(){
			loaded(name, ns, false);
		};

		$HEAD.appendChild(link);
	};

	function loaded(name, ns, success){
		var tid = ns + '-' + name;

		for(var i=0; i<$LINK.length; i++){
			var $node = $LINK[i];

			if($node.rel != 'stylesheet'){
				continue;
			}

			if($node.id && tid == $node.id){
				$node.disabled = false;
			}
		}
	};

	function clearTheme(name, ns){
		if (ns) {
			var tid = ns + '-' + name;
		} else {
			var tid = name;
		}
		
		prepare();

		for(var i=0; i<$LINK.length; i++){
			var $node = $LINK[i];

			if($node.id && tid == $node.id){
				$node.remove();
			}
		}		
	};

	return theme;
};