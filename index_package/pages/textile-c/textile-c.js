// index_package/pages/textile-c/textile-c.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restSample: [{
      name: 'sp',
      value: '服务方决定'
    },
    {
      name: 'wp',
      value: '委托方指定(请在委托方要求栏详细列出)'
    },
    ],
    judge: [{
      name: 'nojudge',
      value: '不判定'
    },
    {
      name: 'judge',
      value: '判定(委托方决定)'
    },
    ],
    serviceTime: [{
      name: 'normal',
      value: '标准时间(5个工作日)'
    },
    {
      name: 'hurry',
      value: '加急'
    },
    ],
    hurryTime: [{
      name: 'three',
      value: '3个工作日(加收50%)'
    },
    {
      name: 'two',
      value: '2个工作日(加收80%)'
    },
    {
      name: 'one',
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
    reportType: [{
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
      name: 'ticket',
      value: '与委托方相同'
    },
    {
      name: 'else',
      value: '其他(必须与付款方一致)'
    },
    ],

    agreement: false,
    opacity: 0,
    scale: 'translate(-50%,-50%) scale(0.3)',
    agreement1: false,
    opacity1: 0,
    scale1: 'translate(-50%,-50%) scale(0.3)',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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