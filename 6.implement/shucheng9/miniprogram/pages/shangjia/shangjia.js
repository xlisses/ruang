// pages/shangjia/shangjia.js
var app=getApp()
var imglist = []
Page({
  data: {
    selectShow1: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData1: ['请选择学院','计算机与计算科学','法学' ,'医学'],//下拉列表的数据
    selectData2:['请选择专业','软工','大数据','计算机'],
    index1: 0,//选择的下拉列表下标
    index2:0,
    
    bookid: '',
    bookname: '',
    price: 0,
    booktext: '',
    college: '',
    username: '',
    imglist:'',
    speciality:'',
    userid:'',
    num:0,
    phonenum:'',
  },

// 点击下拉显示框
selectTap1() {
  this.setData({
    selectShow1: !this.data.selectShow1
  });
  
},
// 点击下拉列表
optionTap1(e) {
  let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
  this.setData({
    index1: Index,
    selectShow1: !this.data.selectShow1
  });
  console.log(e)
},
// 点击下拉显示框
selectTap2() {
  this.setData({
    selectShow2: !this.data.selectShow2
  });
},
// 点击下拉列表
optionTap2(e) {
  let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
  this.setData({
    index2: Index,
    selectShow2: !this.data.selectShow2
  });

},
  nameinput: function (e) {
   
    this.setData({
     bookname: e.detail.value
    
  })
  },
  priceinput: function (e) {
 
    this.setData({
      price: e.detail.value
    })

  },
  textinput: function (e) {
    this.setData({
      booktext: e.detail.value
    })
  },
 numinput:function(e){
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
console.log(that.data)

   if(that.data.bookname==''){
    wx.showToast({
      icon:'none',
      title: '名称不能为空',
    })
  }
  else if(that.data.price==0){
    wx.showToast({
      icon:'none',
      title: '价格不能为空',
    })
  }
  else if(that.data.booktext==''){
    wx.showToast({
      icon:'none',
      title: '介绍不能为空',
    })
  }
  else if(that.data.index1==0){
    wx.showToast({
      icon:'none',
      title: '请选择学院',
    })
  }
  else if(that.data.index2==0){
    wx.showToast({
      icon:'none',
      title: '请选择专业',
    })
  }
  else if(that.data.num==0){
    wx.showToast({
      icon:'none',
      title: '数量不能为空',
    })
  }
  else if(imglist==''){
    wx.showToast({
      icon:'none',
      title: '图片不能为空',
    })
  }
   else{
   wx.cloud.database().collection('book').add({
    
    data:{
    BookId: that.data._id,
    BookName: that.data.bookname,
    Price: parseFloat(that.data.price),
    BookText: that.data.booktext,
    College: that.data.selectData1[that.data.index1],
    Speciality:that.data.selectData2[that.data.index2],
    UserName:that.data.username,
    Variety:0,
    BookImg: imglist,
    UserId:that.data.userid ,  
    Stock:parseInt(that.data.num),
    PhoneNum:that.data.phonenum,
    State:1,
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
  }
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

