// index_package/pages/cosmetics-b/cosmetics-b.js
import {
  Submit_data
} from './cosmetics-b_model.js'
var submit_data = new Submit_data()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceFn: [{
        name: '服务方决定',
        value: '服务方决定'
      },
      {
        name: '委托方指定',
        value: '委托方指定(请在委托方要求栏详细列出)'
      },
    ],
    judge: [{
        name: '不判定',
        value: '不判定'
      },
      {
        name: '判定',
        value: '判定(委托方决定)'
      },
    ],
    serviceTime: [{
        name: '5个工作日',
        value: '标准时间(5个工作日)'
      },
      {
        name: '加急',
        value: '加急'
      },
    ],
    hurryTime: [{
        name: '3个工作日',
        value: '3个工作日(加收50%)'
      },
      {
        name: '2个工作日',
        value: '2个工作日(加收80%)'
      },
      {
        name: '1个工作日',
        value: '1个工作日(加收100%)'
      },
    ],
    report: [{
        name: 'chinese',
        value: '中文'
      },
      {
        name: 'english',
        value: '英文(加收50元)'
      },
      {
        name: 'ce',
        value: '中英文对照(加收50元)'
      },
    ],
    reportSend: [{
        name: 'self',
        value: '委托方自取'
      },
      {
        name: 'getPay',
        value: '快递到付'
      },
      {
        name: 'payed',
        value: '快递已付(收费25元)'
      },
      {
        name: 'email',
        value: 'E-mail'
      },
      {
        name: 'fax',
        value: '传真'
      },
      {
        name: 'else',
        value: '其他'
      },
    ],
    ticketType: [{
        name: '与委托方相同',
        value: '与委托方相同'
      },
      {
        name: '其他',
        value: '其他(必须与付款方一致)'
      },
    ],

    agreement: false,
    opacity: 0,
    scale: 'translate(-50%,-50%) scale(0.3)',
    agreement1: false,
    opacity1: 0,
    scale1: 'translate(-50%,-50%) scale(0.3)',

    testMethod: '', //测试方法
    judgementStandard: '', //判定标准
    serviceTimeLimit: '', //服务时限
    detailTime: '', //加急-->具体时间
    reportFormMode: '',
    copyCount: '', //副本
    copyNum:0,
    photoNum:0,
    photoCount: '', //附照片
    reportType: '',
    checkbox5a: '',
    checkbox5b: '',
    reportSendMode: '',
    invoiceRise: '',
    invoiceType: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取页面栈
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    if (pages.length > 1) { //说明有上一页存在
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里，调用上一页的函数
      // console.log(prePage.data.data)
      this.setData({
        data3: prePage.data.data
      })
    }
  },

  // 样品保存
  radioChange1(e) {
    console.log(e.detail.value)
    this.setData({
      testMethod: e.detail.value
    })
  },
  // 判断标准
  radioChange2(e) {
    console.log(e.detail.value)
    this.setData({
      judgementStandard: e.detail.value
    })
  },
  // 服务时限
  radioChange3(e) {
    console.log(e.detail.value)
    this.setData({
      serviceTimeLimit: e.detail.value
    })
  },
  radioChange3a(e) {
    console.log(e.detail.value)
    this.setData({
      detailTime: e.detail.value
    })
  },
  // 报告格式
  radioChange4(e) {
    console.log(e.detail.value)
    this.setData({
      reportFormMode: e.detail.value
    })
  },
  checkboxChange(e) { //副本、附照片
    console.log(e)
    let len = e.detail.value.length
    let data = e.detail.value
    if (len == 0) {
      this.setData({
        copyCount: '',
        photoCount: ''
      })
    } else if (len == 1) {
      if (data[0] == '副本') {
        this.setData({
          copyCount: data[0],
          photoCount: ''
        })
      } else if (data[0] == '附照片') {
        this.setData({
          photoCount: data[0],
          copyCount: ''
        })
      }
    } else if (len == 2) {
      this.setData({
        copyCount: '副本',
        photoCount: '附照片'
      })
    }
  },
  // 报告类别
  radioChange5(e) {
    console.log(e.detail.value)
    this.setData({
      reportType: e.detail.value
    })
  },
  checkboxChange5a(e) {
    console.log(e)
    if (this.data.checkbox5a == "") {
      this.setData({
        // checkbox5a: e.detail.value[0],
        father5a: true,
        children5a: true,
        father5b: false,
        children5b: false
      })
    } else {
      this.setData({
        father5a: false,
        children5b: false
      })
    }
  },
  checkboxChange5b(e) {
    console.log(e)
    if (this.data.checkbox5b == "") {
      this.setData({
        // checkbox5b: e.detail.value[0],
        father5b: true,
        children5b: true,
        father5a: false,
        children5a: false
      })
    } else {
      this.setData({
        children5b: false,
        father5b: false
      })
    }
  },
  // 报告发送
  radioChange6(e) {
    console.log(e.detail.value)
    this.setData({
      reportSendMode: e.detail.value
    })
  },
  // 发票抬头
  radioChange7(e) {
    console.log(e.detail.value)
    this.setData({
      invoiceRise: e.detail.value
    })
  },
  // 发票类型
  radioChange8(e) {
    console.log(e.detail.value)
    this.setData({
      invoiceType: e.detail.value
    })
  },

  // 上一步
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 禁止蒙层下滑动
  stopMove() {
    return false
  },
  // 提交
  formSubmit(e) {
    // 是否判定
    if (this.data.judgementStandard != '不判定' && e.detail.value.judge != "") {
      this.setData({
        judgementStandard: e.detail.value.judge
      })
    }
    // 服务时限
    if (this.data.serviceTimeLimit == "加急" && this.data.detailTime != "") {
      this.setData({
        serviceTimeLimit: this.data.detailTime
      })
    }
    // 报告格式
    if (this.data.copyCount == '副本' && e.detail.value.copyCount != '') {
      this.setData({
        copyNum: e.detail.value.copyCount
      })
    }
    if (this.data.photoCount == '附照片' && e.detail.value.photoCount != '') {
      this.setData({
        photoNum: e.detail.value.photoCount
      })
    }
    // 报告类别
    if (this.data.reportType == '认证报告' && this.data.checkbox5a != '') {
      let reportType = '认证报告/' + this.data.checkbox5a
    } else if (this.data.reportType == '认证认可报告' && this.data.checkbox5b != '') {
      let reportType = '认证认可报告/' + this.data.checkbox5b
    } else {
      reportType: this.data.reportType
    }
    // 报告发送
    if (this.data.reportSendMode == '其他' && e.detail.value.reportSendMode != '') {
      this.setData({
        reportSendMode: e.detail.value.reportSend
      })
    }
    // 发票抬头
    if (this.data.invoiceRise == '其他' && e.detail.value.invoiceRise != '') {
      this.setData({
        invoiceRise: e.detail.value.invoiceRise
      })
    }
    // 发票类别
    if (this.data.invoiceType == '普票' && e.detail.value.invoiceType != '') {
      this.setData({
        invoiceType: e.detail.value.invoiceType
      })
    }
    let data4 = {
      testMethod: this.data.testMethod, //测试方法
      judgementStandard: this.data.judgementStandard, //判断标准
      serviceTimeLimit: this.data.serviceTimeLimit, //服务时限
      reportFormMode: this.data.reportFormMode + '/副本' + this.data.copyNum + '-照片' + this.data.photoNum, //报告格式
      reportType: this.data.reportType, //报告类别
      reportSendMode: this.data.reportSendMode, //报告发送方式
      invoiceRise: this.data.invoiceRise, //发票抬头
      invoiceType: this.data.invoiceType, //发票类型
      other: e.detail.value.elseValue, //其他
    }
    // console.log(data4)
    // return

    if (data4.testMethod == '') {
      $.prompt('请选择样品测试方法')
      return
    } else if (data4.judgementStandard == '' || this.data.judgementStandard == "判定" && e.detail.value.judge == '') {
      if (data4.judgementStandard == '') {
        $.prompt('请选择判断标准')
        return
      } else if (this.data.judgementStandard == "判定" && e.detail.value.judge == "") {
        $.prompt('请填写判断标准')
        return
      }
    } else if (data4.serviceTimeLimit == '' || this.data.serviceTimeLimit == "加急" && this.data.detailTime == '') {
      if (data4.serviceTimeLimit == '') {
        $.prompt('请选择服务时限')
        return
      } else if (this.data.serviceTimeLimit == "加急" && this.data.detailTime == '') {
        $.prompt('其选择加急的服务时限')
        return
      }
    } else if (this.data.reportFormMode == '' || this.data.copyCount == '副本' && e.detail.value.copyCount == '' || this.data.photoCount == '附照片' && e.detail.value.photoCount == '') {
      if (this.data.reportFormMode == '') {
        $.prompt('请选择报告格式')
        return
      } else if (this.data.copyCount == '副本' && e.detail.value.copyCount == '') {
        $.prompt('请填写副本的数量')
        return
      } else if (this.data.photoCount == '附照片' && e.detail.value.photoCount == '') {
        $.prompt('请填写附照片的数量')
        return
      }
    } else if (data4.reportType == '') {
      $.prompt('请选择报告类别')
      return
    } else if (data4.reportSendMode == '' || this.data.reportSendMode == '其他' && e.detail.value.reportSendMode == '') {
      if (data4.reportSendMode == '') {
        $.prompt('请选择报告发送方式')
        return
      } else if (this.data.reportSendMode == '其他' && e.detail.value.reportSendMode == '') {
        $.prompt('请填写报告发送的其他方式')
        return
      }
    } else if (data4.invoiceRise == '' || this.data.invoiceRise == '其他' && e.detail.value.invoiceRise == '') {
      if (data4.invoiceRise == '') {
        $.prompt('请选择发票抬头')
        return
      } else if (this.data.invoiceRise == '其他' && e.detail.value.invoiceRise == '') {
        $.prompt('请填写发票抬头')
        return
      }
    } else if (data4.invoiceType == '' || this.data.invoiceType == '普票' && e.detail.value.invoiceType == '') {
      if (data4.invoiceType == '') {
        $.prompt('请选择发票类型')
        return
      } else if (this.data.invoiceType == '普票' && e.detail.value.invoiceType == '') {
        $.prompt('请填写普票的资料')
        return
      }
    }
    console.log(data4)
    // 合并对象
    function extend(target, source) {
      for (var obj in source) {
        target[obj] = source[obj];
      }
      return target;
    }
    let data5a = extend(this.data.data3, data4)
    let data5b = {
      entrust:{cmtEntrust:data5a}
    }
    let data5 = extend(data5b,{
      orderType: '10', //提交表单的类型(10=>化妆品检测，20=>纺织品检测)
    })
    console.log(data5)
    // return
    this.setData({
      agreement: true,
      data5
    }, () => {
      this.setData({
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
  agree() {
    this.closeWindow()
    var data = this.data.data5
    submit_data.submitCosmetics(data, (res) => {
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg)
      }
      $.prompt('提交成功')
      setTimeout(()=>{
        wx.switchTab({
          url: '../../../mainPackage/index/index',
        })
      },1500)
    })
  },
  // 不同意服务协议
  cancel() {
    this.closeWindow()
  }
})