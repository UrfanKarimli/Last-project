import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import TaxiPark from "./pages/TaxiPark";
import SignIn from "./pages/SignIn";
import NewTaxiPark from "./pages/NewTaxiPark";
import TestAbout from "./pages/TestAbout";
import MyHesab from "./pages/MyHesab";
import Testinvoice from "./pages/Testİnvoice";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<TestAbout />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/taxiPark" element={<TaxiPark />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/invoice" element={<Testinvoice />} />
          <Route path="/hesab" element={<MyHesab />} />
          <Route path="/newTaxiPark" element={<NewTaxiPark />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
