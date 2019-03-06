import { Base } from '../../utils/base.js'

class Login extends Base {
  // 获取用户授权
  getUserAuth(data, callback) {
    let params = {
      url: '/wx/auth',
      data: data,
      type: "POST",
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  //获取用户信息
  updateUserData(callback) {
    let params = {
      url: '/wx/login',
      type: "POST",
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

}
export {
  Login
}