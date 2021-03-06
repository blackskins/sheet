import { Base } from './base.js';

class Common extends Base {

  //获取用户信息
  getUserData(callback){
    let params = {
      url:'/wx/login',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取二维码参数
  getCodeValue(sceneId,callback){
    let params ={
      url:'/user/wx/scene',
      data:{
        sceneId:sceneId
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 索取委托单的委托方说明信息
  getExample(status,callback){
    let params = {
      url: '/comm/query/explain',
      data: {
        status: status
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export { Common }