$(function() {
	$('#mb1,#mb2,#mb3,#mb4,#mb5,#mb6,#mb7').menubutton({
		plain : false
	});
});

function ddOnClick() {
	$('#ifr').attr('src', ctx + '/datadictionary/index.action');
}