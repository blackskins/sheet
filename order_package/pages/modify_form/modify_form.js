// order_package/pages/modify_form/modify_form.js
import { Modify_form_model } from './modify_form_model.js'
var modify_form_model = new Modify_form_model()
var $ = require('../../../utils/common.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    smapleArr: [],
    index:0,
    sampleElse: ['样品类别', '样品性状', '样品来源', '样品保存', '样品处理', '危险性'],
    sampleElse1: ['综合', '纤维成分', '色牢度', '化学', '物理性能']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sysInfo = wx.getSystemInfoSync()
    let height = sysInfo.windowHeight - (120 * (sysInfo.windowWidth/750))
    this.setData({
      scrollHeight:height,
      _id:options._id,
      orderType:options.order_type
    })
    // console.log(options,'ddsddkldkfdlskfdslkf')
    this._getOrderInfo(options._id,options.order_type);
  },
  // 选择样品
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(this.data.index == e.detail.value){
      return
    }
    this.setData({
      index: e.detail.value,
    })
  },
  // 获取修改委托单的信息
  _getOrderInfo(_id,orderType){
    modify_form_model.getOrderInfo(_id,orderType,(res)=>{
      const arr = ['样品一', '样品二', '样品三', '样品四', '样品五', '样品六', '样品七']
      console.log(res)
      if(res.data.orderType == '10'){
        let sampleList = res.data.info;
        let len = sampleList.length
        let arr0 = []
        for(let i = 0;i<len;i++){
          arr0.push({
            sampleName:'',
            sampleBatch:'',
            sampleNumber:'',
            sampleSize:'',
          })
        }
        let smapleArr = this.data.smapleArr
        smapleArr = arr.slice(0,len)
        this.setData({
          sampleInfo: sampleList,
          smapleArr: smapleArr,
          arr0,
        })
      }else if(res.data.orderType == '20'){
        let sampleList = res.data.info;
        let len = sampleList.length
        let arr0 = []
        for (let i = 0; i < len; i++) {
          arr0.push({
            sampleName: '',
            samplenumber: '',
            color: '',
            sampleNumber: '',
            brand:sampleList[i].brand,
            component:sampleList[i].component
          })
        }
        let smapleArr = this.data.smapleArr
        smapleArr = arr.slice(0, len)
        this.setData({
          sampleInfo1: sampleList,
          smapleArr: smapleArr,
          arr0,
        })
      }
    })
  },
  // 样品名称
  update1(e){
    console.log('11111');
    console.log(e)
    if(e.detail.value == ''){
      return
    }
    let {
      index,
      orderType,
    } = this.data
    if(orderType == 10){
      let str = `arr0[${index}].sampleName`
      this.setData({
        [str]:e.detail.value
      })
    }else if(orderType == 20){
      let str = `arr0[${index}].sampleName`
      this.setData({
        [str]: e.detail.value
      })
    }
    
  },
  // 样品批号/（货号/款号）
  update2(e) {
    console.log('22222222');
    console.log(e)
    if (e.detail.value == '') {
      return
    }
    let {
      index,
      orderType,
    } = this.data
    if (orderType == 10) {
      let str = `arr0[${index}].sampleBatch`
      this.setData({
        [str]: e.detail.value
      })
    } else if (orderType == 20) {
      let str = `arr0[${index}].samplenumber`
      this.setData({
        [str]: e.detail.value
      })
    }

  },
  // 样品个数/颜色
  update3(e) {
    console.log('3333333');
    console.log(e)
    if (e.detail.value == '') {
      return
    }
    let {
      index,
      orderType,
    } = this.data
    if (orderType == 10) {
      let str = `arr0[${index}].sampleNumber`
      this.setData({
        [str]: e.detail.value
      })
    } else if (orderType == 20) {
      let str = `arr0[${index}].color`
      this.setData({
        [str]: e.detail.value
      })
    }

  },
  // 样品个数/颜色
  update4(e) {
    console.log('4444');
    console.log(e)
    if (e.detail.value == '') {
      return
    }
    let {
      index,
      orderType,
    } = this.data
    if (orderType == 10) {
      let str = `arr0[${index}].sampleSize`
      this.setData({
        [str]: e.detail.value
      })
    } else if (orderType == 20) {
      let str = `arr0[${index}].itemNumber`
      this.setData({
        [str]: e.detail.value
      })
    }

  },
  // 禁止修改其他选项
  stopModify(){
    $.prompt('不能修改此选项哦~',2500)
  },
  // 提交修改委托单
  formSubmit(e){
    let orderType = this.data.orderType
    let arr0 = this.data.arr0
    if(orderType == 10){
      let sampleList = this.data.sampleInfo
      let len = sampleList.length
      for (let i = 0; i < len; i++) {
        for (let k in arr0[i]) {
          arr0[i][k] = arr0[i][k] != '' ? arr0[i][k] : sampleList[i][k]
        }
        // if (arr0[i].sampleName == '') {
        //   arr0[i].sampleName = sampleList[i].sampleName
        // }
        // if (arr0[i].sampleBatch == '') {
        //   arr0[i].sampleBatch = sampleList[i].sampleBatch
        // }
        // if (arr0[i].sampleNumber == '') {
        //   arr0[i].sampleNumber = sampleList[i].sampleNumber
        // }
        // if (arr0[i].sampleSize == '') {
        //   arr0[i].sampleSize = sampleList[i].sampleSize
        // }

      }
    }else if(orderType == 20){
      let sampleList = this.data.sampleInfo1
      let len = sampleList.length
      for (let i = 0; i < len; i++) {
        for(let k in arr0[i]){
          arr0[i][k] = arr0[i][k] != '' ? arr0[i][k] : sampleList[i][k]
        }
        console.log(arr0)
        console.log('ddddddd')
        // return
      }
    }
    let spinInfo = arr0
    let _id = this.data._id
    console.log(e)
    wx.showModal({
      title: '修改委托单',
      content: '确定要修改委托单的内容吗',
      success:(res)=>{
        if(res.confirm){
          modify_form_model.modifyOrderInfo(_id,spinInfo,orderType,(res)=>{
            console.log(res)
            $.prompt('修改成功', 2000,'success')
          })
        }
      }
    })
  }
})