/** 初始化组件 */
function init() {
	$('#w').window({
		'onClose' : closeWindow
	});

	$('#f').form({
		onSubmit : function() {
			return $(this).form('validate');
		},
		success : function(data) {
			$('#f').form('clear');
			location.href = ".";
		}
	});

	$("#f").keyup(function(event) {
		if (event.keyCode == 13) {
			$('#f').submit();
		}
	});
}

$(function() {
	init();
});
