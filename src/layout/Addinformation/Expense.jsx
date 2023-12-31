import React, { useState, useEffect } from 'react'
import axios from 'axios';
import EditableDataGrid from '../../components/EditableTabel';
import Loading from "../../components/Loading";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, MenuItem, Select } from '@mui/material';


const BASE_URL = process.env.REACT_APP_BASE_URL



const Expense = () => {
    const { id } = useParams()
    const [row, setRow] = useState([])
    const [loading, setLoading] = useState(false);
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);


    const [updatedRow, setUpdatedRow] = useState({
        id: Number(id),
        description: '',
        amount: '',
        incomeSource: '',
        username: '',
    })

    


    const getData = async () => {
        try {
            setLoading(true);
            let response = await axios(`${BASE_URL}/expense`);
            setRow(response.data.data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        }finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getData();
    }, []);


    const column = [
        { field: 'id', headerName: 'ID', width: 130 },
        {
            field: 'description',
            headerName: 'description',
            width: 150,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'amount',
            width: 150,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'date',
            width: 110,
            editable: true,
        },
        {
            field: 'expenseDestination',
            headerName: 'expenseDestination',
            width: 150,
            editable: true,
        },
        {
            field: 'checkboxField',
            headerName: 'Checkbox Field',
            width: 150,
            editable: false,
            renderCell: (params) => (
                <Checkbox
                    checked={params.value}
                    onChange={(e) => handleCheckboxChange(e, params.id)}
                />
            ),
        },
        {
            field: 'selectField',
            headerName: 'Select Field',
            width: 200,
            editable: false,
            renderCell: (params) => (
                <Select
                style={{ width: '200px', display: isCheckboxSelected ? 'block' : 'none' }}
                    value={params.value}
                    onChange={(e) => handleSelectChange(e, params.id)}
                >
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <MenuItem value={3}>Option 3</MenuItem>
                </Select>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                    startIcon={<DeleteIcon />}
                >sil
                </Button>
            ),
        },
        {
            field: 'update',
            headerName: 'Update',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(params.id)}
                >
                    Update

                </Button>
            ),
        },
    ];
    
    const handleUpdate = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Dəyişiklikləri yadda saxlamaq istəyirsiniz?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            });
            if (result.isConfirmed) {
                const response = await axios.put(`${BASE_URL}/expense/${id}`, updatedRow);
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            Swal.fire({
                icon: "error",
                title: "Xəta",
                text: `Məlumat güncəllənmədı. Xəta: ${error.message}`,
            });
        }
    };

    const handleCheckboxChange = (e, id) => {

        if (updatedRow && updatedRow.id === id) {
        // console.log("checxbox", e.target.checked)
            setUpdatedRow({ ...updatedRow, relatedToDebt: e.target.checked });
        setIsCheckboxSelected(e.target.checked);

        }
    };
    
    const handleSelectChange = (e, id) => {
        if (updatedRow && updatedRow.id === id) {
            console.log("updatedRow", e)
            setUpdatedRow({ ...updatedRow, relatedDebtId: e.target.value });
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, updated: true };
        setUpdatedRow(updatedRow)
        return updatedRow;
    };

    function handleDelete(id) {
        Swal.fire({
            title: "Əminsiniz?",
            text: "Əgər bu məlumatı silsəniz, bir daha geri qaytara bilməyəcəksiniz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, sil!",
            cancelButtonText: "xeyir, geri qayıt"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URL}/expense/${id}`).then(resp => {
                    setRow(prevData => prevData.filter(item => item.id !== id));
                    Swal.fire({
                        title: "Silindi!",
                        text: "Məlumat uğurla silindi.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
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
    };

  return (
    <> {
        loading ? <Loading /> : <EditableDataGrid rows={row} columns={column} processRowUpdate={processRowUpdate} />
   }
    </>
  )
}

export default Expense