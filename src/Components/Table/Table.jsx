import React, { useContext, useEffect, useState } from 'react'
import styles from './Table.module.css'
import axios from 'axios'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

export default function Table() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedOrder, setselectedOrder] = useState(null);
  const [selectedOrderId, setselectedOrderId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(selectedOrder ? selectedOrder.orderTotal : 0);
const [orderTax, setorderTax] = useState(selectedOrder ? selectedOrder.orderTax : 0);
const [status, setStatus] = useState(selectedOrder ? selectedOrder.status : 1);

  const columns = [
    { field: 'orderNumber', header: 'orderNumber' },
    { field: 'orderDate', header: 'Order Date' },
    { field: 'orderTotal', header: 'Order Total' },
    { field: 'orderTax', header: 'Order Tax' },
    { field: 'customerid', header: 'Customer ID' },
    { field: 'status', header: 'Status' },
    { field: 'actions', header: 'Actions' },
  ];

  function fetchItemDetails(itemIds) {
    const itemPromises = itemIds.map((itemId) => {
      return axios.get(`https://seoudi-django-render-app.onrender.com/items/${itemId}/`);
    });
  
    Promise.all(itemPromises)
    .then((responses) => {
      const itemDetails = responses.map((response) => response.data);
      setItemDetails(itemDetails);
    })
    .catch((error) => {
      console.error('Error fetching item details:', error);
    });
  }

  const viewDetails = (rowData) => {
    setselectedOrder(rowData);
    setVisible(true);
    setselectedOrderId(rowData.orderNumber)
    fetchItemDetails(rowData.items);
    setTotalPrice(rowData.orderTotal);
    setorderTax(rowData.orderTax);
    setStatus(rowData.status);
   
  };

 const handleEditSubmit = () => {
  const updatedOrder = {
    orderTotal: totalPrice,
    orderTax: orderTax,
    status:  selectedOrder.status,
    items:selectedOrder.items
  };
  console.log(updatedOrder);
  axios.put(`https://seoudi-django-render-app.onrender.com/orders/${selectedOrderId}/`, updatedOrder)
  .then((response) => {
    console.log('Order updated successfully:', response.data);
    setVisible(false);
    getOrders();
  })
    .catch((error) => {
      console.error('Error updating order:', error);
    });
};
  const onHide = () => {
    setVisible(false);
  };

  const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
        return false;
    }

    str = str.replace(/^0+/, '') || '0';
    let n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
};

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
        case 'quantity':
        case 'price':
            if (isPositiveInteger(newValue)) rowData[field] = newValue;
            else event.preventDefault();
            break;

        default:
            if (newValue.toString().trim().length > 0)  rowData[field] = newValue;
            else event.preventDefault();
            break;
    }
};
const cellEditor = (options) => {
  return <InputText type="number" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
};
  const renderDetailsDialog = () => {
    return (
      <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={onHide} header="Order Details" modal>
        {itemDetails.length > 0 ? (
          <DataTable editMode="cell" value={itemDetails}>
         
            <Column field="items.id" header="ID" />
            <Column field="items.name" header="Name" />
            <Column field="items.price" header="Price"   editor={cellEditor} onCellEditComplete={onCellEditComplete} />
          
            <Column field="items.quantity" header="Quantity"  editor={cellEditor} onCellEditComplete={onCellEditComplete} />
          </DataTable>
        ) : (
          <div>No items found</div>
        )}

<div className="p-fluid">
        <div className="p-field">
          <label htmlFor="totalPrice">Total Price</label>
          <InputText id="totalPrice"  value={totalPrice}type="number"  onChange={(e) => setTotalPrice(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="orderTax">Total Tax</label>
          <InputText id="orderTax" value={orderTax}  type="number"onChange={(e) => setorderTax(e.target.value)} />
        </div>
        {/* <div className="p-field">
          <label htmlFor="status">Status</label>
          <Dropdown
            id="status"
            value={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.value)}
            placeholder="Select Status"
          />
        </div> */}
      </div>
      <Button label="Submit" className="p-button-rounded m-3 text-white bg-success p-button-success" onClick={handleEditSubmit} />
      </Dialog>
    );
  };

  function getOrders() {
    axios.get('https://seoudi-django-render-app.onrender.com/orders/').then((response) => {
      setOrders(response.data.Orders);
    });
  }

  const deleteOrder = (orderId) => {
    axios.delete(`https://seoudi-django-render-app.onrender.com/orders/${orderId}/`)
      .then((response) => {
        console.log(`Order with ID ${orderId} deleted successfully`);
      
      getOrders();
      })
      .catch((error) => {
        console.error(`Error deleting order with ID ${orderId}:`, error);
      });
  };
  useEffect(() => {
    getOrders();
  }, [])
  const getSeverity = (status) => {
    switch (status) {
      case 1:
        return 'secondary';
      case 2:
        return 'warning';
      case 3:
        return 'info';
      case 4:
        return 'danger';
      case 5:
        return 'success';
      default:
        return null;
    }
  };
  const statusMapping = (order) => {
    switch (order.status) {
      case 1:
        return <Tag value={'Pending'} severity={getSeverity(order.status)} />;
      case 2:
        return <Tag value={'Processing'} severity={getSeverity(order.status)} />;
      case 3:
        return <Tag value={'Shipped'} severity={getSeverity(order.status)} />;
      case 4:
        return <Tag value={'Cancelled'} severity={getSeverity(order.status)} />;
      case 5:
        return <Tag value={'Delivered'} severity={getSeverity(order.status)} />; ;
      default:
        return 'Status not found';
    }
  };
  const dateFormating = (order) => {
    return order.orderDate.slice(0, 10)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className={styles.tableActions}>
        <Button icon="pi pi-eye" className="p-button-rounded p-button-primary" onClick={() => viewDetails(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteOrder(rowData.orderNumber)}
        />
      </div>
    );
  };
  return <>
    <div className="table-content m-4">
      <DataTable value={orders} selectionMode="single"
        selection={selectedOrder} onSelectionChange={(e) => setselectedOrder(e.value)} removableSort scrollable scrollHeight="400px"
        showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>

        {columns.map((col, i) => {
          if (col.field === 'actions') {
            return <Column key={col.field} field={col.field} body={actionBodyTemplate} header={col.header} />
          }
          else if (col.field === 'status') {
            return <Column key={col.field} field={col.field} header={col.header} body={statusMapping} />;
          }
          else if (col.field === 'orderDate') {
            return <Column key={col.field} sortable field={col.field} header={col.header} body={dateFormating} />;
          }
          else {
            return <Column key={col.field} field={col.field} header={col.header} />;
          }
        })}

      </DataTable>

      {renderDetailsDialog()}
    </div>
  </>
}
