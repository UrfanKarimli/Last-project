import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTabPanel from "../../layout/Addinformation/CustomTabPanel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditableDataGrid from "../../components/EditableTabel";
import SideNav from "../../components/structure/SideNav";
import Loading from "../../components/Loading";
import Navbar from "../../components/structure/NavBar";
import Total from "../../layout/Addinformation/Total";
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

    const handleDelete =  (id, endpoint) =>{
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
                            editable: false,
                        },
                        {
                            field: 'amount',
                            headerName: 'amount',
                            width: 100,
                            editable: false,
                        },
                        {
                            field: 'incomeSource',
                            headerName: 'incomeSource',
                            width: 150,
                            editable: false,
                        },
                        {
                            field: 'username',
                            headerName: 'username',
                            width: 150,
                            editable: false,
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
                            width: 250,
                            renderCell: (params) => (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/update-income/${params.id}`)}
                                >
                                    Yeniləmək üçün keçid et
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
                            editable: false,
                        },
                        {
                            field: 'amount',
                            headerName: 'amount',
                            width: 50,
                            editable: false,
                        },
                        {
                            field: 'date',
                            headerName: 'date',
                            width: 110,
                            editable: false,
                        },
                        {
                            field: 'expenseDestination',
                            headerName: 'expenseDestination',
                            width: 150,
                            editable: false,
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
                            width: 250,
                            renderCell: (params) => (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/update-expense/${params.id}`)}
                                >
                                    Yeniləmək üçün keçid et

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
                            editable: false,
                        },
                        {
                            field: 'amount',
                            headerName: 'amount',
                            width: 100,
                            editable: false,
                        },
                        {
                            field: 'debtSource',
                            headerName: 'debtSource',
                            width: 110,
                            editable: false,
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
                            width: 250,
                            renderCell: (params) => (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/update-debt/${params.id}`)}
                                >
                                    Yeniləmək üçün keçid et

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

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Maliyyə hesabatları №2</h1>
                    <Total />
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
                                loading ? <Loading /> : <EditableDataGrid columns={columns} rows={data} />
                            }
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            {
                                loading ? <Loading /> : <EditableDataGrid columns={columns} rows={data} />
                            }
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            {
                                loading ? <Loading /> : <EditableDataGrid columns={columns} rows={data} />
                            }
                        </CustomTabPanel>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Hesab;
