import { Base } from '../../../utils/base.js'
class Get_coupon_model extends Base {
  // 获取可用优惠券列表
  getCouponList(page, pageSize, callback) {
    let params = {
      url: '/user/AllCoupon',
      data: {
        page: page,
        pageSize: pageSize
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 领取优惠券
  getCoupon(data,callback){
    let params = {
      url:'/user/receiveCoupon',
      data:data,
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export {
  Get_coupon_model
}