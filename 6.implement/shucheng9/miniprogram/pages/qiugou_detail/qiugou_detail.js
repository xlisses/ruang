// pages/qiugou_detail/qiugou_detail.js
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
const qiugou = db.collection('book')
var yid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:""
  },
  togoumai:function (params) {
    wx.navigateTo({
      url: '/pages/buy/buy?id='+yid
    })
  },
  toreport:function(params){
    wx.navigateTo({
      url: '/pages/report/report?id='+yid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    yid=options.id
    qiugou.doc(id).get({
      success: res=>{
        // res.data 包含该记录的数据
        console.log(res.data)
        
        this.setData({
          obj:res.data
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