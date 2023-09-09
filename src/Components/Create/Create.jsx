import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import styles from './Create.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);

  async function handleCreate(values) {
    setisLoading(true);
    axios
      .post('https://seoudi-django-render-app.onrender.com/orders/', values)
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get('https://seoudi-django-render-app.onrender.com/items/')
      .then(function (response) {
        setAvailableItems(response.data.Customers);
        console.log(availableItems);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let formik = useFormik({
    initialValues: {
      orderNumber: '',
      orderDate: '',
      orderTotal: '',
      orderTax: '',
      items: [1, 2],
      status: '',
      flag: '',
      customerid: 4
    },
    onSubmit: handleCreate
  });

  const statusOptions = [
    { value: '1', label: 'Pending' },
    { value: '2', label: 'Processing' },
    { value: '3', label: 'Shipped' },
    { value: '4', label: 'Cancelled' },
    { value: '5', label: 'Delivered' }
  ]
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Create new Order</h3>
        <form onSubmit={formik.handleSubmit}>

        <label htmlFor="items">Items</label>
          <ReactSelect
            className="mb-2"
            onBlur={formik.handleBlur}
            onChange={(selectedItems) =>
              formik.setFieldValue(
                'items',
                selectedItems ? selectedItems.map((item) => item.value) : []
              )
            }
            options={availableItems.map((item) => ({
              value: item.id,
              label: item.name
            }))}
            isMulti
          />
          
<label htmlFor="status">Status</label>
          <ReactSelect
            className="mb-2"
            onBlur={formik.handleBlur}
            onChange={(selectedStatus) =>
              formik.setFieldValue('status', selectedStatus ? selectedStatus.value : '')
            }
            options={statusOptions}
          />

          <label htmlFor="orderTotal">Order Total</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.orderTotal}
            name="orderTotal"
            id="orderTotal"
          />
        
          <label htmlFor="orderTax">Order Tax</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.orderTax}
            name="orderTax"
            id="orderTax"
          />

          <label htmlFor="flag">Flag</label>
          <input
            className="form-control mb-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.flag}
            name="flag"
            id="flag"
          />


          <div className="add-btn text-center">
            {isLoading ? (
              <button className="btn bg-success text-white" type="button">
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                className="btn bg-success text-white"
                type="submit"
              >
                Add
              </button>
            )}
          </div>


        </form>
      </div>
    </>
  );
}