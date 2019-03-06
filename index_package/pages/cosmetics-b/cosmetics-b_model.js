import { Base } from '../../../utils/base.js'
class Submit_data extends Base{
  // 化妆品表单数据提交
  submitCosmetics(data,callback){
    let params = {
      url:'/order/placeOrder',
      data:data,
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Submit_data
}