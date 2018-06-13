import initCalendar, { getSelectedDay, jumpToToday, buildMoodList, hideModal} from '../../template/calendar/index';
const app = getApp()
const conf = {
  data: {
    calendar: {
      
    },
    showModal0: false,
    selectedDayHasRecord: false,
    todayMessage: null,
    selectedYear: 0,
    selectedMonth: 0,
    selectedDay: 0,
    showReport: false
  },
  hideModal() {
    console.log("working")
    this.setData({
      'showModal0': false
    })
  },
  hideReport() {
    this.setData({
      'showReport': false
    })
  },
  onConfirm() {
    var selectedDay = getSelectedDay();
    wx.navigateTo({
      url: '../index/index',
    })
  },
  
  navToIndex: function() {
    app.globalData.selectedDay = {
      year: 0,
      month: 0,
      day: 0
    }
    wx.navigateTo({
      url: '../index/index',
    })
  },
  navToReport: function() {
    this.setData({
      showReport: true
    })
  },
  onLoad: function() {  
    this.data.calendar.moodList = app.globalData.moodList
    this.data.calendar.openId = app.globalData.openId
    console.log(this.data.calendar)
  },
  onShow: function() {
    var that = this    
    initCalendar({

      // multi: true, // 是否开启多选,
      // disablePastDay: true, // 是否禁选过去日期
      /**
       * 选择日期后执行的事件
       * @param { object } currentSelect 当前点击的日期
       * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
       */
      afterTapDay: (currentSelect, allSelectedDays) => {
        console.log('当前点击的日期', currentSelect);
        allSelectedDays && console.log('选择的所有日期', allSelectedDays);
        console.log('getSelectedDay方法', getSelectedDay());
      },
      /**
       * 日期点击事件（此事件会完全接管点击事件）
       * @param { object } currentSelect 当前点击的日期
       * @param { object } event 日期点击事件对象
       */
      onTapDay(currentSelect, event) {
        app.globalData.selectedDay = {
          year: currentSelect.year,
          month: currentSelect.month,
          day: currentSelect.day
        }
        console.log(app.globalData.selectedDay)
        var data = {
          year: currentSelect.year,
          month: currentSelect.month,
          day: currentSelect.day
        }
        wx.request({
          url: 'http://localhost:8080/' + app.globalData.openId + '/record',
          data: data,
          method: 'get',
          success: function (res) {
            that.setData({
              'showModal0': true,
              'selectedDayHasNoRecord': res.data.ifHasNoRecord,
              'todayMessage': res.data.record
            })
          },
          fail: function () {
            //弹窗重新输入
          }
        })
      },
    });
  },
  /**
   * 跳转至今天
   */
  jump() {
    jumpToToday();
  }
};
Page(conf);
