//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    bannerItems:[
      { url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=366146675,3022535370&fm=200&gp=0.jpg'}
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuitem: [{ icon: 'iconfont icon-xia', text: '海鲜水产' }, { icon: 'iconfont icon-roulei', text: '肉禽蛋品' }, { icon: 'iconfont icon-shuiguo', text: '新鲜果蔬' }, { icon: 'iconfont icon-add',text: '特色农产' }],
    list:[1,2,3,4],
    cid:0,
    loading:true

  },
  onLoad: function (options) {
    this.systemInfo = wx.getSystemInfoSync()
    this.setAdvertData()
    this.setCateData()
  },
  onShow: function () {

    this.setGoodsData()
  },
  onShareAppMessage: function () {

  },
  setAdvertData: function () {
    // var self = this;
    // app.request.wxRequest({
    //   url: 'advert',
    //   success: function (res) {
    //     self.setData({
    //       windowHeight: self.systemInfo.windowHeight,
    //       advert: res
    //     })
    //   }
    // })
  },
  setCateData: function () {
  //   var self = this;
  //   var cid = this.data.cid;
  //   app.request.wxRequest({
  //     url: 'category',
  //     data: { cid: cid },
  //     success: function (res) {
  //       if (cid == 0) {
  //         self.setData({
  //           category: res
  //         })
  //       } else {
  //         self.setData({
  //           childCate: res
  //         })
  //       }
  //     }
  //   })
  },
  setGoodsData: function () {
    if (!this.data.loading) {
      return false
    }
    var self = this;
    wx.request({
      url: 'https://www.ccyangche.com/wxitem',
      method:"get",
      header:{
        'content-type':'application/json',
        'sessionid':wx.getStorageSync('sessionid')
      },
      data: { 
        start:0,
        end:9
       },
      success: function (res) {
        console.log(res.data)
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
        var goodsList = res.data.item
        console.log(goodsList)
        self.setData({
          list: goodsList
        })
      }
    })
  },
  showTopic: function (e) {
    var tid = e.currentTarget.dataset.id;
    // app.redirect('topic/index','tid='+tid)
  },
  showList: function (e) {
    var cid = e.currentTarget.dataset.id
    app.redirect('index/list', 'cid=' + cid)
  },
  showGoodsDetial: function (e) {
    var gid = e.currentTarget.dataset.id
    if (!gid) return;
    app.redirect('goods/detail', 'gid=' + gid)
  },
  switchNav: function (e) {
    // if (this.data.cid == e.currentTarget.dataset.cid && e.currentTarget.dataset.cid != 0) return;
    // this.data.cid = e.currentTarget.dataset.cid;
    // this.data.page = 0
    // this.data.loading = true
    // this.data.goodsList = []
    // var windowWidth = this.systemInfo.windowWidth
    // var offsetLeft = e.currentTarget.offsetLeft
    // var scrollLeft = this.data.scrollLeft;
    // if (offsetLeft > windowWidth / 2) {
    //   scrollLeft = offsetLeft
    // } else {
    //   scrollLeft = 0
    // }
    // this.setData({
    //   goodsList: [],
    //   childCate: [],
    //   loading: true,
    //   scrollLeft: scrollLeft,
    //   scrollTop: 0,
    //   cid: this.data.cid
    // })
    // this.setCateData()
    // this.setGoodsData()
  },
  scrolltolower: function (e) {
    ++this.data.page
    this.setGoodsData()
  },
  showGoodsDetail: function (e) {
    var gid = e.currentTarget.dataset.id;
    console.log(gid);
    if (!gid) return;
    app.redirect('goods/detail', 'gid=' + gid)
  }
 
})
