var queryDataDictionaryTypeTreeViewUrl = '/datadictionary/datadictionarytype.action';// 查询数据字典类型视图地址
var saveDataDictionaryTypeUrl = '/datadictionary/datadictionarytype!save.action';// 保存数据字典类型地址
var deleteDataDictionaryTpye = '/datadictionary/datadictionarytype!delete.action';// 删除数据字典类型地址
var queryDataDictionaryTypeById = '';// 通过数据字典类型主键查询数据字典类型地址

var selected_node;// 选择的树节点
var parent_node;// 选择的树节点的父节点

/** 弹出新增数据字典类型窗口 */
function add_ddt() {
	selected_node = $('#ddt_tree').tree('getSelected');
	if (selected_node) {
		$('#text').val(selected_node.text);
		$('#parentId').val(selected_node.id);
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
	$('#sequNum').val(0);
}

/** 关闭数据字典类型管理窗口 */
function cancel_win_ddt() {
	reset_win_ddt();
	$('#win_ddt').window('close');
}

/** 保存数据字典类型到数据库 */
function save_ddt() {
	function test() {
		console.info($('#ddt_tree').tree('find', selected_node.id));
	}

	$.ajax({
				async : true,// required
				type : 'post',
				dataType : 'json',
				timeout : 3000,
				url : ctx + saveDataDictionaryTypeUrl,
				data : $('#form_ddt').serializeObject(),
				success : function(data) {
					reset_win_ddt();
					$('#win_ddt').window('close');

					if (selected_node) {

						if (parent_node) {
							$('#ddt_tree').tree('reload', parent_node.target);
						} else {
							$('#ddt_tree').tree('reload');
						}

					} else {
						$('#ddt_tree').tree('reload');
					}

					test();

				}
			});
	
	$('#ddt_tree').({'onLoadSuccess':function(node, data){alert(1);}});
	
}

/** 删除数据字典类型 */
function delete_ddt() {
	// if ($('#ddt_tree').tree('getChecked').length > 0) {
	// $.messager.confirm('删除确认', '您确认要删除所选择的数据字典类型吗？', function(r) {
	// if (r) {
	// var tmp = [];
	// var selects = $('#ddt_tree').tree('getChecked');
	// for (var i = 0; i < selects.length; i++) {
	// tmp.push(selects[i].id);
	// }
	//
	// $.ajax({
	// async : true,// required
	// type : 'post',
	// dataType : 'json',
	// timeout : 3000,
	// url : ctx + delDataDictionaryTpye,
	// data : {
	// 'ids' : tmp.join(',')
	// },
	// success : function(data) {
	// $('#ddt_tree').tree('reload');
	// }
	// });
	// }
	// });
	// } else {
	// showMsg('请选择您要删除的数据字典类型。');
	// }

	function run_del(b) {
		if (b) {
			$.ajax({
						async : true,// required
						type : 'post',
						dataType : 'json',
						timeout : 3000,
						url : ctx + deleteDataDictionaryTpye,
						data : {
							'id' : selected_node.id
						},
						success : function(data) {
							$('#ddt_tree').tree('reload');
						}
					});
		} else {
			return;
		}
	}

	selected_node = $('#ddt_tree').tree('getSelected');
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
	if ($('#ddt_tree').tree('getSelected')) {
		var checked_array = $('#ddt_tree').tree('getChecked');
		var target = $('#ddt_tree').tree('getSelected');
		for (var i = 0; i < checked_array.length; i++) {
			if (checked_array[i].id != target.id) {
				$('#ddt_tree').tree('uncheck', checked_array[i].target);
			}
		}

		// think about selected and checked

		$('#form_ddt').json2form({
					url : ctx + queryDataDictionaryTypeById,
					data : {
						'id' : $('#ddt_tree').tree('getSelected').id
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

	// 数据字典类型树
	$('#ddt_tree').tree({
				url : ctx + queryDataDictionaryTypeTreeViewUrl,
				onClick : function(node) {
					$(this).tree('toggle', node.target);
					selected_node = $(this).tree('getSelected');
					parent_node = $(this).tree('getParent',
							selected_node.target);

					alert(selected_node.id);

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
						// var lastIndex = value.lastIndexOf(',') + 1;
						// var ss = value.substring(lastIndex);
						// if(ss.length>5){
						// ss=ss.substring(0, 5)+"...";
						// }
						// return "<a title='" + s + "'>" + ss + "</a>";
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