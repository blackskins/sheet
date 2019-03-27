// index_package/pages/news_detail/news_detail.js
var $ = require('../../../utils/common.js')
import { News_detail_model } from './news_detail_model.js'
var news_detail_model = new News_detail_model() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    richPage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this._getInfoDetail(options.id)
  },
  // 获取咨询详情
  _getInfoDetail(_id){
    $.openLoad()
    news_detail_model.getInfoDetail(_id,(res)=>{
      console.log(res)
      var str = res.data.content
      str = str.replace(/&lt;/g, "<")
      str = str.replace(/&gt;/g, ">")
      str = str.replace(/&quot;/g, '"')
      str = str.replace(/&apos;/g, "'")
      str = str.replace(/&amp;nbsp;/g, ' ')
      str = str.replace(/<p>/g, "<p class='para'>")
      str = str.replace(/<img src="/g, '<img class="content-img" src="')
      res.data.content = str
      this.setData({
        richPage:res.data
      },()=>{
        $.closeLoad()
      })
    })
  },
  // 点击图片预览
  // preView(e){
  //   $.prompt('文章内容不支持编辑操作哦',2500)
  // }
})