import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//? ------------------ Components --------------------

import Navbar from "../../components/structure/NavBar";
import SideNav from "../../components/structure/SideNav";

//? ----------- Material UI components --------------------

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

//? ------------------- CSS --------------------

import "../../CSS/pages/invoice/addInvoice.css";

//? ---------------- Sweet Alert ------------------

import Swal from 'sweetalert2'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const EinvoiceByTaxiPark = () => {

    const navigate = useNavigate(); 
    const routeChange = () => { 
      navigate('/e-invoice/create');
    }

    const pageChange = (id) =>{
      navigate(`/e-invoice/update/${id}`);
      console.log(id)
    }

//! -----------------  Columns -------------------------

  const columns = [
    {
      field: "date",
      headerName: "Tarix",
      width: 100,
    },
    {
      field: "username",
      headerName: "İstifadəçi adı",
      width: 110,
    },
    {
      field: "eInvoiceAmount",
      headerName: "E-Qaimə-Faktura məbləği",
      width: 120,
    },
    {
      field: "eInvoiceStatus",
      headerName: "Qaimə statusu",
      type: "number",
      width: 120,
    },
    {
      field: "paymentStatus",
      headerName: "Ödəniş statusu",
      type: "number",
      width: 120,
    },
    {
      field: "serverFeeAmount",
      headerName: "Server xidmət haqqı (AZN)",
      type: "number",
      width: 110,
    },
    {
      field: "driverBankAccountFeeAmount",
      headerName: "Bank hesabı üzrə (VÖEN-li)",
      type: "number",
      width: 140,
    },
    {
      field: "driverCardFeeAmount",
      headerName: "Avtomatik kart üzrə (VÖEN-siz)",
      type: "number",
      width: 130,
    },
    {
      field: "fleetBankAccountFeeAmount",
      headerName: "Bank hesabı üzrə (VÖEN-li)",
      type: "number",
      width: 130,
    },
    {
      field: "fleetCardFeeAmount",
      headerName: "Avtomatik kart üzrə (VÖEN-siz)",
      type: "number",
      width: 130,
    },
    {
      field: "additionalFeeAmount",
      headerName: "Xidmət haqqı (AZN)",
      type: "number",
      width: 130,
    },
    {
      field: "additionalFeeDescription",
      headerName: "Təsviri",
      type: "number",
      width: 100,
    },
    {
      field: "update",
      headerName: "",
      sortable: false,
      width: 10,
      renderCell: (params) => (
        <IconButton
            aria-label="update"
            onClick={()=>pageChange(params.id)}
            color="primary"
          >
            <EditIcon />
          </IconButton>

      ),
    },
    {
        field: "delete",
        headerName: "",
        sortable: false,
        width: 10,
        renderCell: (params) => (
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
  ];

  const columnGroupingModel = [
    {
      groupId: 'Sürücülər üzrə xidmət haqqı (AZN)',
      children: [{ field: 'driverBankAccountFeeAmount' },{ field: 'driverCardFeeAmount' }],
    },
    {
      groupId: 'Fleetlər üzrə xidmət haqqı (AZN)',
      children: [{field:'fleetBankAccountFeeAmount'},{ field: 'fleetCardFeeAmount' },
      ],
    },
  ];

//! ----------------- Get Method --------------------------

  const [invoiceData, setInvoiceData] = useState([]);

  const fetchData = async () => {
    let response = await axios(`${BASE_URL}/e-invoice`);
    setInvoiceData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  //! -------------- Delete Method --------------------------

  const handleDelete= (id)=>{

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${BASE_URL}/e-invoice/${id}`).then(response => {
                setInvoiceData(prevData => prevData.filter(item => item.id !== id));
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              }).catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: `${error.message}`,
                    icon: "error"
                });
            });
        }
      });
    }
    
  return (
    <>
      <Navbar/>
      <SideNav/>
      <div className="invoice">
        <div className="bg bg-white">
          <div className="main">
            <DataGrid
              rows={invoiceData}
              columns={columns}
              experimentalFeatures={{ columnGrouping: true }}
              columnGroupingModel={columnGroupingModel}
              headerHeight={275}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
            <button
                className="btn btn-create"
                onClick={routeChange}>
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EinvoiceByTaxiPark;
