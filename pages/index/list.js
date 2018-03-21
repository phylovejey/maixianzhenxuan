// pages/index/list.js
var app = getApp();
Page({
  data: {
    page: 0,
    scrollTop: 0,
    list: [1,2],
    loading: true
  },
  onLoad: function (options) {
    this.data.cid = options.cid
    var systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: systemInfo.windowHeight
    })
  },
  onShow: function () {
    this.setGoodsData()
  },
  setGoodsData: function () {
    if (!this.data.loading) {
      return false;
    }
    var self = this;
    wx.request({
      url: 'https://www.ccyangche.com/search',
      method: "POST",
      data: { 
        target:'1',
        key:'classify',
        value:'虾'
      },
      success: function (res) {
        if (!res) {
          self.data.loading = false
          self.setData({
            loading: false
          })
          return false
        }
        if (res.length < 3) {
          self.setData({
            loading: false
          })
        }
      
        var goodsList = res.data.result.info
        console.log(goodsList)
        self.setData({
         list: goodsList
        })
      }
    })
  },
  showGoodsDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    app.redirect('goods/detail', 'gid=' + id)
  },
  scrolltolower: function () {
    ++this.data.page
    this.setGoodsData()
  }
})