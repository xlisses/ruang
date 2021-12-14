// pages/goumai_detail/goumai_detail.js
Page({
  data: {
    list:[]
   
  },
  rpt:function(e){
    wx.navigateTo({
      url: '../report/report?id='+e.currentTarget.dataset.id,
    })
  },
  offer:function(e){
    wx.navigateTo({
      url: '../buy/buy?id='+ e.currentTarget.dataset.id
    })
   
  
  },
  onLoad: function (options) {
    
    var id=options.id  
    wx.cloud.database().collection('book')
    .doc(id)
     
      .get()
      .then(res => {
        this.setData({
          list: res.data
        })
        
        })
        .catch(err=>{
          console.log('fail')
        })
      
      


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