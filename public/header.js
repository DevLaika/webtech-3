$(function(){
  	$("#header").load("header.html"); 
  	// $("#footer").load("footer.html"); 
});

$(document).on("click", "#expander", function(){
	if ($("nav ul").children().eq(1).css("display") === "inline-block")
	{
		$("nav ul").children().slice(1).each(function(){
			$(this).css("display", "none");
		});
	} else {
		$("nav ul").children().slice(1).each(function(){
			$(this).css("display", "inline-block");
		});
	}
}); 