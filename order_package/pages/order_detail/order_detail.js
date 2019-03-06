// order_package/pages/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: 24
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.navTitle,
    })

  },

})