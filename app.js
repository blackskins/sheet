//app.js
import {
  Token
} from './utils/token.js';
var token = new Token();
import {
  Common
} from './utils/common_model.js'
var common = new Common()
App({
  globalData: {
    hostUrl: 'https://fenxi.weishangshouji.cn',
    wxAppId: 'wxe8e8fbd81548c7da',
    userInfo: null,
    vipPower: '',
  },
  onLaunch: function(options) {
    console.log(options)
    
    // 清除token缓存
    wx.clearStorageSync()

    // 更新小程序
    this.updateMP()

    let invitationCode = ''
    if (options.scene == '1011') {
      invitationCode = options.query.invitationCode
    }
    var wxAppId = this.globalData.wxAppId
    console.log(wxAppId)
    // 获取token
    token.getTokenFromService(wxAppId, invitationCode, (res) => {
      console.log(res)
      wx.setStorageSync('token', res.data.token)
      if (!res.data.isAuth) {
        wx.navigateTo({
          url: '/mainPackage/login/login',
        })
      }
    })
  },
  // 小程序更新
  updateMP: function() {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function(res) {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
  },
})