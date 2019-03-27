// profile_package/pages/my_coupon/my_coupon.js
import { My_coupon_model } from './my_coupon_model.js'
var my_coupon_model = new My_coupon_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[],
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
    this._getMyCoupon()
  },
  // 获取优惠券
  _getMyCoupon(){
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
    my_coupon_model.getMyCoupon(page, pageSize, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      if (res.data.length < 10) {
        isMore = false
        nodata = true
        loading = false
      }
      if (page == 1) {
        list = res.data
      } else {
        list = res.data ? list.concat(res.data) : list
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
  onReachBottom(){
    this._getMyCoupon()
  }
})