wx.cloud.init({
  env: 'shucheng-0gpblg8515636a51', //数据库ID
  traceUser: true
})
const db = wx.cloud.database({
  env: "shucheng-0gpblg8515636a51"
})
const user = db.collection("user")
var app = getApp();
Page({
  data: {
    list: [],

  },
  yesfin: function (e) {
    wx.redirectTo({
      url: '../order/ordernew',
    })
  },

  shouhuo: function (e) {


    wx.cloud.database().collection('order').doc(e.currentTarget.dataset.id).update({
      data: {
        State: 1,
      }

    })
    wx.showModal({
      title: '确认成功',
      showCancel: false, //是否显示取消按钮
      cancelColor: 'skyblue', //取消文字的颜色
      confirmText: "确定", //默认是“确定”
      confirmColor: 'skyblue', //确定文字的颜色
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../order/order',
          })
        }
      }
    })

  },



  dtl: function (e) {

    wx.navigateTo({
      url: '../order_detail/order_detail?id=' + e.currentTarget.dataset.id
    })

  },


  onLoad: function (options) {
    var that = this;
    wx.cloud.database({
        env: "shucheng-0gpblg8515636a51"
      }).collection('order')
      .where({
        State: 0,
        UserId: db.command.neq(app.globalData.guserid)
      })

      .get({
        //如果查询成功的话
        success: res => {

          this.setData({
            list: res.data,
          })

        }
      })







  }





})