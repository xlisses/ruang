// pages/goumai_detail/goumai_detail.js
var uid
Page({
  data: {
    list: []

  },
  rpt: function (e) {
    wx.navigateTo({
      url: '../report/report?id=' + e.currentTarget.dataset.id,
    })
  },
  offer: function (e) {
    wx.navigateTo({
      url: '../buy/buy?id=' + e.currentTarget.dataset.id
    })


  },
  onLoad: function (options) {

    var id = options.id
    wx.cloud.database().collection('book')
      .doc(id)

      .get()
      .then(res => {
        uid = res.data.UserId
        this.setData({
          list: res.data
        })

      })
      .catch(err => {
        console.log('fail')
      })
  },
  tosellerinfo: function (params) {
    wx.navigateTo({
      url: '/pages/sellerinfo/sellerinfo?id=' + uid
    })
  }
})