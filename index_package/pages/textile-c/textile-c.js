// index_package/pages/textile-c/textile-c.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restSample: [
      {
        name: '是',
      value: '是（不接受复检）'
      },
      {
        name: '否',
        value: '否'
      }
    ],
    judge: [
      {
        name: 'nojudge',
        value: '不判定'
      },
      {
        name: 'judge',
        value: '判定(委托方决定)'
      }
    ],
    serviceTime: [
      {
        name: '5个工作日',
        value: '标准时间(5个工作日)'
      },
      {
        name: '加急',
        value: '加急'
      }
    ],
    hurryTime: [
      {
        name: 'three',
        value: '3个工作日'
      },
      {
        name: 'two',
        value: '2个工作日'
      },
      {
        name: 'one',
        value: '1个工作日'
      }
    ],
    report: [
      {
        name: '中文',
        value: '中文'
      },
      {
        name: '英文',
        value: '英文(加收50元)'
      },
      {
        name: '中英文',
        value: '中英文(加收50元)'
      }
    ],
    reportType: [
      {
        name: 'notsure',
        value: '非认证认可报告'
      },
      {
        name: 'sure',
        value: '认证报告'
      },
      {
        name: 'sure1',
        value: '认证认可报告'
      }
    ],
    reportSend: [
      {
        name: '委托方自取',
        value: '委托方自取'
      },
      {
        name: '快递到付',
        value: '快递到付'
      },
      {
        name: '已付',
        value: '已付(收费25元)'
      },
      {
        name: 'email',
        value: 'E-mail'
      }
    ],
    ticketType: [
      {
        name: '与委托方相同',
        value: '与委托方相同'
      },
      {
        name: '其他',
        value: '其他(必须与付款方一致)'
      }
    ],

    agreement: false,
    opacity: 0,
    scale: 'translate(-50%,-50%) scale(0.3)',
    agreement1: false,
    opacity1: 0,
    scale1: 'translate(-50%,-50%) scale(0.3)',

    serviceTimeLimit: '',//服务时限
    serviceTimeLimit1: '',//加急的工作日
    reportFormat: '',//报告格式
    formatSend:'',//报告发送
    copyCount: '', //副本
    copyNum: 0,
    photoNum: 0,
    photoCount: '', //附照片
    formatSend: '',//报告发送
    formatType: '',//报告类别
    formatType1: '',
    formatType2:'',
    invoiceRise: '',//发票抬头
    invoiceType:'',//发票类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面栈
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    if (pages.length > 1) { //说明有上一页存在
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里，调用上一页的函数
      // console.log(prePage.data.data)
      this.setData({
        data2: prePage.data.data2
      })
    }
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

  // 是否退余样
  radioChange(e){
    console.log(e.detail.value)
    this.setData({
      isReturnSurplus:e.detail.value
    })
  },
  // 服务时限
  radioChange2(e) {
    console.log(e.detail.value)
    this.setData({
      serviceTimeLimit: e.detail.value
    })
  },
  radioChange2a(e) {
    console.log(e.detail.value)
    this.setData({
      serviceTimeLimit1: e.detail.value
    })
  },
  // 报告格式
  radioChange3(e) {
    console.log(e.detail.value)
    this.setData({
      reportFormat: e.detail.value
    })
  },
  checkboxChange(e) { //副本、特殊格式
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
      } else if (data[0] == '特殊格式') {
        this.setData({
          photoCount: data[0],
          copyCount: ''
        })
      }
    } else if (len == 2) {
      this.setData({
        copyCount: '副本',
        photoCount: '特殊格式'
      })
    }
  },
  radioChange4(e){
    console.log(e.detail.value)
    this.setData({
      formatSend:e.detail.value
    })
  },
  // radioChange5报告类别
  radioChange5(e){
    console.log(e.detail.value)
    this.setData({
      formatType:e.detail.value
    })
  },
  checkboxChange5a(e){
    console.log(e.detail.value)
    this.setData({
      formatType1:e.detail.value
    })
  },
  checkboxChange5b(e) {
    console.log(e.detail.value)
    this.setData({
      formatType2: e.detail.value
    })
  },
  // 发票抬头
  radioChange6(e){
    console.log(e.detail.value)
    this.setData({
      invoiceRise:e.detail.value
    })
  },
  // 发票抬头
  radioChange7(e) {
    console.log(e.detail.value)
    this.setData({
      invoiceType: e.detail.value
    })
  },
  // 表单提交
  formSubmit(e) {
    // 是否退余样
    if(!this.data.isReturnSurplus){
      $.prompt('请选择是否退余样')
      return
    }
    // 服务时限
    let serviceTimeLimit = '';
    if (this.data.serviceTimeLimit == ''){
      $.prompt('请选择服务时限')
      return
    }else{
      if(this.data.serviceTimeLimit == '加急'){
        if(this.data.serviceTimeLimit1 == ''){
          $.prompt('请选择服务时限加急的工作日')
          return
        }else{
          serviceTimeLimit = this.data.serviceTimeLimit1
        }
      }else{
        serviceTimeLimit = this.data.serviceTimeLimit
      }
    }

    // 报告格式
    let reportFormat;
    if(this.data.reportFormat == ''){
      $.prompt('请选择报告格式')
      return
    }else{
      reportFormat = this.data.reportFormat
    }
    if (this.data.copyCount == '副本' && e.detail.value.copyCount == '') {
      $.prompt('请填写报告格式副本的数量')
      return
    } else if (this.data.copyCount == '副本' && e.detail.value.copyCount != ''){
      this.setData({
        copyNum: e.detail.value.copyCount
      })
    }
    if (this.data.photoCount == '特殊格式') {
      this.setData({
        photoNum: 1
      })
    }

    // 报告发送
    if (this.data.formatSend == ''){
      $.prompt('请选择报告发送的方式')
      return
    }

    // 报告类别
    let formatType;
    if(this.data.formatType == ''){
      $.prompt('请选择报告类别')
      return
    }else{
      formatType = this.data.formatType
      if(this.data.formatType == '认证报告'){
        if(this.data.formatType1[0] != ''){
          formatType = `${formatType}/${this.data.formatType1[0]}`
        }
      }else if(this.data.formatType == '认证认可报告'){
        if(this.data.formatType2[0] != ''){
          formatType = `${formatType}/${this.data.formatType2[0]}`
        }
      }
    }
    // 发票抬头
    let invoiceRise;
    if(this.data.invoiceRise == ''){
      $.prompt('请选择发票抬头')
      return
    }else if(this.data.invoiceRise == '其他'){
      if (e.detail.value.invoiceRise == ''){
        $.prompt('请填写其他的发票抬头')
        return
      }else{
        invoiceRise = e.detail.value.invoiceRise
      }
    }else{
      invoiceRise = this.data.invoiceRise
    }

    // 发票类别
    if (!this.data.invoiceType){
      $.prompt('请选择发票类别')
      return
    }

    // 以上数据验证完毕，以下进行数据传递赋值
    let data = {
      isReturnSurplus:this.data.isReturnSurplus,
      serviceTimeLimit:serviceTimeLimit,
      reportFormat: `${reportFormat}/副本${this.data.copyNum}-特殊格式${this.data.photoNum}`,
      formatSend:this.data.formatSend,
      formatType:formatType,
      invoiceRise: invoiceRise,
      invoiceType: this.data.invoiceType
    }
    // 合并对象
    function extend(target, source) {
      for (var obj in source) {
        target[obj] = source[obj];
      }
      return target;
    }
    let data4 = extend(this.data.data3, data)
   
    console.log(data4)
    return
    this.setData({
      agreement: true
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

  },
  // 不同意服务协议
  cancel() {
    this.closeWindow()
  }
})