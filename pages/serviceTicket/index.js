// pages/myServiceOrder/index.js
import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isday: true,
    listData: {
      p:1,
      s:1000,
      condition: {
        status: 'WAIT_SERVER',
      }
    },
    currentIndexList: 0,
    headList: [ "待服务", "服务中", "已完成", "已取消"],
    serviceList: ["服务客户: ", "服务地址: ", "服务时间: "],
    dataList:["6次(服务3)","李四", "2019-12-12-8:00-12:00(周一)"],
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
    if (data.cancelState !="待服务"){
      this.setData({
        buttonText:"结束服务"
      })
      
    }else{
      this.setData({
        buttonText: "开始服务"
      })
    }
  },
  getOred() {
    const url = `/api/order/small-program/employ/today-work-order-list`
    fetch.postRes(url,this.data.listData).then(res => {
      if(res.data == 200) {
        console.log(res.data);
        
      }
    })
  },
  today() {
    
    this.setData({
      isday: true
    })
  },
  tomorrow() {
    
    this.setData({
      isday: false
    })
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
    this.getOred()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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