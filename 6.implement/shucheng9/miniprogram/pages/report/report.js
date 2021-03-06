// pages/report/report.js
wx.cloud.init({
  env: 'shucheng-0gpblg8515636a51', //数据库ID
  traceUser: true
})
var id=""
const db = wx.cloud.database()
const report = db.collection('book')
var text=""
var bookname=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname:"",
    username:"",
    bookprice:"",
    bookimg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     id=options.id
    report.doc(id).get({
      success: res=>{
        // res.data 包含该记录的数据
        console.log(res.data)
        bookname=res.data.BookName
        this.setData({
          bookname:res.data.BookName,
          username:res.data.UserName,
          bookprice:res.data.Price,
          bookimg:res.data.BookImg
        })
      }
      
    })
  },

  textinput(e){
    console.log(e.detail.value)
    text=e.detail.value
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  addreport:function(){
    db.collection('bookreport').add({
      data:{
        BookId:id,
        BookName:bookname,
        BRptext:text,
        State:1,
        BookImg:this.data.bookimg,
        Price:parseFloat(this.data.bookprice)
      },
      success:function(params) {
        wx.showToast({
          title: '举报成功！',
          duration:1500
        })
        
        setTimeout(function(params) {
          wx.navigateBack({
            delta: 0,
          })
        },1500)
      },
    })
  },
})