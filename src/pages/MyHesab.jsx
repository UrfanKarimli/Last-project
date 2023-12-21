import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import CustomTabPanel from "../components/CustomTabPanel";
import Income from "../components/Income";
import Expense from "../components/Expense";
import Debt from "../components/Debt";
import SideNav from "../components/SideNav";
import Navbar from "../components/NavBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}




const MyHesab = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);



    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                            <Income />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Expense />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Debt />
                        </CustomTabPanel>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MyHesab;
