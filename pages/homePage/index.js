
import fetch from '../../utils/fetch.js'
var Moment = require("../../utils/moment.js");
var DATE_YEAR = new Date().getFullYear();
var DATE_MONTH = new Date().getMonth() + 1;
var DATE_DAY = new Date().getDate();

Page({
  data: {
    year: '',
    month: '',
    day: '',
    days: {},
    systemInfo: {},
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    checkDate:[],
    homeData: {}
  },
  onLoad: function(options) {
    var _this = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    // 页面初始化 options为页面跳转所带来的参数
    this.createDateListData();
    this.setData({
      year: year,
      month: month
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          systemInfo: res,
        });
      }
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    this.getHomeData()
  },
  

  /**创建日历数据 */
  createDateListData: function(setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dataStr = [
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '休', bgc: 'yell'},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '假', bgc: 'yell'},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
      {amount: '班', bgc: ''},
    ]
    let datas = [
      {
        'date': '2020-01-13',
        'state': 1
      },
      {
        'date': '2020-01-14',
        'state': 2
      },
      {
        'date': '2020-01-15',
        'state': 3
      }
    ];
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();
    //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    console.log("当前选中月nextMonth：" + nextMonth);
    //目标月1号对应的星期
    let startWeek = this.getWeek(year, nextMonth, 1); //new Date(year + ',' + (month + 1) + ',' + 1).getDay();  
    console.log("目标月1号对应的星期startWeek:" + startWeek);
    //获取目标月有多少天
    let dayNums = this.getTotalDayByMonth(year, nextMonth); //new Date(year, nextMonth, 0).getDate();         
    console.log("获取目标月有多少天dayNums:" + dayNums);
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    for (var j = -startWeek + 1; j <= dayNums; j++) {
      var tempWeek = -1;
      if (j > 0) {
        tempWeek = this.getWeek(year, nextMonth, j);
        //console.log(year + "年" + month + "月" + j + "日" + "星期" + tempWeek);
      }
      var clazz = '';
      if (tempWeek == 0 || tempWeek == 6)
        clazz = 'week'
      if (j < DATE_DAY && year == DATE_YEAR && nextMonth == DATE_MONTH)
        //当天之前的日期不可用
        clazz = 'unavailable ' + clazz;
      else
        clazz = '' + clazz
      /**如果当前日期已经选中，则变色 */
      var date = year + "-" + (nextMonth < 10 ? ('0' + nextMonth) : nextMonth) + "-" + (j < 10 ? ('0' + j) : j);
      var index = this.checkItemExist(this.data.checkDate, date);
      if (index != -1) {
        clazz = clazz + ' active';
      }

      console.log('----', date);
      let d = datas.filter(x => x.date == date);
      if (d.length > 0) {
        d = d[0];
      } else {
        d = {};
      }
      let da = {
        day: j,
        class: clazz,
        bgc: '',
        amount: ''
      };
      if (d.state == 1) {
        da.amount = '班';
      } else if (d.state == 2) {
        da.amount = '休';
      } else if (d.state == 3) {
        da.amount = '假';
      }
      dateArr.push(da)
    }
    this.setData({
      days: dateArr
    })
  },
  /**
   * 上个月
   */
  lastMonthEvent:function(){
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.createDateListData(year, month);
  },
  /**
   * 下个月
   */
  nextMonthEvent:function(){
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.createDateListData(year, month);
  },
  /*
   * 获取月的总天数
   */
  getTotalDayByMonth: function(year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
  },
  /*
   * 获取月的第一天是星期几
   */
  getWeek: function(year, month, day) {
    var d = new Date(year, month - 1, day);
    return d.getDay();
  },
  /**
   * 点击日期事件
   */
 
  
  /**检查数组中是否存在该元素 */
  checkItemExist: function (arr,value){
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i].day) {
        return i;
      }
    }
    return -1;
  },

  getHomeData() {
    const url =`/api/order/small-program/employ/home-page/work-order`

    fetch.postRes(url).then(res => {
      this.setData({
        homeData: res.data.data
      })
    })
  }
})