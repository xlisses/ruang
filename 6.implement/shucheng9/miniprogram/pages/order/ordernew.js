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
      .where({
        State: 1
      })

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