// index_package/pages/textile/textile.js
var $ = require('../../../utils/common.js')
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
    hide:true,
    region: [], //省市区
    productionUnit:'',//生产单位
    reportSendingAddress:'',//报告寄送地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 生产单位
  radioChange1(e){
    console.log(e.detail.value)
    this.setData({
      productionUnit: e.detail.value
    })
  },
  // 报告寄送地址
  radioChange2(e) {
    console.log(e.detail.value)
    this.setData({
      reportSendingAddress: e.detail.value
    })
  },
  // 选择省市区
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 下一页
  formSummt(e){
    if (this.data.productionUnit == '其他' && e.detail.value.productionUnit != ''){
      this.setData({
        productionUnit:e.detail.value.productionUnit
      })
    }
    if(this.data.reportSendingAddress == '其他' && e.detail.value.reportSendingAddress != ''){
      this.setData({
        reportSendingAddress: e.detail.value.reportSendingAddress
      })
    }
    var data = {
      entrustName:e.detail.value.firstName,
      location: {
        province: this.data.region[0],
        city: this.data.region[1],
        district: this.data.region[2],
      },
      entrustAddress:e.detail.value.address,
      linkMan:e.detail.value.user,
      phone:e.detail.value.phone,
      emailOrQQ:e.detail.value.email,
      productionUnit: this.data.productionUnit,
      reportSendingAddress: this.data.reportSendingAddress
    }
    var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;//详细的手机号匹配
    var mb = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;//匹配固话
    if(data.entrustName == ''){
      $.prompt('请填写委托方')
      return
    } else if (data.entrustAddress == ''){
      $.prompt('前填写委托方地址')
      return
    }else if(data.linkMan == ''){
      $.prompt('请填写联系人')
      return
    } else if (!reg.test(data.phone) && !mb.test(data.phone)){
      $.prompt('请填写正确电话/手机号码')
      return
    } else if (this.data.productionUnit == '其他' && e.detail.value.productionUnit == ''){
      $.prompt('请填写其他的生产单位')
      return
    }else if (!this.data.region.length) {
      $.prompt('请选择快递地址的省市区')
      return
    } else if (data.reportSendingAddress == '' || this.data.reportSendingAddress == '其他' && e.detail.value.reportSendingAddress == ''){
      if (data.reportSendingAddress == ''){
        $.prompt('请选择报告寄送地址')
        return
      } else if (this.data.reportSendingAddress == '其他' && e.detail.value.reportSendingAddress == ''){
        $.prompt('请填写报告寄送地址')
        return
      }
    }
    console.log(data)
    this.setData({
      data1:data
    },()=>{
      wx.navigateTo({
        url: '../textile-a/textile-a',
      })
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