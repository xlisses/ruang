// pages/qiugou/myqiugou.js
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
const qiugou = db.collection('book')
const num=4
var page=4
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiugouObj:""
  },
  addQiugou:function(params) {
    wx.navigateTo({
      url: '/pages/qiugou/addqiugou'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qiugou.limit(num).get({
      success: res=>{
        // res.data 包含该记录的数据
        console.log(res.data)
        this.setData({
          qiugouObj:res.data
        })
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})