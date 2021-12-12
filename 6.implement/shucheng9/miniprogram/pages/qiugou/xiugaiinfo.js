const app = getApp()
const db = wx.cloud.database()
const qiugou = db.collection('book')
var id
var xiugaiprice=""
var xiugainame=""
var xiugaitext=""
var xiugainum=""
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      imgs: [],
      placeholder: '请选择',
      Name:"",
      Price:"",
      Text:"",
      Num:0
  },
  // 上传图片
  nameinput(e){
    console.log(e.detail)
      xiugainame=e.detail.value
  },
  priceinput(e){
    console.log(e.detail)
      xiugaiprice=e.detail.value
  },
  textinput(e){
    console.log(e.detail.value)
      xiugaitext=e.detail.value
  },
  numinput(e){
    console.log(e.detail.value)
      xiugainum=e.detail.value
  },
  chooseimg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseimage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
         console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteimg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewimg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
 
  xiugaiinfo:function(){
    qiugou.doc(id).update({
      data:({
        BookName:xiugainame,
        BookPrice:parseFloat(xiugaiprice),
        BookText:xiugaitext,
        Stock:ParseInt(xiugainum)
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
 
  bindpickerchange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  clearfont() {
    this.setData({
      placeholder: ''
    })
  },
 
  bindregionchange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  delqiugoulist:function(options){
   var delid=id;
  
    qiugou.where(
     {
     _id:delid}).remove({
       success:function (params) {
        wx.showToast({
          title: '删除成功！',
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
 onLoad: function(options){
   id=options.id
  console.log(id)
  qiugou.doc(id).get({
    success: res=>{
      // res.data 包含该记录的数据
      console.log(res.data)
      xiugainame=res.data.BookName
      xiugaiprice=res.data.BookPrice
      xiugaitext=res.data.BookText
      xiugainum=res.data.Stock
      this.setData({
        Name:res.data.BookName,
        Price:res.data.Price,
        Text:res.data.BookText,
        Num:res.data.Stock
      })
    }
    
  })
 },

})