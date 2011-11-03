/**
 * Copyright 2011 iThinkGo, Inc. All rights reserved.
 */

package com.ithinkgo.pads.entity.datadictionary;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.ithinkgo.pads.entity.IdEntity;

/**
 * 数据字典表 
 * 
 * @author <a href= "mailto:qi.yang.cn@gmail.com"> qi.yang.cn@gmail.com </a>
 */
@Entity
@Table(name = "DATA_DICTIONARY")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
public class DataDictionary extends IdEntity {

	//所有属性

	/** 主键 */
	@Id
	@SequenceGenerator(name = "SEQ_STORE", sequenceName = "S_DATA_DICTIONARY", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_STORE")
	private Long id;
	/** 字典类型 */
	private Long type;
	/** 字典名称 */
	private String name;
	/** 字典值 */
	private String value;
	/** 字典状态 */
	private String status;
	/** 排序号 */
	private Long sequNum;
	/** 扩展字段1 */
	private String extendField1;
	/** 扩展字段2 */
	private String extendField2;
	/** 扩展字段3 */
	private String extendField3;

	public void setId(Long value) {
		this.id = value;
	}

	public Long getId() {
		return this.id;
	}

	public Long getType() {
		return this.type;
	}

	public void setType(Long value) {
		this.type = value;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String value) {
		this.name = value;
	}

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String value) {
		this.status = value;
	}

	public Long getSequNum() {
		return this.sequNum;
	}

	public void setSequNum(Long value) {
		this.sequNum = value;
	}

	public String getExtendField1() {
		return this.extendField1;
	}

	public void setExtendField1(String value) {
		this.extendField1 = value;
	}

	public String getExtendField2() {
		return this.extendField2;
	}

	public void setExtendField2(String value) {
		this.extendField2 = value;
	}

	public String getExtendField3() {
		return this.extendField3;
	}

	public void setExtendField3(String value) {
		this.extendField3 = value;
	}

}
