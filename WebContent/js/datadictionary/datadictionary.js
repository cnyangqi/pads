var queryDataDictionaryTypeTreeViewUrl = '/datadictionary/datadictionarytype.action';// 查询数据字典类型视图地址
var saveDataDictionaryTypeUrl = '/datadictionary/datadictionarytype!save.action';// 保存数据字典类型地址
var deleteDataDictionaryTpyeUrl = '/datadictionary/datadictionarytype!delete.action';// 删除数据字典类型地址
var queryDataDictionaryTypeByIdUrl = '';// 通过数据字典类型主键查询数据字典类型地址

var selected_node;// 操作节点
var parent_node;// 操作节点的父节点
var grandfather_node;// 操作节点的祖父节点

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
}

/** 关闭数据字典类型管理窗口 */
function close_win_ddt() {
	reset_win_ddt();
	$('#win_ddt').window('close');
}

/** 通过树节点id查询树节点 */
function query_node_byId(id) {
	return $('#tree_ddt').tree('find', id);
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

					// parent_node.attributes.subTypeNum
					// selected_node = parent_node;// 操作节点切换到父节点

					if (parent_node) {
						if (grandfather_node) {
							$('#tree_ddt').tree('reload',
									grandfather_node.target);
						} else {
							$('#tree_ddt').tree('reload');
						}
					} else {
						$('#tree_ddt').tree('reload');
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

		} else {
			run_del(true);
		}

	} else {
		showMsg('请选择您要删除的数据字典类型');
	}
}

/** 修改数据字典类型 */
function edit_ddt() {
	if ($('#tree_ddt').tree('getSelected')) {
		var checked_array = $('#tree_ddt').tree('getChecked');
		var target = $('#tree_ddt').tree('getSelected');
		for ( var i = 0; i < checked_array.length; i++) {
			if (checked_array[i].id != target.id) {
				$('#tree_ddt').tree('uncheck', checked_array[i].target);
			}
		}

		// think about selected and checked

		$('#form_ddt').json2form({
			url : ctx + queryDataDictionaryTypeById,
			data : {
				'id' : $('#tree_ddt').tree('getSelected').id
			}
		});
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

	// 取消预订父节点的时候将父节点相关值置空
	$('#flag').bind({
		'click' : function() {
			if (!$(this).get(0).checked) {
				$('#parentId').val('');
				$('#text').val('');
			}
		}
	});

	// 数据字典类型树
	$('#tree_ddt').tree(
			{
				url : ctx + queryDataDictionaryTypeTreeViewUrl,
				onClick : function(node) {// 当单击树节点的时候，配置开关方法，同时预订父节点，记录祖父节点
					$(this).tree('toggle', node.target);
					selected_node = $(this).tree('getSelected');
					parent_node = $(this).tree('getParent',
							selected_node.target);
					if (parent_node) {
						grandfather_node = $(this).tree('getParent',
								parent_node.target);
					}
				},
				onLoadSuccess : function() {
					if (selected_node) {// 刷新操作节点状态，并恢复选择状态
						var node = query_node_byId(selected_node.id);
						$(this).tree('select', node.target);
						$(this).tree('expand', node.target);
					}
				}
			});

	$('#form_ddt').form({
		url : ctx + saveDataDictionaryTypeUrl,
		onSubmit : function() {
			return $(this).form('validate');
		},
		success : function(data) {
			close_win_ddt();

			if (selected_node) {
				if (parent_node) {// 如果操作节点存在父节点，新增节点类型为普通子节点
					$('#tree_ddt').tree('reload', parent_node.target);// 通过刷新祖父节点状态同时刷新预订节点状态
				} else {// 新增节点类型为根节点的子节点
					$('#tree_ddt').tree('reload');// 刷新树根节点
				}
			} else {// 新增节点类型为根节点
				$('#tree_ddt').tree('reload');// 刷新树根节点
			}

		}
	});

	$('#tt')
			.datagrid(
					{
						nowrap : false,
						striped : true,
						border : false,
						url : '',
						// queryParams : {},
						sortName : '',
						sortOrder : 'ASC',// DESC 降序，ASC升序
						columns : [ [
								{
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
								},
								{
									field : 'name',
									title : '数据字典名称',
									width : 100
								},
								{
									field : 'value',
									title : '数据字典值',
									width : 100
								},
								{
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
								},
								{
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
								} ] ],
						toolbar : [
								{
									id : 'btnadd',
									text : '新增',
									iconCls : 'icon-dd_add',
									handler : function() {

									}
								},
								{
									id : 'btncut',
									text : '批量删除',
									iconCls : 'icon-dd_delete',
									handler : function() {
										var selects = $('#tt').datagrid(
												'getSelections');
										var tmp = [];
										for ( var i = 0; i < selects.length; i++) {
											tmp.push(selects[i].id);
										}
										if (tmp.length > 0) {
											delUser(tmp.join(','));
										}
									}
								} ],
						pagination : true,
						rownumbers : true
					});

});

/**
 * 节点reload，attributes属性不会更新。
 */
