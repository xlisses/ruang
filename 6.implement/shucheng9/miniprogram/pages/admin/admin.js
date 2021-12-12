var app = getApp();
Page({
    data: {
        go:'',
        list:[]
    },
    go: function (e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.go
        })
      },
      onLoad: function () {
        const db = wx.cloud.database({
          env: "shucheng-0gpblg8515636a51"
        });
        const cont = db.collection('user');
    
        cont.where({
          _id:app.globalData.gadminid
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