import { Base } from '../../../utils/base.js'
class My_customer_model extends Base {
  // 我的优惠券
  getMyCustomer(page, pageSize, callback) {
    let params = {
      url: '/me/customer',
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
}
export {
  My_customer_model
}