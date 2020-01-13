// pages/myServiceOrder/index.js
import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isday: true,
    isBtn: true,
    isTime: false,
    isDis: false,
    listData: {
      p:1,
      s:1000,
      condition: {
        status: 'WAIT_SERVER',
      }
    },
    listData2: {
      p:1,
      s:1000,
    },
    serOderData: [],
    currentIndexList: 0,
    headList: [ "待服务", "服务中", "已完成", "已取消"],
    resStatu: '待服务',
    cancelState:"已完成",
    // Control 均为控制 view视图
    cancelControl:"cancel_state",
    btnControl:"control",
    butnControl:"btn_box",
    buttonStyle: "btn_confirm",
    buttonText:"开始服务"
    // buttonStyle:btn_confirm,btn_cancel
    // cancelControl: cancel_state
    // btnControl,butnControl: btn_box
  },
  activeIndex(e) {
    let data = this.data;
    let headList= ["待服务", "服务中", "已完成", "已取消"];
    console.log(e);
    this.setData({
      currentIndexList: e.target.dataset.index,
      cancelState: headList[e.target.dataset.index],
      butnControl: (e.target.dataset.index < 2) ? "btn_box" : "control",
    })
    if (data.cancelState =="服务中"){
      this.setData({
        isTime: true,
        buttonText:"结束服务",
        isBtn: true,
        resStatu: "服务中",
        listData:{
          p:1,
          s:1000,
          condition: {
            status: 'SERVICEING',
          }
        }
      })

      this.getTodayOred()
      
    }else if (data.cancelState =="待服务"){
      this.setData({
        isTime: false,
        buttonText:"开始服务",
        isBtn: true,
        resStatu: "待服务",
        listData:{
          p:1,
          s:1000,
          condition: {
            status: 'WAIT_SERVER',
          }
        }
      })

      this.getTodayOred()
    }else if (data.cancelState =="已完成"){
      this.setData({
        isTime: false,
        resStatu: "已完成",
        isBtn: false,
        listData:{
          p:1,
          s:1000,
          condition: {
            status: 'COMPLETED',
          }
        }
      })

      this.getTodayOred()
    }else if (data.cancelState =="已取消"){
      this.setData({
        isTime: false,
        resStatu: "已取消",
        isBtn: false,
        listData:{
          p:1,
          s:1000,
          condition: {
            status: 'CANCELED',
          }
        }
      })

      this.getTodayOred()
    }
  },
  getTodayOred() {
    console.log('请求了');
    
    const url = `/api/order/small-program/employ/today-work-order-list`
    fetch.postRes(url,this.data.listData).then(res => {
       this.setData({
        serOderData: res.data.data
       })
    })
  },
  getTomOred() {
    const url = `/api/order/small-program/employ/tomorrow-work-order-list`
    fetch.postRes(url,this.data.listData2).then(res => {
      this.setData({
        resStatu: '待服务',
        serOderData: res.data.data
      })
     
    })
  },
  today() {
    this.setData({
      isday: true,
      isBtn: true
    })
    this.getTodayOred()
    
  },
  tomorrow() {
    this.setData({
      isday: false,
      isBtn: false
    })
    
    this.getTomOred()
    
  },

  // 开始&结束服务
  btnClick(e) {
    this.setData({
      isDis: true,
    })
    if(this.data.buttonText == '开始服务'){
   
      const url = `/api/order/small-program/employ/start-server/${e.currentTarget.dataset.id}`
      fetch.getRes(url).then(res => {
        this.setData({
          isDis: false,
        })
        if(res.data.code == '200'){
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          this.getTodayOred()
        }else if(res.data.code == '500'){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else if(this.data.buttonText == '结束服务'){
      
      const url = `/api/order/small-program/employ/end-server/${e.currentTarget.dataset.id}`
      fetch.getRes(url).then((res) => {
        this.setData({
          isDis: false,
        })
        if(res.data.code == '200'){
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
         
          this.getTodayOred()
        }else if(res.data.code == '500'){
          
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
       
      
      })
    }
  },

  gotoInfo(e) {
    if (this.data.resStatu =="待服务"){
     
      wx.navigateTo({
        url: `/pages/waitSer/index?id=${e.currentTarget.dataset.id}&isBtn=${this.data.isday}`
       
      })
    }else if (this.data.resStatu =="服务中"){
      
      wx.navigateTo({
        url: `/pages/sering/index?id=${e.currentTarget.dataset.id}`,
       
      })
    }else if (this.data.resStatu =="已完成"){
      
      wx.navigateTo({
        url: `/pages/complead/index?id=${e.currentTarget.dataset.id}`,
        
      })
    }else if (this.data.resStatu =="已取消"){
      
      wx.navigateTo({
        url: `/pages/canceled/index?id=${e.currentTarget.dataset.id}`,
        
      })
    }
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTodayOred()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})