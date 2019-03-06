import { Base } from '../../../utils/base.js'
class My_code_model extends Base{
  // 获取二维码
  getCode(callback){
    let params = {
      url:'/user/scene',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  My_code_model
}