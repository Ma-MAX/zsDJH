// pages/logWechat/index.js
import fetch from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginName: '13689597476',
    verificationCode: '',
    codeLoading: false,
    iscode: false,
    loginLoading: false,
    islogin: false,
    btntext: '获取验证码',
    time: 0
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
    this.setData({
      codeLoading: true,
      iscode: true
    })
    
    const url = `/api/auth/verification-code?mobile=${this.data.loginName}`
   
    fetch.getRes(url).then(res => {
      this.setData({
        codeLoading: false,
      })
      
      if(res.data.code == 200){
        
        var countDown = 60;
        var setID = setInterval(() => {
          
          this.setData({
            time: countDown,
            btntext: `${countDown}秒后重新获取`
          })
          countDown--
          if(countDown == 0){
            this.setData({
              time: 0,
              btntext: `获取验证码`
            })
            clearInterval(setID)
          }
        }, 1000)

        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 1000
        })
        this.setData({
          verificationCode: res.data.message
        });
      }
    })
  },

  login(e) {
    this.setData({
      loginLoading: true,
      islogin: true
    })
    
    const data = {
      loginName: this.data.loginName,
      verificationCode: this.data.verificationCode,
    }
   
    const url = `/api/auth/login`
    console.log(data);
    fetch.postRes(url,data).then(res => {
      if(res.data.code == 200){
        wx.switchTab({
          url: '../homePage/index',
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