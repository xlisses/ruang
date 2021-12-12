var app=getApp()
Page({
  data: {
    list:[]
  },

  dtl: function (e) {

    wx.navigateTo({
      url: '../message_detail/message_detail?id=' + e.currentTarget.dataset.id
    })
    
  },


  onLoad: function () {
    const db = wx.cloud.database({
      env: "shucheng-0gpblg8515636a51"
    });
    const cont = db.collection('message');

    cont.where({
      UserId1:app.globalData.guserid
    }).get({
      //如果查询成功的话
      success: res => {
        console.log(app.globalData.guserid)
        this.setData({
          list: res.data,
        })

      }
    })
    
  }
})