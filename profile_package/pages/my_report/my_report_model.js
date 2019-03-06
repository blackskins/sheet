import { Base } from '../../../utils/base.js'
class My_report_model extends Base{
  // 获取我的报告列表
  getMyReport(callback){
    let params = {
      url:'/user/lookReport',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  My_report_model
}