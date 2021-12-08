// pages/shangjia/shangjia.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    
    
    
    bookid: '',
    bookname: '',
    pirce: 0,
    booktext: '',
    college: '',
    username: '',
    bookimg:'',
    speciality:'',
    userid:'',
    num:0,
    phonenum:'',
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
  SpecialityInput: function (e) {
    
    this.setData({
      speciality: e.detail.value
    })
  },
NumInput:function(e){
  this.setData({
    num: e.detail.value
  })
},

  bokimg:function(e) {
    
    wx.chooseImage({
      
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: 4,
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            var fileID = res.fileID;
            console.log(fileID)
            imglist=imglist.concat(fileID)
            //把图片存到imglist集合表
            console.log(imglist);
            //const db = wx.cloud.database();
            
              //db.collection('img').add({
              //  data: {
              //   imglist: fileID
                  
              //  },
              //  success: function () {
              //    console.log('[上传地址] 成功：')
                  
              //  },
              //  fail: function () {
              //    wx.showToast({
              //      title: '图片存储失败',
              //      'icon': 'none',
              //      duration: 3000
              //    })
              //  }
             // }); 
          },
           fail: e => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },

  


  sureTap:function(){
   var that=this
   wx.cloud.database().collection('book').add({
    
    data:{
    BookId: that.data._id,
    BookName: that.data.bookname,
    Price: that.data.price,
    BookText: that.data.booktext,
    College: that.data.college,
    Speciality:that.data.speciality,
    UserName:that.data.username,
    Variety:0,
    BookImg: that.data.bookimg,
    UserId:that.data.userid ,  
    Stock:that.data.num,
    PhoneNum:that.data.phonenum,
    State:0,
  }
     

    })
   
    wx.showModal({
      title: '上架成功',
     
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('user')
  .doc(app.globalData.guserid)
  .get({
success:res=>{
  this.setData({
     username:res.data.UserName,
     userid:app.globalData.guserid,
     phonenum:res.data.PhoneNum,
   })
  
  },
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

