// order_package/pages/modify_form/modify_form.js
import { Modify_form_model } from './modify_form_model.js'
var modify_form_model = new Modify_form_model()
var $ = require('../../../utils/common.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    array: ['样品一', '样品二', '样品三', '样品四'],
    index:0,
    sampleElse: ['样品类别', '样品性状', '样品来源', '样品保存', '样品处理', '危险性'],
    sampleElse1: ['综合', '纤维成分', '色牢度', '化学', '物理性能']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sysInfo = wx.getSystemInfoSync()
    let height = sysInfo.windowHeight - (120 * (sysInfo.windowWidth/750))
    this.setData({
      scrollHeight:height
    })
  },
  // 选择样品
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})