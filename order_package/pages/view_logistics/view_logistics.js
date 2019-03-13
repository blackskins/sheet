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
    logistics:[
      {
        title:'快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime:'2019-02-22 18:32:21'
      },
      {
        title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime: '2019-02-22 18:32:21'
      },
      {
        title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime: '2019-02-22 18:32:21'
      },
      {
        title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime: '2019-02-22 18:32:21'
      },
      {
        title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime: '2019-02-22 18:32:21'
      },
      {
        title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime: '2019-02-22 18:32:21'
      },
      {
        title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime: '2019-02-22 18:32:21'
      },
      {
        title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
        createTime: '2019-02-22 18:32:21'
      }
    ],
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
    view_logistics_model.viewLogistics(_id,(res)=>{
      console.log(res)
      this.setData({
        logistics:res.data[0],
        orderInfo:res.data[1]
      })
    })
  }
})