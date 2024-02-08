import { AddPaie } from "@/components/AddPaie.jsx";
import { AddPay } from "@/components/AddPay.jsx";
import { Edit } from "@/components/Edit.jsx";
import { UpdatePaie } from "@/components/UpdatePaie.jsx";
import { UpdatePay } from "@/components/UpdatePay.jsx";
import { Login } from "@/pages/AuthConfig/Login.jsx";
import { Caisse } from "@/pages/Caisse/Caisse.jsx";
import { Expense } from "@/pages/Caisse/Income&Expense/Expense.jsx";
import { Income } from "@/pages/Caisse/Income&Expense/Income.jsx";
import { Dashboard } from "@/pages/Dashboard/Dashboard.jsx";
import { Paiement } from "@/pages/Paiement.jsx";
import { Payroll } from "@/pages/Payroll.jsx";
import { Inscription } from "@/pages/Register/Inscription";
import { Staffs } from "@/pages/Staffs/Staffs.jsx";
import { Eleves } from "@/pages/Students/Eleves.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { ResetPassword } from "./pages/AuthConfig/reset/ResetPassword";
import Gain from "./pages/Profit&Loss/Gain";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/caisse" element={<Caisse />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/eleves" element={<Eleves />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/addpaie" element={<AddPaie />} />
        <Route path="/update-paie/:id" element={<UpdatePaie />} />
        <Route path="/addpay" element={<AddPay />} />
        <Route path="/update-pay/:id" element={<UpdatePay />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/gain" element={<Gain />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
