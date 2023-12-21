import Sidenav from "../components/SideNav";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box";
import Navbar from "../components/NavBar";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const TestAbout = () => {
    const navigate = useNavigate()

    const [selectedOption, setSelectedOption] = useState(0);
    const [open, setOpen] = useState(false);

    const [income, setIncome] = useState({
        id: Date.now(),
        description: '',
        amount: '',
        incomeSource: '',
        username: '',
    });

    const [expense, setExpense] = useState({
        id: Date.now(),
        description: '',
        amount: '',
        date: '',
        expenseDestination: '',
    });

    const [debt, setDebt] = useState({
        id: Date.now(),
        description: "",
        amount: "",
        debtSource: "",
    });

    const postData = async () => {
        try {
            const axiosInstance = axios.create();
            let endpoint = '';
            let data = null;

            switch (selectedOption) {
                case 1:
                    if (!income.description || !income.amount || !income.incomeSource || !income.username) {
                        throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                    }
                    endpoint = '/income';
                    data = income;
                    break;
                case 2:
                    if (!expense.description || !expense.amount || !expense.date || !expense.expenseDestination) {
                        throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                    }
                    endpoint = '/expense';
                    data = expense;
                    break;
                case 3:
                    if (!debt.description || !debt.amount || !debt.debtSource) {
                        throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                    }
                    endpoint = '/debt';
                    data = debt;
                    break;
                default:
                    throw new Error("Seçilmiş əməliyyat mövcud deyil.");
            }

            const response = await axiosInstance.post(`${BASE_URL}${endpoint}`, data);
            // setResUrl(response.config.url); 
            // sessionStorage.setItem('resUrl', response.config.url);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Məlumat uğurla əlavə edildi",
                text: `${response.data.message}`,
                showConfirmButton: false,
                timer: 2500
            });

            navigate("/hesab");
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops...",
                text: error.message,
                showConfirmButton: false,
                timer: 3000
            });
        }
    };



    const handleIncomeChange = (e) => {
        const { name, value } = e.target;
        setIncome({ ...income, [name]: value });
    };

    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            const formattedDate = formatInputDate(value);
            if (formattedDate.length <= 10) {
                setExpense({ ...expense, [name]: formattedDate });
            }
        } else {
            setExpense({ ...expense, [name]: value });
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

    const handleDebtChange = (e) => {
        const { name, value } = e.target;
        setDebt({ ...debt, [name]: value });
    };

    const handleChange = (e) => {
        setSelectedOption(parseInt(e.target.value));
        setOpen(!open);
    };
 
    
    // getLastUrl(resUrl)


    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", height: "100vh" }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box>
                        <h1>Məlumat daxil edin</h1>
                        <Box className="form">
                            <Box style={{ borderBottom: "none" }}>
                                <label className="label" htmlFor="grid-first-name">
                                    Təsnifatı seçin
                                </label>
                                <select
                                    className="input"
                                    onChange={handleChange}
                                    value={selectedOption}
                                >
                                    <option value={0}>------------ Seçin ------------</option>
                                    <option value={1}>Gəlir</option>
                                    <option value={2}>Xərc</option>
                                    <option value={3}>Borc</option>
                                </select>
                                {selectedOption === 1 && (
                                    <div>
                                        <Box style={{ borderBottom: "none" }}>
                                            <label htmlFor="income-description" className="label">gelir tesviri  </label>
                                            <input
                                                className="input"
                                                id="income-description"
                                                type="text"
                                                name="description"
                                                // value={income.description}
                                                onChange={handleIncomeChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="income-amount" className="label">gelir meblegi</label>
                                            <input
                                                className="input"
                                                id="income-amount"
                                                type="number"
                                                name="amount"
                                                // value={income.amount}
                                                onChange={handleIncomeChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="income-source" className="label">gelir menbeyi</label>
                                            <input
                                                className="input"
                                                id="income-source"
                                                type="text"
                                                name="incomeSource"
                                                // value={income.source}
                                                onChange={handleIncomeChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="income-username" className="label"> istifadeci adi </label>
                                            <input
                                                className="input"
                                                id="income-username"
                                                type="text"
                                                name="username"
                                                // value={income.username}
                                                onChange={handleIncomeChange}
                                            />
                                        </Box>
                                    </div>
                                )}
                                {selectedOption === 2 && (
                                    <div>
                                        <Box style={{ borderBottom: "none" }}>
                                            <label htmlFor="expense-description" className="label">xərcin tesviri  </label>
                                            <input
                                                className="input"
                                                id="expense-description"
                                                type="text"
                                                name="description"
                                                onChange={handleExpenseChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="expense-amount" className="label">xərcin meblegi</label>
                                            <input
                                                className="input"
                                                id="expense-amount"
                                                type="number"
                                                name="amount"
                                                onChange={handleExpenseChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="expense-date" className="label">tarix seç</label>
                                            <input
                                                className="input"
                                                id="expense-date"
                                                type="date"
                                                name="date"
                                                max="2023-12-31"
                                                onChange={handleExpenseChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="expense-destination" className="label">xərcin təyinatı </label>
                                            <input
                                                className="input"
                                                id="expense-destination"
                                                type="text"
                                                name="expenseDestination"
                                                onChange={handleExpenseChange}
                                            />
                                        </Box>
                                    </div>
                                )}
                                {selectedOption === 3 && (
                                    <div>
                                        <Box style={{ borderBottom: "none" }}>
                                            <label htmlFor="debt-description" className="label">borc tesviri  </label>
                                            <input
                                                className="input"
                                                id="debt-description"
                                                type="text"
                                                name="description"
                                                onChange={handleDebtChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="debt-amount" className="label">borc meblegi</label>
                                            <input
                                                className="input"
                                                id="debt-amount"
                                                type="number"
                                                name="amount"
                                                onChange={handleDebtChange}
                                            />
                                        </Box>
                                        <Box style={{ borderBottom: "none" }} >
                                            <label htmlFor="debt-source" className="label">borc  menbeyi</label>
                                            <input
                                                className="input"
                                                id="debt-source"
                                                type="text"
                                                name="debtSource"
                                                onChange={handleDebtChange}
                                            />
                                        </Box>
                                    </div>
                                )}
                            </Box>
                            <Button className="button1" variant="contained" onClick={postData}>
                                Məlumatı daxil et
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default TestAbout;
