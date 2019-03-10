import { Base } from '../../../utils/base.js'
class Submit_data extends Base{
  // 提交纺织品检测信息的表单
  submitTextile(data, callback) {
    let params = {
      url: '/order/placeOrder',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取服务协议说明
  getServiceContent(status,callback){
    let params = {
      url:'/comm/query/Agreement',
      data:{
        status:status
      },
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