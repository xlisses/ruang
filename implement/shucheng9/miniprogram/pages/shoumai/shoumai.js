
Page({
  data: {
   
    list:[]
  },
messagetap:function(e){
  wx.navigateTo({
    url: '../index/index',
  })
},
a: function () {
   
},
btn:function(){
  wx.navigateTo({
    url: '../shangjia/shangjia',
  })
},

 
onLoad: function (options) {
  var _this = this;

 
  const db = wx.cloud.database({env: "shucheng-0gpblg8515636a51"});
  const cont = db.collection('book');
 
  cont.get({
    //如果查询成功的话
    success: res => {
      //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
      this.setData({
        list: res.data
      })
    }
  })
}

})