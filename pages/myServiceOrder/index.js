// pages/myServiceOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndexList: 0,
    headList: ["待接单", "待服务", "服务中", "已完成", "已取消"],
    serviceList: ["服务次数: ", "服务时长: ", "服务阿姨: ", "服务时间: "],
    dataList:["6次(服务3)", "4H", "李四", "2019-12-12-8:00-12:00(周一)"],
    cancelState:"全责取消",
    // Control 均为控制 view视图
    cancelControl:"cancel_state",
    btnControl:"control",
    butnControl:"btn_box",
    buttonStyle: "btn_confirm"
    // buttonStyle:btn_confirm,btn_cancel
    // cancelControl: cancel_state
    // btnControl,butnControl: btn_box
  },
  activeIndex(e) {
    console.log(e);
    this.setData({
      currentIndexList: e.target.dataset.index
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