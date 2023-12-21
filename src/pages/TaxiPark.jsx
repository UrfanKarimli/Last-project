import * as React from 'react';
import SideNav from "../components/SideNav";
import {useNavigate } from 'react-router-dom'
import Box from "@mui/material/Box";
import Navbar from "../components/NavBar";
import Button from "@mui/material/Button";



const TaxiPark = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex"}}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, padding: "51px"}}>
          <h1 style={{ marginBlockEnd: 0, fontFamily: "Poppins"}}>
            Taxi Park
          </h1>
          <Box
            height={30}
            marginBottom={3}
            justifyContent={"flex-end"}
            display={"flex"}
          >
            <Button variant="contained" className="button" onClick={()=> {navigate("/newTaxiPark")}}>
              Yeni Taxi Park
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TaxiPark;
