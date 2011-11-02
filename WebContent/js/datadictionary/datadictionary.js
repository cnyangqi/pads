var queryDataDictionaryTypeTreeViewUrl = '/datadictionary/datadictionarytype.action';// 查询数据字典类型视图地址
var saveDataDictionaryTypeUrl = '/datadictionary/datadictionarytype!save.action';// 保存数据字典类型地址
var deleteDataDictionaryTpyeUrl = '/datadictionary/datadictionarytype!delete.action';// 删除数据字典类型地址
var queryDataDictionaryTypeByIdUrl = '';// 通过数据字典类型主键查询数据字典类型地址

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

/** 打开新增数据字典类型窗口 */
function add_win_ddt() {

	if (selected_node) {// 检查新增数据字典类型前是否有预订（选择）过父节点
		$('#text').val(selected_node.text);
		$('#parentId').val(selected_node.id);
		$('#flag').attr('checked', true);
	}

	$('#win_ddt').window({
				iconCls : 'icon-dd_add',
				maximizable : false
			}).window('setTitle', '新增数据字典类型').window('open');

}

/** 重置数据字典类型管理窗口 */
function reset_win_ddt() {
	$('#form_ddt').form('clear');
	$('#id').val('');
	$('#parentId').val('');
	$('#text').val('');
	$('#sequNum').val(0);
	$('#flag').attr('disabled', false);
}

/** 关闭数据字典类型管理窗口 */
function close_win_ddt() {
	reset_win_ddt();
	$('#win_ddt').window('close');
}

/** 保存数据字典类型到数据库 */
function save_ddt() {

	if ($('#id').val().length > 0) {// 修改数据字典类型

	} else {// 新增数据字典类型
		$('#form_ddt').submit();
	}

}

/** 删除数据字典类型 */
function delete_ddt() {

	// 删除操作 简单传id 后台进行复杂逻辑判断
	function run_del(b) {
		if (b) {
			$.ajax({
				async : true,// required
				type : 'post',
				dataType : 'json',
				timeout : 10000,
				url : ctx + deleteDataDictionaryTpyeUrl,
				data : {
					'id' : selected_node.id
				},
				success : function(data) {

					if (grandfather_node) {// 如果存在祖父节点，则父亲节点不是树的根节点
						if (parent_node.attributes.subTypeNum == 1) {// 父亲节点下属节点只有一个，即删除操作节点
							$('#tree_ddt').tree('reload',
									grandfather_node.target);

							selected_node = grandfather_node;// 刷新完成，操作节点指向祖父节点

						} else {
							parent_node.attributes.subTypeNum--;// 手动刷新树节点状态
							$('#tree_ddt').tree('update', {
								target : parent_node.target,
								'attributes["subTypeNum"]' : parent_node.attributes.subTypeNum
							});

							$('#tree_ddt').tree('reload', parent_node.target);

							selected_node = parent_node;// 刷新完成，操作节点指向父亲节点

						}
					} else {// 根节点删除
						$('#tree_ddt').tree('reload');
						selected_node = false;// 操作节点已经被删除
					}

				}
			});
		} else {
			return;
		}
	}

	// 删除判断
	if (selected_node) {

		if (selected_node.attributes.subTypeNum > 0) {// 如果要删除的树节点有子节点

			$.messager.confirm('批量删除确认', '该树节点下面还有子节点，您确认要一起删除吗？', function(b) {
						run_del(b);
					});

		} else {// 操作节点无下属节点的时候，无需提示直接删除
			run_del(true);
		}

	} else {
		showMsg('请选择您要删除的数据字典类型');
	}
}

/** 修改数据字典类型 */
function edit_ddt() {
	if ($('#tree_ddt').tree('getSelected')) {
		// var checked_array = $('#tree_ddt').tree('getChecked');
		// var target = $('#tree_ddt').tree('getSelected');
		// for (var i = 0; i < checked_array.length; i++) {
		// if (checked_array[i].id != target.id) {
		// $('#tree_ddt').tree('uncheck', checked_array[i].target);
		// }
		// }

		// think about selected and checked

		// $('#form_ddt').json2form({
		// url : ctx + queryDataDictionaryTypeById,
		// data : {
		// 'id' : $('#tree_ddt').tree('getSelected').id
		// }
		// });

		$('#form_ddt').form(
				'load',
				$('#tree_ddt').tree('getData',
						$('#tree_ddt').tree('getSelected').target));

		$('#win_ddt').window({
					iconCls : 'datadictionary_edit',
					maximizable : false
				}).window('setTitle', '修改数据字典类型').window('open');
	} else {
		showMsg('请选择您要修改的数据字典类型');
	}
}

