import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [sole, setSole] = useState([]);

  useEffect(() => {
    getProducts();
    getSole();
  }, []);

  const getProducts = async () => {
    let result = await fetch('/products');
    result = await result.json();
    setProducts(result);
  };

  const getSole = async () => {
    let result = await fetch('/distributors');
    result = await result.json();
    setSole(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`/products/${id}`, {
      method: 'Delete',
    });

    if (result.status === 200) {
      window.alert('Product is Deleted');
      navigate('/');
    } else {
      console.log('Error deleting Product');
    }
  };

  const deleteSole = async (id) => {
    let result = await fetch(`/distributors/${id}`, {
      method: 'Delete',
    });

    if (result.status === 200) {
      alert('Distributor is Deleted');
      navigate('/');
    } else {
      console.log('Error deleting Distributor');
    }
  };

  return (
    <>
      <div className="list">
        <div className="listContainer">

          <div className="productTableTitle">
            Products
            <Link to="/products" style={{ textDecoration: 'none' }} className="newLink">
              Add New Products
            </Link>
          </div>
          <div className="tableContainer">
            <table className="table">
              <thead>
                <tr>
                  <th className="tableCell">Product ID</th>
                  <th className="tableCell">Name</th>
                  <th className="tableCell">Brand</th>
                  <th className="tableCell">Model Number</th>
                  <th className="tableCell">Price</th>
                  <th className="tableCell">Specifications</th>
                  <th className="tableCell">Operations</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={item._id}>
                    <td className="tableCell">{index}</td>
                    <td className="tableCell">{item.name}</td>
                    <td className="tableCell">{item.brand}</td>
                    <td className="tableCell">{item.modelNumber}</td>
                    <td className="tableCell">{item.price}</td>
                    <td className="tableCell">{item.specifications}</td>
                    <td className="tableCell">
                      <div className="deleteButton" onClick={() => deleteProduct(item._id)}>
                        Delete
                      </div>
                      <Link to={`/products/${item._id}`} className="buttonLink">
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="productTableTitle">
            Distributors
            <Link to="/distributors" style={{ textDecoration: 'none' }} className="newLink">
              Add New Distributors
            </Link>
          </div>
          <div className="tableContainer">
            <table className="table">
              <thead>
                <tr>
                  <th className="tableCell">Distributor ID</th>
                  <th className="tableCell">Name</th>
                  <th className="tableCell">Address</th>
                  <th className="tableCell">Contact Info</th>
                  <th className="tableCell">Operations</th>
                </tr>
              </thead>
              <tbody>
                {sole.map((item, index) => (
                  <tr key={item._id}>
                    <td className="tableCell">{index}</td>
                    <td className="tableCell">{item.name}</td>
                    <td className="tableCell">{item.address}</td>
                    <td className="tableCell">{item.contactInfo}</td>
                    <td className="tableCell">
                      <div className="deleteButton" onClick={() => deleteSole(item._id)}>
                        Delete
                      </div>
                      <Link to={`/admin/users/${item._id}`} className="buttonLink">
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;