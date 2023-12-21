import React, { useState } from "react";
import Navbar from "../components/NavBar";
import SideNav from "../components/SideNav";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NewTaxiPark = () => {
  const navigate = useNavigate();
  const [taxiParkInfo, setTaxiParkInfo] = useState({
    taxiParkName: "",
    legalName: "",
    voen: "",
    bankAccountDriver: "",
    cardDriver: "",
    bankAccountFleet: "",
    cardFleet: "",
    server: "",
    fee: "",
    description: "",
  });

  const handleInputChange = (event, fieldName) => {
    setTaxiParkInfo({
      ...taxiParkInfo,
      [fieldName]: event.target.value,
    });
  };

  const isFormFilled = () => {
    return (
      taxiParkInfo.taxiParkName !== "" &&
      taxiParkInfo.legalName !== "" &&
      taxiParkInfo.voen !== "" &&
      taxiParkInfo.bankAccountDriver !== "" &&
      taxiParkInfo.cardDriver !== "" &&
      taxiParkInfo.bankAccountFleet !== "" &&
      taxiParkInfo.cardFleet !== "" &&
      taxiParkInfo.server !== "" &&
      taxiParkInfo.fee !== "" &&
      taxiParkInfo.description !== ""
    );
  };
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Taxi Park əlavə et</h1>
          <Box>
            <div className="parent">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
                className="div1"
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Taxi Park Məlumatları
                </h1>
                <div>
                  <label htmlFor="">Taxi Park Adı: </label>
                  <input
                    className="input"
                    type="text"
                    value={taxiParkInfo.taxiParkName}
                    onChange={(event) =>
                      handleInputChange(event, "taxiParkName")
                    }
                    placeholder="Taxi Park adı yaz..."
                  />
                </div>
                <div>
                  <label htmlFor="">Hüquqi adı: </label>
                  <input
                    className="input"
                    type="text"
                    value={taxiParkInfo.legalName}
                    onChange={(event) => handleInputChange(event, "legalName")}
                    placeholder="Hüquqi adı yaz..."
                  />
                </div>
                <div>
                  <label htmlFor="">VÖEN: </label>
                  <input
                    className="input"
                    type="text"
                    value={taxiParkInfo.voen}
                    onChange={(event) => handleInputChange(event, "voen")}
                    placeholder="VÖEN yaz..."
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
                className="div2"
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Sürücü üzrə xidmət haqqı dərəcəsi
                </h1>
                <div>
                  <label htmlFor="">Bank hesabı üzrə (VÖEN-li): </label>
                  <input
                    className="input"
                    type="text"
                    value={taxiParkInfo.bankAccountDriver}
                    onChange={(event) =>
                      handleInputChange(event, "bankAccountDriver")
                    }
                    placeholder="0.5%, min 0.25 AZN"
                  />
                </div>
                <div>
                  <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz): </label>
                  <input
                    className="input"
                    type="text"
                    value={taxiParkInfo.cardDriver}
                    onChange={(event) => handleInputChange(event, "cardDriver")}
                    placeholder="1.9%, min 0.5 AZN"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
                className="div3"
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Fleet üzrə xidmət haqqı dərəcəsi
                </h1>
                <div>
                  <label htmlFor="">Bank hesabı üzrə (VÖEN-li): </label>
                  <input
                    className="input"
                    type="text"
                    value={taxiParkInfo.bankAccountFleet}
                    onChange={(event) =>
                      handleInputChange(event, "bankAccountFleet")
                    }
                    placeholder="0.25%"
                  />
                </div>
                <div>
                  <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz): </label>
                  <input
                    className="input"
                    type="text"
                    value={taxiParkInfo.cardFleet}
                    onChange={(event) => handleInputChange(event, "cardFleet")}
                    placeholder="2%"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
                className="div4"
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Server Xidmət haqqı (AZN)
                </h1>
                <div>
                  <input
                    className="input"
                    type="number"
                    value={taxiParkInfo.server}
                    onChange={(event) => handleInputChange(event, "server")}
                    placeholder="70"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
                className="div5"
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Əlavə xidmət haqqı (AZN)
                </h1>
                <div>
                  <label htmlFor="">Fee: </label>
                  <input
                    className="input"
                    type="number"
                    value={taxiParkInfo.fee}
                    onChange={(event) => handleInputChange(event, "fee")}
                    placeholder="500"
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="">Təsvir: </label>
                  <textarea
                    style={{ height: 60 }}
                    className="input"
                    value={taxiParkInfo.description}
                    onChange={(event) =>
                      handleInputChange(event, "description")
                    }
                    type="text"
                    placeholder="Təsvir ver..."
                  />
                </div>
              </div>
            </div>
          </Box>
          <Button
            className="buttonTaxi"
            variant="contained"
            disabled={!isFormFilled()}
            onClick={() => {
              navigate("/taxiPark");
            }}
          >
            Taxi Park əlavə et
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewTaxiPark;
