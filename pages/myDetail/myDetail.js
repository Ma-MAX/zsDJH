// pages/myDetail/myDetail.js
import request from "../../utils/fetch.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    tihuoWay: '本月',
    detail: [],
    param: {
      p: 1,
      s: 10000,
      condition: {
        month: 'CURENT_MONTH',
        userId: '',
        openId: ''
      }
    },
    api: {
      finishOrder: '/api/order/small-program/employ/complet-work-order-list-statis'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorage('token');
    request.postRes(this.data.api.finishOrder, this.data.param,token).then(res => {
      this.setData({
        detail: res.data
      })
    })
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

  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.data.param.condition.month = e.currentTarget.dataset.value;
    this.setData({
      tihuoWay: name,
      select: false
    });
  }
})