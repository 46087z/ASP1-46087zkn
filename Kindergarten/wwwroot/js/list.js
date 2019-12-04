function getHashVars(){
    var vars = [], hash;
    var hashes = window.location.hash.slice(window.location.hash.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
$(window).bind("hashchange", function() {
	var url = window.location.hash.substr(1);
	setData(url);
});
var HashURL = window.location.hash.substr(1);
var dsData = new Spry.Data.JSONDataSet(jsonURL+HashURL, {path: "result", subPaths: "info", useCache: false});
dsData.setColumnType("info.rows", "number");
dsData.setColumnType("info.pages", "number");
dsData.setColumnType("info.page", "number");
dsData.setColumnType("info.view", "number");

var dsPages = new Spry.Data.NestedJSONDataSet(dsData, "paging");
dsPages.setColumnType("page", "number");

var dsItems = new Spry.Data.NestedJSONDataSet(dsData, "items");
dsData.setColumnType("image", "image");
dsData.setColumnType("description", "html");

function keyUpUrl(url, event){
	var keyCode = $.ui.keyCode;
	if(event.keyCode != keyCode.SHIFT && event.keyCode != keyCode.CONTROL && event.keyCode != keyCode.ALT){
		if (keyUpUrl.timerID){
			clearTimeout(keyUpUrl.timerID);
		}
		keyUpUrl.timerID = setTimeout(function() { keyUpUrl.timerID = null; setPage(url); }, 800);
	}
}
function setPage(url){
	window.location.hash = '#'+url;
	return false;
}
function setData(url){
	//alert(jsonURL+url);
	dsData.setURL(jsonURL+url);
	dsData.loadData();
	jHtml.animate({scrollTop: scrollPageTop}, 300);
	return false;
}

var InitPages = function(nType, notifier, data) {
	if(nType == 'onPostUpdate' && data.state == 'ready'){
		/*$('.paging_list a').hover(
			function() { $(this).addClass('ui-state-hover'); }, 
			function() { $(this).removeClass('ui-state-hover'); }
		);
		initLytebox();*/
		if($('.stars-rating').length > 0){
			$(".stars-rating").stars({
				split: 2, 
				oneVoteOnly: true,
				cancelShow : false,
				disabled: true/*,
				callback: function(ui, type, value, event){
					var rid = ($(this).attr('name'));
					$.post('/', {'rid' : rid, 'points' : value, 'command' : 'rate'}); 
				}*/
    		});
		}
	}
}
Spry.Data.Region.addObserver('dataRegion', InitPages);