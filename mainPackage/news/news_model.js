import { Base } from '../../utils/base.js'
class News_model extends Base{
  // 查询所有咨询列表
  getNewsList(page,pageSize,title,callback){
    let params = {
      url:'/info/queryAll',
      data:{
        page:page,
        pageSize:pageSize,
        title:title
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  News_model
}