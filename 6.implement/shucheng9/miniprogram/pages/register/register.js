wx.cloud.init({
  env: 'shucheng-0gpblg8515636a51', //数据库ID
  traceUser: true
})
const db = wx.cloud.database({
  env: "shucheng-0gpblg8515636a51"
})
const user = db.collection("user")
Page({
  data: {
    userid: '',
    password: '',
    nickname: '',
    phone: '',
    address: '',
    success: false,
  },
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
  // 获取输入昵称
  nicknameInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  // 获取输入电话
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取输入地址
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  register: function () {
    var that = this;
    if (that.data.userid.length == 0 || that.data.password.length == 0 || that.data.nickname.length == 0 || that.data.phone.length == 0 || that.data.address.length == 0) {
      wx.showToast({
        title: '请正确填写信息',
        icon: 'loading',
        duration: 1000
      })
    } else {
      db.collection('user').where({
        StuNum: that.data.userid
      }).get({
        success: function (res) {
          console.log(res)
          if (res.data.length == 1) {
            wx.showToast({
              title: '该学号已注册',
              icon: 'loading',
              duration: 1000
            })
          } else {
            db.collection('user').add({
              data: {
                StuNum: that.data.userid,
                Pwd: that.data.password,
                UserName: that.data.nickname,
                PhoneNum: that.data.phone,
                UserAddress: that.data.address,
                Propeety: 0,
                URptimes: 0,
                State: 1
              }
            })
            wx.showModal({
              title: '注册成功',
              content: '注册成功',
              showCancel: false,
              success(res) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            });

          }
        }
      })
    }
  },
})