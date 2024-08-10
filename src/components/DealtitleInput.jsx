// components/DealTitle.jsx
import React from 'react';
import { Input } from 'antd';

const DealTitle = ({ value, onChange, placeholder }) => {
  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Enter deal title"}
    />
  );
};

export default DealTitle;
