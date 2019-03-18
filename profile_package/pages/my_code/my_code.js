// profile_package/pages/my_code/my_code.js
import { My_code_model } from './my_code_model.js'
var my_code_model = new My_code_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeUrl:[]
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
    })
  },
  // 预览二维码
  preView(){
    $.previewImage(this.data.codeUrl)
  }
})