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
        const db = wx.cloud.database({
            env: "shucheng-0gpblg8515636a51"
        });
        const cont = db.collection('book')
            .where({
                Variety: 0,//购买售卖类型
                UserId: db.command.neq(app.globalData.guserid),//不是自己卖的
                Stock: db.command.gt(0), //库存大于0
                State: 1 ,//未被下架
                BookName: {
                    $regex: '.*' + app.globalData.search + '.*',
                    $options: 'i'
                }
            })

        cont.get({
            //如果查询成功的话
            success: res => {
                this.setData({
                    list: res.data,
                })

            }
        })
    }
})