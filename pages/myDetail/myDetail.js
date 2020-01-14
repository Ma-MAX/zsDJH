// pages/myDetail/myDetail.js
import request from "../../utils/fetch.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    tihuoWay: '本月',
    array: ['本月','上月'],
    detail: [],
    title: [],
    param: {
      p: 1,
      s: 10000,
      condition: {
        monthValue: 'CURENT_MONTH'
      }
    },
    api: {
      finishOrder: '/api/order/small-program/employ/complet-work-order-list/curnnet',
      titleInfo: '/api/order/small-program/employ/complet-work-order-list-statis/curnnet'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request.postRes(this.data.api.finishOrder, this.data.param).then(res => {
      this.setData({
        detail: res.data.data
      })
      console.log(res.data);
    })
    request.postRes(this.data.api.titleInfo, this.data.param.condition).then(res => {
      this.setData({
        title: res.data.data
      })
    });
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   index: e.detail.value
    // })
    this.data.param.condition.monthValue = e.detail.value == 0 ? 'CURENT_MONTH' : 'PRE_MONTH';
    this.setData({
      tihuoWay: this.data.array[e.detail.value]
    });
    request.postRes(this.data.api.finishOrder, this.data.param).then(res => {
      this.setData({
        detail: res.data.data
      })
    })
    request.postRes(this.data.api.titleInfo, this.data.param.condition).then(res => {
      this.setData({
        title: res.data.data
      })
    });
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    this.data.param.condition.monthValue = e.currentTarget.dataset.value;
    this.setData({
      tihuoWay: name,
      select: false
    });
    request.postRes(this.data.api.finishOrder, this.data.param).then(res => {
      this.setData({
        detail: res.data.data
      })
      console.log(res.data);
    })
    request.postRes(this.data.api.titleInfo, this.data.param.condition).then(res => {
      this.setData({
        title: res.data.data
      })
    });
  }
})