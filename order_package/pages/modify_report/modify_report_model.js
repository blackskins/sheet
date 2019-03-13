import { Base } from '../../../utils/base.js'
class Modify_report_model extends Base {
  // 报告修改
  modifyReport(_id, updateReason, updateContent){
    let params = {
      url:'/order/updateReport',
      data:{
        _id:_id,
        updateReason: updateReason,
        updateContent: updateContent
      }
    }
    this.request(params)
  }
}
export{
  Modify_report_model
}