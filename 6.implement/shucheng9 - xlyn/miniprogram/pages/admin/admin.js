Page({
    data: {
        go:'',
    },
    go: function (e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.go
        })
      },
})