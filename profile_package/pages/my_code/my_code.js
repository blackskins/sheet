// profile_package/pages/my_code/my_code.js
import {
  My_code_model
} from './my_code_model.js'
var my_code_model = new My_code_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeUrl: [],
    canvasImgUrl: '', //二维码的本地路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getMyCode()
  },
  // 获取我的二维码
  _getMyCode() {
    $.openLoad()
    my_code_model.getCode((res) => {
      $.closeLoad()
      console.log(res)
      this.setData({
        codeUrl: res.data.url
      })
      // 下载二维码，获得本地路径用来画图
      wx.downloadFile({
        url: res.data.url,
        success: (res) => {
          console.log(res)
          this.setData({
            canvasImgUrl: res.tempFilePath
          })
          this.drawBanner(res.tempFilePath)
        },
        fail: (res) => {
          console.log('下载二维码失败')
        }
      })
    })
  },
  // 预览二维码
  // preView(){
  //   $.previewImage(this.data.codeUrl)
  // },

  // 一键生成图片海报
  saveImg() {
    if (!wx.getStorageSync('isAuth') && wx.getStorageSync('isPath') == 'no') {
      console.log('dddd')
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.showModal({
              title: '提示',
              confirmColor: '#2090FE',
              content: '生成图片海报需要获得您的授权，点击确定重新获取授权吧~',
              success: (res) => {
                if (res.confirm) {
                  wx.openSetting({
                    success(res) {
                      console.log(res.authSetting, '我就是我，是士大夫角度看是否似懂非懂看甲方临水临电看甲方的杀戮空间')
                      if (res.authSetting['scope.writePhotosAlbum']) {
                        wx.setStorageSync('isAuth', true)
                      }
                      // res.authSetting = {
                      //   "scope[userInfo]": true,
                      //   "scope.userLocation": true
                      // }
                    }
                  })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showLoading({
        title: '正在保存...',
      })
      wx.canvasToTempFilePath({
        canvasId: 'canvas_1',
        quality: 1,
        success: (res) => {
          // 临时图片
          var canvasImg = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: canvasImg,
            success: function(res) {
              wx.hideLoading()
              // $.prompt('成功保存到手机本地相册', 2500)
              wx.showToast({
                title: '成功保存到手机本地相册',
                duration: 2500
              })
            },
            fail: (res) => {
              wx.hideLoading()
              console.log('授权失败')
              console.log(res)
              if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                console.log("打开设置窗口");
                this.setData({
                  isAuth: false
                })
                wx.setStorageSync('isPath', 'no');
                wx.setStorageSync('isAuth', false) 
              }
            }
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }
  },
  // 画海报
  drawBanner(url) {
    console.log('2222222')
    const ctx = wx.createCanvasContext('canvas_1');
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, 660, 700)
    // console.log(canvasImgUrl)
    ctx.drawImage(url, 75, 20, 510, 510)
    ctx.setFontSize(30)
    ctx.setFillStyle('#333')
    ctx.fillText('扫一扫上面的二维码图案，检测优惠', 92, 650)
    ctx.fillText('扫一扫上面的二维码图案，检测优惠', 93, 651)

    ctx.draw()
  }
})