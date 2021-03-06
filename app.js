import wxServices from './helper/wxService'
import wxHelper from './helper/wxHelper'
import wxRequestHelper from './helper/wxRequestHelper'
import wxCache from './helper/GlobalCache'
import wxDataStorage from './helper/wxDataStorage'
import tool from './helper/Tools'

App({
  onLaunch: function (ops) {
    if(ops.scene == 1044){
      console.log(ops.shareTicket)
    }
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        var code = res.code
        var appId = 'wx15b1bde946705e10';
        var secret = '6b49bdbfa8cfb1ecbe5004ad27617c9f';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (ress) {
            console.log(ress)
            var openid = ress.data.openid //返回openid
            var sessionkey = ress.data.session_key
            wx.setStorageSync("openId", openid)
            wx.setStorageSync("sessionkey", sessionkey)
            console.log('openid为' + openid);
            console.log('sessionkey为' + sessionkey);
          }
        })
        wx.request({
          url: '',
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
              this.globalData.userInfo = res.userInfo
              console.log(res)
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
    userInfo: null
  },
  $: {
    service: new wxServices(),
    wxHelper: new wxHelper(),
    request: new wxRequestHelper(),
    gc: new wxCache(),
    wxDataStorage: new wxDataStorage(),
    tool: new tool()
  }
})