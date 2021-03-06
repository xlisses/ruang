/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2021/11/21 19:01:08                          */
/*==============================================================*/


drop table if exists Book;

drop table if exists BookReport;

drop table if exists FeedBack;

drop table if exists Message;

drop table if exists Orders;

drop table if exists User;

drop table if exists UserReport;

/*==============================================================*/
/* Table: Book                                                  */
/*==============================================================*/
create table Book
(
   BookId               int not null,
   BookName             varchar(100),
   Writer               varchar(100),
   Publisher            varchar(100),
   State                varchar(100),
   Price                double,
   Variety              varchar(100),
   UserId               varchar(100),
   BookText             varchar(100),
   College              varchar(100),
   Specialty            varchar(100),
   Stock                int,
   RptTimes             int,
   BookImg              longblob,
   primary key (BookId)
);

alter table Book comment '上架的所有二手书本的信息表';

/*==============================================================*/
/* Table: BookReport                                            */
/*==============================================================*/
create table BookReport
(
   BRptId               int not null,
   BookId               int,
   BRptText             varchar(100),
   State                int,
   primary key (BRptId)
);

/*==============================================================*/
/* Table: FeedBack                                              */
/*==============================================================*/
create table FeedBack
(
   FeedBackId           int not null,
   FeedBackText         varchar(100),
   FeedBackVariety      varchar(100),
   UserId               int,
   primary key (FeedBackId)
);

/*==============================================================*/
/* Table: Message                                               */
/*==============================================================*/
create table Message
(
   Time                 timestamp,
   UserId               int,
   MessageId            double not null,
   MessageText          varchar(100),
   YourId               varchar(100),
   primary key (MessageId)
);

alter table Message comment '卖家买家交流消息记录表';

/*==============================================================*/
/* Table: Orders                                                */
/*==============================================================*/
create table Orders
(
   OrderId              int not null,
   OrderDate            date,
   OrderAdress          varchar(100),
   OrderNum             double,
   OrderMoney           double,
   BookId               int,
   OrderText            varchar(100),
   primary key (OrderId)
);

alter table Orders comment '每一次交易的订单的相关信息表';

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   UserId               int not null,
   UserName             varchar(100),
   PhoneNum             varchar(100),
   StuNum               varchar(100),
   State                varchar(100),
   Pwd                  varchar(100),
   URptTimes            int,
   UserAddress          varchar(100),
   primary key (UserId)
);

alter table User comment '每次登录，注册时需要的信息表';

/*==============================================================*/
/* Table: UserReport                                            */
/*==============================================================*/
create table UserReport
(
   StuNum               varchar(100) not null,
   URptId               int not null,
   URptText             varchar(100),
   State                varchar(100),
   primary key (URptId)
);

