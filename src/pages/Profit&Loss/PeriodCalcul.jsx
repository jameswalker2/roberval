import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function PeriodCalcul({ resetHideP }) {
  const [hideP, setHideP] = useState(false);

  useEffect(() => {
    if (hideP) {
      resetHideP(hideP);
    }
  });

  return (
    <>
      <div
        className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 
          text-supportingColor1 bg-white rounded-lg shadow-sm">
        <button onClick={() => setHideP(true)}>
          <BiArrowBack className="h-8 w-8 p-1 text-primaryColor hover:bg-slate-100 rounded-full" />
        </button>
        <h1 className="text-supportingColor1 font-medium text-[15px]">
          Montant par période
        </h1>
        <ul>
          <li>
            <NavLink className="text-supportingColor1" to={"/dashboard"}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink className="text-supportingColor1" to={"/gain"}>
              Profit & Perte
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default PeriodCalcul;
