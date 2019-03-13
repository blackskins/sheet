import { Base } from '../../../utils/base.js'
class My_order_model extends Base{
  // 获取订单数据
  getAllOrderList(page,pageSize,callback){
    let params = {
      url:'/order/orderList',
      data:{
        page:page,
        pageSize:pageSize
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }

  // 获取订单数据/order/orderList
  getOrderStatusList(page, pageSize, status, callback) {
    let params = {
      url: '/order/orderStatus',
      data: {
        page: page,
        pageSize: pageSize,
        status: status
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  My_order_model
}