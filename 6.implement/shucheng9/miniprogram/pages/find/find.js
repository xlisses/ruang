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
        keyinput: '',
        success: false,
        selectShow1: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        selectData1: ['所有学院','计算','法学' ,'医学'],//下拉列表的数据
        selectData2:['所有专业','软工','大数据','计算机'],
        index1: 0,//选择的下拉列表下标
        index2:0,
        priceinput1:0,
        priceinput2:999,
    },
    keyInput: function (e) {
        this.setData({
            keyinput: e.detail.value
        })
    },
    priceinput1:function(e){
        this.setData({
        priceinput1:e.detail.value,
        })
    },
    priceinput2:function(e){
        this.setData({
            priceinput2:e.detail.value,
            })
    },
    search: function (res) {
        if (this.data.keyinput.length == 0) {
            wx.showToast({
                title: '请输入关键词',
                icon: 'none',
            })
        } else {
            wx.navigateTo({
                url: '../find_detail/find_detail'
            })
            app.globalData.search = this.data.keyinput
        }

    },
    selectTap1() {
        this.setData({
          selectShow1: !this.data.selectShow1
        });
        
      },
      // 点击下拉列表
      optionTap1(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
          index1: Index,
          selectShow1: !this.data.selectShow1
        });
     
      },
      // 点击下拉显示框
      selectTap2() {
        this.setData({
          selectShow2: !this.data.selectShow2
        });
      },
      // 点击下拉列表
      optionTap2(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
          index2: Index,
          selectShow2: !this.data.selectShow2
        });
      
      },

    OK:function(e){
        var that = this
        console.log(that.data.priceinput1)
        console.log(that.data.priceinput2)
       
       
        if(((that.data.priceinput1)>(that.data.priceinput2))||(that.data.priceinput1<0)||(that.data.priceinput2<0)){
            wx.showModal({
                title: '价格有问题',
               
                showCancel: false,//是否显示取消按钮
               
                cancelColor:'skyblue',//取消文字的颜色
                confirmText:"确定",//默认是“确定”
                confirmColor: 'skyblue',//确定文字的颜色
             })
        }
        else if(that.data.index1==0){
          wx.navigateTo({
            url: '../shaixuan/shaixuan?col='+that.data.selectData1[that.data.index1]+'&spe='+that.data.selectData2[that.data.index2]+'&price1='+that.data.priceinput1+'&price2='+that.data.priceinput2
          })
        }
        else if(that.data.index2==0){
          wx.navigateTo({
            url: '../shaixuan/shaixuan?col='+that.data.selectData1[that.data.index1]+'&spe='+that.data.selectData2[that.data.index2]+'&price1='+that.data.priceinput1+'&price2='+that.data.priceinput2
          }) 
        } 
        else{
        wx.navigateTo({
          url: '../shaixuan/shaixuan?col='+that.data.selectData1[that.data.index1]+'&spe='+that.data.selectData2[that.data.index2]+'&price1='+that.data.priceinput1+'&price2='+that.data.priceinput2
        })
            }
    }
})