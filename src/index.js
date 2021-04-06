import { DatePicker } from './datePicker/DatePicker';
import { utils } from './utils';

export const { getFormatedDate, getToday } = new utils({ brConfigs: true });
export default DatePicker;
