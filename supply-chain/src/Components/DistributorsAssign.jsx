import React, { useEffect, useState } from 'react';
import '../Style/DistributorsAssign.css';

const DistributorsAssign = () => {
  const [distributors, setDistributors] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    fetchDistributors();
    fetchProducts();
  }, []);

  const fetchDistributors = () => {
    fetch('/distributors')
      .then(response => response.json())
      .then(data => {
        setDistributors(data);
      })
      .catch(error => {
        console.error('Error fetching distributors:', error);
      });
  };

  const fetchProducts = () => {
    fetch('/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleDistributorChange = (event) => {
    setSelectedDistributor(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleAddProduct = () => {
    if (selectedDistributor && selectedProduct) {
      const productId = selectedProduct;
      fetch(`/distributors/${selectedDistributor}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })
        .then(response => {
          if (response.ok) {
            console.log('Product added successfully');
            fetchDistributors(); // Refresh the distributor list
          } else {
            throw new Error('Error adding product');
          }
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    }
  };

  return (
    <div className="container">
      <h1>Distributors</h1>
      <div className="select-wrapper">
        <label htmlFor="distributor-select">Select a distributor:</label>
        <select id="distributor-select" value={selectedDistributor} onChange={handleDistributorChange}>
          <option value="">-- Select a distributor --</option>
          {distributors.map(distributor => (
            <option key={distributor._id} value={distributor._id}>
              {distributor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="select-wrapper">
        <label htmlFor="product-select">Select a product:</label>
        <select id="product-select" value={selectedProduct} onChange={handleProductChange}>
          <option value="">-- Select a product --</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="button-wrapper">
        <button onClick={handleAddProduct} disabled={!selectedDistributor || !selectedProduct}>
          Add Product
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Distributor Name</th>
            <th>Address</th>
            <th>Contact Info</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {distributors.map(distributor => (
            <tr key={distributor._id}>
              <td>{distributor.name}</td>
              <td>{distributor.address}</td>
              <td>{distributor.contactInfo}</td>
              <td>
                <ul>
                  {distributor.products.map(product => (
                    <li key={product._id}>{product.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorsAssign;
