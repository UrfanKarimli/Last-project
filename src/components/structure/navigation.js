import MyHesab from "../../pages/Addinformation/TestHesab1";
import SignIn from "../../pages/SignIn";
import TaxiPark from "../../pages/TaxiPark/TaxiPark";
import TestAbout from "../../pages/Addinformation/TestAbout";
import EinvoiceByTaxiPark from "../../pages/Einvoice/EinvoiceByTaxiPark";
import Updateİncome from "../../pages/Addinformation/Updateİncome";
import UpdateDebt from "../../pages/Addinformation/UpdateDebt";
import UpdateExpense from "../../pages/Addinformation/UpdateExpense";
import TestHesab2 from "../../pages/Addinformation/TestHesab2";
import UpdateTaxiPark from "../../pages/TaxiPark/UpdateTaxiPark";
import NewTaxiPark from "../../pages/TaxiPark/NewTaxiPark";
import AddInvoice from "../../pages/Einvoice/AddInvoice";
import UpdateInvoice from "../../pages/Einvoice/UpdateInvoice";


export const nav = [
  {
    path: "/",
    element: <SignIn />,
    isPrivate: false,
  },
  {
    path: "/hesab",
    element: <MyHesab />,
    isPrivate: true,
  },
  {
    path: "/hesab-2",
    element: <TestHesab2 />,
    isPrivate: true,
  },
  {
    path: "/about",
    element: <TestAbout />,
    isPrivate: true,
  },
  {
    path: "/newTaxiPark",
    element: <NewTaxiPark />,
    isPrivate: true,
  },
  {
    path: "/taxiPark",
    element: <TaxiPark />,
    isPrivate: true,
  },
  {
    path: "/e-invoice",
    element: <EinvoiceByTaxiPark />,
    isPrivate: true,
  },
  {
    path: "/e-invoice/create",
    element: <AddInvoice />,
    isPrivate: true,
  },
  {
    path: "/update-income/:id",
    element: <Updateİncome />,
    isPrivate: true,
  },
  {
    path: "/update-debt/:id",
    element: <UpdateDebt />,
    isPrivate: true,
  },
  {
    path: "/update-expense/:id",
    element: <UpdateExpense />,
    isPrivate: true,
  },
  {
    path: "/updateTaxiPark/:id",
    element: <UpdateTaxiPark />,
    isPrivate: true,
  },
  {
    path: "/e-invoice/update/:id",
    element: <UpdateInvoice />,
    isPrivate: true,
  },
];
