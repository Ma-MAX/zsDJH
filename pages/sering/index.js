import fetch from '../../utils/fetch.js'
Page({

  data: {
    id: '',
    serInfo: {},
    contactBtn: false,
    endBtn: false,
    red: true,
    buttonText: '结束服务'
  },

  getSerInfo() {
    const url = `/api/order/small-program/employ/detail/${this.data.id}`

    fetch.getRes(url).then(res => {
      
      this.setData({
        serInfo: res.data.data
      })
    
    })
  },

  endClick() {
    this.setData({
      endBtn: true
    })
    if(this.data.buttonText == '结束服务'){
      this.setData({
        endBtn: false
      })
      const url = `/api/order/small-program/employ/end-server/${this.data.id}`
      fetch.getRes(url).then((res) => {
       
        if(res.data.code == '200'){
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            buttonText: '已结束',
            endBtn: true,
            red: false
          })
          this.getTodayOred()
          this.getOpenerEventChannel()
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      id: options.id
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getSerInfo()
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