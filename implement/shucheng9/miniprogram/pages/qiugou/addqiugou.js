// pages/qiugou/addqiugou.js
var bookname="";
var bookprice="";
var booktext="";
var imglist=[];
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   
    imglist:'',
    list:[]
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
  nameInput(e){
    console.log(e.detail)
      bookname=e.detail.value
  },
  priceInput(e){
    console.log(e.detail)
      bookprice=e.detail.value
  },
  textInput(e){
    console.log(e.detail.value)
      booktext=e.detail.value
  },
  addqiugoulist:function (params) {
    const db = wx.cloud.database();
    db.collection('book').add({
      data:{
        BookName:bookname,
        BookPrice:bookprice,
        BookText:booktext,
        BookImg:imglist,
        UserName:"读取自身名称",
        Variety:1
      },
      success:function(params) {
        wx.showToast({
          title: '新建成功！',
          duration:1500
        })
        setTimeout(function(params) {
          wx.navigateBack({
            delta: 0,
          })
        },1500)
      }
    })
    
    
    
    
    
    
               
  },
  bokimg:function(params) {
    
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