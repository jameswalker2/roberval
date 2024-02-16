import {
  ArrowDownToLine,
  ArrowUpToLine,
  Banknote,
  BarChartBig,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  School,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

export function NavBar() {
  return (
    <>
      <nav className="fixed w-56 h-[100%] bg-primaryColor">
        <span className="flex items-center p-5 text-white">
          <School strokeWidth={1.5} className="w-8 h-8" />
          <h2 className="text-[20px] font-bold ml-5">Roberval</h2>
        </span>
        <ul className="menu w-56  text-white ">
          <li>
            <h2 className="menu-title">Accueil</h2>
            <ul>
              <li className="mb-2 text-[16px] font-normal focus:bg-supportingColor3">
                <Link to={"/dashboard"}>
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </li>
            </ul>
          </li>
          {/*  */}
          <li>
            <h2 className="menu-title">Administration</h2>
            <ul>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/eleves"}>
                  <GraduationCap />
                  Eleves
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/staffs"}>
                  <Users />
                  Staffs
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/paiement"}>
                  <Banknote />
                  Paiement
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/payroll"}>
                  <Wallet />
                  Payroll
                </Link>
              </li>
            </ul>
          </li>
          {/*  */}
          <li>
            <h2 className="menu-title">Finance</h2>
            <ul>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/caisse"}>
                  <Landmark />
                  Caisse
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/income"}>
                  <ArrowUpToLine />
                  Revenu
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/expense"}>
                  <ArrowDownToLine />
                  Dépense
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link to={"/gain"}>
                  <BarChartBig />
                  Profit & Perte
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}
