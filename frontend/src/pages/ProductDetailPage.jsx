// ProductDetailPage.js
import React, { useState, useEffect } from 'react';

const ProductDetailPage = ({ match }) => {
  const [productDetails, setProductDetails] = useState({});

  const productId = match.params.id;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/all-products/${productId}`);
        if (response.ok) {
          const productDetails = await response.json();
          setProductDetails(productDetails);
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error during product details fetch:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Name: {productDetails.name}</p>
      <p>Price: ${productDetails.price}</p>
      <p>Description: {productDetails.description}</p>
      <p>Category: {productDetails.category}</p>
      <p>inStockQuantity: {productDetails.inStockQuantity}</p>
      <p>ImageUrl: {productDetails.productImageUrl}</p>
    </div>
  );
};

export default ProductDetailPage;
