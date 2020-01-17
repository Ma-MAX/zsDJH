
import fetch from '../../utils/fetch.js'
var Moment = require("../../utils/moment.js");
var DATE_YEAR = new Date().getFullYear();
var DATE_MONTH = new Date().getMonth() + 1;
var DATE_DAY = new Date().getDate();

const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
const tomorrow = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()+1}`
console.log(tomorrow);
Page({
  data: {
    year: '',
    month: '',
    day: '',
    days: {},
    systemInfo: {},
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    checkDate:[],
    homeData: {},
    timetable: {},
    date: today,
    workTable:[]
  },

  getTimetable() {
    const url = ``
  },
  onLoad: function(options) {
    this.getWork()
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
    let datas = [
      {'date': '2020-01-13','state': 1},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-13','state': 1},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-13','state': 1},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-13','state': 1},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-13','state': 1},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-13','state': 1},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-14','state': 2},
      {'date': '2020-01-15','state': 3},
      {'date': '2020-01-15','state': 3},
    ];
    console.log(this.data.workTable);
    
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();
    //没有+1方便后面计算当月总天数
    // let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let nextMonth = month + 1;
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
      var date = year + "-" + nextMonth + "-" + j;
      var index = this.checkItemExist(this.data.checkDate, date);
      if (index != -1) {
        clazz = clazz + ' active';
      } 
      // console.log('------', date);
      // let d = datas.filter(x => x.date == date);
      // if (d.length > 0) {
      //   d = d[0];
      // } else {
      //   d = {};
      // }
      let da = {
        day: j,
        class: clazz,
        bgc: '',
        amount:''
      }
      if(j>0) {
        if(datas[j-1].state){

          // da.amount = datas[j-1].state
          // if(datas[j-1].state != '班'){
          //   da.bgc = 'yell'
          // }
        }else{
          da.amount = ''
        }

       
       
      }
      // if()

      dateArr.push(da)
      // dateArr.bgc = dataStr[j].bgc
      // dateArr.amount = dataStr[j].amount
       
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
    // let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    // let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;

    //获取上一月
    let date = new Date(this.data.year, this.data.month - 1 - 1);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    this.setData({
      year: year,
      month: month
    })
    // this.createDateListData(year, month);
    this.createDateListData(year, month - 1);
  },
  /**
   * 下个月
   */
  nextMonthEvent:function(){
    //全部时间的月份都是按0~11基准，显示月份才+1
    // let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    // let month = this.data.month > 11 ? 0 : this.data.month;

    // 获取下一月数据 因为Date对象中 月份是从0-11，所以这个地方直接取当前的月份，就相当于下一月了
    let date = new Date(this.data.year, this.data.month - 1 + 1);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    this.setData({
      year: year,
      month: month
    })
    this.createDateListData(year, month - 1);
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
  onPressDateEvent: function(e) {
    var {
      year,
      month,
      day,
      amount
    } = e.currentTarget.dataset;
    let now = `${year}-${month}-${day}`
    if ((now != today) && (now != tomorrow)) {
      return;
    }
    this.setData({
      date: now
    })
    this.getHomeData()
    console.log("当前点击的日期：" + year + "-" + month + "-" + day);
    //当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
    if ((day < DATE_DAY && month == DATE_MONTH) || day <= 0)
      return;
 
    this.renderPressStyle(year, month, day, amount);
  },
  renderPressStyle: function (year, month, day, amount) {
    var days = this.data.days;
    //渲染点击样式
    for (var j = 0; j < days.length; j++) {
      var tempDay = days[j].day;
      if (tempDay == day) {
        var date = year + "-" + month + "-" + day;
        var obj = {
          day: date,
          amount: amount
        };
        var checkDateJson = this.data.checkDate;
        var index = this.checkItemExist(checkDateJson, date);
        if (index == -1) {
          checkDateJson.push(obj);
          days[j].class = days[j].class + ' red';
        } else 
        {
          checkDateJson.splice(index, 1);
          days[j].class = days[j].class.replace('red',' ');
        }
        this.setData({
          checkDate: checkDateJson
        })
        console.log(JSON.stringify(this.data.checkDate));
        break;
      }
    }
    this.setData({
      days: days
    });
    
  },

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
    const data = {
      date: this.data.date
    }
    fetch.postRes(url,data).then(res => {
      this.setData({
        homeData: res.data.data
      })
    })
  },
  getNowMonthDate() {
    var date = new Date();
    var year = date.getFullYear() + "";
    var month = (date.getMonth() + 1) + "";
   
    // 本月第一天日期
    var begin = year + "-" + month+ "-" + "01" 
    
    // 本月最后一天日期    
    var lastDateOfCurrentMonth = new Date(year,month,0);
    var end = year + "-" + month + "-" + lastDateOfCurrentMonth.getDate()
    return {begin ,end};
  },

  getWork() {
    const timeList = this.getNowMonthDate()
    
    const url = `/api/zswy/work-table/small-program/list-month`
    const data = {
      startTime: timeList.begin,
      endTime: timeList.end
    }
    fetch.postRes(url,data).then(res => {
      let work = []
      res.data.data.forEach(ele => {
        let obj ={}
        obj.date = ele.tableTimeDate,
        obj.state = ele.workTableStatusName,
        obj.count = ele.workCount
        work.push(obj)
      });
      this.setData({
        workTable:work
      })
    })
  },
})