import React, { useEffect, useState } from 'react';
import { Button, Form, Col, Row, message } from 'antd';
import SellingPriceInput from './SellingPriceInput';
import QuantityInput from './QuantityInput';
import TimeRangeInput from './TimePicker';
import ProductList from './ProductList';
import usePush from '../hooks/usePush'; // Adjust the import path as needed
import DealTitle from './DealtitleInput';

const DealForm = ({ disabledIdsfromdeals }) => {
  const [form] = Form.useForm();
  const [rows, setRows] = useState([{}]);
  const { pushData, loading, error } = usePush('/api/deals');
  const [product_variant_ids, setVariantIds] = useState([]);
  const [disabled, setDisabled] = useState([]);

  const addRow = () => {
    setRows([...rows, {}]);
  };

  // get the user timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const dealData = rows.map((_, index) => ({
        title: values[`title_${index}`],
        productId: values[`product_${index}`],
        product_variantId: product_variant_ids[index],
        sellingPrice: values[`selling_price_${index}`],
        quantity: values[`quantity_${index}`],
        timeRange: values[`time_range_${index}`],
        timezone: userTimezone,
      }));

      const response = await pushData(dealData);

      if (response) {
        message.success('Deals submitted successfully!');
        form.resetFields();
        setRows([{}]); // Reset rows
      } else {
        throw new Error(error || 'Failed to submit deals');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    setDisabled([...disabledIdsfromdeals, ...product_variant_ids]);
  }, [rows]);

  return (
    <Form form={form} layout="vertical" className='bg-slate-300 border-r-4 p-4'>
      {rows.map((row, index) => (
        <Row key={index} gutter={16}>
          <Col span={24}>
            <Form.Item name={`title_${index}`} label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
              <DealTitle onChange={value => form.setFieldsValue({ [`title_${index}`]: value })} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={`product_${index}`} label="Product" rules={[{ required: true, message: 'Please select a product' }]}>
              <ProductList
                value={form.getFieldValue(`product_${index}`)}
                onChange={(productId, productVariantId) => {
                  form.setFieldsValue({ [`product_${index}`]: productId });
                  setVariantIds([...product_variant_ids, productVariantId]);
                }}
                disabledIds={disabled}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={`selling_price_${index}`} label="Selling Price" rules={[{ required: true, message: 'Please enter a selling price' }]}>
              <SellingPriceInput onChange={value => form.setFieldsValue({ [`selling_price_${index}`]: value })} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={`quantity_${index}`} label="Quantity">
              <QuantityInput onChange={value => form.setFieldsValue({ [`quantity_${index}`]: value })} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={`time_range_${index}`} label="Time Range" rules={[{ required: true, message: 'Please select a Time range' }]}>
              <TimeRangeInput onChange={value => form.setFieldsValue({ [`time_range_${index}`]: value })} />
            </Form.Item>
          </Col>
        </Row>
      ))}
      <Button type="dashed" onClick={addRow} style={{ width: '100%' }}>
        Add Row
      </Button>
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
        Send Deals Request
      </Button>
    </Form>
  );
};

export default DealForm;
