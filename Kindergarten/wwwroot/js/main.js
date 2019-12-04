$.fn.reset = function(fn) {
    return fn ? this.bind("reset", fn) : this.trigger("reset");
};
var scrollPageTop = 0;
var debug_all = true;
function setReferer(){
	var referer = location.pathname+location.search+location.hash;
	if($("input#accesscheck").length > 0){
		$("input#accesscheck").val(referer);
	}
	if(window.opener){
		//Do nothing
	} else {
		document.cookie="REFERER="+escape(referer)+"; path=/";
	}
}
$(window).bind("hashchange", function() {
	setReferer();
});
var jHtml = $('html,body');
if ($.browser.opera) {
	jHtml = $('html');
}
$.fn.hint = function(blurClass) {
  if (!blurClass) { 
    blurClass = 'hint';
  }

  return this.each(function () {
    var $input = $(this),
      title = $input.attr('hint'),
      $form = $(this.form),
      $win = $(window);

    function remove() {
      if ($input.val() === title && $input.hasClass(blurClass)) {
        $input.val('').removeClass(blurClass);
      }
    }
    if (title) { 
      $input.blur(function () {
        if (this.value === '' || this.value === title) {
          $input.val(title).addClass(blurClass);
        }
      }).focus(remove).blur();
      $form.submit(remove);
      $win.unload(remove);
    }
  });
};
(function( $ ) {
	$.widget( "ui.selectmenu", {
			 options: {
				disabled: null
			},
			_create: function() {
				if ( typeof this.options.disabled !== "boolean") {
					this.options.disabled = this.element.attr("disabled");
				}
				if (this.element.is(":disabled")) {
					this.options.disabled = true;
				}
				if(this.options.disabled){
					var menuClass = 'ui-select disabled';
				} else {
					var menuClass = 'ui-select';	
				}
				var self = this,
					parent = this.parent = $(this).parent(),
					select = this.select = $(this.element).css({'opacity' : 0, 'padding' : '0px'}),//.height(33),
					selected = select.children(":selected"),
					width = select.outerWidth()-37,
					span = this.span = $("<span></span>").addClass('select'),
					label = this.label = $("<span></span>").text(selected.text()).addClass('label').addClass(selected.attr('class')),
					menu = this.menu = $("<div></div>").addClass("ui-select").width(width).append(span).append(label);
					parent.append(menu);
					select.wrap(menu);
					select.change(function(){
						var selectedOption = $(this).children("option:selected");
						if(selectedOption.length == 0){
							selectedOption = $(this).children("option:first");
						}
						select.parent().parent().children('.label').text(selectedOption.text()).removeClass('hint').addClass(selectedOption.attr('class'));
					});
					select.focus(function(){
						$(this).parent().parent().addClass('focus');
					});
					select.blur(function(){
						$(this).parent().parent().removeClass('focus');
					});
					select.parents('form').reset(function(){
						setTimeout(function(){ select.trigger('change');}, 100);
					});
					
					this._setOption("disabled", this.options.disabled );
				
			},
			enable: function() {
				this.options.disabled = false;
				this._setOption("disabled", this.options.disabled );
			},
			disable: function() {
				this.options.disabled = true;
				this._setOption("disabled", this.options.disabled );
			},
			_setOption: function( key, value ) {
				$.Widget.prototype._setOption.apply( this, arguments );
				if ( key === "disabled" ) {
					if (value) {
						this.element.attr("disabled", "disabled");
						this.element.parent().parent().addClass('disabled');
					} else {
						this.element.removeAttr("disabled");
						this.element.parent().parent().removeClass('disabled');
					}
				}
			},
			destroy: function() {
				var par = this.element.parent().parent();
				this.element.parent().parent().parent().prepend(this.element.css({'opacity' : 1, 'padding' : '8px'}));
				par.remove();
				$.Widget.prototype.destroy.call( this );
			}
		});
})( jQuery );
(function( $ ) {
	$.widget( "ui.checkbox", {
			 options: {
				disabled: null,
				checked: null
			},
			_create: function() {
				var checkClass = '';
				if (typeof this.options.disabled !== "boolean") {
					this.options.disabled = this.element.attr("disabled");
				}
				if (typeof this.options.checked !== "boolean") {
					this.options.checked = this.element.attr("checked");
				}
				if (this.element.is(":disabled")) {
					this.options.disabled = true;
				}
				if (this.element.is(":checked")) {
					this.options.checked = true;
				}
				if(this.options.disabled){
					checkClass += ' disabled';
				} 
				if(this.options.checked){
					checkClass += ' checked';
				} 
				var self = this,
					parent = this.parent = $(this).parent(),
					checkbox = this.checkbox = $(this.element).css({'opacity' : 0}),
					elementType = checkbox[0].type,
					menu = this.menu = $("<span></span>").attr('class', 'ui-'+elementType+checkClass),
					defaultChecked = this.element[0].defaultChecked,
					defaultDisabled = this.options.disabled;
					parent.append(menu);
					checkbox.wrap(menu);
					checkbox.click(function(){
						var thisType = this.type;
						if(thisType != 'radio'){
							self._setOption("checked", $(this).is(":checked"));
						}
					});
					checkbox.change(function(){
						var thisType = this.type;
						if(thisType == 'radio'){
							var thisName = this.name;
							$('input[name="'+thisName+'"]').each(
								function (index, domElement) {
								  $(domElement).checkbox("checkout"); 
								}
							);
							$(this).checkbox("checkin");
						}
					});
					checkbox.focus(function(){
						$(this).parent().addClass('focus');
					});
					checkbox.blur(function(){
						$(this).parent().removeClass('focus');
					});
					checkbox.hover(
						function() { $(this).parent().addClass('hover'); }, 
						function() { $(this).parent().removeClass('hover'); }
					);
					checkbox.parents('form').reset(function(){
						self._setOption("checked", defaultChecked);
						self._setOption("disabled", defaultDisabled);
					});
					
					this._setOption("disabled", this.options.disabled );
				
			},
			enable: function() {
				this.options.disabled = false;
				this._setOption("disabled", this.options.disabled );
			},
			disable: function() {
				this.options.disabled = true;
				this._setOption("disabled", this.options.disabled );
			},
			checkout: function() {
				this.options.checked = false;
				this._setOption("checked", this.options.checked );
			},
			checkin: function() {
				this.options.checked = true;
				this._setOption("checked", this.options.checked );
			},
			_setOption: function( key, value ) {
				$.Widget.prototype._setOption.apply( this, arguments );
				if ( key === "disabled" ) {
					if (value) {
						this.element.attr("disabled", "disabled");
						this.element.parent().addClass('disabled');
					} else {
						this.element.removeAttr("disabled");
						this.element.parent().removeClass('disabled');
					}
				}
				if (key === "checked") {
					if (value) {
						this.element.attr("checked", "checked");
						this.element.parent().addClass('checked');
					} else {
						this.element.removeAttr("checked");
						this.element.parent().removeClass('checked');
					}
				}
			},
			destroy: function() {
				var par = this.element.parent();
				this.element.parent().parent().prepend(this.element.css({'opacity' : 1}));
				par.remove();
				$.Widget.prototype.destroy.call( this );
			}
		});
})( jQuery );
(function( $ ) {
	$.widget( "ui.slidemenu", {
			 options: {
				auto: true,
				container: null,
				scroller: null,
				bNext: null,
				bPrev: null,
				sCount: null,
				sWidth: null,
				sCurrent: 0,
				automove: null
			},
			_create: function() {
				var self = this,
					scroller = $(this.element).children('.bScroller'),
					container = scroller.children('.sContainer'),
					bNext = $(this.element).children('.sNext'),
					bPrev = $(this.element).children('.sPrev'),
					sCount = container.children('div').length,
					sWidth = $(this.element).width();
					container.width(sWidth*sCount);
					bNext.css({'visibility':'hidden'}); 
					bPrev.css({'visibility':'hidden'});
					bNext.click(function(){
						self.next();
						return false;
					});
					bPrev.click(function(){
						self.prev();
						return false;
					});
					$(this.element).hover(
						function() { bNext.css({'visibility':'visible'}); bPrev.css({'visibility':'visible'});self.move(); }, 
						function() { bNext.css({'visibility':'hidden'}); bPrev.css({'visibility':'hidden'}); }
					);
					this._setOption("container", container);
					this._setOption("scroller", scroller);
					this._setOption("bNext", bNext);
					this._setOption("bPrev", bPrev);
					this._setOption("sCount", sCount);
					this._setOption("sWidth", sWidth);
					this._setOption("auto", this.options.auto);
					self.start();
					
				
			},
			next: function() {
				this.options.sCurrent++;
				if(this.options.sCurrent == this.options.sCount){
					this.options.sCurrent = 0;
				}
				//this.options.sCurrent = Math.min((this.options.sCount-1), (this.options.sCurrent+1));
				var sc = (this.options.sCurrent*this.options.sWidth);
				var self = this;
				self.move();
				self.stop();
				this.options.scroller.animate({'scrollLeft': sc}, 1000, null, function(){
					self.start();
				});
			},
			prev: function() {
				this.options.sCurrent = Math.max(0, (this.options.sCurrent-1));
				var sc = (this.options.sCurrent*this.options.sWidth);
				var self = this;
				self.move();
				self.stop();
				this.options.scroller.animate({'scrollLeft': sc}, 1000, null, function(){
					self.start();
				});
			},
			move: function() {
				this.options.scroller.stop(false, true);
				var sc = (this.options.sCurrent*this.options.sWidth);
				var bPrev = this.options.bPrev;
				var bNext = this.options.bNext;
				if(this.options.sCount <= 1){
					bPrev.hide();
					bNext.hide();
				} else if(this.options.sCurrent == 0 && this.options.sCount > 0){
					bPrev.hide();
					bNext.show();
				} else if(this.options.sCurrent == (this.options.sCount-1) && this.options.sCount > 0){
					bPrev.show();
					bNext.hide();
				} else {
					bPrev.show();
					bNext.show();
				}
			},
			stop: function() {
				this.option.automove = clearInterval(this.option.automove);
			},
			start: function() {
				var self = this;
				if(this.options.auto){
					this.option.automove = setInterval(function(){self.next();}, 8000);
				}
			},
			_setOption: function( key, value ) {
				$.Widget.prototype._setOption.apply(this, arguments);
				if ( key === "auto" ) {
					if (value) {
						//
					} else {
						//
					}
				}
			}
		});
})( jQuery );
$.request = function(url, data, callback, dataType, type) {
	$.ajax({
	   type: type,
	   url: url,
	   data: data,
	   dataType: dataType,
	   success: callback,
	   error : callback,
	   ifModified: true,
	   scriptCharset: 'utf-8',
	   cache: false,
	   async: true
   });
};

