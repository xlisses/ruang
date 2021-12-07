Page({
  data: {
    list: [],
  },
  onLoad: function (options) {
    var id = options.id
    wx.cloud.database().collection('bookreport')
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
    //书本标记为已下架 
    wx.cloud.database().collection('book')
      .where({
        BookId: this.data.list.BookId
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
    wx.cloud.database().collection('bookreport') 
      .where({
        StuNum: this.data.list.StuNum
      }).update({
        // data 传入需要局部更新的数据
        data: {
          State: 0
        },
        success: function (res) {
          console.log(res)
        }
      })
    wx.navigateTo({
      url: '/pages/dealbr/dealbr',
    })
  },
  ignore: function () {
    //举报标记为已解决
    wx.cloud.database().collection('bookreport')
      .where({
        _id: this.data.list._id
      }).update({
        // data 传入需要局部更新的数据
        data: {
          State: 0
        },
        success: function (res) {
          console.log(res)
        }
      })
    wx.navigateTo({
      url: '/pages/dealbr/dealbr',
    })
  }

})