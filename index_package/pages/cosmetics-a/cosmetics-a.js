// index_package/pages/cosmetics-a/cosmetics-a.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头部的基本信息列表组
    count: 1,
    // 样品信息列表
    sampleList: [{
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
    sampleTypes: [{
        name: 'food',
        value: '食品类'
      },
      {
        name: 'kh',
        value: '保健类'
      },
      {
        name: 'em',
        value: '环境类'
      },
      {
        name: 'medicine',
        value: '医药及相关产品'
      },
      {
        name: 'water',
        value: '饮用水'
      },
      {
        name: 'feed',
        value: '饲料及相关产品'
      },
      {
        name: 'cs',
        value: '化工产品'
      },
      {
        name: 'reagent',
        value: '化学试剂'
      },
      {
        name: 'fertilizer',
        value: '肥料类'
      },
      {
        name: 'pesticide',
        value: '农药类'
      },
      {
        name: 'sun',
        value: '日化产品'
      },
      {
        name: 'metal',
        value: '金属材料'
      },
      {
        name: 'else',
        value: '其他'
      }
    ],
    sampleStatus: [{
        name: 'pellet',
        value: '颗粒'
      },
      {
        name: 'powder',
        value: '粉末'
      },
      {
        name: 'massive',
        value: '块状'
      },
      {
        name: 'schistose',
        value: '片状'
      },
      {
        name: 'stick',
        value: '棒状'
      },
      {
        name: 'fluid',
        value: '液体'
      },
      {
        name: 'emulsion',
        value: '乳状液'
      },
      {
        name: 'viscous',
        value: '粘稠液'
      },
      {
        name: 'air',
        value: '气体'
      },
      {
        name: 'capsule',
        value: '胶囊'
      },
      {
        name: 'else',
        value: '其他'
      }
    ],
    sampleOrigin: [{
        name: 'send',
        value: '送检'
      },
      {
        name: 'pick',
        value: '委托采样'
      }
    ],
    sampleSave: [{
        name: 'normal',
        value: '常规'
      },
      {
        name: 'nosun',
        value: '避光'
      },
      {
        name: 'cold',
        value: '低温'
      }
    ],
    sampleDeal: [{
        name: 'gb',
        value: '由委托方取回'
      },
      {
        name: 'sb',
        value: '寄回'
      },
      {
        name: 'sd',
        value: '由服务方处理'
      }
    ],
    sampleDangerous: [{
        name: 'none',
        value: '无'
      },
      {
        name: 'unknown',
        value: '未知'
      },
      {
        name: 'inflammable',
        value: '易燃'
      },
      {
        name: 'thrill',
        value: '刺激性气味'
      },
      {
        name: 'oxidizability',
        value: '氧化性'
      },
      {
        name: 'virulence',
        value: '毒性'
      },
      {
        name: 'infectious',
        value: '感染性'
      },
      {
        name: 'activity',
        value: '放射性'
      },
      {
        name: 'corrosivity',
        value: '腐蚀性'
      },
      {
        name: 'magnetic',
        value: '磁性'
      },
      {
        name: 'else',
        value: '其他'
      }
    ],
    sampleInfo: [//样品信息项
        {
          sampleName: '',
          sampleBatch: '',
          sampleNumber:'',
          sampleSize:''
        }
    ], 
    sample_type: '', //样品类别
    sample_status: '', //样品性状
    status_value: '', //其他样品性状的值
    sample_origin: '', //样品来源
    sample_save: '', //样品保存
    sample_deal: '', //样品处理
    sample_dangerous: '', //样品的危险性
    data1: '', //上一页面data中的data(通过页面栈来获取)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取页面栈
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    if (pages.length > 1) { //说明有上一页存在
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里，调用上一页的函数
      // console.log(prePage.data.data)
      this.setData({
        data1: prePage.data.data
      })
    }
  },
  // 上一步
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 增加样品信息
  addSampleInfo() {
    let sampleList = this.data.sampleList
    wx.showModal({
      title: '样品信息',
      content: '是否要增加样品信息项',
      confirmColor: '#2190FE',
      confirmText: '确定',
      cancelColor: '#FF5062',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) { //确定
          sampleList.push({
            sampleName: '',
            sampleBatch: '',
            sampleNumber: '',
            sampleSize: ''
          })
          this.setData({
            sampleList: sampleList,
          }, () => {
            if (sampleList.length == 7) {
              $.prompt('只能添加七个样品项哦~', 3500)
            }
          })
        }
      }
    })
  },

  // 样品类别
  radioChange1(e) {
    console.log(e.detail.value)
    this.setData({
      sample_type: e.detail.value
    })
  },
  // 样品性状
  radioChange2(e) {
    console.log(e.detail.value)
    this.setData({
      sample_status: e.detail.value
    })
  },
  // 样品来源
  radioChange3(e) {
    console.log(e.detail.value)
    this.setData({
      sample_origin: e.detail.value
    })
  },
  // 样品保存
  radioChange4(e) {
    console.log(e.detail.value)
    this.setData({
      sample_save: e.detail.value
    })
  },
  // 余样处理
  radioChange5(e) {
    console.log(e.detail.value)
    this.setData({
      sample_deal: e.detail.value
    })
  },
  // 危险性
  radioChange6(e) {
    console.log(e.detail.value)
    this.setData({
      sample_dangerous: e.detail.value
    })
  },


  // 下一步
  formSubmit(e) {
    // for(let i=0;i<this.data.sample_info.length;i++){
    //   console.log(e.detail.value.count + '1')
    //   // 'e.detail.value.weight' +
    //   // console.log("e.detail.value.count + this.data.sample_info[1].sampleBatch")
    //   console.log(e.detail.value.count + this.data.sample_info[1].sampleBatch )
    //   // console.log(e.detail.value.count + i+1)
    // }
    // return;

    if (this.data.sample_type == '其他' && e.detail.value.type != '') {
      this.setData({
        sample_type: e.detail.value.type
      })
    }
    if (this.data.sample_status == '其他' && e.detail.value.status != '') {
      this.setData({
        sample_status: e.detail.value.status
      })
    }
    if (this.data.sample_save == '低温' && e.detail.value.save != '') {
      this.setData({
        sample_save: e.detail.value.save
      })
    }
    if (this.data.sample_dangerous == '其他' && e.detail.value.dangerous != '') {
      this.setData({
        sample_dangerous: e.detail.value.dangerous
      })
    }

    // 动态往数组里面添加样品信息项数据
    let len = this.data.infoList.length
    let sampleList = []
    for (let i = 0; i < len; i++) {
      sampleList.push({
        sampleName: e.detail.value['name' + (i + 1)],
        sampleBatch: e.detail.value['num' + (i + 1)],
        sampleNumber: e.detail.value['count' + (i + 1)],
        sampleSize: e.detail.value['weight' + (i + 1)]
      })
    }
    let data2 = {
      sample: sampleList,
      sampleType: this.data.sample_type,
      sampleCharacter: this.data.sample_status,
      source: this.data.sample_origin,
      storageType: this.data.sample_save,
      surplusHandleType: this.data.sample_deal,
      danger: this.data.sample_dangerous,
      requirement: e.detail.value.requirement
    }
    console.log(data2)
    //  return
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        if (sampleList[i].sampleName == '') {
          if (len == 1) {
            $.prompt(`请填写样品名称`)
          } else if (len > 1) {
            $.prompt(`请填写样品${i+1}的名称`)
          }
          break;
        } else if (sampleList[i].sampleNumber == '') {
          if (len == 1) {
            $.prompt(`请填写样品个数`)
          } else if (len > 1) {
            $.prompt(`请填写样品${i+1}的个数`)
          }
          break;
        }
      }
    } else if (data2.sampleType == '其他' && e.detail.value.type == '') {
      $.prompt('请填写其他类别')
      return
    } else if (data2.sampleName == '') {
      $.prompt('请填写样品名称')
      return
    } else if (data2.sampleNumber == '') {
      $.prompt('请填写样品个数')
      return
    } else if (data2.sampleCharacter == '' || (this.data.sample_status == '其他' && e.detail.value.status == '')) {
      if (data2.sampleCharacter == '') {
        $.prompt('请选择样品性状')
        return
      } else if (this.data.sample_status == '其他' && e.detail.value.status == '') {
        $.prompt('请填写其他样品性状')
        return
      }
    } else if (data2.storageType == '' || (this.data.sample_save == '低温' && e.detail.value.save == '')) {
      if (data2.storageType == '') {
        $.prompt('请选择样品保存方式')
        return
      } else if (this.data.sample_save == '低温' && e.detail.value.save == '') {
        $.prompt('请填写低温保存的温度')
        return
      }
    } else if (data2.danger == '其他' && e.detail.value.dangerous == '') {
      $.prompt('请填写其他可能的危险性')
      return
    }

    console.log(data2)
    // 合并对象
    function extend(target, source) {
      for (var obj in source) {
        target[obj] = source[obj];
      }
      return target;
    }
    let data3 = extend(this.data.data1, data2)
    console.log(data3)
    // return
    wx.navigateTo({
      url: '../cosmetics-b/cosmetics-b',
    })
  }
})