var lp = 0, rp = 0, lg = [{left:'285px', top:'30px'}, {left:'363px', top:'25px'}, {left:'238px', top:'25px'}, {left:'171px', top:'28px'}], rg = [{left:'625px', top:'30px'}, {left:'570px', top:'38px'}, {left:'497px', top:'29px'}, {left:'702px', top:'30px'}];
$(function(){
	var hh = ($(window).height()-455);
	$('#in_content').css({height: hh});
	$("#gardje_left").mouseover(function(e) {
			var elm = $(this);
			if(lp < (lg.length-1)){
				lp++;
			} else {
				lp=0;
			}
			elm.children('div').css({
					 '-moz-transform':'rotate(-30deg)',
					 '-webkit-transform':'rotate(-30deg)',
					 '-o-transform':'rotate(-30deg)',
					 '-ms-transform':'rotate(-30deg)'
			});
			var rand = Math.floor((Math.random()*(lg.length-1)));
			elm.animate(lg[rand], 300, null, function(){elm.children('div').css({
					 '-moz-transform':'rotate(0deg)',
					 '-webkit-transform':'rotate(0deg)',
					 '-o-transform':'rotate(0deg)',
					 '-ms-transform':'rotate(0deg)'
				});});
        });
		$("#gardje_right").mouseover(function(e) {
			var elm = $(this);
			if(rp < (rg.length-1)){
				rp++;
			} else {
				rp=0;
			}
			elm.children('div').css({
					 '-moz-transform':'rotate(30deg)',
					 '-webkit-transform':'rotate(30deg)',
					 '-o-transform':'rotate(30deg)',
					 '-ms-transform':'rotate(30deg)'
			});
			var rand = Math.floor((Math.random()*(lg.length-1)));
			elm.animate(rg[rand], 300, null, function(){elm.children('div').css({
					 '-moz-transform':'rotate(0deg)',
					 '-webkit-transform':'rotate(0deg)',
					 '-o-transform':'rotate(0deg)',
					 '-ms-transform':'rotate(0deg)'
				});});
        });
		$('#nav_menu ul li a').mouseover(function (){$("#gardje_right, #gardje_left").mouseover();});
		$('.home_menu li').hover(
			function(){$(this).animate({'margin-top': '-10px'}, 200);}, 
			function(){$(this).animate({'margin-top': '0px'}, 100);}
		);
    scrollPageTop = $("#nav_menu").position().top-30;
	setReferer();
	//$('#iBanner').slidemenu();
	$('.menu_links ul li.root > span').click(function(){
		var ul = $(this).parent('li');
		ul.stop(false, true);
		ul.toggleClass('hover', 'fast');
		return false;
	});
	/*if (!$.browser.msie || ($.browser.msie && $.browser.version > 7)) {
	$("#key").autocomplete({
			source: "/json/search.php?autocomplete=true",
			minLength: 1,
			appendTo: "#search_form div",
			zIndex: 9876,
			html: true, 
			position: { my : "right top", at: "right bottom", offset: "26 0" },
			select: function( event, ui ) {
				window.location = ui.item.link;
			}
		});
	}*/
   if ($.browser.webkit) {
	   $('select').css({'padding' : '0px'});
	   $('input[type="text"], input[type="password"], textarea').css({'padding-top':'6px', 'padding-bottom':'6px'});
   }
   if ($.browser.msie && $.browser.version <= 8) {
	   if($.browser.version == 8){
	   		$('input[type="text"], input[type="password"], textarea').css({'padding-top':'8px', 'padding-bottom':'8px'});
			$('input.inDate, input.inButton').css({'padding-top':'7px', 'float':'left'});
	   } else {
		   $('input[type="text"], input[type="password"], textarea').css({'padding-top':'9px', 'padding-bottom':'9px'});
	   	   $('input[type="checkbox"], input[type="radio"]').css({'margin':'0px'});
		   $('input[type="text"]').addClass('type_text');
		   $('input[type="password"]').addClass('type_password');
	   }
   }
   if ($.browser.mozilla) {
	   $('input.inDate, input.inButton').css({'padding-top':'6px', 'float':'left'});
   } 
   if ($.browser.opera) {
	   $('input[type="text"], input[type="password"], textarea').css({'padding-top':'6px', 'padding-bottom':'6px'});
   } 
   
	var z = $('.errorContainer').length+10;
	$('.errorContainer').each(function() {
    	z--;
    	$(this).css('z-index', z);
  	});
	$(".setBorder tr:odd, .sortable tr:odd").addClass("odd");
	$(".setBorder tr:even, .sortable tr:even").addClass("even");
	$('select').selectmenu();
	$("button[data-icon-primary]").button({create: function(event, ui) {
		$(this).button("option" , "icons" , {primary: $(this).attr('data-icon-primary')});
	}});
	$("button[data-icon-secondary]").button({create: function(event, ui) {
		$(this).button("option" , "icons" , {secondary: $(this).attr('data-icon-secondary')});
	}});
	$('input[hint], textarea[hint]').hint();
	
	$('input[ui-autocomplete], textarea[ui-autocomplete]').each(function(i, elem) {
		var data = $(this).metadata({'type': "ui-autocomplete", 'name' : 'ui-autocomplete'});
		$(this).autocomplete(data);					   
	});
	$('input[ui-datepicker]').each(function(i, elem) {
		var data = $(this).metadata({'type': "ui-datepicker", 'name' : 'ui-datepicker'});
		$(this).datepicker(data);					   
	});
	$('a[ui-button], button[ui-button], label[ui-button]').each(function(i, elem) {
		var data = $(this).metadata({'type': "ui-button", 'name' : 'ui-button'});
		$(this).button(data);				   
	});
	$('*[ui-buttonset]').each(function(i, elem) {
		var data = $(this).metadata({'type': "ui-buttonset", 'name' : 'ui-buttonset'});
		$(this).buttonset(data);				   
	});
});
var ext_validate = {
	meta: "validate",
	ignoreTitle: true, 
	submitHandler: function(form) {
		var jForm = $(form);
		var vForm = this;
		var container = jForm.parent('.readyMsg').parent();
		var errorMsg = container.children(".errorMsg");
		var sentMsg = container.children(".sentMsg");
		var readyMsg = container.children(".readyMsg");
		var defSentMsg = sentMsg.children("font").html();
		var defErrorMsg = errorMsg.children("font").html();
		var responseForm = function(data, textStatus, errorThrown){
			$(":submit").blur();
			if(textStatus == "success"){
				if(data != null){
					var success = (typeof data['success'] == "undefined")? false : data['success'];
					var time = (typeof data['time'] == "undefined")? 3000 : data['time'];
					var errorText = (typeof data['errorText'] == "undefined")? defErrorMsg : data['errorText'];
					var sentText = (typeof data['sentText'] == "undefined")? defSentMsg : data['sentText'];
					var redirecting = (typeof data['redirect'] == "undefined")? false : data['redirect'];
					var ShowMessage = (typeof data['msg'] == "undefined")? true : data['msg'];
					var reloadData = (typeof data['reloadData'] == "undefined")? false : data['reloadData'];
					var reloadBasket = (typeof data['reloadBasket'] == "undefined")? false : data['reloadBasket'];
					sentMsg.children("font").html(sentText);
					errorMsg.children("font").html(errorText);
					
					if(success){
						if(reloadData){
							container.attr("class", "readyState sentState");
							dsData.loadData();
						} else if(reloadBasket){
							container.attr("class", "readyState sentState");
							dsBasketData.loadData();
						} else {
							container.attr("class", "sentState");
							vForm.currentForm.reset();
						}
						if(isNaN(redirecting)){
							setTimeout((function(){ window.location = redirecting;}), time);
						}
						else if(parseInt(redirecting) < 0){
							setTimeout((function(){ window.history.go(redirecting);}), time);
						} else {
							setTimeout((function(){ 
								sentMsg.fadeOut(800, function () {
									container.attr("class", "readyState");
									$(this).removeAttr("style");
								});
							}), time);
						}
					} else {
						if(ShowMessage){
							container.attr("class", "readyState errorState");
						} else {
							container.attr("class", "readyState");
						}
						//vForm.currentForm.reset();
						vForm.form();
						setTimeout((function(){ 
							errorMsg.fadeOut(800, function () {
								container.removeClass('errorState');
								$(this).removeAttr("style");
							});
						}), time);
					}
				} else {
					errorMsg.children("font").html("Error: Data is NULL");
					container.attr("class", "readyState errorState");
					setTimeout((function(){ 
						errorMsg.fadeOut(800, function () {
							container.removeClass('errorState');
							$(this).removeAttr("style");
						});
					}), 5000);
				}
			} else {
				var errorReason = (typeof errorThrown !== "undefined" && debug_all)? decodeURIComponent("%3Cbr%20%2F%3E")+errorThrown : "";
				errorMsg.children("font").html(textStatus+errorReason);
				container.attr("class", "readyState errorState");
				setTimeout((function(){ 
					errorMsg.fadeOut(800, function () {
						container.removeClass('errorState');
						$(this).removeAttr("style");
					});
				}), 5000);
			}
		}
		var postData = jForm.serialize();
		var method = (typeof jForm.attr('method') == "undefined")? 'get' : jForm.attr('method');
		$.ajax({type: method, url: jForm.attr("action"), data: postData, dataType: 'json', success: responseForm, error:responseForm, cache: false, async: true});//, timeout: 1000
		container.attr("class", "loadingState");
		jHtml.animate({scrollTop: scrollPageTop}, 300);
		return false;
		//form.submit();
		
	},
	invalidHandler: function(form, validator) {
		//jHtml.animate({scrollTop: scrollPageTop}, 800);
	},
	errorPlacement: function(error, element) {
		error.appendTo( element.parents('.errorContainer').removeClass("validElm").addClass("errorElm"));
	},
	success: function(label) {
		label.parents('.errorContainer').removeClass("errorElm").addClass("validElm");
		label.remove();
	}
};
function _win(url, target){
	var target_set = (typeof target == "undefined") ? 'preview' : target;
	var w = $(window).width();//screen.width-20;
	var h = $(window).height();//screen.height-20;
	var scX = 0;//(screen.width - w) / 2;
	var scY = 0;//(screen.height - h) / 2;
	mwin = 'width='+w+',height='+h+',top='+scY+',left='+scX+'toolbar=no,location=yes,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no';
	var win = window.open(url, target_set, mwin);
	win.window.focus();
	return false;
}
(function( $ ) {
	var proto = $.ui.autocomplete.prototype,
	initSource = proto._initSource;
	
	function filter( array, term ) {
	var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
	return $.grep( array, function(value) {
	return matcher.test( $( "<div>" ).html( value.label || value.value || value ).text() );
	});
	}
	
	$.extend( proto, {
	_initSource: function() {
	if ( this.options.html && $.isArray(this.options.source) ) {
	this.source = function( request, response ) {
	response( filter( this.options.source, request.term ) );
	};
	} else {
	initSource.call( this );
	}
	},
	
	_renderItem: function( ul, item) {
	return $( "<li></li>" )
	.data( "item.autocomplete", item )
	.append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
	.appendTo( ul );
	}
	});
})( jQuery );

function currency(price, decimals, dec_point, thousands_sep, prefix, sufix, html) {
	if(html){
		dec_point = '<sup>'+dec_point;
		sufix = '</sup>'+sufix;
	}
    var n = price;
    n = !isFinite(+n) ? 0 : +n;
    decimals = !isFinite(+decimals) ? 0 : Math.abs(decimals);
 
    var s = (decimals > 0) ? n.toFixed(decimals) : Math.round(n).toFixed(decimals); //fix for IE parseFloat(0.55).toFixed(0) = 0;
 
    var abs = Math.abs(n).toFixed(decimals);
    var _, i;
    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;
 
        _[0] = s.slice(0,i + (n < 0)) +
              _[0].slice(i).replace(/(\d{3})/g, thousands_sep+'$1');
 
        s = _.join(dec_point);
    } else {
        s = s.replace('.', dec_point);
    }
 
    return prefix+s+sufix;
}