import { useRef, useState } from 'react';
import { Animated, Easing, I18nManager } from 'react-native';
import moment from 'moment-jalaali';

const m = moment();
const brConfigs = {
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  selectedFormat: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  monthYearFormat: 'YYYY MM',
  timeFormat: 'HH:mm',
  hour: 'Hour',
  minute: 'Minute',
  timeSelect: 'Select',
  timeClose: 'Close',
};

class utils {
  constructor({ minimumDate, maximumDate, isBr, mode, reverse, configs }) {
    this.data = {
      minimumDate,
      maximumDate,
      isBr,
      reverse: reverse === 'unset' ? !isBr : reverse,
    };
    this.config = brConfigs;
    this.config = { ...this.config, ...configs };
    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat = this.config.dateFormat + ' ' + this.config.timeFormat;
    }
  }

  get flexDirection() {
    return { flexDirection: this.data.reverse ? (I18nManager.isRTL ? 'row' : 'row-reverse') : 'row' };
  }

  getFormated = (date, formatName = 'selectedFormat') => date.format(this.config[formatName]);

  getFormatedDate = (date = new Date(), format = 'YYYY/MM/DD') => moment(date).format(format);

  getTime = (time) => this.getDate(time).format(this.config.timeFormat);

  getToday = () => this.getFormated(m, 'dateFormat');

  getMonthName = (month) => this.config.monthNames[month];

  toPersianNumber = (value) => {
    const { isBr } = this.data;
    return isBr
      ? this.toEnglish(String(value))
      : String(value).replace(/[0-9]/g, (w) =>
        String.fromCharCode(w.charCodeAt(0) + '۰'.charCodeAt(0) - 48),
      );
  };

  toEnglish = (value) => {
    const charCodeZero = '۰'.charCodeAt(0);
    return value.replace(/[۰-۹]/g, (w) => w.charCodeAt(0) - charCodeZero);
  };

  getDate = (time) => moment(time, this.config.selectedFormat);

  getMonthYearText = (time) => {
    const { isBr } = this.data;
    const date = this.getDate(time);
    const year = this.toPersianNumber(date.year());
    const month = this.getMonthName(date.month());
    return `${month} ${year}`;
  };

  checkMonthDisabled = (time) => {
    const { minimumDate, maximumDate, isBr } = this.data;
    const date = this.getDate(time);
    let disabled = false;
    if (minimumDate) {
      const lastDayInMonth = date.date(29);
      disabled = lastDayInMonth < this.getDate(minimumDate);
    }
    if (maximumDate && !disabled) {
      const firstDayInMonth = date.date(1);
      disabled = firstDayInMonth > this.getDate(maximumDate);
    }
    return disabled;
  };

  checkArrowMonthDisabled = (time, next) => {
    const { isBr } = this.data;
    const date = this.getDate(time);
    return this.checkMonthDisabled(
      this.getFormated(date.add(next ? -1 : 1, 'month')),
    );
  };

  checkYearDisabled = (year, next) => {
    const { minimumDate, maximumDate, isBr } = this.data;
    const y = this.getDate(next ? maximumDate : minimumDate).year();
    return next ? year >= y : year <= y;
  };

  checkSelectMonthDisabled = (time, month) => {
    const { isBr } = this.data;
    const date = this.getDate(time);
    const dateWithNewMonth = date.month(month);
    return this.checkMonthDisabled(this.getFormated(dateWithNewMonth));
  };

  validYear = (time, year) => {
    const { minimumDate, maximumDate, isBr } = this.data;
    const date = this.getDate(time).year(year);
    let validDate = this.getFormated(date);
    if (minimumDate && date < this.getDate(minimumDate)) {
      validDate = minimumDate;
    }
    if (maximumDate && date > this.getDate(maximumDate)) {
      validDate = maximumDate;
    }
    return validDate;
  };

  getMonthDays = (time) => {
    const { minimumDate, maximumDate, isBr } = this.data;
    let date = this.getDate(time);
    const currentMonthDays = date.daysInMonth()
    const firstDay = date.date(1);
    const dayOfMonth = (firstDay.day() + Number(!isBr)) % 7;
    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const thisDay = date.date(n + 1);
        let disabled = false;
        if (minimumDate) {
          disabled = thisDay < this.getDate(minimumDate);
        }
        if (maximumDate && !disabled) {
          disabled = thisDay > this.getDate(maximumDate);
        }

        date = this.getDate(time);
        return {
          dayString: this.toPersianNumber(n + 1),
          day: n + 1,
          date: this.getFormated(date.date(n + 1)),
          disabled,
        };
      }),
    ];
  };

  useMonthAnimation = (activeDate, distance, onEnd = () => null) => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;

    const changeMonthAnimation = (type) => {
      setChangeWay(type);
      setLastDate(activeDate);
      monthYearAnimation.setValue(1);
      Animated.timing(monthYearAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 0.66, 0.54, 1),
      }).start(onEnd);
    };

    const shownAnimation = {
      opacity: monthYearAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, changeWay === 'NEXT' ? -distance : distance],
          }),
        },
      ],
    };

    const hiddenAnimation = {
      opacity: monthYearAnimation,
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [changeWay === 'NEXT' ? distance : -distance, 0],
          }),
        },
      ],
    };

    return [{ lastDate, shownAnimation, hiddenAnimation }, changeMonthAnimation];
  };
}

export { utils };
