// order_package/pages/order_detail/order_detail.js
import {
  Order_detail_model
} from './order_detail_model.js'
var order_detail_model = new Order_detail_model()
var $ = require('../../../utils/common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCoupon:'',
    couponPrice: 0,
    orderStatus:'',//订单状态
    proofImg: [], //交易凭证
    couponData:'',//优惠券数据
    payType: '',
    canvasImg: '', //签名的临时路径
    orderData: '', //订单详情数据
    opacity: 0, //背景蒙层的透明度
    animate: '', //删除图片 动画弹窗
    showMask: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取设备信息
    let sysInfo = wx.getSystemInfoSync()
    var height = sysInfo.windowHeight - (120 * sysInfo.windowWidth / 750)
    console.log(sysInfo)
    console.log((sysInfo.system).substr(0, 3))
    if ((sysInfo.system).substr(0, 3) == 'iOS') {
      this.setData({
        payType: 'iOS'
      })
    }
    this.setData({
      orderId: options.orderId,
      orderStatus:options.status,
      scrollHeight: height
    })
    if(options.status == 22){
      console.log('进来了.......')
      this._getPayOrderDetail(options.orderId) //获取立即支付订单详情
    }else{
      this._getOrderDetail(options.orderId) //获取普通订单详情
    }
    this._getLookCoupon(options.orderId) //查看是否有优惠券可用
  },
  onShow(){
    if(this.data.isCoupon != '' && !this.data.isCoupon){//使用优惠券
      order_detail_model.lookCoupon(_id, (res) => {
        console.log(res)
        if (res.code != 0) {
          $.prompt(res.msg, 2500)
          return
        }
        this.setData({
          couponData: res.data,
          couponPrice: res.data.couponPrice,
          isCoupon: true
        })
      })
    }
  },
  // 获取普通订单详情数据
  _getOrderDetail(_id) {
    $.openLoad()
    order_detail_model.getOrderDetail(_id, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return
      }
      this.setData({
        orderData: res.data
      }, () => {
        $.closeLoad()
      })
    })
  },
  // 获取立即支付订单详情数据
  _getPayOrderDetail(_id) {
    $.openLoad()
    order_detail_model.getPayOrderDetail(_id, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return
      }
      this.setData({
        orderData: res.data
      }, () => {
        $.closeLoad()
      })
    })
  },
  // （订单）取消受理
  cancelDeal(){
    let _id = this.data.orderData.orderId
    order_detail_model.cancelDeal(_id,(res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return
      }
      $.prompt('成功取消受理')
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },1500)
    })
  },
  // 订单签名
  signName(e) {
    if (this.data.canvasImg == '') {
      wx.navigateTo({
        url: '../handwriting/handwriting',
      })
      return
    } else {
      let _id = e.currentTarget.dataset.id
      let canvasImg = this.data.canvasImg
      wx.uploadFile({
        url: 'https://fenxi.weishangshouji.cn/resource/imgUpload',
        filePath: canvasImg, //图片路径
        name: 'file',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'token': wx.getStorageSync('token')
        },
        success: function(res) {
          if (res.statusCode == 200) {
            let data = JSON.parse(res.data);
            console.log(data)
            $.openLoad('正在签名...')
            order_detail_model.postSignName(_id, data.data.url, (res) => {
              console.log(res)
              $.closeLoad()
              if (res.code != 0) {
                $.prompt('签名失败', 2500)
                return false
              }
              $.prompt('签名成功')
              setTimeout(()=>{
                wx.navigateBack({
                  delta:1
                })
              },1500)
            })
          }
        }
      })
    }
  },
  // 待付款----->查看是否有可用的优惠券
  _getLookCoupon(_id) {
    order_detail_model.lookCoupon(_id, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return
      }
      if(res.data != '' || res.data != null){
        this.setData({
          couponData:res.data,
          couponPrice:res.data.couponPrice,
          isCoupon:true
        })
      }
    })
  },
  // 点击优惠的区域--->使用/不使用优惠券
  useCoupon(){
    if(this.data.couponData == ''){
      $.prompt('暂无优惠券可用')
      return
    }else{
      let _id = this.data.orderData.orderId
      if(this.data.isCoupon){
        let couponId = this.data.couponData.couponId
        order_detail_model.cancelUseCoupon(_id, couponId, (res) => {
          console.log(res)
          if (res.code != 0) {
            $.prompt(res.msg, 2500)
            return
          }
          this.setData({
            isCoupon: false,
            couponPrice: 0
          })
          $.prompt('取消使用优惠券')
        })
      }else if(!this.data.isCoupon){
        order_detail_model.lookCoupon(_id, (res) => {
          console.log(res)
          if (res.code != 0) {
            $.prompt(res.msg, 2500)
            return
          }
          this.setData({
            couponData: res.data,
            couponPrice: res.data.couponPrice,
            isCoupon: true
          },()=>{
            $.prompt('使用优惠券')
          })
        })
      }
    }
  },
  // 上传交易凭证
  upLoadProof() {
    var upload_url = 'https://fenxi.weishangshouji.cn/resource/imgUpload'
    let proofImg = this.data.proofImg
    var count = 1
    console.log(count)
    $.uploadImage(upload_url, proofImg, count, (res) => {
      proofImg.push(res.data.url)
      this.setData({
        proofImg: proofImg
      })
    })
  },
  // 删除交易凭证
  delImg() {
    this.setData({
      showMask: true,
      opacity: 1,
      animate: 'animate .3s'
    })
  },
  // 确认删除
  confirm() {
    let list = this.data.proofImg
    list.splice(0, 1)
    this.setData({
      opacity: 0,
      animate: 'back .5s'
    }, () => {
      setTimeout(() => {
        this.setData({
          showMask: false,
          proofImg: list
        }, () => {
          $.prompt('移除成功')
        })
      }, 500)
    })
  },
  // 取消删除图片
  cancelDel() {
    this.setData({
      opacity: 0,
      animate: 'back .5s'
    }, () => {
      setTimeout(() => {
        this.setData({
          showMask: false
        })
      }, 500)
    })
  },
  // 订单未支付，页面卸载或者进入后台时，取消使用优惠券
  cancelCoupon(){
    if (this.data.couponData != '') {
      let _id = this.data.orderData.orderId
      let couponId = this.data.couponData.couponId
      order_detail_model.cancelUseCoupon(_id, couponId, (res) => {
        console.log(res)
        if (res.code != 0) {
          $.prompt(res.msg, 2500)
          return
        }
      })
    }
  },
  // 页面卸载
  onUnload(){
    this.cancelCoupon()//取消使用优惠券
  },
  onHide() {//取消使用优惠券
    let _id = this.data.orderData.orderId
    if (this.data.isCoupon) {
      let couponId = this.data.couponData.couponId
      order_detail_model.cancelUseCoupon(_id, couponId, (res) => {
        console.log(res)
        if (res.code != 0) {
          $.prompt(res.msg, 2500)
          return
        }
        this.setData({
          isCoupon: false,
          couponPrice: 0
        })
      })
    }
  },
  // 上传凭证
  _upLoadProof(){
    let _id = this.data.orderData.orderId;
    let voucher = this.data.proofImg[0]
    order_detail_model.upLoadProof(_id,voucher,(res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return
      }
      $.prompt('支付成功')
      // console.log('上传凭证成功')
    })
  },

  // 立即支付订单
  pay(){
    if(this.data.payType == 'iOS' ){
      this._upLoadProof()//上传凭证
      return false
    }
    let appId = app.globalData.wxAppId
    let openId = wx.getStorageSync('openId')
    let orderType = this.data.orderData.orderType
    let orderId = this.data.orderData.orderId

    order_detail_model.payForOrder(appId,openId,orderType,orderId,(res)=>{
      console.log(res)
      if(res.code != 0){
        // $.prompt('支付失败', 2500)
        $.prompt(res.msg,2500)
        return false
      }
      let data = res.data
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.paySign,
        success:(res)=>{
          $.prompt('支付成功')
        },
        fail:(res)=>{
          $.prompt('支付失败')
        }
      })
    })
  },

  // 报告修改
  toModifyReport(){
    let orderId = this.data.orderData.orderId
    wx.navigateTo({
      url: '../modify_report/modify_report?orderId=' + orderId,
    })
  },
  // 查看物流
  viewLogistics() {
    let orderId = this.data.orderData.orderId
    wx.navigateTo({
      url: '../view_logistics/view_logistics?orderId=' + orderId,
    })
  }
})