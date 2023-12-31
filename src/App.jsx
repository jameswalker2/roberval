import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login.jsx";
import { Dashboard } from "./components/pages/Dashboard/Dashboard.jsx";
import { Paiement } from "./components/pages/Paie/Paiement.jsx";
import { Payroll } from "./components/pages/Pay/Payroll.jsx";
import { Caisse } from "./components/pages/Account/Caisse.jsx";
import { Inscription } from "./components/base/Inscription.jsx";
import { Staffs } from "./components/base/Staffs.jsx";
import { Eleves } from "./components/base/Eleves.jsx";
import { Edit } from "./components/base/Edit.jsx";
import { AnimatePresence } from "framer-motion";
import { TestSubcollection } from "./components/TestSubcollection.jsx";
import { AddPaie } from "./components/pages/Paie/AddPaie.jsx";
import { UpdatePaie } from "./components/pages/Paie/UpdatePaie.jsx";
import { AddPay } from "./components/pages/Pay/AddPay.jsx";
import { UpdatePay } from "./components/pages/Pay/UpdatePay.jsx";
import "./App.scss";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/accueil" element={<Dashboard />} />
          <Route path="/paiement" element={<Paiement />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/caisse" element={<Caisse />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/eleves" element={<Eleves />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/testsubcollection" element={<TestSubcollection />} />
          <Route path="/addpaie" element={<AddPaie />} />
          <Route path="/update-paie/:id" element={<UpdatePaie />} />
          <Route path="/addpay" element={<AddPay />} />
          <Route path="/update-pay/:id" element={<UpdatePay />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
