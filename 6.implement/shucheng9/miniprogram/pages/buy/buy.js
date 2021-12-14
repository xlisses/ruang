// pages/buy/buy.js

Page({
  data: {
    list: [],
    bookname: '',
    username: '',
    price: 0,
    phone: '',
    booktext: '',
    num: 0,
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
          list: res.data,
          bookname: res.data.BookName,
          price: res.data.Price,
          username: res.data.UserName,
          phone: res.data.PhoneNum
        })

      })
    var timestamp = Date.parse(new Date());

    var date = new Date(timestamp);

    //获取年份 
    var Y = date.getFullYear();
    //获取月份 
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  },
  txtinput: function (e) {
    this.setData({
      booktext: e.detail.value
    })
  },
  numinput: function (e) {

    this.setData({
      num: e.detail.value
    })
  },

  ok: function (e) {
    var that = this;
    // var date = util;
    wx.cloud.database().collection('book').doc(that.data.list._id).get({
      success: function (res) {
        if ((res.data.Stock - that.data.num) < 0) {
          wx.showToast({
            title: '超出数量上限',
            icon: 'loading',
            duration: 1000
          })
        }else if(that.data.num == 0){
          wx.showToast({
            title: '数量不能为0',
            icon: 'loading',
            duration: 1000
          })
        } else {
          wx.cloud.database().collection('book').doc(that.data.list._id).update({
            data: {
              Stock:res.data.Stock - parseInt(that.data.num)
            }
          })
          wx.cloud.database().collection('order').add({
            data: {
              BookName: that.data.bookname,
              Seller: that.data.username,
              Price: parseFloat(that.data.price),
              Phone: that.data.phone,
              BookText: that.data.booktext,
              Num: parseInt(that.data.num),
              State: 0,
            }
          })
          wx.showModal({
            title: '购买成功',
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
          that.setData({
            booktext: '',
          })
        }
      }
    })
  }
})