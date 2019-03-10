// index_package/pages/get_coupon/get_coupon.js
import { Get_coupon_model } from './get_coupon_model.js'
var get_coupon_model = new Get_coupon_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    page: 1,
    pageSize: 10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCouponList()
  },
  // 获取优惠券
  _getCouponList() {
    var page = this.data.page
    var pageSize = this.data.pageSize
    var list = this.data.couponList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    $.openLoad()
    get_coupon_model.getCouponList(page, pageSize, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      let couponList = res.data
      let len = couponList.length
      for(let i = 0;i<len;i++){
        couponList[i].isGet = true
      }
      if (len < 10) {
        isMore = false
        nodata = true
        loading = false
      }
      if (page == 1) {
        list = couponList
      } else {
        list = couponList ? list.concat(couponList) : list
        time = 500
      }
      setTimeout(() => {
        this.setData({
          couponList: list,
          page: parseInt(page) + 1,
          isMore: isMore,
          loading: loading,
          loading_state: false,
          nodata: nodata
        }, () => {
          if (page == 1) {
            $.closeLoad()
          }
        })
      },
        time
      )
    })
  },
  // 触底加载
  onReachBottom: () => {
    this._getCoupon()
  },
  // 领取优惠券
  getTicket(e){
    let couponList = this.data.couponList
    let index = e.currentTarget.dataset.index
    console.log(index)
    let data = {
      couponId:couponList[index]._id,
      startTime: couponList[index].startTime,
      endTime: couponList[index].endTime,
      couponPrice: couponList[index].couponPrice
    }
    console.log(data)
    // let str = `couponList[${index}].isGet`
    var str = 'couponList['+ index +'].isGet'
    get_coupon_model.getCoupon(data,(res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg)
        return
      }
      this.setData({
        [str]:false
      },()=>{
        $.prompt(res.msg)
      })
    })
  }
})