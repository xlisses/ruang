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
    bookimg: '',
    speciality: '',
    success: false,
    list: []

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
  collegeinput: function (e) {
    this.setData({
      college: e.detail.value
    })
  },
  specialityinput: function (e) {
    this.setData({
      speciality: e.detail.value
    })
  },
  bokimg: function (e) {

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


  suretap: function () {
    var that = this
    console.log(that.data)
    wx.cloud.database().collection('book').doc(that.data.list._id).update({
      data: {
        BookId: that.data._id,
        BookName: that.data.bookname,
        Pirce: that.data.price,
        BookText: that.data.booktext,
        College: that.data.college,
        Speciality: that.data.speciality,
        UserId: that.data.userid,

        BookImg: that.data.bookimg,
      }


    })
    wx.showModal({
      title: '修改成功',

      showCancel: false, //是否显示取消按钮

      cancelColor: 'skyblue', //取消文字的颜色
      confirmText: "确定", //默认是“确定”
      confirmColor: 'skyblue', //确定文字的颜色
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
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

    var id = options.id
    wx.cloud.database().collection('book')
      .doc(id)

      .get()
      .then(res => {
        this.setData({
          list: res.data
        })
      })
  },
})