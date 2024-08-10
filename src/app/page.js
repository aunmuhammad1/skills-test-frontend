"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'antd';
import DealForm from '@/components/DealForm';

const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deals`);
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchDeals();
  }, []); // Empty dependency array ensures this runs only once

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Deal Title', dataIndex: 'deal_title', key: 'deal_title' },
    { title: 'Product Title', dataIndex: 'product_title', key: 'product_title' },
    { title: 'Actual Price', dataIndex: 'variant_selling_price', key: 'variant_selling_price', render: text => `$${text.toFixed(2)}` },
    { title: 'Deal Selling Price', dataIndex: 'deal_selling_price', key: 'deal_selling_price', render: text => `$${text.toFixed(2)}` },
    { title: 'Discount Amount', dataIndex: 'discount_amount', key: 'discount_amount', render: (text, record) => {
        const discountAmount = record.variant_selling_price - record.deal_selling_price;
        return `$${discountAmount.toFixed(2)}`;
      }
    },
    { title: 'Discount Percentage', dataIndex: 'discount_percentage', key: 'discount_percentage', render: (text, record) => {
        const discountPercentage = ((record.variant_selling_price - record.deal_selling_price) / record.variant_selling_price) * 100;
        return `${discountPercentage.toFixed(2)}%`;
      }
    },
    { title: 'Variant MSIN', dataIndex: 'variant_msin', key: 'variant_msin' },
    { title: 'Variant SKU', dataIndex: 'variant_sku', key: 'variant_sku' },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>Add Deal</Button>
      <Table columns={columns} dataSource={deals} rowKey="deal_id" />
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <Button type="primary" className='absolute top-4 right-4' onClick={handleCloseModal}>Close</Button>
          <DealForm onClose={handleCloseModal} disabledIdsfromdeals={deals.map(deal => deal.product_variant_id)} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
