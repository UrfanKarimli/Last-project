import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Navbar from '../../components/structure/NavBar';
import SideNav from '../../components/structure/SideNav';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Updateİncome = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate()

    const [updatedData, setUpdatedData] = useState(
        {
            id: Number(id),
            description: '',
            amount: '',
            incomeSource: '',
            username: '',
        }
    )

    const getData = async () => {
        try {
            let response = await axios(`${BASE_URL}/income`);
            setLoading(true);

            const selectedRow = response.data.data.find((user) => Number(user.id) === Number(id));
            const { description, amount, incomeSource, username } = selectedRow;
            if (selectedRow) {
                setUpdatedData({
                    id: Number(id),
                    description: description,
                    amount: amount,
                    incomeSource: incomeSource,
                    username: username,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Oops...${error.name}`,
                text: `${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const handleUpdate = async () => {
        try {
            const result = await Swal.fire({
                title: "Dəyişiklikləri yadda saxlamaq istəyirsiniz?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
            });

            if (result.isConfirmed) {
                const response = await axios.put(`${BASE_URL}/income/${id}`, updatedData);
                console.log(response.data);
                Swal.fire("Saved!", "", "success");
                navigate("/hesab-2");
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


    const onHandleChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    }


    const { description, amount, incomeSource, username } = updatedData;
    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className="">
                        {
                            loading ? <Loading /> : <div className='mt-40'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { mt: 5, mx: 1, mb: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="təsviri" variant="outlined" name="description"
                                        InputLabelProps={{ shrink: true, }}
                                        value={description}
                                        onChange={onHandleChange}
                                    />
                                    <TextField
                                        id="filled-basic"
                                        type='number' label="məbləğ" variant="outlined" name="amount"
                                        InputLabelProps={{ shrink: true, }}
                                        value={amount}
                                        onChange={onHandleChange}
                                    />
                                    <TextField
                                        id="standar-basic"
                                        label="gəlir mənbəyi" variant="outlined" name="incomeSource"
                                        InputLabelProps={{ shrink: true, }}
                                        value={incomeSource}
                                        onChange={onHandleChange}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="istifadəci adı" variant="outlined" name="username"
                                        InputLabelProps={{ shrink: true, }}
                                        InputProps={{ readOnly: true }}
                                        value={username}
                                        onChange={onHandleChange}
                                    />
                                </Box>
                                <Button variant="contained" onClick={handleUpdate}  > məlumatları dəyiş</Button>
                            </div>
                        }
                    </div>
                </Box>
            </Box>
        </>
    )

}

export default Updateİncome