import { Base } from '../../utils/base.js'
class Index_model extends Base{
  // 获取首页轮播图
  getIndexSliderImg(callback){
    let params = {
      url:'/comm/slideShow/query',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取首页视频简介
  getVideoInfo(callback){
    let params = {
      url:'/comm/video/query',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取首页最新的三条咨询
  getLatestInfo(callback) {
    let params = {
      url: '/info/queryNew',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Index_model
}