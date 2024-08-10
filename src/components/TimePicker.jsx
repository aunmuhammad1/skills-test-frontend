import React from 'react';
import { DatePicker, TimePicker } from 'antd';

const { RangePicker } = DatePicker;

const TimeRangeInput = ({ value, onChange }) => {
  return (
    <RangePicker
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      value={value}
      onChange={onChange}
      placeholder={['Start Time', 'End Time']}
      style={{ width: 300 }}
    />
  );
};

export default TimeRangeInput;
