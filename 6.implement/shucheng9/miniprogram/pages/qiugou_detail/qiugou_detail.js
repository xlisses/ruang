// pages/qiugou_detail/qiugou_detail.js
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
const qiugou = db.collection('book')
var yid
var uid
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
  tosellerinfo:function(params){
    wx.navigateTo({
      url: '/pages/sellerinfo/sellerinfo?id='+uid
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
        uid=res.data.UserId
        this.setData({
          obj:res.data
        })
      }
    })
  },
})