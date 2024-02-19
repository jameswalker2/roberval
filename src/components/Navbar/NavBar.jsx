import {
  ArrowDownLeftSquare,
  ArrowUpRightSquare,
  Banknote,
  BarChartBig,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  School,
  Users,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.scss";

export function NavBar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <>
      <nav className="fixed w-56 h-[100%] bg-primaryColor">
        <span className="flex items-center p-5 text-white">
          <School strokeWidth={1.5} className="w-8 h-8" />
          <h2 className="text-[20px] font-bold ml-5">Roberval</h2>
        </span>
        <ul className="menu w-56  text-white ">
          <li>
            <h2 className="menu-title text-supportingColor1">Accueil</h2>
            <ul>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/dashboard"}
                  className={`flex items-center ${
                    isActive("/dashboard")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </li>
            </ul>
          </li>
          {/*  */}
          <li>
            <h2 className="menu-title text-supportingColor1">Administration</h2>
            <ul>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/eleves"}
                  className={`flex items-center ${
                    isActive("/eleves")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <GraduationCap />
                  Eleves
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/staffs"}
                  className={`flex items-center ${
                    isActive("/staffs")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <Users />
                  Staffs
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/paiement"}
                  className={`flex items-center ${
                    isActive("/paiement")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <Banknote />
                  Paiement
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/payroll"}
                  className={`flex items-center ${
                    isActive("/payroll")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <Wallet />
                  Payroll
                </Link>
              </li>
            </ul>
          </li>
          {/*  */}
          <li>
            <h2 className="menu-title text-supportingColor1">Finance</h2>
            <ul>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/caisse"}
                  className={`flex items-center ${
                    isActive("/caisse")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <Landmark />
                  Caisse
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/income"}
                  className={`flex items-center ${
                    isActive("/income")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <ArrowUpRightSquare />
                  Revenu
                </Link>
              </li>
              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/expense"}
                  className={`flex items-center ${
                    isActive("/expense")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
                  <ArrowDownLeftSquare />
                  Dépense
                </Link>
              </li>

              <li className="mb-2 text-[16px] font-normal">
                <Link
                  to={"/gain"}
                  className={`flex items-center ${
                    isActive("/gain")
                      ? "bg-white text-primaryColor hover:bg-slate-200"
                      : ""
                  }`}>
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
