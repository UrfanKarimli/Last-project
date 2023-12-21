import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTabPanel from "../components/CustomTabPanel";
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from "../components/DataTable";
import SideNav from "../components/SideNav";
import Loading from "../components/Loading";
import Navbar from "../components/NavBar";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
const BASE_URL = process.env.REACT_APP_BASE_URL



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}




const Hesab = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [columns, setColumns] = useState([]);
    const [id, setId] = useState()

    const [updatedRow, setUpdatedRow] = useState({
        id: id,
        description: '',
        amount: '',
        incomeSource: '',
        username: '',
    })





    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getData = async (url) => {

        try {
            let response = await axios(url);
            setData(response.data.data);
            setLoading(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Oops...${error.name}`,
                text: `${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    let handleDelete = function (id, endpoint) {
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
                axios.delete(`${BASE_URL}/${endpoint}/${id}`).then(resp => {
                    setData(prevData => prevData.filter(item => item.id !== id));
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



    const handleUpdate = async (rowid) => {
        setId(rowid)

        try {
            const result = await Swal.fire({
                title: "Dəyişiklikləri yadda saxlamaq istəyirsiniz?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            });

            if (result.isConfirmed) {
                const response = await axios.put(`${BASE_URL}/income/${id}`, updatedRow);
                console.log(response.data);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url;
                let column;
                let endpoint;

                if (value === 0) {
                    url = `${BASE_URL}/income`;
                    endpoint = 'income';
                    column = [
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
                            width: 100,
                            editable: true,
                        },
                        {
                            field: 'incomeSource',
                            headerName: 'incomeSource',
                            width: 150,
                            editable: true,
                        },
                        {
                            field: 'username',
                            headerName: 'username',
                            width: 150,
                            editable: true,
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
                                    onClick={() => handleDelete(params.row.id, endpoint)}
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
                } else if (value === 1) {
                    url = `${BASE_URL}/expense`;
                    endpoint = 'expense';
                    column = [
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
                            width: 50,
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
                            field: 'delete',
                            headerName: 'Delete',
                            sortable: false,
                            width: 100,
                            renderCell: (params) => (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(params.row.id, endpoint)}
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
                } else if (value === 2) {
                    url = `${BASE_URL}/debt`;
                    endpoint = 'debt';
                    column = [
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
                            width: 100,
                            editable: true,
                        },
                        {
                            field: 'debtSource',
                            headerName: 'debtSource',
                            width: 110,
                            editable: true,
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
                                    onClick={() => handleDelete(params.row.id, endpoint)}
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
                }

                setColumns(column);
                await getData(url);
            } catch (error) {
                console.error("Məlumatları gətirmə zamanı xəta:", error);
            }
        };
        fetchData();
    }, [value,]);



    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: true };
        setUpdatedRow(updatedRow)
        return updatedRow;
    };

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Maliyyə hesabatları</h1>
                    <Button
                        className="buttonNav"
                        onClick={() => {
                            navigate("/about");
                        }}
                        variant="contained"
                    >
                        Məlumat daxil et
                    </Button>
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="Gəlir" {...a11yProps(0)} />
                                <Tab label="Xərc" {...a11yProps(1)} />
                                <Tab label="Borc" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel sx={{ heigth: "10px" }} value={value} index={0}>
                            {
                                loading ? <Loading /> : <DataTable columns={columns} rows={data} processRowUpdate={processRowUpdate} />
                            }
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            {
                                loading ? <Loading /> : <DataTable columns={columns} rows={data} processRowUpdate={processRowUpdate} />
                            }
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            {
                                loading ? <Loading /> : <DataTable columns={columns} rows={data} processRowUpdate={processRowUpdate} />
                            }
                        </CustomTabPanel>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Hesab;
