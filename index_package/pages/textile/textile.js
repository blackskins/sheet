// index_package/pages/textile/textile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unit: [
      {
        name: 'same',
        value: '与委托方相同'
      },
      {
        name: 'else',
        value: '其他'
      }
    ],
    address: [
      {
        name: 'sameAddress',
        value: '与委托方地址相同'
      },
      {
        name: 'else',
        value: '其他'
      }
    ],
    agreement: false,
    opacity: 0,
    scale: 'translate(-50%,-50%) scale(0.3)',
    hide:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 下一页
  toNextPage(){
    wx.navigateTo({
      url: '../textile-a/textile-a',
    })
  },
  // 提交
  show() {
    this.setData({
      agreement: true,
      hide:false
    }, () => {
      this.setData({
        opacity: 1,
        scale: 'translate(-50%,-50%) scale(1)'
      })
    })
  },
  // 关闭说明弹窗
  closeWindow() {
    this.setData({
      opacity: 0,
      scale: 'translate(-50%,-50%) scale(0.3)'
    }, () => {
      setTimeout(() => {
        this.setData({
          agreement: false,
          hide: true
        })
      }, 300)
    })
  },
  read(){
    this.closeWindow()
  }
})