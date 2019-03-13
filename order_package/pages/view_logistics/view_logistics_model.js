import { Base } from '../../../utils/base.js'
class View_logistics_model extends Base {
  // 查看物流
  viewLogistics(_id, callback) {
    let params = {
      url: '/user/viewLogistics',
      data: {
        _id: _id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export {
  View_logistics_model
}