/**
 * Copyright 2011 iThinkGo, Inc. All rights reserved.
 */

package com.ithinkgo.pads.dao.datadictionary;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springside.modules.orm.Page;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.orm.hibernate.HibernateDao;

import com.ithinkgo.pads.entity.datadictionary.DataDictionary;

/**
 * 数据字典表 Dao
 * 
 * @author <a href= "mailto:qi.yang.cn@gmail.com"> qi.yang.cn@gmail.com </a>
 */
@Repository
public class DataDictionaryDao extends HibernateDao<DataDictionary, Long> {

	/** 通过父级对象主键查询下属对象列表 */
	@SuppressWarnings("unchecked")
	public List<DataDictionary> queryDataDictionaryTreeView(Long parentId) {
		Criteria criteria = getSession().createCriteria(DataDictionary.class);
		if (parentId != null) {
			criteria.add(Restrictions.eq("parentId", parentId));
		} else {
			criteria.add(Restrictions.isNull("parentId"));
		}
		criteria.addOrder(Order.asc("sequNum"));// 按排序号升序排列查询结果
		return criteria.list();
	}

	// 将主表对象主键作为字表对象的分页查询条件（Long typeId）
	public Page<DataDictionary> queryDataDictionaryGridView(Long typeId, Page<DataDictionary> page) {
		List<PropertyFilter> filters = new LinkedList<PropertyFilter>();
		if (typeId != null) {
			filters.add(new PropertyFilter("EQL_typeId", String.valueOf(typeId)));
		}
		return this.findPage(page, filters);
	}
}
