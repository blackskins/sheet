import { Base } from '../../../utils/base.js'
class News_detail_model extends Base{
  // 获取咨询详情
  getInfoDetail(_id,callback){
    let params = {
      url:'/info/findById',
      data:{
        _id:_id
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  News_detail_model
}