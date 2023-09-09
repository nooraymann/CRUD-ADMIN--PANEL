

import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';

const DataList = ({ data }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [visible, setVisible] = useState(false);

  const viewDetails = (rowData) => {
    setSelectedData(rowData);
    setVisible(true);
  };

  const onHide = () => {
    setVisible(false);
  };

  const renderViewButton = (rowData) => {
    return (
      <Button icon="pi pi-eye" className="p-button-secondary p-button-sm" onClick={() => viewDetails(rowData)} />
    );
  };

  const renderDetailsDialog = () => {
    return (
      <Dialog visible={visible} onHide={onHide} header="Details" modal>
        {selectedData && (
          <div>
            <h3>{selectedData.name}</h3>
            <p>Email: {selectedData.email}</p>
            {/* Add other details as needed */}
          </div>
        )}
      </Dialog>
    );
  };

  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { body: renderViewButton, header: 'Actions' }, // Add the "View" button column
  ];

  return (
    <div>
      <DataTable value={data} className="p-datatable-striped" rows={10} paginator>
        {columns.map((column) => (
          <Column key={column.field} field={column.field} header={column.header} body={column.body} />
        ))}
      </DataTable>
      {renderDetailsDialog()}
    </div>
  );
};

export default DataList;

















