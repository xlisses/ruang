const app = getApp()
const db = wx.cloud.database()
const user = db.collection('user')
var xiugainame=""
var xiugaistunum=""
var xiugaiphonenum=""
var imglist=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    phonenum:"",
    stunum:"",
    avator:"",
    value:"保存", 
  
  },
  nameinput(e){
    xiugainame=e.detail.value
  },
  stuinput(e){
    xiugaistunum=e.detail.value
  },
  phoneinput(e){
    xiugaiphonenum=e.detail.value
  },
  xiugai:function(){
    user.doc(app.globalData.guserid).update({
      data:({
        UserName:xiugainame,
        StuNum:xiugaistunum,
        PhoneNum:xiugaiphonenum
      }),
      success:function (params) {
        wx.showToast({
          title: '修改成功！',
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
        xiugainame=res.data[0].UserName
        xiugaistunum=res.data[0].StuNum
        xiugaiphonenum=res.data[0].PhoneNum
        this.setData({
          username:res.data[0].UserName,
          phonenum:res.data[0].PhoneNum,
          stunum:res.data[0].StuNum,
          avator:res.data[0].AvaTor
        })
      }
    })
  },
  imagechose(){
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
            user.doc(app.globalData.guserid).update({
              data:({
                AvaTor:imglist
              }),
              success:function (params) {
                wx.showToast({
                  title: '修改成功！',
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