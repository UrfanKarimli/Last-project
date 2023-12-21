import { useState } from "react";
import SideNav from "../components/SideNav";
import Box from "@mui/material/Box";
import Navbar from "../components/NavBar";

const Qaime = () => {
  const [formData, setFormData] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // formData'ya göre istenilen bilgiyi getirme
    // Örnek olarak, formda girilen veriye göre bilgi getiriyoruz.
    // Burada istediğiniz veritabanına, API'ye veya yerel veriye erişebilirsiniz.
    // Bu örnekte basit bir veri kontrolü yapacağız.
switch (formData) {
    case "OpenAI":
        setInfo(
        <div style={{color: "red"}}>
            <h1>salam</h1>
        </div>)
        break;
        case "ferid":
            setInfo("sagol")
            break;
            case "orxan":
                setInfo("necesen")
                break;

    default:
        break;
}
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Qaimə</h1>
          <Box>
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  Bilgi almak için terim girin:
                  <input type="text" value={formData} onChange={handleChange} />
                </label>
                <button type="submit">Bilgi Al</button>
              </form>
              <div>
                <p>{info}</p>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Qaime;
