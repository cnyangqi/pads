package com.ithinkgo.pads.common;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import com.opensymphony.xwork2.ActionSupport;

/**
 * AjaxResponse
 * 
 * @author yangq(qi.yang.cn@gmail.com)
 */
public class AjaxResponse extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private static ObjectMapper mapper = new ObjectMapper();

	/** Response json format data must be use " not ' */
	public static void ajaxResp(String json) throws IOException {
		json = null == json ? " " : json;
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/xml;charset=UTF-8");
		PrintWriter pw = response.getWriter();
		pw.write(json);
		pw.close();
	}

	/** Response java object data */
	public static void ajaxResp(Object object) throws JsonGenerationException, JsonMappingException, IOException {
		object = null == object ? "" : object;
		mapper.setSerializationInclusion(Inclusion.NON_NULL);// 只输出非空属性
		ajaxResp(mapper.writeValueAsString(object));
	}

	/** Response action result is success or false */
	public static void ajaxResp(boolean flag) throws IOException {
		if (flag) {
			ajaxResp("{\"success\":\"ture\"}");
		} else {
			ajaxResp("{\"success\":\"false\"}");
		}
	}
}
