// profile_package/pages/my_report/my_report.js
import { My_report_model } from './my_report_model.js'
var my_report_model = new My_report_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    let list = this.data.dataList
    let len = this.data.dataList.length
    for(let i = 0;i<len;i++){
      list[i].boxHeight = list[i].orderList.length * 180 + (list[i].orderList.length - 1) * 2
      list[i].foldStatus = false
    }
    this.setData({
      dataList:list
    })
    this._getMyReport()
  },
  //展开或收起某个时间下的检测订单报告
  fold(e) {
    console.log('sfsddf')
    let list = this.data.dataList
    let currentId = e.currentTarget.dataset.id
    var str = 'dataList[' + currentId + '].foldStatus'
    var str1 = 'dataList[' + currentId + '].boxHeight'
    if(list[currentId].foldStatus){
      this.setData({
        [str]:false,
        [str1]: list[currentId].orderList.length * 180 + (list[currentId].orderList.length - 1) * 2
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
    my_report_model.getMyReport((res)=>{
      console.log(res)
    })
  }
})