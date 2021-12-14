// pages/qiugou/myqiugou.js
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
const qiugou = db.collection('book')
const num = 6
var page = 6

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiugouObj: ""
  },
  addqiugou: function (params) {
    wx.navigateTo({
      url: '/pages/qiugou/addqiugou'
    })
  },
  xiugai: function (e) {

    wx.navigateTo({
      url: '/pages/qiugou/xiugaiinfo?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.guserid)
    var id = app.globalData.guserid
    qiugou.where({
      UserId: id,
      Variety: 1,
    }).get({
      success: res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        this.setData({
          qiugouObj: res.data
        })
      }

    })
  },
  onShow: function () {
    this.onPullDownRefresh()
  },
  onPullDownRefresh: function () {
    console.log(123)
    qiugou.where({
      UserId: app.globalData.guserid

    }).get({
      success: res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        this.setData({
          qiugouObj: res.data
        })
      }

    })
  },
})