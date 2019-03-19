// mainPackage/index/index.js
var $ = require('../../utils/common.js')
import { Index_model } from './index_model.js'
var index_model = new Index_model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0,//背景蒙层的透明度
    animate: '',//删除图片 动画弹窗
    showCoupon:false,
    showTxt:true,
    hotList:[],
    sliderImg:'',
    videoInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    // console.log('11111111')
    // console.log(options.scene)
    // console.log('11111111')
    // console.log(query)
    // console.log('222222222')

    this._getIndexSliderImg()//获取轮播图
    this._getVideoInfo()//获取视频简介
    this._getLatestInfo()//获取最新的三条咨询
    this._checkCouponList()
  },
  // 查看优惠券接口是否有优惠券可领取
  _checkCouponList(){
    let page = 1;
    let pageSize = 10;
    index_model.getCouponList(page, pageSize, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      if(res.data.length>0){
        this.setData({
          opacity: 1,
          animate: 'animate .3s',
          showCoupon: true
        })
      }
      
    })
  },
  // 去领取优惠券
  getCoupon(){
    this.setData({
      opacity:0,
      animate:'back .5s'
    },()=>{
      setTimeout(()=>{
        this.setData({
          showCoupon:false
        })
        wx.navigateTo({
          url: '../../index_package/pages/get_coupon/get_coupon',
        })
      },500)
    })
  },
  // 取消领取
  cancel(){
    this.setData({
      opacity:0,
      animate:'back .5s'
    },()=>{
      setTimeout(()=>{
        this.setData({
          showCoupon:false
        })
      },500)
    })
  },
  // 获取轮播图
  _getIndexSliderImg(){
    index_model.getIndexSliderImg((res)=>{
      console.log(res)
      this.setData({
        sliderImg:res.data
      })
    })
  },
  // 获取首页视频简介
  _getVideoInfo(){
    index_model.getVideoInfo((res)=>{
      console.log(res)
      this.setData({
        videoInfo:res.data
      })
    })
  },
  // 获取最新的三条咨询
  _getLatestInfo(){
    index_model.getLatestInfo((res)=>{
      if(res.code !=0 ){
        $.prompt(res.msg)
        return false
      }
      console.log(res)
      this.setData({
        hotList:res.data
      })
    })
  },

  // 跳转到化妆品委托toTextile
  toCosmetics(){
    wx.navigateTo({
      url: '../../index_package/pages/cosmetics/cosmetics',
    })
  },
  // 跳转到化妆品委托
  toTextile() {
    wx.navigateTo({
      url: '../../index_package/pages/textile/textile',
    })
  },
  // 展开显示视频简介
  showTxt(){
    if(this.data.showTxt == true){
      this.setData({
        showTxt:false
      })
    }
  },
  // 跳转信息详情
  toNewsDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../index_package/pages/news_detail/news_detail?id='+id,
    })
  },
  // 禁止蒙层可滑动
  stopMove(){
    return false
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})