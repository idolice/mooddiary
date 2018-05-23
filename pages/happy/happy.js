//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    reason: null
  },
  //事件处理函数
  getReason: function(e) {
    this.setData({
      reason: e.detail.value
    })
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  sendRecord: function() {
    var that = this
    var data = {
      openId: app.globalData.openId,
      userInfo: app.globalData.userInfo,
      sessionKey: app.globalData.sessionKey,
      mood: "happy",
      reason: that.data.reason
    }
    console.log(data)
    wx.request({
      url: 'http://localhost:8080/userMood',
      data: data,
      method: 'post',
      header: { 'Content-Type': 'application/json' }, 
      success: function(res) {
        wx.navigateTo({
          url: '../success/success',
        })
      },
      fail: function() {
        //弹窗重新输入
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

})
