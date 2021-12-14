Page({
  data: {
    list: [],
  },
  onLoad: function (options) {
    var id = options.id
    wx.cloud.database().collection('userreport')
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
  freeze: function () {
    //用户标记为已冻结
    wx.cloud.database().collection('user').where({
      _id: this.data.list.UserId
    }).update({
      // data 传入需要局部更新的数据
      data: {
        State: 0
      },
      success: function (res) {
        console.log(res)
      }
    })
    //举报标记为已解决
    wx.cloud.database().collection('userreport')
      .where({
        _id: this.data.list._id
      }).update({
        // data 传入需要局部更新的数据
        data: {
          State: 0
        },
        success: function (res) {
          console.log(res)
          console.log(res)
          wx.showToast({
            title: '处理成功！',
            duration: 1500
          })
          setTimeout(function (params) {
            wx.navigateBack({
              delta: 0,
            })
          }, 1500)
        }
      })
      
  },
  ignore: function () {
    //举报标记为已解决
    wx.cloud.database().collection('userreport')
      .where({
        _id: this.data.list._id
      }).update({
        // data 传入需要局部更新的数据
        data: {
          State: 0
        },
        success: function (res) {
          console.log(res)
          console.log(res)
          wx.showToast({
            title: '处理成功！',
            duration: 1500
          })
          setTimeout(function (params) {
            wx.navigateBack({
              delta: 0,
            })
          }, 1500)
        }
      })
      
  }

})