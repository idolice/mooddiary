import initCalendar, { getSelectedDay, jumpToToday, buildMoodList } from '../../template/calendar/index';
const app = getApp()
const conf = {
  data: {
    calendar: {
      
    }
  },
  onLoad: function() {  
    this.data.calendar.moodList = app.globalData.moodList
    this.data.calendar.openId = app.globalData.openId
    console.log(this.data.calendar)
  },
  onShow: function() {
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
      // onTapDay(currentSelect, event) {
      //   console.log(currentSelect);
      //   console.log(event);
      // },
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
