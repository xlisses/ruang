// pages/shangjia/shangjia.js
var imnglist=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow1: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData1: ['请选择学院','计算机与计算科学','法学' ,'医学'],//下拉列表的数据
    selectData2:['请选择专业','软工','大数据','计算机'],
    index1: 0,//选择的下拉列表下标
    index2:0,
    bookid: '',
    bookname: '',
    pirce: '',
    booktext: '',
    college: '',
    userid: '',
    imglist:'',
    speciality:'',
    success: false,
    list:[]
    
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
    if(that.data.bookname!=''){
   wx.cloud.database().collection('book').doc(that.data.list._id).update({
      data:{
   
    BookName: that.data.bookname,
      }
  })
}
    if(that.data.bookprice!=''){
      wx.cloud.database().collection('book').doc(that.data.list._id).update({
        data:{
  
          Price: that.data.price,
     }
 })
}
    if(that.data.booktext!=''){
      wx.cloud.database().collection('book').doc(that.data.list._id).update({
       data:{

      BookText: that.data.booktext,
 }
})
}
    if(that.data.index1!=0){
      wx.cloud.database().collection('book').doc(that.data.list._id).update({
       data:{

        College: that.data.selectData1[that.data.index1]
      }
      })  
    }  
    if(that.data.index2!=0){
      wx.cloud.database().collection('book').doc(that.data.list._id).update({
       data:{

        Speciality:that.data.selectData2[that.data.index2],
      }
      })  
    }  
    if(imglist!=''){
      wx.cloud.database().collection('book').doc(that.data.list._id).update({
       data:{

        BookImg: imglist,
      }
      })  
    } 
    
    wx.showModal({
      title: '修改成功',
     
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
   
    var id=options.id  
    wx.cloud.database().collection('book')
    .doc(id)
     
      .get()
      .then(res => {
        this.setData({
          list: res.data
        })
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

