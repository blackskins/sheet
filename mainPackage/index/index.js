// mainPackage/index/index.js
var $ = require('../../utils/common.js')
import { Index_model } from './index_model.js'
var index_model = new Index_model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTxt:true,
    hotList:[
      {
        title: '北京盈客通天下科技有限公司广州分公司',
        content:'北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司',
        createTime:'2019-02-11 14:20',
        img:'/images/icon1.png'
      },
      {
        title: '北京盈客通天下科技有限公司广州分公司',
        content: '北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司',
        createTime: '2019-02-11 14:20',
        img:'/images/icon2.png'
      },
      {
        title: '北京盈客通天下科技有限公司广州分公司',
        content: '北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司',
        createTime: '2019-02-11 14:20',
        img:'/images/icon3.png'
      },
      {
        title: '北京盈客通天下科技有限公司广州分公司',
        content: '北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司北京盈客通天下科技有限公司广州分公司',
        createTime: '2019-02-11 14:20',
        img:'/images/icon4.png'
      }
    ],
    sliderImg:'',
    videoInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getIndexSliderImg()//获取轮播图
    this._getVideoInfo()//获取视频简介
    this._getLatestInfo()//获取最新的三条咨询
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})