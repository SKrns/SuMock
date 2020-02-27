$(function(){
	$(".dropdown-grade a").click(function(){
		$(".btn-grade:first-child").text($(this).text());
		$(".btn-grade:first-child").val($(this).text());
		$(".get-grade").val($(this).text());
	});
	$(".dropdown-year a").click(function(){
		$(".btn-year:first-child").text($(this).text());
		$(".btn-year:first-child").val($(this).text());
		$(".get-year").val($(this).text());
	});
	$(".dropdown-month a").click(function(){
   		$(".btn-month:first-child").text($(this).text());
   		$(".btn-month:first-child").val($(this).text());
   		$(".get-month").val($(this).text());
   	});
	$(".dropdown-subject a").click(function(){
		$(".btn-subject:first-child").text($(this).text());
		$(".btn-subject:first-child").val($(this).text());
		$(".get-subject").val($(this).text());
	});

});