import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import useFetchProducts from '../hooks/usefetch';

const { Option } = Select;

const ProductList = ({ value, onChange, disabledIds }) => {
  const { products, loading, error } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // Initialize filteredProducts when products are loaded
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Filter products based on searchValue
  useEffect(() => {
    if (searchValue) {
      const trimmedValue = searchValue.trim();
      const lowercasedValue = trimmedValue.toLowerCase();
    
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(lowercasedValue) ||
        product.msin.toLowerCase().includes(lowercasedValue) ||
        product.sku.toLowerCase().includes(lowercasedValue)
      );
    
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchValue, products]);

  const handleChange = (value) => {
    // Find the selected product based on the product_id
    const selectedProduct = products.find(product => product.product_id === value);
    if (selectedProduct) {
      onChange(selectedProduct.product_id, selectedProduct.product_variant_id); // Pass product_id and product_variant_id to parent component
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <Select
      showSearch
      placeholder="Select a product"
      style={{ width: '100%' }}
      filterOption={false}
      value={value}
      onSearch={value => setSearchValue(value)}
      onChange={handleChange}
      notFoundContent={searchValue ? 'No results found' : 'No products'}
    >
      {filteredProducts.map(product => (
        <Option 
          key={product.product_id} 
          value={product.product_id}
          disabled={disabledIds.includes(product.product_variant_id)}
        >
          {product.title} - {product.sku} - {product.msin}
        </Option>
      ))}
    </Select>
  );
};

export default ProductList;
