import { InputNumber } from 'antd';

const SellingPriceInput = ({ value, onChange }) => (
  <InputNumber
    min={0}
    step={0.01}
    value={value}
    onChange={onChange}
    placeholder="Enter selling price"
  />
);

export default SellingPriceInput;
