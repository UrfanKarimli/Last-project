import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Navbar from '../../components/structure/NavBar';
import SideNav from '../../components/structure/SideNav';
import { MenuItem, Select } from '@mui/material';
const BASE_URL = process.env.REACT_APP_BASE_URL

const UpdateExpense = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const [debt, setDebt] = useState([]);
    const [isChecked, setIsChecked] = useState(false);


    const navigate = useNavigate()
    const [updatedData, setUpdatedData] = useState(
        {
            id: Number(id),
            description: '',
            amount: '',
            date: '',
            expenseDestination: '',
        }
    )


    const getDebt = async () => {
        try {
            setLoading(true);
            let response = await axios(`${BASE_URL}/debt`);
            setDebt(response.data.data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    }


    const getData = async () => {
        try {
            let response = await axios(`${BASE_URL}/expense`);
            setLoading(true);

            const selectedRow = response.data.data.find((user) => Number(user.id) === Number(id));
            const { description, amount, date, expenseDestination } = selectedRow;
            if (selectedRow) {
                setUpdatedData({
                    id: Number(id),
                    description: description,
                    amount: amount,
                    date: date,
                    expenseDestination: expenseDestination,
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
        getDebt();
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
                const response = await axios.put(`${BASE_URL}/expense/${id}`, updatedData);
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
        const { name, value, checked } = e.target;
        if (name === 'date') {
            const formattedDate = formatInputDate(value);
            if (formattedDate.length <= 10) {
                setUpdatedData({ ...updatedData, [name]: formattedDate });
            }
        } else if (name === 'checkbox') {
            setUpdatedData({ ...updatedData, [name]: checked });
        } else {
            setUpdatedData({ ...updatedData, [name]: value });
        }
    };


    const formatInputDate = (inputDate) => {
        const parts = inputDate.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${year}-${month}-${day}`;
        }
        return inputDate;
    };

    const { description, amount, expenseDestination, date } = updatedData;
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
                                        id="date"
                                        type="date"
                                        label="tarix seç" variant="outlined" name="date"
                                        InputLabelProps={{ shrink: true, }}
                                        value={date}
                                        onChange={onHandleChange}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="xərcin təyinatı" variant="outlined" name="expenseDestination"
                                        InputLabelProps={{ shrink: true, }}
                                        InputProps={{ readOnly: true }}
                                        value={expenseDestination}
                                        onChange={onHandleChange}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="checkbox"
                                                checked={isChecked}
                                                onChange={onHandleChange}
                                                name="checkbox"
                                            />
                                        }
                                        label="Checkbox təyinatı"
                                    />
                                    <Select
                                        id="selectOption"
                                        // value={selectedOption}
                                        onChange={onHandleChange}
                                        name="selectOption"
                                        label="Select Option"
                                        variant="outlined"
                                    >
                                        <MenuItem value="option1">Option 1</MenuItem>
                                        <MenuItem value="option2">Option 2</MenuItem>
                                        <MenuItem value="option3">Option 3</MenuItem>
                                    </Select>
                                </Box>
                                <Button variant="contained" onClick={handleUpdate}  > məlumatları dəyiş</Button>
                            </div>
                        }
                    </div>
                </Box>
            </Box >
        </>
    )

}

export default UpdateExpense