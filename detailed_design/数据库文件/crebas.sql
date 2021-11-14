/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2021/11/14 18:13:09                          */
/*==============================================================*/


drop table if exists Book;

drop table if exists Message;

drop table if exists Orders;

drop table if exists User;

/*==============================================================*/
/* Table: Book                                                  */
/*==============================================================*/
create table Book
(
   BookId               int,
   BookName             varchar(100),
   Writer               varchar(100),
   Publisher            varchar(100),
   State                varchar(100),
   Price                double,
   Variety              varchar(100),
   UserId               varchar(100)
);

alter table Book comment '上架的所有二手书本的信息表';

/*==============================================================*/
/* Table: Message                                               */
/*==============================================================*/
create table Message
(
   Time                 timestamp,
   UserId               int,
   MessageId            double,
   MessageText          varchar(100)
);

alter table Message comment '卖家买家交流消息记录表';

/*==============================================================*/
/* Table: Orders                                                */
/*==============================================================*/
create table Orders
(
   OrderId              int,
   OrderDate            date,
   OrderAdress          varchar(100),
   OrderNum             double,
   OrderMoney           double,
   BookId               int
);

alter table Orders comment '每一次交易的订单的相关信息表';

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   UserId               int,
   UserName             varchar(100),
   PhoneNum             varchar(100),
   StuNum               varchar(100),
   State                varchar(100)
);

alter table User comment '每次登录，注册时需要的信息表';

