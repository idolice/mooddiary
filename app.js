//app.js
const APP_ID = 'wx94ca369c922f9c59';
const APP_SECRET = 'af00fddb9218bcc514d3c3c4bf05dc15';
App({
  data: {
    openId: null,
    sessionKey: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.host + 'openId',
          data: {
            jsCode: res.code
          },
          method: 'GET',
          success: function(res) {
            that.globalData.openId = res.data.openid
            that.globalData.sessionKey = res.data.session_key
            console.log(that.globalData)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({

      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              console.log(that.globalData.userInfo)
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    host: 'http://localhost:8080/',
    userInfo: null,
    openId: null,
    sessionKey: null,
    selectedDay:{
      year: 0,
      month: 0,
      day: 0
    }
  }
})