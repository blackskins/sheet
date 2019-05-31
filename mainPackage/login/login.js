// pages/login/login.js
var $ = require('../../utils/common.js')
import { Login } from 'login_model.js'
var login = new Login()
const app = getApp()

Page({
  data: {

  },
  onLoad: function (options) {

  },
  bindgetuserinfo(e) {
    console.log(e)
    console.log(e.detail);
    //授权成功获得用户数据
    if (e.detail.userInfo) {
      var userData = e.detail.userInfo
      var gender;
      if (userData.gender == 1) {
        gender = '男'
      } else if (userData.gender == 2) {
        gender = '女'
      } else {
        gender = ''
      }
      // console.log(app.globalData.invitationCode, '我是邀请码邀请码..........')
      var data = {
        nick: userData.nickName,
        headImg: userData.avatarUrl,
        gender: gender,
        invitationCode:app.globalData.invitationCode
      }
      login.getUserAuth(data, (res) => {
        console.log(res);
        $.prompt('授权登录成功');
        // app.globalData.is_authorize = true;
        setTimeout(() => {
          wx.switchTab({
            url: '/mainPackage/index/index',
          })
        }, 1500)
      })
    }
  },
})