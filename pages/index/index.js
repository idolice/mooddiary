//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    year: app.globalData.selectedDay.year,
    month: app.globalData.selectedDay.month,
    day: app.globalData.selectedDay.day
  },
  //事件处理函数
  happy: function() {
    wx.navigateTo({
      url: '../happy/happy'
    })
  },
  sad: function () {
    wx.navigateTo({
      url: '../sad/sad'
    })
  },
  onLoad: function () {
    console.log(app.globalData.selectedDay) 
    if(this.data.year == 0 && this.data.month == 0 && this.data.day == 0){
      var date = new Date();
      this.setData({
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate()
      })
    } else {
      this.setData({
        year: app.globalData.selectedDay.year,
        month: app.globalData.selectedDay.month,
        day: app.globalData.selectedDay.day
      })
    }
    console.log(this.data)

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
