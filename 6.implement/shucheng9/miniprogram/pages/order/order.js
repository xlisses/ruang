Page({
  data: {
    list:[],
   
  },




yesfin:function(e){
  wx.redirectTo({
  url: '../order/ordernew',
})
},

shouhuo: function(e){
  
  wx.cloud.database().collection('order')
  
  
  
  
  wx.showModal({
    title: '确认成功',
   
    showCancel: false,//是否显示取消按钮
   
    cancelColor:'skyblue',//取消文字的颜色
    confirmText:"确定",//默认是“确定”
    confirmColor: 'skyblue',//确定文字的颜色
    success: function (res) {
       if (res.confirm) {
          wx.switchTab
           ({
            url: '../goumai/goumai',
          })
       } 

       }
    
   
 })




  wx.navigateTo({
  url: '../buy/buy?id='+ e.currentTarget.dataset.id
})



},



dtl:function(e){

wx.navigateTo({
  url: '../goumai_detail/goumai_detail?id='+ e.currentTarget.dataset.id
})

},

 
onLoad: function (options) {
  var that = this;
  const db = wx.cloud.database({env: "shucheng-0gpblg8515636a51"});
  const cont = db.collection('book');
 

  cont.get({
    //如果查询成功的话
    success: res => {
     
      this.setData({
        list: res.data,
      })
       
    }
  })







}





})