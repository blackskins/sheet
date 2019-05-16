// order_package/pages/my_order/my_order.js
import {
  My_order_model
} from './my_order_model.js'
var my_order_model = new My_order_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signIn: 0,//判断是否第一次进入页面
    postType:'click',//通过怎样的方式来获取订单数据,防止重复请求接口
    canvasImg: '', //签名的临时路径
    currentIndex: 0, //当前状态下标索引
    itemStatus: [{
        title: '全部',
        status: 0,
      },
      {
        title: '待签名',
        status: 12,
      },
      {
        title: '待揽收',
        status: 14,
      },
      {
        title: '待收样',
        status: 20,
      },
      {
        title: '待付款',
        status: 22,
      },
      {
        title: '待报告',
        status: 24,
      },
      {
        title: '发报告',
        status: 30,
      },
      {
        title: '已完成',
        status: 32,
      },
      {
        title: '修改中',
        status: 34,
      },
      {
        title: '改报告',
        status: 40,
      },
    ],
    scrollHeight: '', //实时获取设备scroll-view的高度
    currentOrderStatus: 0,
    orderList: [], //订单状态列表
    allOrderList: [],
    page: 1,
    pageSize: 10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const info = wx.getSystemInfoSync()
    console.log(info)
    var height = info.windowHeight - (152 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height,
      currentIndex: options.id
    })
    console.log(options.id)
    // return
    this.setData({
      isFirst: false,
      signIn: 1
    })
    if (options.id == 0) {
      let page = this.data.page
      this._getAllOrderList(page)
    } else {
      let list = this.data.itemStatus
      let status = list[options.id].status
      let page = this.data.page
      this._getOrderStatusList(status, page)
    }
    // 生成画布
    // this.drawSth()
    // this.canvas2()
    // this.canvas3()
    // this.canvas4()
  },
  onShow() {
    console.log('9999999999')
    let signIn = this.data.signIn
    if (signIn > 1) {
      if (this.data.currentIndex == 0) {
        let page = 1
        this._getAllOrderList(page)
      } else {
        let list = this.data.itemStatus
        let status = list[this.data.currentIndex].status
        let page = 1
        this._getOrderStatusList(status, page)
      }
    }
  },
  // 获取全部订单数据
  _getAllOrderList(page) {
    var page = page
    var pageSize = this.data.pageSize
    var list = this.data.allOrderList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    my_order_model.getAllOrderList(page, pageSize, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return
      }
      let allOrderList = res.data
      let len = allOrderList.length
      if (len < 10) {
        isMore = false
        nodata = true
        loading = false
      }
      if (page == 1) {
        list = allOrderList
      } else {
        list = allOrderList ? list.concat(allOrderList) : list
        time = 500
      }
      setTimeout(() => {
          this.setData({
            allOrderList: list,
            page: parseInt(page) + 1,
            isMore: isMore,
            loading: loading,
            loading_state: false,
            nodata: nodata
          }, () => {
            if (page == 1) {
              $.closeLoad()
            }
          })
        },
        time
      )
    })
  },
  // 获取不同订单状态的数据
  _getOrderStatusList(status, page) {
    var page = page
    var pageSize = this.data.pageSize
    var list = this.data.orderList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    my_order_model.getOrderStatusList(page, pageSize, status, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return
      }
      let orderList = res.data
      let len = orderList.length
      if (len < 10) {
        isMore = false
        nodata = true
        loading = false
      }
      if (page == 1) {
        list = orderList
      } else {
        list = orderList ? list.concat(orderList) : list
        time = 500
      }
      setTimeout(() => {
          this.setData({
            orderList: list,
            page: parseInt(page) + 1,
            isMore: isMore,
            loading: loading,
            loading_state: false,
            nodata: nodata
          }, () => {
            if (page == 1) {
              $.closeLoad()
            }
          })
        },
        time
      )
    })
  },
  // 选择当前状态的订单列表
  chooseItem(e) {
    // if(this.data.postType != 'click'){
    //   return
    // }
    var currentIndex = e.currentTarget.dataset.index
    this.setData({
      currentIndex: currentIndex,
      postType:'click'
    })
    if (currentIndex == 0) {
      let page = 1
      this._getAllOrderList(page)
    } else {
      let page = 1
      let list = this.data.itemStatus
      let status = list[currentIndex].status
      this._getOrderStatusList(status, page)
    }
  },
  // 切换订单状态列表
  changeItem(e) {
    // if(this.data.postType != 'swiper'){
    //   return
    // }
    // console.log(e)
    let currentIndex = e.detail.current
    this.setData({
      currentIndex: currentIndex,
      postType:'swiper'
    })
    if (currentIndex == 0) {
      let page = 1
      this._getAllOrderList(page)
    } else {
      let page = 1
      let list = this.data.itemStatus
      let status = list[currentIndex].status
      this._getOrderStatusList(status, page)
    }
  },
  // 订单触底加载更多
  reachBottom() {
    // console.log('进来了.......')
    let currentIndex = this.data.currentIndex
    if (currentIndex == 0) {
      let page = this.data.page
      this._getAllOrderList(page)
    } else {
      let page = this.data.page
      let list = this.data.itemStatus
      let status = list[currentIndex].status
      this._getOrderStatusList(status, page)
    }
  },
  // 跳转到订单详情页
  orderDetail(e) {
    let orderId = e.currentTarget.dataset.id
    let status = this.data.itemStatus[this.data.currentIndex].status
    wx.navigateTo({
      // url: '../order_detail/order_detail?orderId=' + orderId + '&status=' + status,
      url: `../order_detail/order_detail?orderId=${orderId}&status=${status}`,
      success: (res) => {
        this.setData({
          signIn: this.data.signIn + 1
        })
      }
    })
  },
  // 修改委托单
  modifyOrder(e){
    let {
      _id,
      order_type,
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../modify_form/modify_form?_id=${_id}&order_type=${order_type}`,
    })
  },
  // 保存画布
  saveImg1() {
    wx.canvasToTempFilePath({
      canvasId: 'canvas-2',
      quality: 1,
      success: (res) => {
        // 临时图片
        var canvasImg = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: canvasImg,
          success: function(res) {
            $.prompt('成功保存到手机本地相册', 2500)
          },
          fail: (res) => {
            console.log('授权失败')
            console.log(res)
            if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("打开设置窗口");
              this.setData({
                isAuth: false
              })
              wx.setStorageSync('isPath', 'no');
            }
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  // 保存画布2
  saveImg2() {
    wx.showLoading({
      title: '正在保存...',
    })

    wx.canvasToTempFilePath({
      canvasId: 'canvas-3',
      quality: 1,
      success: (res) => {
        // 临时图片
        var canvasImg = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: canvasImg,
          success: (res) => {
            wx.hideLoading()
            // $.prompt('成功保存到手机本地相册', 2500)
            wx.showToast({
              title: '成功保存到手机本地相册',
              duration: 2500
            })
          },
          fail: (res) => {
            console.log('授权失败')
            console.log(res)
            if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("打开设置窗口");
              this.setData({
                isAuth: false
              })
              wx.setStorageSync('isPath', 'no');
            }
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  // 保存画布3
  saveImg3() {
    wx.showLoading({
      title: '正在保存...',
    })
    wx.canvasToTempFilePath({
      canvasId: 'canvas-4',
      quality: 1,
      success: (res) => {
        // 临时图片
        var canvasImg = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: canvasImg,
          success: function(res) {
            wx.hideLoading()
            // $.prompt('成功保存到手机本地相册', 2500)
            wx.showToast({
              title: '成功保存到手机本地相册',
              duration: 2500
            })
          },
          fail: (res) => {
            console.log('授权失败')
            console.log(res)
            if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("打开设置窗口");
              this.setData({
                isAuth: false
              })
              wx.setStorageSync('isPath', 'no');
            }
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  // 画布----绘制化妆品委托单表格
  drawSth() {
    console.log('2222222')
    const ctx = wx.createCanvasContext('canvas-1');
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, 1500, 2115)
    // console.log(ctx)

    // 顶部文字
    ctx.setFontSize(24);
    ctx.setFillStyle('darkgray');
    ctx.fillText('广东省测试分析研究所（中国广州分析测试中心）管理体系支撑表单 ', 20, 50);
    ctx.fillText('NACC MS(p)/701.01.03-H00', 1100, 50);
    ctx.moveTo(18, 70);
    ctx.lineTo(1482, 70);
    ctx.setLineWidth(2.5);
    ctx.setStrokeStyle('#000')
    ctx.stroke()
    // const textLength = parseInt(ctx.measureText(`¥${this.data.GoodMsg.otherPrice}`).width);
    // 公司名称
    ctx.setFontSize(32)
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center')
    const width = parseInt(ctx.measureText('广东省测试分析研究所（中国广州分析测试中心）').width);
    ctx.fillText('广东省测试分析研究所（中国广州分析测试中心）', 1100 - width / 2, 130);


    // 委托服务标题
    ctx.setFontSize(36)
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center');
    const width1 = parseInt(ctx.measureText('委  托  服  务  登  记  表（通用）').width);
    ctx.fillText('委  托  服  务  登  记  表（通用）', 1000 - width1 / 2, 190);
    ctx.fillText('委  托  服  务  登  记  表（通用）', 1001 - width1 / 2, 191);
    ctx.setFontSize(24)
    ctx.fillText('查询号：', 1200, 190)

    // 注意内容
    ctx.setFontSize(24);
    ctx.setTextAlign('left');
    ctx.setFillStyle('#333');
    ctx.fillText('表内栏目如无内容可填请划空。“*”标识内容发出报告后原则上不予修改。', 30, 250)
    ctx.fillText('表内栏目如无内容可填请划空。“*”标识内容发出报告后原则上不予修改。', 30.5, 250.5)

    //画线框表
    ctx.moveTo(12, 280);
    ctx.lineTo(1488, 280);
    ctx.lineTo(1488, 2050);
    ctx.lineTo(12, 2050);
    ctx.lineTo(12, 278);
    ctx.setLineWidth(2.5);
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    // 委托方信息(竖线)
    ctx.moveTo(130, 280)
    ctx.lineTo(130, 1660)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(300, 280)
    ctx.lineTo(300, 960)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(300, 1300)
    ctx.lineTo(300, 2050)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    // 委托方信息横线
    ctx.moveTo(130, 342)
    ctx.lineTo(1488, 342)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(130, 402)
    ctx.lineTo(1488, 402)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(130, 462)
    ctx.lineTo(1488, 462)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(130, 522)
    ctx.lineTo(1488, 522)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(12, 582)
    ctx.lineTo(1488, 582)
    ctx.setLineWidth(3.5);
    ctx.stroke()


    // 委托方信息字段填充
    ctx.setFontSize(24)
    ctx.setFillStyle('#333')
    ctx.fillText('委', 60, 380)
    ctx.fillText('托', 60, 410)
    ctx.fillText('方', 60, 440)
    ctx.fillText('信', 60, 470)
    ctx.fillText('息', 60, 500)

    ctx.fillText('委托方', 180, 320)
    // 委托方的值
    ctx.fillText("北京市盈客通科技", 340, 320)

    ctx.fillText('*报告抬头', 160, 380)
    // 抬头的值
    ctx.beginPath()
    ctx.setLineWidth(2)
    ctx.setStrokeStyle('#666')
    ctx.strokeRect(340, 363, 20, 20)
    ctx.strokeRect(650, 363, 20, 20)
    // ctx.setFillStyle('#ccc')
    // ctx.fillRect(340, 425, 20, 20);
    // ctx.fill()

    ctx.setFontSize(24)
    ctx.setFillStyle('#333')
    ctx.fillText('与委托方相同', 384, 380)
    ctx.fillText('其他 :', 690, 380)
    // 其他的值
    ctx.fillText('我是其他我是其他。。。', 760, 380)
    ctx.closePath()



    ctx.fillText('联系电话', 170, 440)
    // 联系电话的值
    ctx.fillText('15813369563', 340, 440)

    ctx.fillText('联系地址', 170, 500)
    // 联系地址的值
    ctx.setFontSize(20)
    ctx.fillText('是的反垄断死灵法师的发顺丰是否是....', 310, 500)

    ctx.setFontSize(24)
    ctx.fillText('快递地址', 170, 560)
    // 快递地址的值
    ctx.beginPath()
    ctx.setLineWidth(2)
    ctx.setStrokeStyle('#666')
    ctx.strokeRect(340, 542, 20, 20)
    ctx.strokeRect(650, 542, 20, 20)

    ctx.setFontSize(24)
    ctx.fillText('与联系地址相同', 384, 560)
    ctx.fillText('其他 :', 690, 560)
    // 其他快递地址的值
    ctx.fillText('其他快递地址的值', 760, 560)

    ctx.fillText('E-mail', 875, 440)
    // e-mail的值
    ctx.setFontSize(22)
    ctx.fillText('2225696633@qq.com', 970, 440)

    ctx.fillText('传  真', 875, 500)
    // 传真的值
    ctx.fillText('传真的值...', 970, 500)

    ctx.fillText('联系人', 1240, 440)
    // 联系人的值
    ctx.fillText('今晚打老虎', 1340, 440)

    ctx.setFontSize(18)
    ctx.fillText('邮政编码', 1240, 500)
    // 邮政编码的值
    ctx.setFontSize(24)
    ctx.fillText('525300', 1340, 500)






    // 样品信息横线
    ctx.beginPath()
    ctx.setStrokeStyle('#333')
    ctx.moveTo(130, 662)
    ctx.lineTo(1488, 662)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(130, 742)
    ctx.lineTo(1488, 742)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(130, 822)
    ctx.lineTo(1488, 822)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(130, 882)
    ctx.lineTo(1488, 882)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(12, 962)
    ctx.lineTo(1488, 962)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    // 委托信息类下的小竖线
    ctx.moveTo(860, 402)
    ctx.lineTo(860, 522)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(960, 402)
    ctx.lineTo(960, 522)
    ctx.setLineWidth(3.5);
    ctx.stroke()


    ctx.moveTo(1230, 402)
    ctx.lineTo(1230, 522)
    ctx.setLineWidth(3.5);
    ctx.stroke()

    ctx.moveTo(1320, 402)
    ctx.lineTo(1320, 522)
    ctx.setLineWidth(3.5);
    ctx.stroke()


    // 样品信息内字段及值

    //样品信息字段分割线
    ctx.moveTo(500, 580);
    ctx.lineTo(500, 660);

    ctx.moveTo(640, 580);
    ctx.lineTo(640, 660);

    ctx.moveTo(860, 580);
    ctx.lineTo(860, 660);

    ctx.moveTo(980, 580);
    ctx.lineTo(980, 660);

    ctx.moveTo(1100, 580);
    ctx.lineTo(1100, 660);

    ctx.moveTo(1220, 580);
    ctx.lineTo(1220, 660);

    // 样品来源
    ctx.moveTo(1200, 742)
    ctx.lineTo(1200, 822)

    ctx.moveTo(1340, 742)
    ctx.lineTo(1340, 822)

    // 样品保存
    ctx.moveTo(850, 822)
    ctx.lineTo(850, 882)

    ctx.moveTo(980, 822)
    ctx.lineTo(980, 882)

    ctx.setStrokeStyle("#333")
    ctx.setLineWidth(4)
    ctx.stroke()

    ctx.fillText('样品批号', 520, 630)
    // 样品批号的值
    ctx.fillText('NDA24521541', 660, 630)

    ctx.fillText('样品个数', 870, 630)
    // 样品数值
    ctx.fillText('888个', 1000, 630)

    ctx.fillText('样品量', 1120, 630)
    // 样品量的值
    ctx.fillText('量足大幅度值', 1240, 630)

    //样品个数的值 

    // 标题
    ctx.fillText('样品信', 30, 710)
    ctx.fillText('息（多', 30, 740)
    ctx.fillText('样品时', 30, 770)
    ctx.fillText('请填写', 30, 800)
    ctx.fillText('附表）', 30, 830)

    // 样品名称
    ctx.fillText('*样品名称', 160, 630)
    // 名称值
    ctx.fillText('国色天香', 320, 630)

    ctx.fillText('样品类别', 165, 710)
    ctx.fillText('样品性状', 165, 790)
    ctx.fillText('样品保存', 165, 860)
    ctx.fillText('危险性', 180, 930)


    // 样品类别
    ctx.beginPath()
    ctx.setLineWidth(2)
    ctx.setStrokeStyle('#666')
    ctx.strokeRect(320, 675, 20, 20)
    ctx.strokeRect(435, 675, 20, 20)
    ctx.strokeRect(550, 675, 20, 20)
    ctx.strokeRect(665, 675, 20, 20)
    ctx.strokeRect(880, 675, 20, 20)
    ctx.strokeRect(995, 675, 20, 20)
    ctx.strokeRect(1210, 675, 20, 20)
    ctx.strokeRect(1350, 675, 20, 20)
    ctx.strokeRect(320, 710, 20, 20)
    ctx.strokeRect(435, 710, 20, 20)
    ctx.strokeRect(550, 710, 20, 20)
    ctx.strokeRect(695, 710, 20, 20)
    ctx.strokeRect(840, 710, 20, 20)

    // 样品性状
    ctx.strokeRect(320, 752, 20, 20)
    ctx.strokeRect(420, 752, 20, 20)
    ctx.strokeRect(520, 752, 20, 20)
    ctx.strokeRect(620, 752, 20, 20)
    ctx.strokeRect(720, 752, 20, 20)
    ctx.strokeRect(820, 752, 20, 20)
    ctx.strokeRect(920, 752, 20, 20)
    ctx.strokeRect(1050, 752, 20, 20)
    ctx.strokeRect(320, 787, 20, 20)
    ctx.strokeRect(420, 787, 20, 20)
    ctx.strokeRect(520, 787, 20, 20)
    ctx.strokeRect(1350, 752, 20, 20)
    ctx.strokeRect(1350, 787, 20, 20)

    // 样品保存
    ctx.strokeRect(320, 842, 20, 20)
    ctx.strokeRect(460, 842, 20, 20)
    ctx.strokeRect(600, 842, 20, 20)

    // 余样处理
    ctx.strokeRect(990, 842, 20, 20)
    ctx.strokeRect(1190, 842, 20, 20)
    ctx.strokeRect(1300, 842, 20, 20)

    // 危险性
    ctx.strokeRect(320, 897, 20, 20)
    ctx.strokeRect(400, 897, 20, 20)
    ctx.strokeRect(670, 897, 20, 20)
    ctx.strokeRect(760, 897, 20, 20)
    ctx.strokeRect(860, 897, 20, 20)
    ctx.strokeRect(1030, 897, 20, 20)
    ctx.strokeRect(1150, 897, 20, 20)
    ctx.strokeRect(1250, 897, 20, 20)
    ctx.strokeRect(1370, 897, 20, 20)

    ctx.strokeRect(320, 932, 20, 20)
    ctx.strokeRect(440, 932, 20, 20)
    ctx.strokeRect(550, 932, 20, 20)

    // ctx.setFillStyle('#ccc')
    // ctx.fillRect(340, 425, 20, 20);
    // ctx.fill()

    // 样品类别选项
    ctx.setFontSize(24)
    ctx.setFillStyle('#333')
    ctx.fillText('食品类', 350, 692)
    ctx.fillText('保健品', 465, 692)
    ctx.fillText('环境类', 580, 692)
    ctx.fillText('医药及相关产品', 695, 692)
    ctx.fillText('饮用水', 910, 692)
    ctx.fillText('饲料及相关产品', 1025, 692)
    ctx.fillText('化工产品', 1240, 692)
    ctx.fillText('化学试剂', 1380, 692)
    ctx.fillText('肥料类', 350, 727)
    ctx.fillText('农药类', 465, 727)
    ctx.fillText('日化产品', 580, 727)
    ctx.fillText('金属材料', 725, 727)
    ctx.fillText('其他：', 870, 727)
    // 其他的值
    ctx.fillText('其他的值滴滴滴...', 940, 727)

    // 样品性状的选项文字
    ctx.fillText('颗粒', 350, 770)
    ctx.fillText('粉末', 450, 770)
    ctx.fillText('块状', 550, 770)
    ctx.fillText('片状', 650, 770)
    ctx.fillText('棒状', 750, 770)
    ctx.fillText('液体', 850, 770)
    ctx.fillText('乳状液', 950, 770)
    ctx.fillText('粘稠液', 1080, 770)
    ctx.fillText('气体', 350, 805)
    ctx.fillText('裹体', 450, 805)
    ctx.fillText('其他：', 550, 805)
    // 其他的值
    ctx.fillText('其他的值的...', 630, 805)


    // 样品来源选项
    ctx.fillText('样品来源', 1220, 790)
    ctx.fillText('送检', 1380, 770)
    ctx.fillText('委托采样', 1380, 805)

    // 样品保存
    ctx.fillText('常规', 350, 860)
    ctx.fillText('避光', 490, 860)
    ctx.fillText('低温(未知 ℃)', 630, 860)

    // 余样处理
    ctx.fillText('余样处理', 865, 860)
    ctx.fillText('由委托方取回（', 1020, 860)
    ctx.fillText('寄回）', 1220, 860)
    ctx.fillText('由服务方处理', 1330, 860)

    // 危险性
    ctx.fillText('无', 350, 915)
    ctx.fillText('未知', 430, 915)
    ctx.fillText('有以下危险性：', 500, 915)
    ctx.fillText('易燃', 700, 915)
    ctx.fillText('易爆', 790, 915)
    ctx.fillText('刺激性气味', 890, 915)
    ctx.fillText('氧化性', 1060, 915)
    ctx.fillText('毒性', 1180, 915)
    ctx.fillText('感染性', 1280, 915)
    ctx.fillText('放射性', 1400, 915)
    ctx.fillText('腐蚀性', 350, 950)
    ctx.fillText('磁性', 470, 950)
    ctx.fillText('其他：', 580, 950)
    // 其他的值
    ctx.fillText('我是其他我是其他....', 660, 950)


    //委托要求的区域
    ctx.moveTo(12, 1300)
    ctx.lineTo(1488, 1300)

    ctx.setStrokeStyle('#333')
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.fillText('委托', 46, 1120)
    ctx.fillText('要求', 46, 1150)

    // 委托要求具体细项
    ctx.fillText('的方式来发动机的开发的理发店里看风景的看见的看甲方鲁大师咖啡店开多开多开上岛咖啡代理商看的咖啡店', 150, 1000)

    // ctx.fillText('颗粒', 350, 770)
    // ctx.fillText('颗粒',350,770)

    // 服务要求横线
    ctx.moveTo(130, 1340)
    ctx.lineTo(1488, 1340)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(130, 1420)
    ctx.lineTo(1488, 1420)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(130, 1460)
    ctx.lineTo(1488, 1460)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(130, 1500)
    ctx.lineTo(1488, 1500)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(130, 1540)
    ctx.lineTo(1488, 1540)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(130, 1580)
    ctx.lineTo(1488, 1580)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(12, 1660)
    ctx.lineTo(1488, 1660)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(12, 1710)
    ctx.lineTo(1488, 1710)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(12, 1820)
    ctx.lineTo(1488, 1820)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(12, 1870)
    ctx.lineTo(1488, 1870)
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(12, 1920)
    ctx.lineTo(1488, 1920)
    ctx.setStrokeStyle('#333')
    ctx.stroke()


    // 服务要求信息字段
    ctx.fillText('服务', 46, 1470)
    ctx.fillText('要求', 46, 1500)

    // 服务下的字段
    ctx.fillText('测试方法', 170, 1328)
    ctx.fillText('判定标准', 170, 1390)
    ctx.fillText('服务时限', 170, 1448)
    ctx.fillText('报告格式', 170, 1488)
    ctx.fillText('报告类别', 170, 1528)
    ctx.fillText('报告发送', 170, 1568)
    ctx.fillText('其他', 190, 1628)
    // 其他的值
    ctx.fillText('其他其他其他......', 320, 1608)


    ctx.fillText('服务费用', 100, 1694)
    // 服务费用的值
    ctx.fillText('测试费用：', 320, 1694)
    ctx.fillText('元', 600, 1694)
    ctx.fillText('其他费用：', 750, 1694)
    ctx.fillText('元', 1000, 1694)

    ctx.fillText('付费方式', 100, 1775)
    ctx.fillText('*发票抬头', 100, 1852)
    ctx.fillText('*发票类别', 100, 1902)
    ctx.fillText('备注', 130, 1992)
    ctx.fillText('备注', 131, 1993)
    // 备注的内容
    ctx.fillText('1.委托方提供的样品及信息的准确性、真实性和完整性由委托方确认，中广测不承担证实的责任；', 320, 1970)
    ctx.fillText('2.非认证、认可报告或项目不具备社会证明作用，仅供委托方内部使用。', 320, 2010)
    ctx.fillText('1.委托方提供的样品及信息的准确性、真实性和完整性由委托方确认，中广测不承担证实的责任；', 320.5, 1970.5)
    ctx.fillText('2.非认证、认可报告或项目不具备社会证明作用，仅供委托方内部使用。', 320.5, 2010.5)

    // 服务方法下的分类项
    ctx.beginPath()
    ctx.setLineWidth(2)
    ctx.setStrokeStyle('#666')

    // 服务---->测试方法
    ctx.strokeRect(320, 1310, 20, 20)
    ctx.strokeRect(550, 1310, 20, 20)

    // 服务------>判定标准
    ctx.strokeRect(320, 1352, 20, 20)
    ctx.strokeRect(500, 1352, 20, 20)
    ctx.strokeRect(320, 1388, 20, 20)

    // 服务------>服务时限
    ctx.strokeRect(320, 1430, 20, 20)
    ctx.strokeRect(610, 1430, 20, 20)
    ctx.strokeRect(900, 1430, 20, 20)
    ctx.strokeRect(1190, 1430, 20, 20)

    // 服务------>报告格式
    ctx.strokeRect(320, 1470, 20, 20)
    ctx.strokeRect(420, 1470, 20, 20)
    ctx.strokeRect(660, 1470, 20, 20)
    ctx.strokeRect(860, 1470, 20, 20)
    ctx.strokeRect(1150, 1470, 20, 20)

    //服务------>报告类别
    ctx.strokeRect(320, 1510, 20, 20)
    ctx.strokeRect(528, 1510, 20, 20)
    ctx.strokeRect(682, 1510, 20, 20)
    ctx.strokeRect(858, 1510, 20, 20)
    ctx.strokeRect(1060, 1510, 20, 20)

    //服务-------->报告发送
    ctx.strokeRect(320, 1550, 20, 20)
    ctx.strokeRect(490, 1550, 20, 20)
    ctx.strokeRect(674, 1550, 20, 20)
    ctx.strokeRect(906, 1550, 20, 20)
    ctx.strokeRect(1028, 1550, 20, 20)

    //服务-------->付费方式
    ctx.strokeRect(320, 1730, 20, 20)
    ctx.strokeRect(470, 1730, 20, 20)
    ctx.strokeRect(570, 1730, 20, 20)
    ctx.strokeRect(670, 1730, 20, 20)
    ctx.strokeRect(830, 1730, 20, 20)
    ctx.strokeRect(980, 1730, 20, 20)
    ctx.strokeRect(1140, 1730, 20, 20)
    ctx.strokeRect(320, 1780, 20, 20)

    //服务------->发票抬头
    ctx.strokeRect(320, 1834, 20, 20)
    ctx.strokeRect(570, 1834, 20, 20)

    //服务------->发票类别
    ctx.strokeRect(320, 1884, 20, 20)
    ctx.strokeRect(960, 1884, 20, 20)

    // 字段名
    ctx.fillText('服务方决定', 350, 1328)
    ctx.fillText('委托方指定（请在委托要求栏详细列出）', 580, 1328)

    ctx.fillText('不判定', 350, 1370)
    ctx.fillText('判定（请在委托要求栏详细列出）', 530, 1370)
    ctx.fillText('判定（产品）标准：', 350, 1405)

    ctx.fillText('标准时间（五个工作日）', 350, 1448)
    ctx.fillText('3个工作日（加收50%）', 640, 1448)
    ctx.fillText('2个工作日（加收80%）', 930, 1448)
    ctx.fillText('1个工作日（加收100%）', 1220, 1448)

    ctx.fillText('中文', 350, 1488)
    ctx.fillText('英文（加收50元）', 450, 1488)
    ctx.fillText('中英文对照', 690, 1488)
    ctx.fillText('附照片（加收50/张）', 890, 1488)
    ctx.fillText('副本（20/份）', 1180, 1488)

    ctx.fillText('非认证认可报告', 350, 1528)
    ctx.fillText('认证报告（', 558, 1528)
    ctx.fillText('非认证项目）', 712, 1528)
    ctx.fillText('认证认可报告（', 888, 1528)
    ctx.fillText('含非认证认可项目）', 1096, 1528)

    ctx.fillText('委托方自取', 350, 1568)
    ctx.fillText('快递（到付）', 520, 1568)
    ctx.fillText('快递已付（25元）', 704, 1568)
    ctx.fillText('E-mail', 936, 1568)
    ctx.fillText('传真', 1058, 1568)


    ctx.fillText('现场付费(', 350, 1748)
    ctx.fillText('现金、', 500, 1748)
    ctx.fillText('支票、', 600, 1748)
    ctx.fillText('刷卡）', 700, 1748)
    ctx.fillText('银行汇款', 860, 1748)
    ctx.fillText('定期结算', 1010, 1748)
    ctx.fillText('从预付款中抵扣', 1170, 1748)
    ctx.fillText('预交费：', 350, 1798)
    ctx.fillText('元', 580, 1798)


    ctx.fillText('与委托方相同', 350, 1852)
    ctx.fillText('其他（必须与付款方一致）：', 600, 1852)
    // 其他的值
    ctx.fillText('与委托方一样', 920, 1852)

    ctx.fillText('普票（税号：', 350, 1902)
    ctx.fillText('）', 900, 1902)
    ctx.fillText('专票（需提供开票资料）', 990, 1902)
    ctx.draw();
  },


  //纺织品表单 ---------------------------------------------------------------纺织品表单
  canvas2() {
    const ctx = wx.createCanvasContext('canvas-2');
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, 1700, 2517)
    // console.log(ctx)

    // 顶部文字
    ctx.setFontSize(24);
    ctx.setFillStyle('darkgray');
    ctx.fillText('广东省测试分析研究所（中国广州分析测试中心）管理体系支撑表单 ', 20, 50);
    ctx.fillText('NACC MS(p)/701.01.03-H00', 1300, 50);
    ctx.moveTo(18, 70);
    ctx.lineTo(1682, 70);
    ctx.setLineWidth(2.5);
    ctx.setStrokeStyle('#000')
    ctx.stroke()
    // const textLength = parseInt(ctx.measureText(`¥${this.data.GoodMsg.otherPrice}`).width);
    // 公司名称
    ctx.setFontSize(32)
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center')
    const width = parseInt(ctx.measureText('广东省测试分析研究所（中国广州分析测试中心）').width);
    ctx.fillText('广东省测试分析研究所（中国广州分析测试中心）', 1200 - width / 2, 130);


    // 委托服务标题
    ctx.setFontSize(36)
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center');
    const width1 = parseInt(ctx.measureText('委  托  服  务  登  记  表（纺织品）').width);
    ctx.fillText('委  托  服  务  登  记  表（纺织品）', 1100 - width1 / 2, 190);
    ctx.fillText('委  托  服  务  登  记  表（纺织品）', 1101 - width1 / 2, 191);
    ctx.setFontSize(24)
    ctx.fillText('查询号：', 1300, 190)

    // 注意内容
    ctx.setFontSize(24);
    ctx.setTextAlign('left');
    ctx.setFillStyle('#333');
    ctx.fillText('表内栏目如无内容可填请划空。“*”标识内容发出报告后原则上不予修改。', 30, 250)
    ctx.fillText('表内栏目如无内容可填请划空。“*”标识内容发出报告后原则上不予修改。', 30.5, 250.5)

    //画线框表
    ctx.moveTo(12, 280);
    ctx.lineTo(1688, 280);
    ctx.lineTo(1688, 2490);
    ctx.lineTo(12, 2490);
    ctx.lineTo(12, 278);
    ctx.setLineWidth(3.5);
    ctx.setStrokeStyle('#333')
    ctx.stroke()


    // 画竖线
    ctx.moveTo(60, 280);
    ctx.lineTo(60, 2120);
    ctx.setLineWidth(3.5);
    ctx.setStrokeStyle('#333')
    ctx.stroke()

    ctx.moveTo(252, 280);
    ctx.lineTo(252, 2490);
    ctx.setLineWidth(3.5);
    ctx.setStrokeStyle('#333')
    ctx.stroke()


    //画表格的横线
    // 横线--------->委托单信息
    ctx.moveTo(60, 340)
    ctx.lineTo(1688, 340)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 400)
    ctx.lineTo(1688, 400)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 460)
    ctx.lineTo(1688, 460)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 520)
    ctx.lineTo(1688, 520)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(12, 580)
    ctx.lineTo(1688, 580)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    

    // 横线------------------------------>样品信息
    ctx.moveTo(60, 640)
    ctx.lineTo(1688, 640)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 700)
    ctx.lineTo(1688, 700)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 760)
    ctx.lineTo(1688, 760)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(12, 820)
    ctx.lineTo(1688, 820)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    //横线----------------->委托要求

    ctx.moveTo(60, 880)
    ctx.lineTo(1688, 880)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 940)
    ctx.lineTo(1688, 940)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1000)
    ctx.lineTo(1688, 1000)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1060)
    ctx.lineTo(1688, 1060)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1200)
    ctx.lineTo(1688, 1200)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1440)
    ctx.lineTo(1688, 1440)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(252, 1520)
    ctx.lineTo(1688, 1520)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1580)
    ctx.lineTo(1688, 1580)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(252, 1618)
    ctx.lineTo(1688, 1618)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(12, 1700)
    ctx.lineTo(1688, 1700)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    //横线----------------------->服务要求

    ctx.moveTo(60, 1760)
    ctx.lineTo(1688, 1760)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1820)
    ctx.lineTo(1688, 1820)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1880)
    ctx.lineTo(1688, 1880)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 1940)
    ctx.lineTo(1688, 1940)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(60, 2060)
    ctx.lineTo(1688, 2060)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(12, 2120)
    ctx.lineTo(1688, 2120)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    //横线----------------------->服务要求以下

    ctx.moveTo(12, 2180)
    ctx.lineTo(1688, 2180)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(12, 2300)
    ctx.lineTo(1688, 2300)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    ctx.moveTo(12, 2360)
    ctx.lineTo(1688, 2360)
    ctx.setLineWidth(3.5)
    ctx.stroke()

    //委托方信息
    // ctx.setFontSize();
    ctx.fillText('委', 25, 380);
    ctx.fillText('托', 25, 410);
    ctx.fillText('方', 25, 440);
    ctx.fillText('信', 25, 470);
    ctx.fillText('息', 25, 500);

    //样品标题
    ctx.fillText('样', 25, 655);
    ctx.fillText('品', 25, 685);
    ctx.fillText('信', 25, 715);
    ctx.fillText('息', 25, 745);

    //委托要求（项目名称）
    ctx.fillText('委', 25, 1120);
    ctx.fillText('托', 25, 1150);
    ctx.fillText('要', 25, 1180);
    ctx.fillText('求', 25, 1210);
    ctx.fillText('︵', 25, 1240);
    ctx.fillText('项', 25, 1270);
    ctx.fillText('目', 25, 1300);
    ctx.fillText('名', 25, 1330);
    ctx.fillText('称', 25, 1360);
    ctx.fillText('︶', 25, 1390);

    //服务要求
    ctx.fillText('服', 25, 1855)
    ctx.fillText('务', 25, 1885)
    ctx.fillText('要', 25, 1915)
    ctx.fillText('求', 25, 1945)


    //委托方信息----->对应字段
    ctx.fillText('*委托方', 110, 320);
    ctx.fillText('*委托方地址', 90, 380);
    ctx.fillText('生产单位', 110, 440);
    ctx.fillText('电话/手机', 100, 500);
    ctx.fillText('报告寄送地址', 85, 560);

    //样品信息----->对应字段
    ctx.fillText('*样品名称', 100, 620);
    ctx.fillText('颜色及描述', 95, 680);
    ctx.fillText('*货款/货号', 90, 740);
    ctx.fillText('其他信息', 110, 800);

    //委托要求信息----->对应字段
    ctx.fillText('综  合', 125, 860);
    ctx.fillText('纤维成份', 105, 920);
    ctx.fillText('色牢度', 125, 980);
    ctx.fillText('化  学', 120, 1040);
    ctx.fillText('物理性能', 105, 1140);
    ctx.fillText('其他项目', 105, 1330);
    ctx.fillText('检测方法', 105, 1520);
    ctx.fillText('判断标准', 105, 1650);


    //服务要求-------------->对应字段
    ctx.fillText('是否退余样', 95, 1738);
    ctx.fillText('报告类别', 110, 1798);
    ctx.fillText('报告格式', 110, 1858);
    ctx.fillText('报告发送', 110, 1918);
    ctx.fillText('分包要求', 110, 2008);
    ctx.fillText('报告类别', 110, 2098);


    //其他------->对应字段
    ctx.fillText('服务费用', 80, 2158)
    ctx.fillText('付费方式', 80, 2248)
    ctx.fillText('发票抬头', 80, 2338)
    ctx.fillText('备注', 105, 2428)
    ctx.fillText('备注', 106, 2429)


    // 画小矩形框框(270)

    ctx.setLineWidth(2)
    ctx.setStrokeStyle('#666')

    // 委托方-->生产单位s
    ctx.strokeRect(270, 420, 20, 20)
    ctx.strokeRect(570, 420, 20, 20)

    //委托方---->报告寄送地址
    ctx.strokeRect(270, 540, 20, 20)
    ctx.strokeRect(630, 540, 20, 20)


    //委托要求----->综合
    ctx.strokeRect(270, 840, 20, 20)
    ctx.strokeRect(750, 840, 20, 20)
    ctx.strokeRect(970, 840, 20, 20)
    ctx.strokeRect(1160, 840, 20, 20)
    ctx.strokeRect(1330, 840, 20, 20)
    ctx.strokeRect(1450, 840, 20, 20)

    //委托要求----->纤维含量
    ctx.strokeRect(270, 900, 20, 20)
    ctx.strokeRect(450, 900, 20, 20)
    ctx.strokeRect(700, 900, 20, 20)

    //委托要求----->色牢度
    ctx.strokeRect(270, 960, 20, 20)
    ctx.strokeRect(420, 960, 20, 20)
    ctx.strokeRect(500, 960, 20, 20)
    ctx.strokeRect(600, 960, 20, 20)
    ctx.strokeRect(700, 960, 20, 20)
    ctx.strokeRect(840, 960, 20, 20)
    ctx.strokeRect(920, 960, 20, 20)
    ctx.strokeRect(1020, 960, 20, 20)
    ctx.strokeRect(1160, 960, 20, 20)
    ctx.strokeRect(1300, 960, 20, 20)
    ctx.strokeRect(1420, 960, 20, 20)

    //委托要求----->化学
    ctx.strokeRect(270, 1020, 20, 20)
    ctx.strokeRect(390, 1020, 20, 20)
    ctx.strokeRect(540, 1020, 20, 20)
    ctx.strokeRect(660, 1020, 20, 20)
    ctx.strokeRect(980, 1020, 20, 20)
    ctx.strokeRect(1160, 1020, 20, 20)
    ctx.strokeRect(1360, 1020, 20, 20)

    //委托要求----->物理性能
    ctx.strokeRect(270, 1075, 20, 20)
    ctx.strokeRect(430, 1075, 20, 20)
    ctx.strokeRect(570, 1075, 20, 20)
    ctx.strokeRect(720, 1075, 20, 20)
    ctx.strokeRect(870, 1075, 20, 20)
    ctx.strokeRect(980, 1075, 20, 20)
    ctx.strokeRect(1120, 1075, 20, 20)
    ctx.strokeRect(1270, 1075, 20, 20)
    ctx.strokeRect(1460, 1075, 20, 20)


    ctx.strokeRect(270, 1120, 20, 20)
    ctx.strokeRect(590, 1120, 20, 20)
    ctx.strokeRect(740, 1120, 20, 20)
    ctx.strokeRect(870, 1120, 20, 20)
    ctx.strokeRect(980, 1120, 20, 20)
    ctx.strokeRect(1070, 1120, 20, 20)
    ctx.strokeRect(1175, 1120, 20, 20)
    ctx.strokeRect(1335, 1120, 20, 20)
    ctx.strokeRect(1425, 1120, 20, 20)
    ctx.strokeRect(1515, 1120, 20, 20)


    ctx.strokeRect(270, 1165, 20, 20)
    ctx.strokeRect(450, 1165, 20, 20)
    ctx.strokeRect(630, 1165, 20, 20)
    ctx.strokeRect(880, 1165, 20, 20)
    ctx.strokeRect(1050, 1165, 20, 20)
    ctx.strokeRect(1250, 1165, 20, 20)
    ctx.strokeRect(1400, 1165, 20, 20)
    ctx.strokeRect(1510, 1165, 20, 20)

    // 委托要求------>检测方法
    ctx.strokeRect(270, 1452, 20, 20)
    ctx.strokeRect(506, 1452, 20, 20)

    ctx.strokeRect(270, 1486, 20, 20)
    ctx.strokeRect(530, 1486, 20, 20)
    ctx.strokeRect(766, 1486, 20, 20)
    ctx.strokeRect(966, 1486, 20, 20)
    ctx.strokeRect(1166, 1486, 20, 20)

    ctx.strokeRect(270, 1540, 20, 20)

    // 委托要求--------->判断标准
    ctx.strokeRect(270, 1590, 20, 20)
    ctx.strokeRect(410, 1590, 20, 20)
    ctx.strokeRect(520, 1590, 20, 20)
    ctx.strokeRect(690, 1590, 20, 20)

    ctx.strokeRect(270, 1632, 20, 20)
    ctx.strokeRect(440, 1632, 20, 20)
    ctx.strokeRect(500, 1632, 20, 20)
    ctx.strokeRect(560, 1632, 20, 20)
    ctx.strokeRect(696, 1632, 20, 20)
    ctx.strokeRect(872, 1632, 20, 20)
    ctx.strokeRect(932, 1632, 20, 20)
    ctx.strokeRect(996, 1632, 20, 20)
    ctx.strokeRect(1180, 1632, 20, 20)
    ctx.strokeRect(1366, 1632, 20, 20)
    ctx.strokeRect(1522, 1632, 20, 20)

    ctx.strokeRect(270, 1668, 20, 20)
    ctx.strokeRect(882, 1668, 20, 20)
    ctx.strokeRect(1002, 1668, 20, 20)
    ctx.strokeRect(1122, 1668, 20, 20)
    ctx.strokeRect(1244, 1668, 20, 20)


    // 服务要求------>是否退余样
    ctx.strokeRect(270, 1720, 20, 20)
    ctx.strokeRect(552, 1720, 20, 20)

    // 服务要求------>报告类别
    ctx.strokeRect(270, 1780, 20, 20)
    ctx.strokeRect(460, 1780, 20, 20)
    ctx.strokeRect(660, 1780, 20, 20)
    ctx.strokeRect(760, 1780, 20, 20)
    ctx.strokeRect(990, 1780, 20, 20)
    ctx.strokeRect(1200, 1780, 20, 20)

    // 服务要求------>报告格式
    ctx.strokeRect(270, 1840, 20, 20)
    ctx.strokeRect(430, 1840, 20, 20)
    ctx.strokeRect(760, 1840, 20, 20)
    ctx.strokeRect(1060, 1840, 20, 20)
    ctx.strokeRect(1380, 1840, 20, 20)

    // 服务要求------>报告发送
    ctx.strokeRect(270, 1900, 20, 20)
    ctx.strokeRect(540, 1900, 20, 20)
    ctx.strokeRect(760, 1900, 20, 20)
    ctx.strokeRect(1060, 1900, 20, 20)

    // 服务要求------>分包要求
    ctx.strokeRect(410, 1964, 20, 20)
    ctx.strokeRect(500, 1964, 20, 20)

    ctx.strokeRect(270, 2012, 20, 20)
    ctx.strokeRect(570, 2012, 20, 20)

    // 服务要求------>报告类别
    ctx.strokeRect(270, 2082, 20, 20)
    ctx.strokeRect(580, 2082, 20, 20)
    ctx.strokeRect(730, 2082, 20, 20)
    ctx.strokeRect(1040, 2082, 20, 20)
    ctx.strokeRect(1240, 2082, 20, 20)


    // 其他---------->服务费用
    ctx.strokeRect(270, 2206, 20, 20)
    ctx.strokeRect(770, 2206, 20, 20)

    ctx.strokeRect(270, 2254, 20, 20)
    ctx.strokeRect(540, 2254, 20, 20)

    // 其他--------------->发票抬头
    ctx.strokeRect(270, 2320, 20, 20)
    ctx.strokeRect(540, 2320, 20, 20)


    // ctx.strokeRect(270, 1540, 20, 20)


    // 对应模快字段下的选项值
    // 委托方信息------>
    ctx.fillText('北京盈客通天下科技有限公司广州分公司', 270, 320)

    ctx.fillText('北京盈客通天下科技有限公司广州分公司', 270, 380)

    ctx.fillText('与委托方相同', 300, 438)
    ctx.fillText('其他：', 600, 438)
    // 其他的值
    ctx.fillText('与委托方相同', 675, 438)

    ctx.fillText('1586666666', 270, 498)

    ctx.fillText('与委托方地址相同', 300, 558)

    ctx.fillText('其他：', 660, 558)
    // 其他的值
    ctx.fillText('广州手机号地方近点领导说卡士大夫卡士大夫了', 740, 558)


    // 样品信息
    ctx.fillText('样品名称11112', 270, 618);
    ctx.fillText('颜色及描述。。。。。', 270, 678)
    ctx.fillText('货款货号货款货号货款货号', 270, 738)
    ctx.fillText('其他信息其他信息', 270, 798)


    // 委托要求

    // 综合项
    ctx.fillText('常规套餐(GB 18401+纤维含量+标识）', 300, 858)
    ctx.fillText('GB 18401全项', 780, 858)
    ctx.fillText('产品标识', 1000, 858)
    ctx.fillText('GB 31701（', 1190, 858)
    ctx.fillText('全项', 1360, 858)
    ctx.fillText('物理性能 )', 1480, 858)

    // 纤维成分
    ctx.fillText('纤维含量', 300, 918)
    ctx.fillText('棉麻纤维含量', 480, 918)
    ctx.fillText('特种毛含量', 730, 918)

    // 色牢度
    ctx.fillText('耐摩擦（', 300, 978)
    ctx.fillText('干、', 450, 978)
    ctx.fillText('湿 ）', 530, 978)
    ctx.fillText('耐水', 630, 978)
    ctx.fillText('耐汗渍（', 730, 978)
    ctx.fillText('碱、', 870, 978)
    ctx.fillText('酸 ）', 950, 978)
    ctx.fillText('耐皂洗', 1050, 978)
    ctx.fillText('耐唾液', 1190, 978)
    ctx.fillText('耐光', 1330, 978)
    ctx.fillText('耐光汗', 1450, 978)

    // 化学
    ctx.fillText('甲醛', 300, 1038);
    ctx.fillText('pH值', 420, 1038);
    ctx.fillText('异味', 570, 1038);
    ctx.fillText('可分解芳香胺(偶氮)', 690, 1038);
    ctx.fillText('邻苯二甲酸酯', 1010, 1038);
    ctx.fillText('可萃取重金属', 1190, 1038);
    ctx.fillText('重金属（总铅、总鎘）', 1390, 1038);

    // 物理性能
    ctx.fillText('撕破力强（', 300, 1093)
    ctx.fillText('摆锤法', 460, 1093)
    ctx.fillText('单舌法）', 600, 1093)
    ctx.fillText('断裂强力（', 750, 1093)
    ctx.fillText('条样法', 900, 1093)
    ctx.fillText('抓样法）', 1010, 1093)
    ctx.fillText('炽烈程度', 1150, 1093)
    ctx.fillText('后档接缝强力', 1300, 1093)
    ctx.fillText('顶破强力', 1490, 1093)


    ctx.fillText('起毛起球（标注正反面）（', 300, 1138)
    ctx.fillText('马丁代尔', 620, 1138)
    ctx.fillText('圆轨迹', 770, 1138)
    ctx.fillText('箱式<', 900, 1138)
    ctx.fillText('精梳', 1010, 1138)
    ctx.fillText('粗梳>', 1100, 1138)
    ctx.fillText('耐磨性能（', 1205, 1138)
    ctx.fillText('破损', 1365, 1138)
    ctx.fillText('质损', 1455, 1138)
    ctx.fillText('外观 ）', 1545, 1138)

    ctx.fillText('纱支', 300, 1183)
    ctx.fillText('捻度', 480, 1183)
    ctx.fillText('水洗尺寸变化率', 660, 1183)
    ctx.fillText('洗后扭斜/曲', 910, 1183)
    ctx.fillText('水洗后外观', 1080, 1183)
    ctx.fillText('外观质量（', 1280, 1183)
    ctx.fillText('含规格', 1430, 1183)
    ctx.fillText('不含规格）', 1540, 1183)


    // 检测方法
    ctx.fillText('委托方指定', 300, 1470)
    ctx.fillText('服务方决定', 536, 1470)

    ctx.fillText('中国GB/FZ等', 300, 1504)
    ctx.fillText('国际标准ISO', 560, 1504)
    ctx.fillText('欧盟EN', 796, 1504)
    ctx.fillText('德国DIN', 996, 1504)
    ctx.fillText('美国AATCC/ASTM', 1196, 1504)

    ctx.fillText('其他：', 300, 1558)
    // 其他的值
    ctx.fillText('我是其他的值......', 380, 1558)


    // 判断标准
    ctx.fillText('不判定', 300, 1608)
    ctx.fillText('判定（', 440, 1608)
    ctx.fillText('委托方指定', 550, 1608)
    ctx.fillText('服务方指定 ）', 720, 1608)

    ctx.fillText('GB 18401（', 300, 1650)
    ctx.fillText('A', 470, 1650)
    ctx.fillText('B', 530, 1650)
    ctx.fillText('C)', 590, 1650)
    ctx.fillText('GB 31701（', 726, 1650)
    ctx.fillText('A', 902, 1650)
    ctx.fillText('B', 962, 1650)
    ctx.fillText('C )', 1026, 1650)
    ctx.fillText('牛仔服装（', 1210, 1650)
    ctx.fillText('原色产品', 1396, 1650)
    ctx.fillText('水洗产品', 1552, 1650)

    ctx.fillText('产品标准：', 300, 1686)
    // 产品标准的值
    ctx.fillText('我是产品标准的值///,,,', 418, 1686)
    ctx.fillText('(', 862, 1686)
    ctx.fillText('优等品', 912, 1686)
    ctx.fillText('一等品', 1030, 1686)
    ctx.fillText('合格品', 1152, 1686)
    ctx.fillText('其他：', 1274, 1686)
    // 其他的值
    ctx.fillText('其他的值顶顶顶顶.....', 1344, 1686)
    ctx.fillText(')', 1644, 1686)



    // 服务要求

    // 是否退余样
    ctx.fillText('是（不接受复检）', 300, 1738)
    ctx.fillText('否', 582, 1738)

    // 报告类别
    ctx.fillText('标准时间（', 300, 1798)
    ctx.fillText('5个工作日）', 490, 1798)
    ctx.fillText('加急（', 690, 1798)
    ctx.fillText('3个工作日', 790, 1798)
    ctx.fillText('2个工作日', 1020, 1798)
    ctx.fillText('1个工作日 )', 1230, 1798)

    // 报告格式
    ctx.fillText('中文', 300, 1858)
    ctx.fillText('英文(加收50元)', 460, 1858)
    ctx.fillText('中英文（加收50元）', 790, 1858)
    ctx.fillText('副本：', 1090, 1858)
    // 副本的值
    ctx.fillText('55', 1160, 1858)
    ctx.fillText('（20元/份）', 1200, 1858)
    ctx.fillText('特殊格式（加收50元）', 1410, 1858)

    // 报告发送
    ctx.fillText('委托方自取', 300, 1918)
    ctx.fillText('快递到付', 570, 1918)
    ctx.fillText('已付（收费25元）', 790, 1918)
    ctx.fillText('E-mail', 1090, 1918)

    // 分包要求
    ctx.fillText('分包检验：', 270, 1981)
    ctx.fillText('无', 440, 1981)
    ctx.fillText('有，分包项目：', 530, 1981)
    // 分包项目的值
    ctx.fillText('分包项目的值.....', 700, 1981)


    ctx.fillText('分包方由服务方选定', 300, 2030)
    ctx.fillText('分包方由委托方指定', 600, 2030)
    ctx.fillText('分包方：', 860, 2030)
    // 分包方的值
    ctx.fillText('分包方的值之.....', 960, 2030)

    // 报告类别
    ctx.fillText('非认证认可报告', 300, 2100)
    ctx.fillText('认证报告（', 610, 2100)
    ctx.fillText('含非认证项目）', 760, 2100)
    ctx.fillText('认证认可报告（', 1070, 2100)
    ctx.fillText('含非认证认可项目）', 1270, 2100)


    // 其他分类（如下）

    // 服务费用
    ctx.fillText('测试费：', 270, 2160)
    ctx.fillText('元，其他费用：', 500, 2160)
    ctx.fillText('元', 800, 2160)

    // 付费方式
    ctx.fillText('现场付费（现金、支票、刷卡）', 300, 2224)
    ctx.fillText('银行汇款（根据汇款名开票）', 800, 2224)

    ctx.fillText('定期结算', 300, 2272)
    ctx.fillText('其他：', 570, 2272)

    // 发票抬头
    ctx.fillText('与委托方相同', 300, 2338)
    ctx.fillText('其他（必须与付款方一致）：', 570, 2338)
    // 其他的值
    ctx.fillText('其他的自治组织还在.....', 890, 2338)

    // 备注
    ctx.fillText('1、委托方提供的样品及信息的准确性和完整性由委托方确认，本中心不承担证实', 270, 2408)
    ctx.fillText('1、委托方提供的样品及信息的准确性和完整性由委托方确认，本中心不承担证实', 271, 2409)
    ctx.fillText('2、非认证、认可报告或项目不具备社会证明作用，仅供委托方内部使用。', 270, 2458)
    ctx.fillText('2、非认证、认可报告或项目不具备社会证明作用，仅供委托方内部使用。', 271, 2459)

    ctx.draw()
  },

  // 样品信息附表
  canvas3() {
    const ctx = wx.createCanvasContext('canvas-3');
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, 1500, 2115)
    // console.log(ctx)

    // 顶部文字
    ctx.setFontSize(24);
    ctx.setFillStyle('darkgray');
    ctx.fillText('广东省测试分析研究所（中国广州分析测试中心）管理体系支撑表单 ', 20, 50);
    ctx.fillText('NACC MS(p)/701.01.03-H00', 1100, 50);
    ctx.moveTo(18, 70);
    ctx.lineTo(1488, 70);
    ctx.setLineWidth(2.5);
    ctx.setStrokeStyle('#000')
    ctx.stroke()
    // const textLength = parseInt(ctx.measureText(`¥${this.data.GoodMsg.otherPrice}`).width);
    // 公司名称
    ctx.setFontSize(36)
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center')
    ctx.fillText('样品信息附表', 750, 130);

    // 画线框
    ctx.setStrokeStyle('#333')
    ctx.setLineWidth(3.5)
    ctx.moveTo(12, 170);
    ctx.lineTo(1488, 170);
    ctx.lineTo(1488, 2080);
    ctx.lineTo(12, 2080);
    ctx.closePath()
    ctx.stroke()


    // 画内部线条
    ctx.moveTo(12, 270)
    ctx.lineTo(1488, 270)

    // 画横线
    const deltaY = 258
    for (let i = 0; i < 7; i++) {
      ctx.moveTo(12, 270 + deltaY * i)
      ctx.lineTo(1488, 270 + deltaY * i)

      // 序号
      ctx.fillText(i + 1, 72, 270 + deltaY / 2 + deltaY * i)

    }

    // 画竖线
    const deltaX = (1488 - 142) / 4
    for (let i = 0; i < 4; i++) {
      ctx.moveTo(deltaX * i + 142, 170)
      ctx.lineTo(deltaX * i + 142, 2080)
    }
    ctx.stroke()

    // 头部字段
    ctx.setFontSize(30)
    ctx.setFillStyle('#333')
    ctx.fillText('序号', 74, 232)
    ctx.fillText('测试名称', 310, 232)
    ctx.fillText('货号/款号', 310 + deltaX, 232)
    ctx.fillText('颜色及描述', 310 + deltaX * 2, 232)
    ctx.fillText('测试项目', 310 + deltaX * 3, 232)

    ctx.draw()
  },

  // 样品信息附表
  canvas4() {
    const ctx = wx.createCanvasContext('canvas-4');
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, 1500, 2115)
    // console.log(ctx)

    // 顶部文字
    ctx.setFontSize(24);
    ctx.setFillStyle('darkgray');
    ctx.fillText('广东省测试分析研究所（中国广州分析测试中心）管理体系支撑表单 ', 20, 50);
    ctx.fillText('NACC MS(p)/701.01.03-H00', 1100, 50);
    ctx.moveTo(18, 70);
    ctx.lineTo(1488, 70);
    ctx.setLineWidth(2.5);
    ctx.setStrokeStyle('#000')
    ctx.stroke()
    // const textLength = parseInt(ctx.measureText(`¥${this.data.GoodMsg.otherPrice}`).width);
    // 公司名称
    ctx.setFontSize(36)
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center')
    ctx.fillText('样品信息附表', 750, 130);

    // 画线框
    ctx.setStrokeStyle('#333')
    ctx.setLineWidth(3.5)
    ctx.moveTo(12, 170);
    ctx.lineTo(1488, 170);
    ctx.lineTo(1488, 2080);
    ctx.lineTo(12, 2080);
    ctx.closePath()
    ctx.stroke()


    // 画内部线条
    ctx.moveTo(12, 270)
    ctx.lineTo(1488, 270)

    // 画横线
    const deltaY = 258
    for (let i = 0; i < 7; i++) {
      ctx.moveTo(12, 270 + deltaY * i)
      ctx.lineTo(1488, 270 + deltaY * i)

      // 序号
      ctx.fillText(i + 1, 72, 270 + deltaY / 2 + deltaY * i)

    }

    // 画竖线
    const deltaX = (1488 - 142) / 4
    for (let i = 0; i < 4; i++) {
      ctx.moveTo(deltaX * i + 142, 170)
      ctx.lineTo(deltaX * i + 142, 2080)
    }
    ctx.stroke()

    // 头部字段
    ctx.setFontSize(30)
    ctx.setFillStyle('#333')
    ctx.fillText('序号', 74, 232)
    ctx.fillText('样品名称', 310, 232)
    ctx.fillText('样品批号', 310 + deltaX, 232)
    ctx.fillText('样品个数', 310 + deltaX * 2, 232)
    ctx.fillText('样品量', 310 + deltaX * 3, 232)

    ctx.draw()
  }
})