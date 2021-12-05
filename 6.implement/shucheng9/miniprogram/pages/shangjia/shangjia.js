// pages/shangjia/shangjia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookid: '',
    bookname: '',
    pirce: '',
    booktext: '',
    college: '',
    userid: '',
    bookimg:'',
    
    success: false,
    
  },
  nameInput: function (e) {
    
    this.setData({
     bookname: e.detail.value
    
  })
  },
  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  textInput: function (e) {
    this.setData({
      booktext: e.detail.value
    })
  },
  collegeInput: function (e) {
    this.setData({
      college: e.detail.value
    })
  },
  goback: function(e){
    wx.switchTab
  ({
      url: '../goumai/goumai',
    })
  },
  sureTap:function(){
    db.collection('book').add({
      data:{
        bookid:'',
    bookname,
    pirce,
    booktext,
    college,
    userid,
    bookimg,
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

