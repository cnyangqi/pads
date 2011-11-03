/**
 * Copyright 2011 iThinkGo, Inc. All rights reserved.
 */

package com.ithinkgo.pads.web.datadictionary;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.ithinkgo.pads.common.AjaxResponse;
import com.ithinkgo.pads.entity.datadictionary.DataDictionaryType;
import com.ithinkgo.pads.service.datadictionary.DataDictionaryTypeManager;
import com.ithinkgo.pads.web.CrudActionSupport;

/**
 * 数据字典类型 Action
 * 
 * @author <a href= "mailto:qi.yang.cn@gmail.com"> qi.yang.cn@gmail.com </a>
 * @version 1.0
 * @since 1.0
 */

@Namespace("/datadictionary")
@Results({ @Result(name = "reload", location = "datadictionarytype.action", type = "redirect") })
public class DatadictionarytypeAction extends CrudActionSupport<DataDictionaryType> {

	private static final long serialVersionUID = 1L;
	private DataDictionaryTypeManager dataDictionaryTypeManager;

	// - 页面属性 -//
	private Long id;
	private String ids;
	private DataDictionaryType dataDictionaryType;

	// - ModelDriven 与 Preparable函数 -//
	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public DataDictionaryType getModel() {
		return dataDictionaryType;
	}

	@Override
	protected void prepareModel() throws Exception {
		if (id != null) {
			dataDictionaryType = dataDictionaryTypeManager.queryDataDictionaryTypeById(id);
		} else {
			dataDictionaryType = new DataDictionaryType();
		}
	}

	// - CRUD Action 函数 -//
	@Override
	public String list() throws Exception {
		// 将父节点的主键作为子节点的查询条件（Long parentId）
		AjaxResponse.ajaxResp(dataDictionaryTypeManager.queryDataDictionaryTypeTreeView(id));
		return null;
	}

	@Override
	public String delete() throws Exception {
		dataDictionaryTypeManager.deleteDataDictionaryType(id);
		AjaxResponse.ajaxResp(true);
		return null;
	}

	public String batchDelete() throws Exception {
		dataDictionaryTypeManager.batchDeleteDataDictionaryType(ids);
		AjaxResponse.ajaxResp(true);
		return null;
	}

	@Override
	public String save() throws Exception {
		dataDictionaryTypeManager.saveDataDictionaryType(dataDictionaryType);
		AjaxResponse.ajaxResp(true);
		return null;
	}

	@Override
	public String input() throws Exception {
		AjaxResponse.ajaxResp(dataDictionaryTypeManager.queryDataDictionaryTypeById(id));
		return null;
	}

	@Autowired
	public void setDataDictionaryTypeManager(DataDictionaryTypeManager dataDictionaryTypeManager) {
		this.dataDictionaryTypeManager = dataDictionaryTypeManager;
	}

	public Long getId() {
		return id;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

}
