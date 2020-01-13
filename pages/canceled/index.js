import fetch from '../../utils/fetch.js'
Page({

  data: {
    id: '',
    serInfo: {},
    contactBtn: false,
    endBtn: false,
    buttonText: '开始服务'
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
    if(this.data.buttonText == '开始服务'){
   
      const url = `/api/order/small-program/employ/start-server/${this.data.id}`
      fetch.getRes(url).then(res => {
        this.setData({
          isDis: false,
        })
        this.getTodayOred()
      })
    }else if(this.data.buttonText == '结束服务'){
      
      const url = `/api/order/small-program/employ/end-server/${this.data.id}`
      fetch.getRes(url).then((res,err) => {
        this.setData({
          isDis: false,
        })
        if(res.status == '500'){
         
          this.getTodayOred()
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