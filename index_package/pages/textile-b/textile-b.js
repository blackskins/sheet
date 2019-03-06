// index_package/pages/textile-b/textile-b.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foldId1: '',//折叠项当前id
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
    // 总合
    allType: [
      {
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
    gb2:[
      {
        name:'all',
        value:'全项'
      },
      {
        name: 'sth',
        value: '理化性能'
      }
    ],
    // 纤维成分
    fibrillar:[
      {
        name:'fibrillar1',
        value:'纤维含量'
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
    swet: [
      {
        name: 'dry',
        value: '干'
      },
      {
        name: 'swet',
        value: '湿'
      }
    ],
    // 色牢度-----酸碱性
    ph: [
      {
        name: 'ph1',
        value: '碱'
      },
      {
        name: 'ph2',
        value: '酸'
      }
    ],
    // 化学成分
    chemistry: [
      {
        name: 'c1',
        value: '甲醛'
      },
      {
        name: 'c2',
        value: 'PH值'
      },
      {
        name: 'c3',
        value: '异味'
      },
      {
        name: 'c5',
        value: '邻苯二甲酸酯'
      }, 
      {
        name: 'c4',
        value: '可分解芳香胺（偶氮）'
      },
      {
        name: 'c6',
        value: '可萃取重金属'
      },
      {
        name: 'c7',
        value: '重金属（总铅、总镉）'
      }

    ],
    // 物理性能----子集合
    phy1:[
      {
        name:'a1',
        value:'摆锤法'
      },
      {
        name: 'a2',
        value: '单舌法'
      }
    ],
    phy2: [
      {
        name: 'b1',
        value: '条样法'
      },
      {
        name: 'b2',
        value: '抓样法'
      }
    ],
    phy3: [
      {
        name: 'c1',
        value: '精梳'
      },
      {
        name: 'c2',
        value: '粗梳'
      }
    ],
    phy4: [
      {
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
    phy5: [
      {
        name: 'e1',
        value: '含规格'
      },
      {
        name: 'e2',
        value: '不含规格'
      }
    ],
    checkFn: [
      {
        name: 'ck1',
        value: '委托方指定'
      },
      {
        name: 'ck2',
        value: '服务方决定'
      },
      {
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
    judge1:[
      {
        name:'jd1',
        value:'委托方指定'
      },
      {
        name: 'jd2',
        value: '服务方决定'
      }
    ],
    judge2: [
      {
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
    judge3: [
      {
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
    judge4: [
      {
        name: 'jd4a',
        value: '原色产品'
      },
      {
        name: 'jd4b',
        value: '水洗产品'
      }
    ],
    judge5: [
      {
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 下一页
  toNextPage() {
    wx.navigateTo({
      url: '../textile-c/textile-c',
    })
  },
  // 
  fold(e){
    let id = e.currentTarget.dataset.id
    if(id == 1){
      if(this.data.height1 != 0){
        this.setData({
          height1:0,
          rotate1:'rotate(0deg)'
        })
      }else{
        this.setData({
          height1:500,
          rotate1: 'rotate(180deg)'
        })
      }
    }else if( id == 2 ){
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
    wx.navigateTo({
      url: '../textile-b/textile-b',
    })
  }
})