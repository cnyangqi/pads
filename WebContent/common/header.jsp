<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="org.springside.modules.security.springsecurity.SpringSecurityUtils"%>
<%@ include file="/common/taglibs.jsp"%>
<link type="text/css" rel="stylesheet" href="${ctx}/css/header.css">
<div id="top">
	<div class="topbg">
		<div class="user">
			当前用户：<label id="username"><%=SpringSecurityUtils.getCurrentUserName()%></label>
		</div>
		<div class="userOption">
			<font color="red">1<a>2</a></font> <a href="#">[修改个人资料]</a> <a href="#">[修改密码]</a> <a id="logout"
				href="${ctx}/j_spring_security_logout">[退出系统]</a>
		</div>
	</div>
</div>