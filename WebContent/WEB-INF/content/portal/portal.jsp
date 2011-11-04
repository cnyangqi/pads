<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.springside.modules.security.springsecurity.SpringSecurityUtils"%>
<%@ include file="/common/taglibs.jsp"%>
<html>
<head>
<title>想购网采购配送系统</title>
<%@ include file="/common/meta.jsp"%>
<%@ include file="/common/header.jsp"%>
<link rel="stylesheet" type="text/css" href="${ctx}/css/portal.css">
<script type="text/javascript" src="${ctx}/js/portal/portal.js"></script>
</head>
<body class="easyui-layout" style="visibility: hidden;">
	<div id="top" region="north" border="false">
		<div class="topbg">
			<div class="user">
				当前用户：<label id="username"><%=SpringSecurityUtils.getCurrentUserName()%></label>
			</div>
			<div class="userOption">
				<font color="red">1<a>2</a></font>
				<a href="#">[修改个人资料]</a>
				<a href="#">[修改密码]</a>
				<a id="logout" href="${ctx}/j_spring_security_logout">[退出系统]</a>
			</div>
		</div>
	</div>
	<div region="center">
		<div class="easyui-layout" fit="true">
			<div region="north" border="1" style="overflow:hidden; ">
				<div style="background:#C9EDCC;padding:5px;width:100%;">
				<a href="javascript:void(0)" id="mb1" class="easyui-menubutton" menu="#mm1" iconCls="icon-connect">渠道中心</a>
				<a href="javascript:void(0)" id="mb2" class="easyui-menubutton" menu="#mm2" iconCls="icon-user">客户中心</a>
				<a href="javascript:void(0)" id="mb3" class="easyui-menubutton" menu="#mm3" iconCls="icon-edit">行政中心</a>
				<a href="javascript:void(0)" id="mb4" class="easyui-menubutton" menu="#mm4" iconCls="icon-coins">结算中心</a>
				<a href="javascript:void(0)" id="mb5" class="easyui-menubutton" menu="#mm5" iconCls="icon-chart_bar">管理中心</a>
				<a href="javascript:void(0)" id="mb6" class="easyui-menubutton" menu="#mm6" iconCls="icon-anchor">快捷通道</a>
				<a href="javascript:void(0)" id="mb7" class="easyui-menubutton" menu="#mm7" iconCls="icon-cog_edit">系统配置</a>
				</div>
		
				<div id="mm1" style="width:150px;">
					<%-- 商品管理 --%>
					<div iconCls="icon-box">
					<span>商品管理</span>
					<div style="width: 150px;">
						<div iconCls="icon-search">商品查询</div>
						<div>商品修改</div>
						<div class="menu-sep"></div>
						<div>商品新增</div>
						<div>商品删除</div>
					</div>
					</div>
					
					<%-- 价格管理 --%>
					<div iconCls="">
					<span>价格管理</span>
					<div style="width: 150px;">
						<div>供应商报价</div>
					</div>
					</div>
					
					<div>供应商管理</div>
					
					<%-- 物流管理 --%>
					<div iconCls="">
					<span>物流管理</span>
					<div style="width: 150px;">
						<div iconCls="">
							<span>业务单据</span>
							<div style="width: 150px;">
								<div>提货单</div>
								<div>配送单</div>
							</div>
						</div>
						
						<div iconCls="">
							<span>仓库资源</span>
							<div style="width: 150px;">
								<div>商品入库</div>
								<div>商品出库</div>
								<div>商品盘点</div>
								<div>保鲜期预警</div>
								<div>库存预警</div>
							</div>
						</div>
						
						<div iconCls="">
							<span>车辆管理</span>
							<div style="width: 150px;">
							
								<div iconCls="">
								<span>车辆档案</span>
								<div style="width: 150px;">
									<div>保险记录</div>
									<div>年检记录</div>
									<div>维修记录</div>
								</div>
								</div>
							
							</div>
						</div>
					</div>
					</div>
				</div>
				
				<div id="mm3" style="width:150px;">
					<div iconCls="icon-user">人员管理</div>
				</div>
				
				<div id="mm7" style="width:150px;">
					<div iconCls="icon-dd" onclick="ddOnClick()">数据字典</div>
					<div iconCls="" onclick="">快捷通道</div>
				</div>
		
			</div>
			
			<%-- view iframe --%>
			<div region="center" border="false" style="overflow:hidden;">
			<iframe id="ifr" src="" width="100%" height="100%" frameborder="0" style="border: 0;"></iframe>
			</div>
		</div>
	</div>
</body>
</html>

<%--
	1、菜单循环用itr Struts2 系统模块管理
--%>