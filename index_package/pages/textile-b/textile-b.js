// index_package/pages/textile-b/textile-b.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foldId1: '', //折叠项当前id
    foldId2: '',
    foldId3: '',
    foldId4: '',
    foldId5: '',
    height1: 500,
    height2: 500,
    height3: 500,
    height4: 500,
    height5: 1000,
    rotate1: 'rotate(180deg)',
    rotate2: 'rotate(180deg)',
    rotate3: 'rotate(180deg)',
    rotate4: 'rotate(180deg)',
    rotate5: 'rotate(180deg)',
    // 综合
    allType: [{
        name: 'normal',
        value: '常规套餐（GB 1840 + 纤维含量 + 标识）'
      },
      {
        name: 'gb1',
        value: 'GB 18401全项'
      },
      {
        name: 'gb2',
        value: 'GB 31701'
      }
    ],
    // 综合子集合
    gb2: [{
        name: 'all',
        value: '全项'
      },
      {
        name: 'sth',
        value: '理化性能'
      }
    ],
    // 纤维成分
    fibrillar: [{
        name: 'fibrillar1',
        value: '纤维含量'
      },
      {
        name: 'fibrillar2',
        value: '棉麻纤维含量'
      },
      {
        name: 'fibrillar3',
        value: '特种毛含量'
      }
    ],
    // 色牢度---干湿性
    swet: [{
        name: 'dry',
        value: '干'
      },
      {
        name: 'swet',
        value: '湿'
      }
    ],
    // 色牢度-----酸碱性
    ph: [{
        name: 'ph1',
        value: '碱'
      },
      {
        name: 'ph2',
        value: '酸'
      }
    ],
    // 化学成分
    chemistry: [{
        name: '甲醛',
        value: '甲醛'
      },
      {
        name: 'PH值',
        value: 'PH值'
      },
      {
        name: '异味',
        value: '异味'
      },
      {
        name: '邻苯二甲酸酯',
        value: '邻苯二甲酸酯'
      },
      {
        name: '可分解芳香胺',
        value: '可分解芳香胺（偶氮）'
      },
      {
        name: '可萃取重金属',
        value: '可萃取重金属'
      },
      {
        name: '重金属',
        value: '重金属（总铅、总镉）'
      }

    ],
    // 物理性能----子集合
    phy1: [{
        name: 'a1',
        value: '摆锤法'
      },
      {
        name: 'a2',
        value: '单舌法'
      }
    ],
    phy2: [{
        name: 'b1',
        value: '条样法'
      },
      {
        name: 'b2',
        value: '抓样法'
      }
    ],
    phy3: [{
        name: 'c1',
        value: '精梳'
      },
      {
        name: 'c2',
        value: '粗梳'
      }
    ],
    phy4: [{
        name: 'd1',
        value: '破损'
      },
      {
        name: 'd2',
        value: '质损'
      },
      {
        name: 'd3',
        value: '外观'
      }
    ],
    phy5: [{
        name: 'e1',
        value: '含规格'
      },
      {
        name: 'e2',
        value: '不含规格'
      }
    ],
    checkFn: [{
        name: 'ck1',
      value: '服务方决定'
      },
      {
        name: 'ck2',
        value: '委托方指定'
      }
    ],
    // 检测标准
    standard:[{
        name: 'ck3',
        value: '中国GB/FZ等'
      },
      {
        name: 'ck4',
        value: '国际标准ISO'
      },
      {
        name: 'ck5',
        value: '欧盟EN'
      },
      {
        name: 'ck6',
        value: '德国DIN'
      },
      {
        name: 'ck7',
        value: '美国AATCC/ASTM'
      },
      {
        name: 'else',
        value: '其他'
      }
    ],
    // 判断标准-----子集合
    judge1: [{
        name: 'jd1',
        value: '委托方指定'
      },
      {
        name: 'jd2',
        value: '服务方决定'
      }
    ],
    judge2: [{
        name: 'jd1a',
        value: 'A'
      },
      {
        name: 'jd2a',
        value: 'B'
      },
      {
        name: 'jd3a',
        value: 'C'
      }
    ],
    judge3: [{
        name: 'jd1b',
        value: 'A'
      },
      {
        name: 'jd2b',
        value: 'B'
      },
      {
        name: 'jd3b',
        value: 'C'
      }
    ],
    judge4: [{
        name: 'jd4a',
        value: '原色产品'
      },
      {
        name: 'jd4b',
        value: '水洗产品'
      }
    ],
    judge5: [{
        name: 'jd5a',
        value: '优等品'
      },
      {
        name: 'jd5b',
        value: '一等品'
      },
      {
        name: 'jd5c',
        value: '合格品'
      },
      {
        name: 'jd5d',
        value: '其他'
      }
    ],
    comprehensive: [], //综合
    comprehensive1: '', //综合-->子集合
    showOne: false,
    fiberContent: [], //纤维成份
    colorFastness: [], //色牢度
    colorFastness1: '', //色牢度-->子集
    colorFastness2: '', //色牢度-->子集
    show3a: false,
    show3b: false,
    chem: [], //化学
    physicsPerformance: [], //物理性能
    physicsPerformance3: '',
    physicsPerformance4:'',
    physicsPerformance5: '',
    physicsPerformance6: '',
    testMode:'',//检测方法
    testMode1:'',//委托方指定的检测方法
    determineMethod: '',//判断的标准
    determineMethod0: '',//委托方指定的判断方法
    determineMethod1: '',//
    determineMethod1a: '',//
    determineMethod2: '',//
    determineMethod3: '',//
    determineMethod4: '',//
    determineMethod5: '',//
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      height1: 0,
      height2: 0,
      height3: 0,
      height4: 0,
      height5: 0,
      rotate1: 'rotate(0deg)',
      rotate2: 'rotate(0deg)',
      rotate3: 'rotate(0deg)',
      rotate4: 'rotate(0deg)',
      rotate5: 'rotate(0deg)',
    })
    
  },
  onShow(){
    //获取页面栈
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    if (pages.length > 1) { //说明有上一页存在
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里，调用上一页的函数
      // console.log(prePage.data.data)
      this.setData({
        data2: prePage.data.data2
      })
    }
  },
  // 综合
  radioChange1(e) {
    console.log(e.detail.value)
    let list = e.detail.value
    this.setData({
      comprehensive: list
    })
    for (let i = 0; i < list.length; i++) {
      if (list[i] == 'GB31701') {
        this.setData({
          showOne: true
        })
        break;
      } else {
        this.setData({
          showOne: false
        })
      }
    }
  },
  // 综合-->子集合
  radioChange1a(e) {
    console.log(e.detail.value)
    this.setData({
      comprehensive1: e.detail.value
    })
  },
  // 产品标准
  radioChange9(e){
    console.log(e.detail.value)
    this.setData({
      determineMethod0: e.detail.value
    })
  },
  // 纤维成分
  radioChange2(e) {
    console.log(e.detail.value)
    this.setData({
      fiberContent: e.detail.value
    })
  },

  // 色牢度
  radioChange3(e) {
    console.log(e.detail.value)
    let list3 = e.detail.value
    this.setData({
      colorFastness: list3
    })
    // if(list3.length == 0 ){
    //   this.setData({
    //     show3a: false,
    //     show3b:false,
    //   })
    // }
    // for (let i = 0; i < list3.length; i++) {
    //   if (list3[i] == '耐摩擦') {
    //     console.log('进来了')
    //     this.setData({
    //       show3a: true
    //     })
    //     break;
    //   } else {
    //     this.setData({
    //       show3a: false
    //     })
    //   }
    // }
    // for (let j = 0; j < list3.length; j++) {
    //   if (list3[j] == '耐汗渍') {
    //     this.setData({
    //       show3b: true
    //     })
    //     break;
    //   } else {
    //     this.setData({
    //       show3b: false
    //     })
    //   }
    // }
  },
  radioChange3a(e) {
    console.log(e.detail.value)
    this.setData({
      colorFastness1: e.detail.value
    })
  },
  radioChange3b(e) {
    console.log(e.detail.value)
    this.setData({
      colorFastness2: e.detail.value
    })
  },
  

  // 化学成分
  radioChange4(e) {
    console.log(e.detail.value)
    this.setData({
      chem: e.detail.value
    })
  },

  // 物理性能
  radioChange5(e) {
    console.log(e.detail.value)
    this.setData({
      physicsPerformance: e.detail.value
    })
  },
  radioChange5a(e) {
    console.log(e.detail.value)
    this.setData({
      physicsPerformance1: e.detail.value
    })
  },
  radioChange5b(e) {
    console.log(e.detail.value)
    this.setData({
      physicsPerformance2: e.detail.value
    })
  },
  radioChange5c(e) {
    console.log(e.detail.value)
    this.setData({
      physicsPerformance3: e.detail.value
    })
  },
  radioChange5d(e) {
    console.log(e.detail.value)
    this.setData({
      physicsPerformance4: e.detail.value
    })
  },
  radioChange5e(e) {
    console.log(e.detail.value)
    this.setData({
      physicsPerformance5: e.detail.value
    })
  },
  radioChange5f(e) {
    console.log(e.detail.value)
    this.setData({
      physicsPerformance6: e.detail.value
    })
  },
  radioChange6(e){
    console.log(e.detail.value)
    this.setData({
      testMode:e.detail.value
    })
  },
  radioChange6a(e) {
    console.log(e.detail.value)
    this.setData({
      testMode1: e.detail.value
    })
  },
  radioChange7(e){
    console.log(e.detail.value)
    this.setData({
      determineMethod: e.detail.value
    })
  },
  // radioChange77(e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     determineMethod0: e.detail.value
  //   })
  // },
  // 产品标准
  radioChange9(e) {
    console.log(e.detail.value)
    this.setData({
      determineMethod1a: e.detail.value
    })
  },
  radioChange7a(e) {
    console.log(e.detail.value)
    this.setData({
      determineMethod1: e.detail.value
    })
  },
  radioChange7b(e) {
    console.log(e.detail.value)
    this.setData({
      determineMethod2: e.detail.value
    })
  },
  radioChange7c(e) {
    console.log(e.detail.value)
    this.setData({
      determineMethod3: e.detail.value
    })
  },
  radioChange7d(e) {
    console.log(e.detail.value)
    this.setData({
      determineMethod4: e.detail.value
    })
  },
  radioChange7e(e) {
    console.log(e.detail.value)
    this.setData({
      determineMethod5: e.detail.value
    })
  },
  // 折叠选项
  fold(e) {
    let id = e.currentTarget.dataset.id
    if (id == 1) {
      if (this.data.height1 != 0) {
        this.setData({
          height1: 0,
          rotate1: 'rotate(0deg)'
        })
      } else {
        this.setData({
          height1: 500,
          rotate1: 'rotate(180deg)'
        })
      }
    } else if (id == 2) {
      if (this.data.height2 != 0) {
        this.setData({
          height2: 0,
          rotate2: 'rotate(0deg)'
        })
      } else {
        this.setData({
          height2: 500,
          rotate2: 'rotate(180deg)'
        })
      }
    } else if (id == 3) {
      if (this.data.height3 != 0) {
        this.setData({
          height3: 0,
          rotate3: 'rotate(0deg)'
        })
      } else {
        this.setData({
          height3: 500,
          rotate3: 'rotate(180deg)'
        })
      }
    } else if (id == 4) {
      if (this.data.height4 != 0) {
        this.setData({
          height4: 0,
          rotate4: 'rotate(0deg)'
        })
      } else {
        this.setData({
          height4: 500,
          rotate4: 'rotate(180deg)'
        })
      }
    } else if (id == 5) {
      if (this.data.height5 != 0) {
        this.setData({
          height5: 0,
          rotate5: 'rotate(0deg)'
        })
      } else {
        this.setData({
          height5: 1000,
          rotate5: 'rotate(180deg)'
        })
      }
    }
  },
  // 上一步
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 下一步
  formSubmit(e) {
    /*------- 综合Begin---------*/
    let comprehensive = this.data.comprehensive
    let len = comprehensive.length;
    // console.log(comprehensive)
    for (let i = 0; i < len; i++) {
      if (comprehensive[i] == 'GB31701' && this.data.comprehensive1 != '' || comprehensive[i] == '全项' || comprehensive[i] == '理化性能') {
        // console.log('进来了')
        comprehensive.splice(i, 1, this.data.comprehensive1)
        break
      } else if (comprehensive[i] == 'GB31701' && this.data.comprehensive1 == '') {
        $.prompt('请选择综合里GB31701的项')
        return
      }
    }
    comprehensive = comprehensive.toString() //数组转换成字符串
    // console.log(comprehensive)
    /*------- 综合End---------*/

    /*------- 纤维成分B---------*/
    let fiberContent = this.data.fiberContent
    console.log(fiberContent)
    fiberContent = fiberContent.toString()
    // console.log(fiberContent)
    /*------- 纤维成分E---------*/

    /*------- 色牢度B---------*/
    let colorFastness = this.data.colorFastness
    let colorFastness1 = this.data.colorFastness1
<<<<<<< HEAD
    let colorFastness2 = this.data.colorFastness2
=======
    if(colorFastness1.length != 0){
      colorFastness1 = colorFastness1.toString()
      console.log('jjjjjjj')
      console.log(colorFastness1)
      console.log('dddddddd')
      colorFastness1 = colorFastness1.replace(',','/')
      console.log('1111111')
      console.log(colorFastness1)
      console.log('1111111')

    }
    let len1 = colorFastness.length;
    // console.log(colorFastness)
    // 耐摩擦
    for (let i = 0; i < len1; i++) {
      if (colorFastness[i] == '耐摩擦' && colorFastness1.length != 0 ) {
        colorFastness.splice(i, 1, colorFastness1)
        break
      } else if (colorFastness[i] == '耐摩擦' && colorFastness1.lenght == 0) {
        $.prompt('请选择色牢度中耐摩擦的类型')
        return
      }
    }
    return

    // console.log(colorFastness, "阿萨家")
    // 耐汗渍 
    colorFastness.forEach((item, index) => {
      if (item == '耐汗渍') {
        if (!this.data.colorFastness2) {
          $.prompt('请选择色牢度中耐汗渍的类型')
          return
        } else {
          colorFastness[index] = this.data.colorFastness2
        }
      }
    })
    // console.log("执行")
>>>>>>> c836e5dca9616aaffc387797710f71c6c4719a6c

    if(colorFastness1.length != 0 && colorFastness1.length == 2){
      colorFastness = colorFastness.concat(this.data.colorFastness1)
    } else if (colorFastness1.length != 0 && colorFastness1.length == 1){
      colorFastness = colorFastness.push(colorFastness1[0])
    }
    if (this.data.colorFastness2.length != 0) {
      colorFastness = colorFastness.concat(this.data.colorFastness2)
    }
    colorFastness = colorFastness.toString()
    console.log(colorFastness)
    return
     //数组转换成字符串
    // let len1 = colorFastness.length;
    // // console.log(colorFastness)
    // // 耐摩擦
    // for (let i = 0; i < len1; i++) {
    //   if (colorFastness[i] == '耐摩擦' && this.data.colorFastness1 != '' || this.data.colorFastness1 == '干' || this.data.colorFastness1 == '湿') {
    //     colorFastness.splice(i, 1, this.data.colorFastness1)
    //     break
    //   } else if (colorFastness[i] == '耐摩擦' && this.data.colorFastness1 == '') {
    //     $.prompt('请选择色牢度中耐摩擦的类型')
    //     return
    //   }
    // }
    // // console.log(colorFastness, "阿萨家")
    // // 耐汗渍 
    // colorFastness.forEach((item, index) => {
    //   if (item == '耐汗渍') {
    //     if (!this.data.colorFastness2) {
    //       $.prompt('请选择色牢度中耐汗渍的类型')
    //       return
    //     } else {
    //       colorFastness[index] = this.data.colorFastness2
    //     }
    //   }
    // })
    // // console.log("执行")

    // console.log(colorFastness)
    /*------- 色牢度E---------*/

    /*----------- 化学成分B --------------*/
    let chem = this.data.chem
    console.log(chem)
    chem = chem.toString()
    // console.log(chem)
    /*----------- 化学成分E---------*/

    /*----------- 物理性能B---------*/
    let physicsPerformance = this.data.physicsPerformance
    let len2 = physicsPerformance.length
    // console.log(physicsPerformance)

    
    for (let i = 0; i < len2; i++) {//撕破强力
      if (physicsPerformance[i] == '撕破强力') {
        if (this.data.physicsPerformance1) {
          physicsPerformance[i] = this.data.physicsPerformance1
        } else {
          $.prompt('请选择物理性能中撕破强力的方法')
          return
        }
      }
    }
    for (let i = 0; i < len2; i++) {//断裂强力
      if (physicsPerformance[i] == '断裂强力') {
        if (this.data.physicsPerformance2) {
          physicsPerformance[i] = this.data.physicsPerformance2
        } else {
          $.prompt('请选择物理性能中断裂强力的方法')
          return
        }
      }
    }

    
    for (let i = 0; i < len2; i++) {//起毛起球
      if (physicsPerformance[i] == '起毛起球') {
        if (this.data.physicsPerformance3 != '' ) {
          if(this.data.physicsPerformance3 != '箱式'){
            physicsPerformance[i] = this.data.physicsPerformance3
          }else{
            if(this.data.physicsPerformance4 == ''){
              $.prompt('请选择起毛起球中箱式的风格')
              return
            }else{
              physicsPerformance[i] = this.data.physicsPerformance4
            }
          }
        } else {
          $.prompt('请选择物理性能中起毛起球的形式')
          return
        }
      }
    }

    for (let i = 0; i < len2; i++) {//耐磨性能
      if (physicsPerformance[i] == '耐磨性能') {
        if (this.data.physicsPerformance5 != '') {
          physicsPerformance[i] = this.data.physicsPerformance5
        } else {
          $.prompt('请选择物理性能中耐磨性能的程度')
          return
        }
      }
    }

    for (let i = 0; i < len2; i++) {//外观质量
      if (physicsPerformance[i] == '外观质量') {
        if (this.data.physicsPerformance6 != '') {
          physicsPerformance[i] = this.data.physicsPerformance6
        } else {
          $.prompt('请选择物理性能中外观质量的条件')
          return
        }
      }
    }

    physicsPerformance = physicsPerformance.toString()
    // console.log(physicsPerformance)
    /*----------- 物理性能E---------*/


    /*------------检测方法B-----------------*/
    let testMode = this.data.testMode
    if(testMode == ''){
      $.prompt('请选择检测方法')
      return
    }else{
      if(testMode == '委托方指定'){
        if(this.data.testMode1 == ''){
          $.prompt('请选择检测方法的标准')
          return
        }else{
          if(this.data.testMode1 == '其他'){
            if(e.detail.value.type != ''){
              testMode = e.detail.value.type
            }else{
              $.prompt('请填写检测方法中的其他标准')
              return
            }
          }
          testMode = this.data.testMode1
        }
      }
    }
    // console.log(testMode)
    /*------------检测方法E-----------------*/

    /*------------判断标准B-----------------*/
    let determineMethod = this.data.determineMethod
    if(determineMethod == ''){
      $.prompt('请选择判断标准')
      return
    }else{
      if(determineMethod == '判定'){
        if(this.data.determineMethod1 == ''){
          $.prompt('请选择判断标准的主体')
          return
        }else{
          if(this.data.determineMethod1 == '服务方决定'){
            determineMethod = this.data.determineMethod1
          }else{
            if(this.data.determineMethod0 == ''){
              $.prompt('请选择委托方指定的判断标准')
              return
            }else{
              if (this.data.determineMethod0 == 'GB18401'){
                if(this.data.determineMethod2 == ''){
                  $.prompt('请选择判断标准GB 18401的类型');
                  return
                }else{
                  determineMethod = `18401${this.data.determineMethod2}`
                }
              } else if (this.data.determineMethod0 == 'GB31701'){
                if (this.data.determineMethod3 == '') {
                  $.prompt('请选择判断标准GB 31701的类型');
                  return
                } else {
                  determineMethod = `31701${this.data.determineMethod3}`
                }
              } else if (this.data.determineMethod0 == '牛仔服装') {
                if (this.data.determineMethod4 == '') {
                  $.prompt('请选择判断标准牛仔服装的类型');
                  return
                } else {
                  determineMethod = this.data.determineMethod4
                }
              } 
            }
          }
        }
        // determineMethod = this.data.determineMethod1
      }
    }
    // console.log(determineMethod)

    /*------------判断标准E-----------------*/


    /*------------其他项目B-----------------*/

    // if()
    /*------------其他项目E-----------------*/


    // return
    let data = {
      comprehensive: comprehensive,
      fiberContent: fiberContent,
      colorFastness: colorFastness,
      chem: chem,
      physicsPerformance: physicsPerformance,
      testMode: testMode,
      determineMethod,
      otherproject:e.detail.value.otherproject
    }
    console.log(data)
    console.log('111111111')

    // 合并对象
    function extend(target, source) {
      for (var obj in source) {
        target[obj] = source[obj];
      }
      return target;
    }
    let data3 = extend(this.data.data2, data)
    this.setData({
      data3
    })
    console.log('333333333')
    console.log(data3)
    wx.navigateTo({
      url: '../textile-c/textile-c',
    })
  }
})