import { Base } from '../../../utils/base.js'
class Apply_model extends Base {
  // 我的优惠券
  postCustomerInfo(data, callback) {
    let params = {
      url: '/sale/apply',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export {
  Apply_model
}