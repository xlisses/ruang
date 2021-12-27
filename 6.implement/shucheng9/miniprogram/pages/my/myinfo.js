// pages/my/myinfo.js
const app = getApp()
const db = wx.cloud.database()
const user = db.collection('user')
var xiugainame=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    phonenum:"",
    stunum:"",
    avator:"",
    value:"修改", 
  },
  nameinput(e){
    xiugainame=e.detail.value
  },
  xiugai:function(){
   
    wx.navigateTo({
      url: 'myxiugaiinfo'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    user.where({
      _id:app.globalData.guserid
     }).get({
      success: res=>{
        // res.data 包含该记录的数据
        console.log(res.data)
        xiugainame:res.data[0].UserName
        this.setData({
          username:res.data[0].UserName,
          phonenum:res.data[0].PhoneNum,
          stunum:res.data[0].StuNum,
          avator:res.data[0].AvaTor
        })
      }
    })
  },
})