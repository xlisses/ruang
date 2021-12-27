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
  bindviewtap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addqiugou: function (params) {
    wx.navigateTo({
      url: '/pages/qiugou/addqiugou'
    })
  },
  togoumai: function (e) {
    wx.navigateTo({
      url: '/pages/buy/buy?id=' + e.currentTarget.dataset.id
    })
  },


  myqiugou: function (params) {
    wx.navigateTo({
      url: '/pages/qiugou/myqiugou'
    })
  },
  onShow() {
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
      Variety: 1, //求购供应类型
      UserId: db.command.neq(app.globalData.guserid), //不是自己求购的
      Stock: db.command.gt(0), //需求大于0
      State: 1 //未被下架
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

})