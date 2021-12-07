wx.cloud.init({
  env: 'shucheng-0gpblg8515636a51', //数据库ID
  traceUser: true
})
const db = wx.cloud.database({
  env: "shucheng-0gpblg8515636a51"
})
const user = db.collection("user")
var app = getApp();
Page({
  data: {
    userid: '',
    password: '',
    success: false,
  },
  // onLoad: function () {
  //   var that = this
  //   // 查看是否授权
  //   wx.getSetting({
  //     success(res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.setData({
  //               info: res.userInfo
  //             })
  //             console.log(res)
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // 获取输入学号 
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录 
  login: function () {
    var that = this;
    if (that.data.userid.length == 0) {
      wx.showToast({
        title: '学号不能为空',
        icon: 'loading',
        duration: 1000
      })
    } else if (that.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1000
      })
    } else {
      db.collection('user').where({
        StuNum: that.data.userid
      }).get({
        success: function (res) {
          if (res.data[0].State == 1) {
            if (res.data[0].Pwd == that.data.password) {
              app.globalData.guserid=res.data[0]._id
              wx.switchTab({
                url: '../goumai/goumai',
              })
            } else {
              wx.showModal({
                title: '密码错误',
                content: '密码错误'
              });
            }
          }else{
            wx.showModal({
              title: '该用户已冻结',
              content: '该用户已冻结'
            });
          }
        }
      })
    }
  },
  adminlogin: function () {
    var that = this;
    if (that.data.userid.length == 0) {
      wx.showToast({
        title: '学号不能为空',
        icon: 'loading',
        duration: 1000
      })
    } else if (that.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1000
      })
    } else {
      db.collection('user').where({
        StuNum: that.data.userid
      }).get({
        success: function (res) {
          if(res.data[0].Propeety == 1){
            if (res.data[0].State == 1) {
              if (res.data[0].Pwd == that.data.password) {
                app.globalData.gadminid=res.data[0]._id
                wx.navigateTo({
                  url: '../admin/admin',
                })
              } else {
                wx.showModal({
                  title: '密码错误',
                  content: '密码错误'
                });
              }
            }else{
              wx.showModal({
                title: '该用户已冻结',
                content: '该用户已冻结'
              });
            }
          }else{
            wx.showModal({
              title: '该用户不是管理员',
              content: '该用户不是管理员'
            });
          }
        }
      })

    }
  },
  // 注册 
  register: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  find: function () {
    wx.navigateTo({
      url: '/pages/find/find',
    })
  }

})