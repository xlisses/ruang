// pages/report/report.js
wx.cloud.init({
  env: 'shucheng-0gpblg8515636a51', //数据库ID
  traceUser: true
})
var id = ""
const db = wx.cloud.database()
const report = db.collection('user')
var text = ""
var bookname = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    stunum:"",
    avator:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    report.doc(id).get({
      success: res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        this.setData({
          username: res.data.UserName,
          stunum:res.data.StuNum,
          avator:res.data.AvaTor
        })
      }
    })
  },

  textinput(e) {
    console.log(e.detail.value)
    text = e.detail.value
  },
  addreport: function () {
    db.collection('userreport').add({
      data: {
        UserId: id,
        URptext: text,
        State: 1,
        UserName: this.data.username,
        StuNum:this.data.stunum,
        AvaTor:this.data.avator
      },
      success: function (params) {
        wx.showToast({
          title: '举报成功！',
          duration: 1500
        })

        setTimeout(function (params) {
          wx.navigateBack({
            delta: 0,
          })
        }, 1500)
      },
    })
  },
})