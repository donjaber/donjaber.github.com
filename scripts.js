var url = location.href;

$(function() {
	$( "ul li ul" ).each(function(){
		var childUL = $(this);
		var plusMinus = '-';
		if (!childUL.hasClass('show')){childUL.hide(); plusMinus = '+';}
		childUL.parent().css({'padding-right':'3em'}).before($('<button class="more">'+plusMinus+'</button>').click(function(){
			childUL.slideToggle('fast');
			if('+'===$(this).html()){$(this).html('-');}else{$(this).html('+');}
		}));
	});

	$('body').append($('<span id="sorted"></span>'));
	$('a[toggle]').each(function(){
		$(this).click(function(){
            $('.column').hide();
            var toggleId = $(this).attr('toggle');
            var toggleHref= $(this).attr('href');
            
            $('#'+toggleId).toggle(); 
            if (toggleHref && toggleHref != "#"+toggleId){
                $('#'+toggleId).load(toggleHref.replace("#","")); 
                try {
                    var hashValue = location.href.split('#')[1];
                    if ('#'+hashValue === toggleHref) {
                        return false;   
                    }
                }catch(err){}
            }
        });
		$('#sorted').append($('#'+$(this).attr('toggle')).hide());
	});
	$('#main').append($('#sorted'));
	try {
        var hashValue = location.href.split('#')[1];
        $('a[href=#'+hashValue+']').click();
    }catch(err){}
	
	var searchText = 'Search and press Enter';
	$('form#search input#query').addClass('fade').val(searchText).focus(function(){
		if(searchText === $(this).val()){$(this).removeClass('fade').val('');}
	}).blur(function(){
		if(!$(this).val())$(this).addClass('fade').val(searchText);
	});
	/*$( ".column, .box" ).css({ top: getCookie("positionY"+$(this).attr('id'))*1, left: getCookie("positionX"+$(this).attr('id'))*1 })
	.draggable({ stop: function (event, ui) {
			setCookie("positionX"+$(this).attr('id'), ui.position.left, 100);
			setCookie("positionY"+$(this).attr('id'), ui.position.top, 100);
		} 
	});*/
});

function getURLParameter(name) {
    return unescape((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}
function translationURL(languageCode) {
	url = window.parent.location.href;
	if (url.indexOf('translate') > -1) {
		url = getURLParameter('u');
		$('.translate').hide();
	}
	return 'http://translate.google.com/translate?u='+escape(url) +'&tl='+languageCode;
}
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
	  {
	    return unescape(y);
	  }
	}
}