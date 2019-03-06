// profile_package/pages/my_customer/my_customer.js
import { My_customer_model } from './my_customer_model.js'
var my_customer_model = new My_customer_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerList:[],
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
    console.log()
    this._getMyCustomer()
  },
  // 获取优惠券
  _getMyCustomer() {
    var page = this.data.page
    var pageSize = this.data.pageSize
    var list = this.data.customerList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    $.openLoad()
    my_customer_model.getMyCustomer(page, pageSize, (res) => {
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
          customerList: list,
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
  onReachBottom:()=>{
    this._getMyCustomer()
  }
})