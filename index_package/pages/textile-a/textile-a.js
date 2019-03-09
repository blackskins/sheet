// index_package/pages/textile-a/textile-a.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 样品信息列表
    sampleList: [
      {
        title: '样品名称',
        holder: '请填写联系电话',
        isMark: 1
      },
      {
        title: '商标',
        holder: '请填写商标',
        isMark: 0
      },
      {
        title: '样品数量',
        holder: '请填写样品数量',
        isMark: 1
      },
      {
        title: '颜色及描述',
        holder: '请填写颜色及描述',
        isMark: 1
      },
      {
        title: '原料成分',
        holder: '请填写原料成分',
        isMark: 0
      },
      {
        title: '货号/款号',
        holder: '请填写货号/款号',
        isMark: 0
      },
    ],
    // 检测类型
    checkType: [
      {
        name: 'sendCheck',
        value: '送检'
      },
      {
        name: 'getSample',
        value: '委托采样'
      }
    ],
    spinInfo:[ //样品信息项
      {
        sampleName: '',
        brand: '',
        samplenumber: '',
        color: '',
        component: '',
        itemNumber: '',
      }
    ],
    testType:'',//样品检测
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面栈
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    if (pages.length > 1) { //说明有上一页存在
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里，调用上一页的函数
      // console.log(prePage.data.data)
      this.setData({
        data1: prePage.data.data1
      })
    }
  },
 
  
  // 上一步
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 操作样品信息
  blurName(e) {//样品名称
    console.log(e)
    let index = e.currentTarget.dataset.index
    let str = `spinInfo[${index}].sampleName`
    this.setData({
      [str]: e.detail.value
    })
  },
  blurBrand(e) {//商标
    console.log(e)
    let index = e.currentTarget.dataset.index
    let str = `spinInfo[${index}].brand`
    this.setData({
      [str]: e.detail.value
    })
  },
  blurCount(e) {//样品数量
    console.log(e)
    let index = e.currentTarget.dataset.index
    let str = `spinInfo[${index}].samplenumber`
    this.setData({
      [str]: e.detail.value
    })
  },
  blurColor(e) {//颜色及描述
    console.log(e)
    let index = e.currentTarget.dataset.index
    let str = `spinInfo[${index}].color`
    this.setData({
      [str]: e.detail.value
    })
  },
  blurComponent(e) {//样品原料成分
    console.log(e)
    let index = e.currentTarget.dataset.index
    let str = `spinInfo[${index}].component`
    this.setData({
      [str]: e.detail.value
    })
  },
  blurNum(e) {//货号/款号
    console.log(e)
    let index = e.currentTarget.dataset.index
    let str = `spinInfo[${index}].itemNumber`
    this.setData({
      [str]: e.detail.value
    })
  },
  // 增加样品信息
  addSampleInfo() {
    let spinInfo = this.data.spinInfo
    wx.showModal({
      title: '样品信息',
      content: '是否要增加样品信息项',
      confirmColor: '#2190FE',
      confirmText: '确定',
      cancelColor: '#FF5062',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) { //确定
          spinInfo.push({
            sampleName: '',
            brand: '',
            samplenumber: '',
            color: '',
            component: '',
            itemNumber: '',
          })
          this.setData({
            spinInfo: spinInfo,
          }, () => {
            if (spinInfo.length == 7) {
              $.prompt('只能添加七个样品项哦~', 3500)
            }
          })
        }
      }
    })
  },
  // 选择样品检测类型
  radioChange1(e){
    console.log(e.detail.value)
    this.setData({
      testType: e.detail.value
    })
  },
  // 下一步
  formSubmit(e) {
    let data = {
      spinInfo:this.data.spinInfo,
      testType:this.data.testType,
      otherInfo:e.detail.value.otherInfo
    }
    // 动态往数组里面添加样品信息项数据
    let spinInfo = this.data.spinInfo
    let len = spinInfo.length
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        if (spinInfo[i].sampleName == '') {
          if (len == 1) {
            $.prompt(`请填写样品名称`)
            return
          } else if (len > 1) {
            $.prompt(`请填写样品${i + 1}的名称`)
            return
          }
        } else if (spinInfo[i].samplenumber == '') {
          if (len == 1) {
            $.prompt(`请填写样品数量`)
            return
          } else if (len > 1) {
            $.prompt(`请填写样品${i + 1}的数量`)
            return
          }
        } else if (spinInfo[i].color == '') {
          if (len == 1) {
            $.prompt(`请填写样品颜色及描述`)
            return
          } else if (len > 1) {
            $.prompt(`请填写样品${i + 1}的颜色及描述`)
            return
          }
        } else if (spinInfo[i].itemNumber == '') {
          if (len == 1) {
            $.prompt(`请填写样品货号/款号`)
            return
          } else if (len > 1) {
            $.prompt(`请填写样品${i + 1}的货号/款号`)
            return
          }
        }
      }
    }
    if(data.testType == ''){
      $.prompt('请选择样品检测方法')
      return
    }

    // 合并对象
    function extend(target, source) {
      for (var obj in source) {
        target[obj] = source[obj];
      }
      return target;
    }
    let data2 = extend(this.data.data1, data)
    console.log(data2)

    // return
    this.setData({
      data2
    },()=>{
      wx.navigateTo({
        url: '../textile-b/textile-b',
      })
    })
  }
})