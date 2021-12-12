// pages/goumai_detail/goumai_detail.js
Page({
  data: {
    list: []
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
        this.setData({
          list: res.data
        })

      })
      .catch(err => {
        console.log('fail')
      })
  },
})