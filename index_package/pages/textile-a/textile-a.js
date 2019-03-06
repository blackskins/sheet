// index_package/pages/textile-a/textile-a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 样品信息列表
    sampleList: [
      {
        title: '样品名称',
        holder: '请填写联系电话',
        isMark: 1
      },
      {
        title: '商标',
        holder: '请填写商标',
        isMark: 0
      },
      {
        title: '样品数量',
        holder: '请填写样品数量',
        isMark: 1
      },
      {
        title: '颜色及描述',
        holder: '请填写颜色及描述',
        isMark: 1
      },
      {
        title: '原料成分',
        holder: '请填写原料成分',
        isMark: 0
      },
      {
        title: '货号/款号',
        holder: '请填写货号/款号',
        isMark: 0
      },
    ],
    // 检测类型
    checkType: [
      {
        name: 'sendCheck',
        value: '送检'
      },
      {
        name: 'getSample',
        value: '委托采样'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 下一页
  toNextPage() {
    wx.navigateTo({
      url: '../textile-b/textile-b',
    })
  },
  // 上一步
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 下一步
  formSubmit(e) {
    wx.navigateTo({
      url: '../textile-b/textile-b',
    })
  }
})