// pages/buy/buy.js

Page({
  data: {
list:[],
bookname:'',
username:'',
price:0,
phone:'',
booktext:'',
num:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var id=options.id  
    wx.cloud.database().collection('book')
    .doc(id)  
    .get()
   
    .then(res => {
 
        this.setData({
          list: res.data,
          bookname:res.data.BookName,
          price:res.data.Price,
          username:res.data.UserName,
          phone:res.data.PhoneNum
          
        })
        
        })
        var timestamp = Date.parse(new Date());

        var date = new Date(timestamp);
        
        //获取年份 
        
        var Y =date.getFullYear();
        
        //获取月份 
        
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        
        //获取当日日期
        
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        
        console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' );

        
      
      
  },
  txtinput: function (e) {
    console.log(e)
    this.setData({
      booktext: e.detail.value
    })
  },
numinput:function(e){

  this.setData({
  num: e.detail.value
})
  },
 
  OK:function(e){
    

    var that = this;
    
    if(that.data.booktext==''){
      wx.showToast({
        icon:'none',
        title: '备注空',
      })
    }
    else if(that.data.num==0){
      wx.showToast({
        icon:'none',
        title: '数量请选择',
      })
    }

    else{
    wx.cloud.database().collection('order').add({
      
      data:{
        BookName:that.data.bookname,
        Seller:that.data.username,
        Prce:that.data.price,
        Phone:that.data.phone,
        BookText:that.data.booktext,
        Num:that.data.num,
        State:0,
      
      }

    })
  
    wx.cloud.database().collection('book').doc(that.data.list._id).update({
     data:{
      State:1,
    }
    })
    wx.showModal({
      title: '购买成功',
     
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
   
    that.setData({
                 booktext: '',
                })
                }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})