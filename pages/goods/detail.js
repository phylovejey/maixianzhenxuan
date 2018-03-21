var app=getApp()
Page({
    data: {
        num:1,
        goodsDetail:{},
        album: [{
          url: 'http://p33q7yxhz.bkt.clouddn.com/image/eguaduoerbaixia.png'}],
        groupList: [{
            userImg: "http://wx.qlogo.cn/mmopen/PiajxSqBRaEI9M2lic4983ug0SeVM8oiaDcLggX6mMdONZCicuxT1NhJqgjYqxtykibQcFFEkE8CANibvmPoHTfgxhZg/0",
            nickName: "*^o^*果果*^o^*",
            leftTimeStr: "02:12:35",
            gap: "2",
            length:"5",
            leftNum:"1"
        

        }]
    },
    onLoad: function (options) {
      var self = this;
      var gid = this.gid = options.gid;
      var systemInfo = wx.getSystemInfoSync()
      wx.request({
        url: "https://www.ccyangche.com/wxitem",
        method: "GET",
        header: { "Content-Type": "application/json" },
        data: {
          id:gid
        },
        success: function (res) {
          var goodsDetail = res.data.info[0];
          console.log(goodsDetail);
          self.setData({
            goodsDetail: goodsDetail
          })
        }
    })
    },
    showModal:function(e){
    var type =e.currentTarget.dataset.type;
    var showModalStatus=e.currentTarget.dataset.status=='open'?true:false;
    var goodsPrice =this.data.goodsPrice=type=='group'?this.data.goodsDetail.itemgroupprice:this.data.goodsDetail.itemcurrentprice;
    this.data.buyType=type=='group'?1:0;
    app.showModal(this);
    this.setData({
      showModalStatus:showModalStatus,
      goodsPrice:goodsPrice
    }) 
    console.log(this)
    },
    goHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
    collect: function (e) {
      var gid = this.gid;
      var status = e.currentTarget.dataset.status;
      status = !status
      app.request.wxRequest({
        url: 'collect',
        data: { gid: gid }
      })
      if (status) {
        app.showToast(this, '收藏成功')
      } else {
        app.showToast(this, '您已取消收藏')
      }
      this.setData({
        is_collect: status
      })
    },
    minus: function () {
      var num = this.data.num > 1 ? --this.data.num : 1
      this.setData({
        num: num
      })
    },
    plus: function () {
      var num = ++this.data.num
      this.setData({
        num: num
      })
    },
    goToBuy: function () {
      app.goodsInfo = this.data.goodsDetail;
      app.num = this.data.num;
      // app.propValue = this.propValue;
      app.goodsPrice = this.data.goodsDetail.itemcurrentprice;
      app.buyType = this.buyType;
      // app.groupPid = 0;
      // if (this.goodsInfo.property) {
      //   if (this.propValue && (this.propValue.length == this.goodsInfo.property.length)) {
          app.redirect('goods/payfor');
      //   } else {
      //     app.showToast(this, '请选择商品属性')
      //   }
      // } else {
      //   app.redirect('goods/payfor');
      // }
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '商品详情'
        })
    }
})