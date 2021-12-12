var app = getApp()
Page({
    data: {
        list: [],

    },

    messagetap: function (e) {
        wx.navigateTo({
            url: '../index/index?BookName',
        })
    },
    a: function () {

    },
    goumai: function (e) {

        wx.navigateTo({
            url: '../buy/buy?id=' + e.currentTarget.dataset.id
        })
    },
    find: function (e) {

        wx.navigateTo({
            url: '../find/find?id=' + e.currentTarget.dataset.id
        })
    },


    dtl: function (e) {

        wx.navigateTo({
            url: '../goumai_detail/goumai_detail?id=' + e.currentTarget.dataset.id
        })

    },


    onLoad: function (options) {
        var that = this;
          if(options.col!='所有学院'&&options.spe!='所有专业'){
       let db= wx.cloud.database()
         const _ =db.command
         db.collection('book')
         .where(_.and(
              [{Price:_.gt(options.price1) },
               {  price:_.lt(options.price2) },
              {Variety: 0,} ,
              {College:options.col,},
             { Speciality:options.spe,},
             {UserId: db.command.neq(app.globalData.guserid)},//不是自己卖的
             {Stock: db.command.gt(0)}, //库存大于0
              ]
            ))
        .get({
            //如果查询成功的话
            success: res => {
                this.setData({
                    list: res.data,
                })

            }
        })
    }   
    else if(options.col=='所有学院'&&options.spe!='所有专业'){
        let db= wx.cloud.database()
        const _ =db.command
        db.collection('book')
        .where(_.and(
             [{Price:_.gt(options.price1) },
              {  price:_.lt(options.price2) },
             {Variety: 0,} ,
           
            { Speciality:options.spe,},
            {UserId: db.command.neq(app.globalData.guserid)},//不是自己卖的
            {Stock: db.command.gt(0)}, //库存大于0
             ]
           ))
       .get({
           //如果查询成功的话
           success: res => {
               this.setData({
                   list: res.data,
               })

           }
       })
    }
    else if (options.col!='所有学院'&&options.spe=='所有专业'){
        let db= wx.cloud.database()
        const _ =db.command
        db.collection('book')
        .where(_.and(
             [{Price:_.gt(options.price1) },
              {  price:_.lt(options.price2) },
             {Variety: 0,} ,
             {College:options.col,},
           
            {UserId: db.command.neq(app.globalData.guserid)},//不是自己卖的
            {Stock: db.command.gt(0)}, //库存大于0
             ]
           ))
       .get({
           //如果查询成功的话
           success: res => {
               this.setData({
                   list: res.data,
               })

           }
       })
    }
    else{
        let db= wx.cloud.database()
        const _ =db.command
        db.collection('book')
        .where(_.and(
             [{Price:_.gt(options.price1) },
              {  price:_.lt(options.price2) },
             {Variety: 0,} ,
            
            {UserId: db.command.neq(app.globalData.guserid)},//不是自己卖的
            {Stock: db.command.gt(0)}, //库存大于0
             ]
           ))
       .get({
           //如果查询成功的话
           success: res => {
               this.setData({
                   list: res.data,
               })

           }
       })
    }
}
})