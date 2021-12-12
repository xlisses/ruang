// pages/shangjia/shangjia.js
var app = getApp()
var imglist = []
Page({
  data: {
    selectShow1: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectShow2: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData1: ['请选择学院', '计算', '法学', '医学'], //下拉列表的数据
    selectData2: ['请选择专业', '软工', '大数据', '计算机'],
    index1: 0, //选择的下拉列表下标
    index2: 0,

    bookid: '',
    bookname: '',
    pirce: 0,
    booktext: '',
    college: '',
    username: '',
    imglist: '',
    speciality: '',
    userid: '',
    num: 0,
    phonenum: '',
  },

  // 点击下拉显示框
  selecttap1() {
    this.setData({
      selectShow1: !this.data.selectShow1
    });

  },
  // 点击下拉列表
  optiontap1(e) {
    let Index0 = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index1: Index0,
      selectShow1: !this.data.selectShow1
    });
    console.log(e)
  },
  // 点击下拉显示框
  selecttap2() {
    this.setData({
      selectShow2: !this.data.selectShow2
    })

  },
  // 点击下拉列表
  optiontap2(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
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
  numinput: function (e) {
    this.setData({
      num: e.detail.value
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

  suretap: function () {
    var that = this


    if (that.data.bookname == '') {
      wx.showToast({
        icon: 'none',
        title: '名称不能为空',
      })
    } else if (that.data.price == 0) {
      wx.showToast({
        icon: 'none',
        title: '价格不能为空',
      })
    } else if (that.data.booktext == '') {
      wx.showToast({
        icon: 'none',
        title: '介绍不能为空',
      })
    } else if (that.data.selectData1[that.data.index] == "请选择学院") {
      wx.showToast({
        icon: 'none',
        title: '请选择学院',
      })
    } else if (that.data.selectData2[that.data.index] == "请选择专业") {
      wx.showToast({
        icon: 'none',
        title: '请选择专业',
      })
    } else if (that.data.num == 0) {
      wx.showToast({
        icon: 'none',
        title: '数量不能为空',
      })
    } else if (imglist == '') {
      wx.showToast({
        icon: 'none',
        title: '图片不能为空',
      })
    } else {
      wx.cloud.database().collection('book').add({

        data: {
          BookId: that.data._id,
          BookName: that.data.bookname,
          Price: parseFloat(that.data.price),
          BookText: that.data.booktext,
          College: that.data.selectData1[that.data.index1],
          Speciality: that.data.selectData2[that.data.index2],
          UserName: that.data.username,
          Variety: 0,
          BookImg: imglist,
          UserId: that.data.userid,
          Stock: parseInt(that.data.num),
          PhoneNum: that.data.phonenum,
          State: 1,
        }


      })

      wx.showModal({
        title: '上架成功',

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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('user')
      .doc(app.globalData.guserid)
      .get({
        success: res => {
          this.setData({
            username: res.data.UserName,
            userid: app.globalData.guserid,
            phonenum: res.data.PhoneNum,
          })

        },
      })
  },
})