// pages/buy/buy.js
var app = getApp();
Page({
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var id = options.id
    wx.cloud.database().collection('order')
      .doc(id)
      .get()
      .then(res => {

        this.setData({
          list: res.data,
        })
      })
  }
})