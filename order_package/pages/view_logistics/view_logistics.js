// order_package/pages/view-logistics/view-logistics.js
import { View_logistics_model } from './view_logistics_model.js'
var view_logistics_model = new View_logistics_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 物流信息
    logistics:[],
    orderInfo:'',//订单信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._viewLogistics(options.orderId)
  },
  // 查看物流信息
  _viewLogistics(_id){
    $.openLoad()
    view_logistics_model.viewLogistics(_id,(res)=>{
      console.log(res)
      this.setData({
        logistics:res.data[0],
        orderInfo:res.data[1][0]
      },()=>{
        $.closeLoad()
      })
    })
  }
})