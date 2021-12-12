// index.js
// 获取应用实例
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
const qiugou = db.collection('book')
const num = 8
var page = 8
Page({
  data: {
    qiugouObj: ""
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow() {

  },
  addQiugou: function (params) {
    wx.navigateTo({
      url: '/pages/qiugou/addqiugou'
    })
  },
  togoumai: function (e) {
    wx.navigateTo({
      url: '/pages/buy/buy?id=' + e.currentTarget.dataset.id
    })
  },


  myQiugou: function (params) {
    wx.navigateTo({
      url: '/pages/qiugou/myqiugou'
    })
  },
  onLoad() {
    qiugou.limit(8).where({
      Variety: 1, //求购供应类型
      UserId: db.command.neq(app.globalData.guserid), //不是自己求购的
      Stock: db.command.gt(0), //需求大于0
      State: 1 //未被下架
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
  onReachBottom: function () {
    page = page + 3

    qiugou.limit(page).where({
      Variety: 1
    }).get({
      success: res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        console.log(page)
        this.setData({
          qiugouObj: res.data
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