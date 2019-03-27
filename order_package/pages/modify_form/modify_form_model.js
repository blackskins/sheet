import { Base } from '../../../utils/base.js'
class Modify_form_model extends Base {
  // 获取修改订单基本信息
  getOrderInfo(_id,orderType,callback){
    let params = {
      url:'/order/updatestauts',
      data:{
        _id:_id,
        orderType:orderType,
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 修改委托单
  modifyOrderInfo(_id,spinInfo,orderType,callback){
    let params = {
      url:'/order/updateOrder',
      data:{
        _id:_id,
        spinInfo:spinInfo,
        orderType:orderType,
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Modify_form_model
}