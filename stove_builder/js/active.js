$(function () {
	var menusItems = $(".header-bottom__nav-link, .header-top__nav-item-link").each(function () {
		if (this.href == location.href) {
		  $(this).addClass("active");
		}
	});
	menusItems.click(function(){
    menusItems.removeClass("active");
    $(this).addClass("active");
});
});
