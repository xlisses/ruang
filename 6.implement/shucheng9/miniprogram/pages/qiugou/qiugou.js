// index.js
// 获取应用实例
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
const qiugou = db.collection('book')
const num=5
var page=5
Page({
  data: {
    qiugouObj:""
  },
  
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow() {
    
  },
  addQiugou:function(params) {
    wx.navigateTo({
      url: '/pages/qiugou/addqiugou'
    })
  },
  togoumai:function (params) {
    wx.navigateTo({
      url: '/pages/buy/buy'
    })
  },


  myQiugou:function(params) {
    wx.navigateTo({
      url: '/pages/qiugou/myqiugou'
    })
  },
  onLoad() {
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
  onReachBottom:function(){
    page=page+1
    
    qiugou.limit(page).get({
      success: res=>{
        // res.data 包含该记录的数据
        console.log(res.data)
        console.log(page)
        this.setData({
          qiugouObj:res.data
        })
      }
      
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
 
})
