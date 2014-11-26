function changeMargins() {
	var total_w = $('#Media').width();
	var cells = $('#Media li'),
		aspect = new Array(cells.length),
		images_w = 0, row_h = 180, row_start = 0, spaces = 1;

	for(var i=0; i < cells.length; i++) {
		var thumb = $(cells[i]).find('.thumb')[0];
		aspect[i] = thumb.naturalWidth / thumb.naturalHeight;
		images_w += (180 * aspect[i]);
		var avail_w = total_w - ++spaces * 20;
		var wrap = images_w > avail_w;
		if (wrap || i == cells.length - 1) {
			if (wrap) {
				row_h = avail_w / images_w * 180;
			}
			// Normalize cell heights for current row
			for(var c=row_start; c <= i; c++) {
				var cell_w = row_h * aspect[c],
					caption_w = cell_w - 48;
				$(cells[c]).find('.caption').css({
					width : caption_w + 'px',
					maxWidth : caption_w + 'px',
				});
				$(cells[c]).find('.thumb').css({
					width : 'auto',
					height : row_h + 'px',
					maxWidth : cell_w + 'px',
					maxHeight : row_h + 'px',
				});
			}
			images_w = 0;
			row_start = i + 1;
			spaces = 1;
		}
	}
}

function scrollActions() {
	if ($(window).width() > 1080) {
		if ($(window).scrollTop() === 0) {
			$("#Menu").animate({height: 95}, 200);
			$("#ContentPage #Menu #HomeButton").animate({height: 93}, 200);
			$("ul#Folders").animate({top: 94}, 200);
			$("ul#Media").animate({paddingTop: 115}, 200);
		} else {
			$("#Menu").animate({height: 53}, 200);
			$("#ContentPage #Menu #HomeButton").animate({height: 51}, 200);
			$("ul#Folders").animate({top: 52}, 200);
			$("ul#Media").animate({paddingTop: 73}, 200);
		}
	} else {
		$("#Menu").animate({height: 53}, 200);
		$("#ContentPage #Menu #HomeButton").animate({height: 51}, 200);
		$("ul#Media").animate({paddingTop: 20}, 200);
	}
}

$(document).ready(function() {
	if ($('#Media').length) {
		$(window).bind('load resize', changeMargins);
	}
	if ($('#Folders').length) {
		$('#Folders li').bind('contextmenu', function(){
			return false;
		});
	}
	if ($('#Menu').length) {
		$(window).bind('load resize scroll', scrollActions);
	}
});

function searchFun(url) {
	var str = prompt("Enter search string:");
	if (str !== null) {
		window.location.assign(url+'?str='+str)
	}
	return false;
}

 function umsAjax(u, reload) {
    $.ajax({url: u}).done(function() {
        if(reload) {
            window.location.reload();
        }
    });
 }

