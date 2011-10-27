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
create user yangq identified by yangq 
default tablespace PAD_GAHQTABLESPACE
temporary tablespace PAD_GAHQTABLESPACE_TEMP;
--给用户授予权限
grant connect,resource,dba to yangq;

-- Create sequence 
create sequence HIBERNATE_SEQUENCE
minvalue 1
maxvalue 999999999999999999999999999
start with 1
increment by 1
cache 20;

-- 数据字典类型表
create table data_dictionary_type  (
   id                   number(19)                      not null,
   name                 varchar(32),
   sequ_num             number(19),
   constraint PK_DATA_DICTIONARY_TYPE primary key (id)
);

comment on table data_dictionary_type is
'数据字典类型表';

comment on column data_dictionary_type.id is
'主键';

comment on column data_dictionary_type.name is
'类型名称';

comment on column data_dictionary_type.sequ_num is
'排序号';

-- 数据字典表
create table data_dictionary  (
   id                   number(19)                      not null,
   type                 number(19),
   name                 varchar2(32),
   value                varchar2(32),
   status               varchar2(32),
   sequ_num             number(19),
   constraint PK_DATA_DICTIONARY primary key (id)
);

comment on table data_dictionary is
'数据字典表';

comment on column data_dictionary.id is
'主键';

comment on column data_dictionary.type is
'字典类型';

comment on column data_dictionary.name is
'字典名称';

comment on column data_dictionary.value is
'字典值';

comment on column data_dictionary.status is
'字典状态';

comment on column data_dictionary.sequ_num is
'排序号';