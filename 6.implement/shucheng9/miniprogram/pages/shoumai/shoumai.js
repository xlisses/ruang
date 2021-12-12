var app=getApp()
Page({
  data: {
   
    list:[],
    orders:[]
  },
  dtl:function(e){
    wx.navigateTo({
      url: '../shoumai_dtl/shoumai_dtl?id='+ e.currentTarget.dataset.id
    })
    
  },
messagetap:function(e){
  wx.navigateTo({
    url: '../index/index',
  })
},
a: function () {
   
},
btn:function(e){
  wx.navigateTo({
    url: '../shangjia/shangjia',
  })
},
xg:function(e){
  
  wx.navigateTo({
    url: '../xiugai/xiugai?id='+ e.currentTarget.dataset.id
  })
},

 
onLoad: function (options) {
  var _this = this;

 
  const db = wx.cloud.database({env: "shucheng-0gpblg8515636a51"});
  const cont = db.collection('book')
  
  .where({
    Variety:0,
    UserId:app.globalData.guserid
  })

  cont.get({
    //如果查询成功的话
    success: res => {
      
      this.setData({
        list: res.data
      })
    }
  })
}

})