// pages/qiugou/addqiugou.js
const app = getApp()
const db = wx.cloud.database()
const user = db.collection('user')
var imglist = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    bookid: '',
    bookname: '',
    pirce: 0,
    booktext: '',
    college: '',
    username: '',
    bookimg: '',
    speciality: '',
    userid: '',
    num: 0,
    phonenum: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    user.where({
      _id: app.globalData.guserid
    }).get({
      success: res => {
        // res.data 包含该记录的数据
        console.log(res.data[0].UserName)
        this.setData({
          username: res.data[0].UserName,
          phonenum: res.data[0].PhoneNum
        })
      }
    })
  },

  nameinput(e) {
    this.setData({
      bookname: e.detail.value
    })
  },
  priceinput(e) {
    this.setData({
      bookprice: e.detail.value
    })
  },
  textinput(e) {
    this.setData({
      booktext: e.detail.value
    })
  },
  numinput(e) {
    this.setData({
      num: e.detail.value
    })
  },
  addqiugoulist: function (params) {
    var that = this;
    const db = wx.cloud.database();
    
    db.collection('book').add({
      data: {
        BookName: that.data.bookname,
        Price: parseFloat(that.data.bookprice),
        BookText: that.data.booktext,
        BookImg: imglist,
        UserName: that.data.username,
        Variety: 1,
        UserId: app.globalData.guserid,
        BookId: that.data._id,
        College: "",
        Speciality: "",
        Stock: parseInt(that.data.num),
        State: 1,
        PhoneNum: that.data.phonenum,
      },
      success: function (params) {
        wx.showToast({
          title: '新建成功！',
          duration: 1500
        })

        setTimeout(function (params) {
          wx.navigateBack({
            delta: 0,
          })
        }, 1500)
      },

    })
    imglist = [""]
  },
  bokimg: function (params) {
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
          cloudPath, //云存储图片名字
          filePath, //临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            var fileID = res.fileID;

            console.log(fileID)
            imglist = imglist.concat(fileID)
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
})