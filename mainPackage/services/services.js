// mainPackage/services/services.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转到化妆品委托
  toCosmetics() {
    wx.navigateTo({
      url: '../../index_package/pages/cosmetics/cosmetics',
    })
  },
})