/** 程序初始化 */
$(function() {

	// 特例，新增树根节点，释放操作节点、父亲节点以及祖父节点状态
	$('#flag').click(function() {
				if (!$(this).get(0).checked) {
					$('#parentId').val('');
					$('#text').val('');
					$(this).attr('disabled', true);

					selected_node = false;
					parent_node = false;
					grandfather_node = false;
				}
			});

	// 数据字典类型树
	$('#tree_ddt').tree({
				url : ctx + queryDataDictionaryTypeTreeViewUrl,
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

	// 数据字典类型表单异步提交
	$('#form_ddt').form({
				url : ctx + saveDataDictionaryTypeUrl,
				onSubmit : function() {
					return $(this).form('validate');
				},
				success : function(data) {
					close_win_ddt();

					if (selected_node) {
						if (parent_node) {// 如果父亲节点存在，则新增节点类型为普通子节点
							$('#tree_ddt').tree('reload', parent_node.target);
							return;
						}
					}
					$('#tree_ddt').tree('reload');// 刷新树根节点
				}
			});

	$('#tt').datagrid({
		nowrap : false,
		striped : true,
		border : false,
		url : '',
		// queryParams : {},
		sortName : '',
		sortOrder : 'ASC',// DESC 降序，ASC升序
		columns : [[{
					field : 'ck',
					title : '全选取消',
					checkbox : true,
					width : 80
				},
				// {
				// field : 'productid',
				// title : '序号',
				// width : 100,
				// align : 'right'
				// },
				{
					field : 'type',
					title : '数据字典类型',
					width : 100
				}, {
					field : 'name',
					title : '数据字典名称',
					width : 100
				}, {
					field : 'value',
					title : '数据字典值',
					width : 100
				}, {
					field : 'status',
					title : '数据字典状态',
					width : 100,
					formatter : function(value, rec) {
						// var s = value.replace(/,/g, "");
						// var lastIndex =
						// value.lastIndexOf(',') + 1;
						// var ss = value.substring(lastIndex);
						// if(ss.length>5){
						// ss=ss.substring(0, 5)+"...";
						// }
						// return "<a title='" + s + "'>" + ss +
						// "</a>";
					}
				}, {
					field : 'action',
					title : '操作',
					rowspan : 3,
					width : 190,
					formatter : function(value, rec) {
						var stop = '<a class="l-btn l-btn-plain" style="float:left;" href="javascript: stopUser(\''
								+ rec.id + '\');">';
						stop += ' <span class="l-btn-left" style="float: left;">';
						stop += ' <span class="l-btn-text user" style="padding-left: 20px;">停用</span>';
						stop += ' </span>';
						stop += ' </a>';
						var edit = '<a class="l-btn l-btn-plain" style="float:left;" href="javascript: editUser(\''
								+ rec.id + '\');">';
						edit += ' <span class="l-btn-left" style="float: left;">';
						edit += ' <span class="l-btn-text user_edit" style="padding-left: 20px;">修改</span>';
						edit += ' </span>';
						edit += ' </a>';
						var del = '<a class="l-btn l-btn-plain" style="float:left;" href="javascript: delUser(\''
								+ rec.id + '\');">';
						del += ' <span class="l-btn-left" style="float: left;">';
						del += ' <span class="l-btn-text user_del" style="padding-left: 20px;">删除</span>';
						del += ' </span>';
						del += ' </a>';
						return stop + edit + del;
					}
				}]],
		toolbar : [{
					id : 'btnadd',
					text : '新增',
					iconCls : 'icon-dd_add',
					handler : function() {

					}
				}, {
					id : 'btncut',
					text : '批量删除',
					iconCls : 'icon-dd_delete',
					handler : function() {
						var selects = $('#tt').datagrid('getSelections');
						var tmp = [];
						for (var i = 0; i < selects.length; i++) {
							tmp.push(selects[i].id);
						}
						if (tmp.length > 0) {
							delUser(tmp.join(','));
						}
					}
				}],
		pagination : true,
		rownumbers : true
	});

});

// 1.增加功能完善，支持验证，并能够自动记忆用户操作前状态（如操作节点），执行完毕（数据库同步完毕）自动恢复到之前操作节点，方便用户连续操作。
// 2.删除功能完善，根据操作结果，自动切换操作节点，方便用户连续操作。
