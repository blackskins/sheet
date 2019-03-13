// order_package/pages/handwriting/handwriting.js
var $ = require('../../../utils/common.js')
import Handwriting from '../../../components/handwriting/handwriting.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectColor: 'black',
    slideValue: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.handwriting = new Handwriting(this, {
      lineColor: this.data.lineColor,
      slideValue: this.data.slideValue, // 0, 25, 50, 75, 100
    })
  },

  // 选择画笔颜色
  selectColorEvent(event) {
    var color = event.currentTarget.dataset.colorValue;
    var colorSelected = event.currentTarget.dataset.color;
    this.setData({
      selectColor: colorSelected
    })
    this.handwriting.selectColorEvent(color)
  },
  retDraw() {
    this.handwriting.retDraw()
  },
  // 笔迹粗细滑块
  onTouchStart(event) {
    this.startY = event.touches[0].clientY;
    this.startValue = this.format(this.data.slideValue)
  },
  onTouchMove(event) {
    const touch = event.touches[0];
    this.deltaY = touch.clientY - this.startY;
    this.updateValue(this.startValue + this.deltaY);
  },
  onTouchEnd() {
    this.updateValue(this.data.slideValue, true);
  },
  updateValue(slideValue, end) {
    slideValue = this.format(slideValue);
    this.setData({
      slideValue,
    });
    this.handwriting.selectSlideValue(this.data.slideValue)
  },
  format(value) {
    return Math.round(Math.max(0, Math.min(value, 100)) / 25) * 25;
  },
  onShow(options) {
    //微信手机相册/视频授权
    // if (wx.getStorageSync("isPath")) {
    //   wx.getSetting({
    //     success(res) {
    //       if (!res.authSetting['scope.writePhotosAlbum']) {
    //         wx.setStorageSync("isPath", "no");
    //       } else {
    //         wx.setStorageSync("isPath", "alt");
    //       }
    //     }
    //   })
    // }
  },
  // 保存画布图片
  subCanvas() {
    console.log('sdshkdsfskdfh')
    const ctx = wx.createCanvasContext('handWriting')
    ctx.draw(true, () => {
      console.log('我市私房司法')
      wx.canvasToTempFilePath({
        x: 20,
        y: 20,
        width: 150,
        height: 100,
        destWidth: 150,
        destHeight: 100,
        canvasId: 'handWriting',
        success: function(res) {
          console.log(res.tempFilePath) // 返回图片路径
        }
      })
    })
  },
  // 保存画布
  saveImg() {
    wx.canvasToTempFilePath({
      canvasId: 'handWriting',
      quality: 1,
      success: (res) => {
        // 临时图片路径
        // var canvasImg = res.tempFilePath
        // this.setData({
        //   canvasImg:res.tempFilePath
        // })
        //获取页面栈
        var pages = getCurrentPages();
        var Page = pages[pages.length - 1]; //当前页
        if (pages.length > 1) { //说明有上一页存在
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里，调用上一页的函数
          // console.log(prePage.data.data)
          prePage.setData({
            canvasImg:res.tempFilePath
          },()=>{
            $.prompt('签名成功获取,返回订单页进行签名',2500)
            setTimeout(()=>{
              wx.navigateBack({
                delta:1
              })
            },2500)
          })
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  // 画布生成图片并可以保存到手机本地图库
  // saveImg() {
  //   if(!wx.getStorageSync('isPath') || wx.getStorageSync('isPath') == 'alt' ){
  //     wx.canvasToTempFilePath({
  //       canvasId: 'handWriting',
  //       quality: 1,
  //       success: (res) => {
  //         // 临时图片
  //         var canvasImg = res.tempFilePath
  //         wx.saveImageToPhotosAlbum({
  //           filePath: canvasImg,
  //           success: (res)=> {
  //             $.prompt('成功保存到手机本地相册', 2500)
  //           },
  //           fail:(res)=> {
  //             console.log('授权失败')
  //             console.log(res)
  //             if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
  //               console.log("打开设置窗口");

  //               // this.setData({
  //               //   isAuth: false
  //               // })
  //               wx.setStorageSync('isPath', 'no');
  //             }
  //           }
  //         })
  //       },
  //       fail:(res)=> {
  //         console.log(res)
  //       }
  //     })
  //   }else if(wx.getStorageSync('isPath') == 'no'){//重新获取相册/视频的授权
  //     wx.showModal({
  //       title: '温馨提示',
  //       content: '保存签名文件需要打开设置重新授权您的相册或视频权限',
  //       success:(res)=>{
  //         if(res.confirm){
  //           wx.openSetting({
  //             success:(res)=>{
  //               console.log(res)
  //               console.log(res.authSetting['scope.writePhotosAlbum'])
  //               if(res.authSetting['scope.writePhotosAlbum']){
  //                 wx.setStorageSync('isPath', 'alt')
  //               }
  //             },
  //             fail:(res)=>{
  //               console.log(res.authSetting['scope.writePhotosAlbum'])
  //             }
  //           })
  //         }
  //       }
  //     })
  //   }
  // },
})