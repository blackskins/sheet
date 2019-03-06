// mainPackage/news/news.js
import {
  News_model
} from './news_model.js'
var news_model = new News_model()
var $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    inputFocus: false,
    inputMask: true,
    left: '50%',
    translate: 'translate(-50%,-50%)',
    inputWidth: 'auto',
    clearIcon: false,
    newsList: [],
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
  onLoad: function(options) {
    const info = wx.getSystemInfoSync()
    var height1 = info.windowHeight - (88 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height1,
    })
    this._getNewsList()
  },
  // 输入关键词搜索 
  inputKeyWord(e) {
    var keyWord = e.detail.value
    this.setData({
      keyWord: keyWord
    })
    if (this.data.keyWord != '') {
      this.setData({
        clearIcon: true
      })
    } else {
      this.setData({
        clearIcon: false
      })
    }
  },
  // 清空输入框
  clearInput() {
    this.setData({
      keyWord: ''
    }, () => {
      this.setData({
        clearIcon: false
      })
    })
  },
  // 聚焦
  bindSearch() {
    this.setData({
      left: '0%',
      translate: 'translate(0%,-50%)',
      inputWidth: '550rpx'
    }, () => {
      this.setData({
        inputFocus: true,
        inputMask: false
      })
    })
    setTimeout(() => {
      this.setData({
        inputFocus: true,
        inputMask: false
      })
    }, 300)
  },
  // 失去焦点
  getBack() {
    if (this.data.keyWord == '' || this.data.keyWord == null) {
      this.setData({
        left: '50%',
        translate: 'translate(-50%,-50%)',
        inputWidth: 'auto'
      })
    }
  },
  // 点击键盘右下角的搜索按钮
  searchKeyWord() {
    console.log('正在搜索...')
    this.setData({
      page: 1,
      pageSize: 10,
      loading_state: false,
      loading: false,
      nodata: false,
      isMore: true,
    }, (res) => {
      this._getNewsList() //搜索
    })
  },
  // 获取资讯列表
  _getNewsList() {
    var page = this.data.page
    var pageSize = this.data.pageSize
    var title = this.data.keyWord
    var list = this.data.newsList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    $.openLoad()
    news_model.getNewsList(page,pageSize,title,(res) => {
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
            newsList: list,
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
  reachBottom(){
    this._getNewsList()
  },
  // 跳转资讯信息详情
  toNewsDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../index_package/pages/news_detail/news_detail?id=' + id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})