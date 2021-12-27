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
  changeinfo:function(e) { 
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
})