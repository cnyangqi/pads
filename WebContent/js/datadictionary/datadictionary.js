var saveDataDictionaryTypeUrl = '';// 保存数据字典类型地址
var queryAllDataDictionaryTypeUrl = '/datadictionary/datadictionarytype.action';// 查询所有数据字典类型地址
var delDataDictionaryTpye = '';// 删除数据字典类型地址
var queryDataDictionaryTypeById = '';// 通过数据字典类型主键查询数据字典类型地址

/** 弹出新增数据字典类型窗口 */
function addSDatadict() {
	$('#win_datadictionarytype').window({
				iconCls : 'icon-dd_add',
				maximizable : false
			}).window('setTitle', '新增数据字典类型').window('open');
}

/** 重置数据字典类型管理窗口 */
function reset_win_datadict() {
	$('#form_datadictionarytype').form('clear');
	$('#id').val(0);
	$('#sequencenum').val(0);
}

/** 关闭数据字典类型管理窗口 */
function cancel_win_datadict() {
	reset_win_datadict();
	$('#win_datadictionarytype').window('close');
}

/** 保存数据字典类型到数据库 */
function saveDatadicTionaryType() {
	$.ajax({
				async : true,// required
				type : 'post',
				dataType : 'json',
				timeout : 3000,
				url : ctx + saveDataDictionaryTypeUrl,
				data : $('#form_datadictionarytype').serializeObject(),
				success : function(data) {
					reset_win_datadict();
					$('#win_datadictionarytype').window('close');
					$('#sjzdlx').tree('reload');
				}
			});
}

/** 删除数据字典类型 */
function delSDatadict() {
	if ($('#sjzdlx').tree('getChecked').length > 0) {
		$.messager.confirm('删除确认', '您确认要删除所选择的数据字典类型吗？', function(r) {
					if (r) {
						var tmp = [];
						var selects = $('#sjzdlx').tree('getChecked');
						for (var i = 0; i < selects.length; i++) {
							tmp.push(selects[i].id);
						}

						$.ajax({
									async : true,// required
									type : 'post',
									dataType : 'json',
									timeout : 3000,
									url : ctx + delDataDictionaryTpye,
									data : {
										'ids' : tmp.join(',')
									},
									success : function(data) {
										$('#sjzdlx').tree('reload');
									}
								});
					}
				});
	} else {
		showMsg('请选择您要删除的数据字典类型。');
	}
}

/** 修改数据字典类型 */
function editDatadict() {
	if ($('#sjzdlx').tree('getSelected')) {
		var checked_array = $('#sjzdlx').tree('getChecked');
		var target = $('#sjzdlx').tree('getSelected');
		for (var i = 0; i < checked_array.length; i++) {
			if (checked_array[i].id != target.id) {
				$('#sjzdlx').tree('uncheck', checked_array[i].target);
			}
		}

		// think about selected and checked

		$('#form_datadictionarytype').json2form({
					url : ctx + queryDataDictionaryTypeById,
					data : {
						'id' : $('#sjzdlx').tree('getSelected').id
					}
				});
		$('#win_datadictionarytype').window({
					iconCls : 'datadictionary_edit',
					maximizable : false
				}).window('setTitle', '修改数据字典类型').window('open');
	} else {
		showMsg('请选择您要修改的数据字典类型');
	}
}

/** 程序初始化 */
$(function() {
	$('#sjzdlx').tree({// 数据字典类型树
		url : ctx + queryAllDataDictionaryTypeUrl,
		onClick : function(node) {
			console.dir(node);
			if (node.checked) {
				$(this).tree('uncheck', node.target);
			} else {
				$(this).tree('check', node.target);
			}
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