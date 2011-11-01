--创建临时表空间 需要提前创建好相关目录
create temporary tablespace PAD_GAHQTABLESPACE_TEMP
tempfile 'e:\oracle\data\pad_temp.dbf'
size 50m
autoextend on
next 50m maxsize 20480m
extent management local;

--创建数据表空间
create tablespace PAD_GAHQTABLESPACE
logging
datafile 'e:\oracle\data\pad_data.dbf'
size 50m
autoextend on
next 50m maxsize 20480m
extent management local;

--创建用户并指定表空间 
create user pads identified by pads 
default tablespace PAD_GAHQTABLESPACE
temporary tablespace PAD_GAHQTABLESPACE_TEMP;
--给用户授予权限
grant connect,resource,dba to pads;

-- ubuntu环境下配置为以下 --
-- create user
create user pads identified by pads;
grant connect,resource,SELECT_CATALOG_ROLE to pads;

-- create sequence 
create sequence HIBERNATE_SEQUENCE
minvalue 1
maxvalue 999999999999999999999999999
start with 1
increment by 1
cache 20;