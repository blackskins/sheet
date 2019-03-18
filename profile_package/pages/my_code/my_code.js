// profile_package/pages/my_code/my_code.js
import { My_code_model } from './my_code_model.js'
var my_code_model = new My_code_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeUrl:[],
    canvasImgUrl:'',//二维码的本地路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyCode()
  },
  // 获取我的二维码
  _getMyCode(){
    my_code_model.getCode((res)=>{
      console.log(res)
      this.setData({
        codeUrl:res.data.url
      })
      // 下载二维码，获得本地路径用来画图
      wx.downloadFile({
        url:res.data.url,
        success:(res)=>{
          console.log(res)
          this.setData({
            canvasImgUrl:res.tempFilePath
          })
          this.drawBanner(res.tempFilePath)
        },
        fail:(res)=>{
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
          success: function (res) {
            wx.hideLoading()
            // $.prompt('成功保存到手机本地相册', 2500)
            wx.showToast({
              title: '成功保存到手机本地相册',
              duration: 2500
            })
          },
          fail: (res) => {
            console.log('授权失败')
            console.log(res)
            if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("打开设置窗口");
              this.setData({
                isAuth: false
              })
              wx.setStorageSync('isPath', 'no');
            }
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 画海报
  drawBanner(url) {
    console.log('2222222')
    const ctx = wx.createCanvasContext('canvas_1');
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, 660, 700)
    // console.log(canvasImgUrl)
    ctx.drawImage(url,75,20,510,510)
    ctx.setFontSize(30)
    ctx.setFillStyle('#333')
    ctx.fillText('扫一扫上面的二维码图案，加我好友', 92, 650)
    ctx.fillText('扫一扫上面的二维码图案，加我好友',93,651)

    ctx.draw()
  }
})