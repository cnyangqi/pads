var query TreeViewUrl = '/datadictionary/datadictionary.action';// 查询 树视图地址
var save Url = '/datadictionary/datadictionary!save.action';// 保存 地址
var delete Url = '/datadictionary/datadictionary!delete.action';// 删除地址
var query ByIdUrl = '/datadictionary/datadictionary!input.action';// 通过 主键查询 地址

var selected_node;// 操作节点
var parent_node;// 父亲节点
var grandfather_node;// 祖父节点

/** 记录节点信息 */
function recordNode($tree) {
	selected_node = $tree.tree('getSelected');
	if (selected_node) {
		parent_node = $tree.tree('getParent', selected_node.target);
	}
	if (parent_node) {
		grandfather_node = $tree.tree('getParent', parent_node.target);
	}
}

$(function(){
	
	// 树
	$('#tree_').tree({
		url : ctx + query TreeViewUrl,
		onClick : function(node) {// 配置树节点单击开关函数，同时记录当前操作节点以及其父亲节点、祖父节点
			$(this).tree('toggle', node.target);
			recordNode($(this));
		},
		onLoadSuccess : function() {// 当树reload完毕，恢复操作节点的选择状态，并更新操作节点等状态
			if (selected_node) {
				var node = $(this).tree('find', selected_node.id);
				$(this).tree('select', node.target);
				$(this).tree('expand', node.target);
			}
			recordNode($(this));
		}
	});

	// 表单异步提交
	$('#form_').form({
		url : ctx + save Url,
		onSubmit : function() {
			return $(this).form('validate');
		},
		success : function(data) {
			close_win_ddt();

			if (selected_node) {
				if (parent_node) {// 如果父亲节点存在，则新增节点类型为普通子节点
					$('#tree_').tree('reload', parent_node.target);
					return;
				}
			}
			$('#tree_').tree('reload');// 刷新树根节点
		}
	});
	
});