$(function(e) {
    $('.jq_lighttheme').click( function() {
		$('body').removeClass('dark-theme'); $.cookie('theme', null);
    });
	$('.jq_darktheme').click( function() {
		$('body').addClass('dark-theme');
		$.cookie('theme',"dark-theme");
	});
	$('a[href^="?"]').prop('href', function(i,attr) { 
		return attr.replace("?","#")
	});
	if ($.isFunction(window.print)) {
		$('#sidebar_list_view').append('<li class="noprint"><a href="" class="print_cmd pointer">print</a></li>');
		$('a.print_cmd').click( function() {
			window.print();
		});
	}
	
	$(window).scroll(function () {
		var inview = '#' + $("#content > section > h1:in-viewport:first").parent().attr('id');
		var link = $('nav a').filter('[href=' + inview + ']');
		if (link.length && !link.parent().is('.active')) {
			$('nav li').removeClass('active');
			link.parent().addClass('active');
		}
	});
	
//Hopefully smooth scrol code.	
function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }

});