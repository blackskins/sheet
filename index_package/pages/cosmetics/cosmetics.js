// index_package/pages/cosmetics/cosmetics.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [], //省市区
    rhStatus: '', //报告抬头 0：与委托方相同   1:其他抬头
    reportHeader: '',//报告抬头的值
    exStatus: '', //快递地址状态 0:与联系地址相同  1:其他地址
    expressAddress:'',//快递地址的值
    data:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 选择省市区
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 报告抬头、
  radioChange1(e) {
    console.log(e)
    this.setData({
      rhStatus: e.detail.value
    })
  },
  // 选择快递地址方式
  radioChange2(e) {
    console.log(e)
    this.setData({
      exStatus: e.detail.value
    })
  },
  // 保存表单数据
  formSummt(e) {
    console.log(e)
    // 报告抬头
    if (this.data.rhStatus == 0) {
      this.setData({
        reportHeader: e.detail.value.firstName
      })
    } else if (this.data.rhStatus == 1) {
      this.setData({
        reportHeader: e.detail.value.reportHeader
      })
    }

    // 快递地址
    if(this.data.exStatus == 0){
      this.setData({
        expressAddress:e.detail.value.contactAddress
      })
    }else if(this.data.exStatus == 1){
      this.setData({
        expressAddress: e.detail.value.detailAddress
      })
    }
    let data1 = {
      entrust: e.detail.value.firstName,
      reportHeader: this.data.reportHeader,
      phone: e.detail.value.phone,
      email: e.detail.value.email,
      linkman: e.detail.value.user,
      location: {
        province: this.data.region[0],
        city: this.data.region[1],
        district: this.data.region[2],
      },
      contactAddress: e.detail.value.address,
      fax: e.detail.value.fax,
      postalCode: e.detail.value.postCode,
      expressAddress: this.data.expressAddress
    }

    // var reg = /^1(3|4|5|7|8)\d{9}$/; //简略的正则匹配手机号
    var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;//详细的手机号匹配
    let reg1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //验证邮箱

    // 表单验证
    if (data1.entrust == '') {
      $.prompt('请填写委托方')
      return 
    } else if (this.data.rhStatus == '' || (this.data.rhStatus == 1 && this.data.reportHeader == '')) {
      if (this.data.rhStatus == '') {
        $.prompt('请选择报告抬头')
      } else if (this.data.rhStatus == 1 && this.data.reportHeader == '') {
        $.prompt('请填写其他报告抬头')
      }
      return 
    } else if (!reg.test(data1.phone)) {
      $.prompt('请填写正确的手机号')
      return 
    } else if (data1.email != '') {
      if (!reg1.test(data1.email)) {
        $.prompt('请填写正确的邮箱帐号')
        return 
      }
    } else if (data1.linkman == '') {
      $.prompt('请填写联系人')
      return 
    } else if (data1.contactAddress == '') {
      $.prompt('请填写联系人地址')
      return 
    } else if(!this.data.region.length){
      $.prompt('请选择快递地址的省市区')
      return 
    } else if (this.data.exStatus == '' || (this.data.exStatus == 1 && this.data.expressAddress == '')) {
      if(this.data.exStatus == ''){
        $.prompt('请选择快递地址')
      } else if (this.data.exStatus == 1 && this.data.expressAddress == ''){
        $.prompt('请填写详细的快递地址')
      }
      return 
    }
    // console.log(data1)
    this.setData({
      data:data1
    },()=>{
      wx.navigateTo({
        url: '../cosmetics-a/cosmetics-a',
      })
    })
    // return
  }
})