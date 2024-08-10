import { InputNumber } from 'antd';

const QuantityInput = ({ value, onChange }) => (
  <InputNumber
    min={1}
    value={value}
    onChange={onChange}
    placeholder="Enter quantity"
    className="large-input" // Apply the custom class
  />
);

export default QuantityInput;
