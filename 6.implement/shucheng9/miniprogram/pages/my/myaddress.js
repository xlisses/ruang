// pages/my/myaddress.js
wx.cloud.init({
  env: 'shucheng-0gpblg8515636a51', //数据库ID
  traceUser: true
})
const db = wx.cloud.database()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    list:[],
    hiddenmodalput:true
  },
  addressinput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  changeInfo:function(e) { 
    this.setData({
      hiddenmodalput:!this.data.hiddenmodalput
    })
  },
  cancel:function(){
    this.setData({
      hiddenmodalput: true
    })
  },
  confirm:function(res){
    this.setData({
      hiddenmodalput:true
    })
    db.collection('user').where({
      _id: app.globalData.guserid
    }).update({
      data:{
        UserAddress:this.data.address
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('user').where({
      _id: app.globalData.guserid
    }).get({
      success: res => {
        // res.data 包含该记录的数据
        this.setData({
          address: res.data[0].UserAddress,
          list: res.data,
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