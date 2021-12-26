wx.cloud.init({
  env: 'shucheng-0gpblg8515636a51', //数据库ID
  traceUser: true
})
const db = wx.cloud.database({
  env: "shucheng-0gpblg8515636a51"
})
const user = db.collection("user")
var app = getApp();
Page({
  data: {
    list: [],

  },
  nofin: function (e) {
    wx.redirectTo({
      url: '../order/order',
    })
  },

  shouhuo: function (e) {

    wx.navigateTo({
      url: '../buy/buy?id=' + e.currentTarget.dataset.id
    })
  },
  dtl: function (e) {

    wx.navigateTo({
      url: '../order_detail/order_detail?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.cloud.database().collection('order')
    .where(db.command.or([{
      State: 1,
      UserId: db.command.eq(app.globalData.guserid)
    },
    {
      State: 1,
      SellerId: db.command.eq(app.globalData.guserid)
    }
  ]))

      .get({
        //如果查询成功的话
        success: res => {

          this.setData({
            list: res.data,
          })

        }
      })
  },
})