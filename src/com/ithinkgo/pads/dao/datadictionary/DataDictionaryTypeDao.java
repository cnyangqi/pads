/**
 * Copyright 2011 iThinkGo, Inc. All rights reserved.
 */
package com.ithinkgo.pads.dao.datadictionary;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springside.modules.orm.hibernate.HibernateDao;

import com.ithinkgo.pads.entity.datadictionary.DataDictionaryType;

/**
 * 数据字典类型表 Dao
 * 
 * @author <a href= "mailto:qi.yang.cn@gmail.com"> qi.yang.cn@gmail.com </a>
 */
@Repository
public class DataDictionaryTypeDao extends HibernateDao<DataDictionaryType, Long> {

	/** 查询数据字典类型树根节点 */
	@SuppressWarnings("unchecked")
	public List<DataDictionaryType> queryDataDictionaryTypeTreeRootNode() {
		Criteria criteria = getSession().createCriteria(DataDictionaryType.class);
		criteria.add(Restrictions.isNull("parentId"));
		return criteria.list();
	}
}
