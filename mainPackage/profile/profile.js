// mainPackage/profile/profile.js
var $ = require('../../utils/common.js')
import { Common } from '../../utils/common_model.js'
var common = new Common()
// import { Profile_model } from './profile_model.js'
// var profile_model = new Profile_model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus:[
      {
        img:'/images/status1.png',
        title:'待签名',
        id:'1'
      },
      {
        img: '/images/status2.png',
        title: '待签收',
        id: '2'
      },
      {
        img: '/images/status3.png',
        title: '待受理',
        id: '3'
      },
      {
        img: '/images/status4.png',
        title: '待付款',
        id: '4'
      },
      {
        img: '/images/status5.png',
        title: '待报告',
        id: '5'
      },
      {
        img: '/images/status6.png',
        title: '发报告',
        id: '6'
      },
      {
        img: '/images/status7.png',
        title: '已成功',
        id: '7'
      },
      {
        img: '/images/status8.png',
        title: '修改中',
        id: '8'
      },
    ],
    listItem:[
      {
        img:'/images/order2.png',
        title:'我的报告',
        id:'2'
      },
      {
        img: '/images/order3.png',
        title: '优惠券',
        id: '3'
      },
      {
        img: '/images/order4.png',
        title: '我的客户',
        id: '4'
      },
      {
        img: '/images/order5.png',
        title: '申请成为业务员',
        id: '5'
      },
    ],
    userData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getUserData()
  },
  // 获取用户信息
  _getUserData() {

    common.getUserData((res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      this.setData({
        userData: res.data
      })
    })
  },
  // 跳转到我的二维码页面
  toMyCode(){
    wx.navigateTo({
      url: '../../profile_package/pages/my_code/my_code',
    })
  },
  // 跳转到我的订单
  toMyOrder(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../order_package/pages/my_order/my_order?id='+id,
    })
  },
  // 跳转个人中心的相应列表项的页面
  toListPage(e){
    const id = e.currentTarget.dataset.id
    if(id == '2'){
      wx.navigateTo({
        url: '../../profile_package/pages/my_report/my_report',
      })
    }else if(id == '3'){
      wx.navigateTo({
        url: '../../profile_package/pages/my_coupon/my_coupon',
      })
    } else if (id == '4') {
      wx.navigateTo({
        url: '../../profile_package/pages/my_customer/my_customer',
      })
    } else if (id == '5') {
      wx.navigateTo({
        url: '../../profile_package/pages/apply/apply',
      })
    }
  }

})