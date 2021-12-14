// pages/goumai_detail/goumai_detail.js
Page({
  data: {
    list: []

  },
  del: function (e) {
    var that = this
    console.log(that.data)
    wx.cloud.database().collection('book').doc(that.data.list._id).update({
      data: {
        State: 0
      }
    })
    wx.showModal({
      title: '删除成功',

      showCancel: false, //是否显示取消按钮

      cancelColor: 'skyblue', //取消文字的颜色
      confirmText: "确定", //默认是“确定”
      confirmColor: 'skyblue', //确定文字的颜色
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../goumai/goumai',
          })
        }
      }
    })
  },
  onLoad: function (options) {

    var id = options.id
    wx.cloud.database().collection('book')
      .doc(id)

      .get()
      .then(res => {
        this.setData({
          list: res.data
        })
      })
      .catch(err => {
        console.log('fail')
      })
  },
})