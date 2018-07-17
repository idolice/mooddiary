//success.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  navToIndex: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  navToCalendar: function(){
    var that = this
    var date = new Date();
    var month = date.getMonth()+1;
    var url = app.globalData.host + date.getFullYear()+'/'+month+'/' + app.globalData.openId
    wx.request({
      url: url,
      method: 'get',
      success: function (res) {
        console.log(res.data)
        var list = res.data;
        for (var i = 0; i < list.length; i++) { 
          list[i].moodTag = "/images/emoji-"+list[i].moodTag+".png";
        }
        app.globalData.moodList = list;
        wx.navigateTo({
          url: '../calendar/calendar',
        })
      }
    }) 
    
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
