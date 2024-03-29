/**
 * Copyright 2011 iThinkGo, Inc. All rights reserved.
 */

package com.ithinkgo.pads.web.datadictionary;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.ithinkgo.pads.common.AjaxResponse;
import com.ithinkgo.pads.entity.datadictionary.DataDictionary;
import com.ithinkgo.pads.service.datadictionary.DataDictionaryManager;
import com.ithinkgo.pads.web.CrudActionSupport;

/**
 * @author <a href= "mailto:qi.yang.cn@gmail.com"> qi.yang.cn@gmail.com </a>
 * @version 1.0
 * @since 1.0
 */

@Namespace("/datadictionary")
@Results({ @Result(name = "reload", location = "DataDictionary.action", type = "redirect") })
public class DatadictionaryAction extends CrudActionSupport<DataDictionary> {

	private static final long serialVersionUID = 1L;
	private DataDictionaryManager dataDictionaryManager;

	// - 页面属性 -//
	private Long id;
	private String ids;
	private String query;
	private int page;// jeasyui datagrid
	private int rows;// jeasyui datagrid
	private DataDictionary dataDictionary;

	// - ModelDriven 与 Preparable函数 -//
	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public DataDictionary getModel() {
		return dataDictionary;
	}

	@Override
	protected void prepareModel() throws Exception {
		if (id != null) {
			dataDictionary = dataDictionaryManager.queryDataDictionaryById(id);
		} else {
			dataDictionary = new DataDictionary();
		}
	}

	// - CRUD Action 函数 -//
	@Override
	public String list() throws Exception {
		// 将主表对象主键作为字表对象的分页查询条件（Long typeId）
		AjaxResponse.ajaxResp(dataDictionaryManager.queryDataDictionaryGridView(id, query, page, rows));
		return null;
	}

	@Override
	public String delete() throws Exception {
		dataDictionaryManager.deleteDataDictionary(id);
		AjaxResponse.ajaxResp(true);
		return null;
	}

	public String batchDelete() throws Exception {
		dataDictionaryManager.batchDeleteDataDictionary(ids);
		AjaxResponse.ajaxResp(true);
		return null;
	}

	@Override
	public String save() throws Exception {
		dataDictionaryManager.saveDataDictionary(dataDictionary);
		AjaxResponse.ajaxResp(true);
		return null;
	}

	@Override
	public String input() throws Exception {
		AjaxResponse.ajaxResp(dataDictionaryManager.queryDataDictionaryById(id));
		return null;
	}

	/** 切换数据字典状态 */
	public String toggleDataDictionaryStatus() throws Exception {
		dataDictionaryManager.toggleDatadictionaryStatus(id);
		AjaxResponse.ajaxResp(true);
		return null;
	}

	@Autowired
	public void setDataDictionaryManager(DataDictionaryManager dataDictionaryManager) {
		this.dataDictionaryManager = dataDictionaryManager;
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

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

}
