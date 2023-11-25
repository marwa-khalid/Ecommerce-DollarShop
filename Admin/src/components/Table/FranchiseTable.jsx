import React from "react";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { useState } from "react";

export default function BasicTable() {
  const [franchise, setFranchise] = useState([]);

useEffect(() => {
  axios.get(`http://localhost:5000/api/franchise/`)
    .then(response => {
      setFranchise(response.data); 
    })
    .catch(error => {
      console.log(error)
    });
}, []);

const columns = [
  {
    name: "rowNumber",
    label: "Request",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <span>{tableMeta.rowIndex + 1}</span>
      ),
    },
  },
  {
    name: "name",
    label: "Name",

  },
  {
    name: "email",
    label: "User Email",

  },
  
  {
    name: "phoneNumber",
    label: "Contact",
    
  },
  {
    name: "preferredLocation",
    label: "Location",
    options: {
        filter: true,
        sort: true,
      },
  },
  {
    name: "createdAt",
    label: "Date",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        const date = new Date(value);
  
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
        return formattedDate;
      },
    },
  },  
];

const options = {
  filter: true,
  filterType: "textField", 
  selectableRows: 'none',
  responsive: "standard",
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 25, 50],
};

return (
  <div>
    <MUIDataTable 
      title="Franchise Requests"
      data={franchise}
      columns={columns}
      options={options}
    />
  </div>
);

}
