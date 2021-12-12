Page({
  data: {
    list:[]
  },

  dtl: function (e) {

    wx.navigateTo({
      url: '../dealur_detail/dealur_detail?id=' + e.currentTarget.dataset.id
    })
    
  },


  onLoad: function () {
    const db = wx.cloud.database({
      env: "shucheng-0gpblg8515636a51"
    });
    const cont = db.collection('userreport');

    cont.where({
      State:1
    }).get({
      //如果查询成功的话
      success: res => {

        this.setData({
          list: res.data,
        })

      }
    })
  }
})