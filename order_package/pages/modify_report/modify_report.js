// order_package/pages/modify_report/modify_report.js
import { Modify_report_model } from './modify_report_model.js'
var modify_report_model = new Modify_report_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'CIDF5P190313044654396'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  formSubmit(e){
    if (e.detail.value.reason == ''){
      $.prompt('请填写变更的原因')
      return
    }else if(e.detail.value.content == ''){
      $.prompt('请填写变更内容')
      return
    }
    let _id = this.data.orderId
    let updateReason = e.detail.value.reason
    let updateContent = e.detail.value.content
    $.openLoad('正在提交...')
    modify_report_model.modifyReport(_id,updateReason,updateContent,(res)=>{
      console.log(res)
      $.closeLoad()
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return
      }
      $.prompt('成功提交','success')
    })
  }
})