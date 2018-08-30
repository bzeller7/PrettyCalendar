new Vue({
  el: '#app',
  data: function data() {
    return {
      today: moment(),
      focusedDay: moment(),
      months: moment.months()
    };
  },

  computed: {
    calendarMonthStartDay: function calendarMonthStartDay() {
      // for styling column offset when month doesn't start with Monday
      return moment(this.focusedDay).startOf('month').format('dd');
    },
    calendarDays: function calendarDays() {
      var daysInMonth = moment(this.focusedDay).daysInMonth(),
          days = [];

      while (daysInMonth) {
        var current = moment(this.focusedDay).date(daysInMonth);

        days.push({
          date: moment(current)
        });

        daysInMonth--;
      }

      return days.reverse();
    },
    calendarYears: function calendarYears() {
      var endYear = moment().add(5, 'years').year(),
          startYear = 1980,
          years = [];

      while (startYear <= endYear) {
        years.push(startYear++);
      }

      return years.reverse();
    }
  },
  methods: {
    nextMonth: function nextMonth() {
      this.focusedDay = moment(this.focusedDay).add(1, 'months');
    },
    prevMonth: function prevMonth() {
      this.focusedDay = moment(this.focusedDay).subtract(1, 'months');
    },
    setMonth: function setMonth(value) {
      this.focusedDay = moment().month(value);
    },
    setYear: function setYear(value) {
      this.focusedDay = moment().year(value);
    },
    selectDay: function selectDay(day) {
      this.focusedDay = moment(day);
    }
  },
  updated: function updated() {
    var el = this.$refs.calendar;

    el.style.height = 'auto';
    var endHeight = getComputedStyle(el).height;
    el.style.height = this.height;
    el.offsetHeight; // force repaint
    el.style.height = endHeight;

    this.height = endHeight;
  }
});