import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from "@/pages/AuthConfig/Login.jsx";
import { Dashboard } from "@/pages/Dashboard.jsx";
import { Paiement } from "@/pages/Paiement.jsx";
import { Payroll } from "@/pages/Payroll.jsx";
import { Caisse } from "@/pages/Caisse.jsx";
import { Inscription } from "@/pages/Inscription.jsx";
import { Staffs } from "@/pages/Staffs.jsx";
import { Eleves } from "@/pages/Eleves.jsx";
import { Edit } from "@/components/Edit.jsx";
import { AddPaie } from "@/components/AddPaie.jsx";
import { UpdatePaie } from "@/components/UpdatePaie.jsx";
import { AddPay } from "@/components/AddPay.jsx";
import { UpdatePay } from "@/components/UpdatePay.jsx";
import { Income } from "@/pages/Income.jsx";
import { Expense } from "@/pages/Expense.jsx";
import "./App.scss";
import PrivateRoute from "@/pages/AuthConfig/PrivateRoute.jsx";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={ <Dashboard />} />
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
          <Route path="/income" element={<Income/>} />
          <Route path="/expense" element={<Expense/>} />
      </Routes>
  )
}

function App() {
  return (
    <>
        <Router>
          <AppRoutes/>
          {/*<Route path="/login" element={<Login />} />*/}
          {/*<Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />*/}
          {/*<Route path="/paiement" element={<Paiement />} />*/}
          {/*<Route path="/payroll" element={<Payroll />} />*/}
          {/*<Route path="/caisse" element={<Caisse />} />*/}
          {/*<Route path="/inscription" element={<Inscription />} />*/}
          {/*<Route path="/staffs" element={<Staffs />} />*/}
          {/*<Route path="/eleves" element={<Eleves />} />*/}
          {/*<Route path="/edit/:id" element={<Edit />} />*/}
          {/*<Route path="/addpaie" element={<AddPaie />} />*/}
          {/*<Route path="/update-paie/:id" element={<UpdatePaie />} />*/}
          {/*<Route path="/addpay" element={<AddPay />} />*/}
          {/*<Route path="/update-pay/:id" element={<UpdatePay />} />*/}
          {/*<Route path="/income" element={<Income/>} />*/}
          {/*<Route path="/expense" element={<Expense/>} />*/}
        </Router>
    </>
  );
}

export default App;
