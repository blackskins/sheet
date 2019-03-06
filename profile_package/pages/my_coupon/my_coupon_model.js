import { Base } from '../../../utils/base.js'
class My_coupon_model extends Base{
  // 我的优惠券
  getMyCoupon(page,pageSize,callback){
    let params = {
      url:'/user/AllCoupon',
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
}
export{
  My_coupon_model
}