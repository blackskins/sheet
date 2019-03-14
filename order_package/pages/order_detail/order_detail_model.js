import { Base } from '../../../utils/base.js'
class Order_detail_model extends Base{
  // 获取普通订单详情数据/order/look/orderPrice
  getOrderDetail(_id,callback){
    let params = {
      url:'/order/orderItem',
      data:{
        _id:_id
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取立即付款页面订单详情数据
  getPayOrderDetail(_id, callback) {
    let params = {
      url: '/order/look/orderPrice',
      data: {
        _id: _id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 提交签名数据
  postSignName(_id, autograph, callback) {
    let params = {
      url: '/order/autograph',
      data: {
        _id: _id,
        autograph: autograph
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // （订单）取消受理
  cancelDeal(_id, callback) {
    let params = {
      url: '/order/removeorder',
      data: {
        _id: _id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 查看是否有可用的优惠券
  lookCoupon(_id, callback) {
    let params = {
      url: '/order/look/coupon',
      data: {
        _id: _id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 取消使用优惠券
  cancelUseCoupon(_id, couponId, callback) {
    let params = {
      url: '/order/remove/coupon',
      data: {
        _id: _id,
        couponId: couponId
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 上传交易凭证
  upLoadProof(_id, voucher, callback) {
    let params = {
      url: '/order/payVoucher',
      data: {
        _id: _id,
        voucher: voucher
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 立即支付/user/viewLogistics
  payForOrder(appId, openId, orderType, orderId, callback) {
    let params = {
      url: '/wx/payCall',
      data: {
        appId: appId,
        openId: openId,
        orderType: orderType,
        orderId: orderId
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 查看物流
  viewLogistics( _id, callback) {
    let params = {
      url: '/user/viewLogistics',
      data: {
        _id: _id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 查看表单
  viewForm(_id,orderType, callback) {
    let params = {
      url: '/order/look/entrustLab',
      data: {
        _id: _id,
        orderType:orderType
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Order_detail_model
}