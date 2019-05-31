// profile_package/pages/my_report/my_report.js
import { My_report_model } from './my_report_model.js'
var my_report_model = new My_report_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportList:[],
    dataList: [{
        date: '2019.02.19',
        orderList: [{
            title: '化妆品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          },
          {
            title: '化妆品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          },
          {
            title: '纺织品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          },
        ]
      },
      {
        date: '2019.02.19',
        orderList: [{
            title: '化妆品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          },
          {
            title: '化妆品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          }
        ]
      },
      {
        date: '2019.02.19',
        orderList: [{
            title: '化妆品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          },
          {
            title: '化妆品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          },
          {
            title: '纺织品报告',
            orderNumber: '545264561498532',
            orderDate: '2019.02.20 15:44:22',
            orderId: '44646546565'
          },
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //往数组里面添加一个实时订单盒子的高度的字段（boxHeight）和折叠状态的字段(foldStatus)
    // 作用：实时响应动画交互效果
    let list = this.data.reportList
    let len = this.data.reportList.length
    for(let i = 0;i<len;i++){
      list[i].boxHeight = list[i].myReport.length * 180 + (list[i].myReport.length - 1) * 2
      list[i].foldStatus = false
    }
    this.setData({
      reportList:list
    })
    this._getMyReport()
  },
  //展开或收起某个时间下的检测订单报告
  fold(e) {
    console.log('sfsddf')
    let list = this.data.reportList
    let currentId = e.currentTarget.dataset.id
    var str = 'reportList[' + currentId + '].foldStatus'
    var str1 = 'reportList[' + currentId + '].boxHeight'
    if(list[currentId].foldStatus){
      this.setData({
        [str]:false,
        [str1]: list[currentId].myReport.length * 180 + (list[currentId].myReport.length - 1) * 2
      })
    }else{
      this.setData({
        [str]:true,
        [str1]: 0
      })
    }
  },
  // 获取我的报告列表
  _getMyReport(){
    $.openLoad()
    my_report_model.getMyReport((res)=>{
      $.closeLoad()
      console.log(res)
      if(res.code != 0 ){
        $.propmt(res.msg,2500)
        return
      }
      this.setData({
        reportList:res.data
      })
    })
  },
  // 预览报告
  preReport(e){

    console.log('dddddd')
    let fatherIndex = e.currentTarget.dataset.father_index
    console.log(fatherIndex)
    let index = e.currentTarget.dataset.index
    console.log(index)
    let status = this.data.reportList[fatherIndex].myReport[index].report.status
    console.log(status,'状态')
    if(status == 0){
      var src = this.data.reportList[fatherIndex].myReport[index].report.oldReportUrl.imgUrl
      console.log(src,'旧---------------')
    }else if(status == 1){
      var src = this.data.reportList[fatherIndex].myReport[index].report.newReportUrl.imgUrl
      console.log('新的')
    }
    if (src.substring(src.length-3) == 'pdf'){
      console.log('打开PDF文件')
      wx.downloadFile({
        url: src,
        // url: 'http://zhonguangce.oss-cn-shenzhen.aliyuncs.com/a955085f341843d7a3331aec6b3c70b9.jpg',
        success: function (res) {
          console.log(res)
          var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,
            success: function (res) {
              // console.log('打开文档成功')
            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }else{
      console.log('打开图片列表集文件')
      let urls = new Array()
      if(status == 0){
        urls.push(this.data.reportList[fatherIndex].myReport[index].report.oldReportUrl.imgUrl)
        console.log(urls)
      }else{
        urls.push(this.data.reportList[fatherIndex].myReport[index].report.oldReportUrl.imgUrl)
        urls.push(this.data.reportList[fatherIndex].myReport[index].report.newReportUrl.imgUrl)
        console.log(urls)
      }
      wx.previewImage({
        urls: urls // 需要预览的图片http链接列表
      })
    }
  }
})