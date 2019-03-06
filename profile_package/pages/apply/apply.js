// profile_package/pages/apply/apply.js
import { Apply_model } from './apply_model.js'
var apply_model = new Apply_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    agreement: false,
    opacity: 0,
    scale: 'translate(-50%,-50%) scale(0.3)',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 禁止蒙层下滑动
  stopMove() {
    return false
  },
  // 提交
  formSubmit(e) {
    var data = {
      name: e.detail.value.user,
      phone: e.detail.value.phone,
      idNumber: e.detail.value.idCard,
      email:e.detail.value.email
    }
    let reg = /^1(3|4|5|7|8)\d{9}$/;//验证手机号
    let reg1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//验证身份证号
    let reg2 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;//验证邮箱
    if (data.name == '') {
      $.prompt('姓名不能为空')
      return false
    } else if (!reg.test(data.phone)){
      $.prompt('请填写正确的手机号码')
      return false
    } else if (!reg1.test(data.idNumber)){
      $.prompt('请填写正确的身份证号码')
      return false
    }else if(data.email != ''){
      if(!reg2.test(data.email)){
        $.prompt('请填写正确的邮箱账号')
        return false
      }
    }
    this.setData({
      agreement: true
    }, () => {
      this.setData({
        data:data,
        opacity: 1,
        scale: 'translate(-50%,-50%) scale(1)'
      })
    })
  },
  // 关闭协议弹窗
  closeWindow() {
    this.setData({
      opacity: 0,
      scale: 'translate(-50%,-50%) scale(0.3)'
    }, () => {
      setTimeout(() => {
        this.setData({
          agreement: false
        })
      }, 300)
    })
  },
  // 同意服务协议
  confirm() {
    this.closeWindow()
    let data = this.data.data
    console.log(data)
    apply_model.postCustomerInfo(data,(res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      $.prompt('已成功提交申请')
      setTimeout(()=>{
        wx.navigateBack({
          delta:1
        })
      },2500)
    })
    
  },
  // 不同意服务协议
  cancel() {
    this.closeWindow()
  }
})