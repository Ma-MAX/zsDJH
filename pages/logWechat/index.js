// pages/logWechat/index.js
import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginName: '',
    verificationCode: '',
    codeLoading: false,
    iscode: false,
    loginLoading: false,
    islogin: false,
    btntext: '获取验证码',

  },
  nameInput: function (e) {
    this.setData({
      loginName: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },
  getcode(e) {
    this.data.codeLoading = true
    this.data.iscode = true
    const url = `/api/auth/verification-code?mobile=${this.data.loginName}`
   
    fetch(url).then(res => {
      this.data.codeLoading = false
      this.data.iscode = false
      if(res.data.code == 200){
        this.setData({
          verificationCode: res.data.message
        });

      }
    })
  },

  login(e) {
    this.data.loginLoading = true
    this.data.islogin = true
    const data = {
      loginName: this.data.loginName,
      verificationCode: this.data.verificationCode,
    }
   
    const url = `/api/auth/login`
    console.log(data);
    fetch(url,data,'post').then(res => {
      if(res.data.code == 200){
        wx.setStorage({
          key:"token",
          data:res.data.data
        })
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})