import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function AnnualCalcul({ resetHideA }) {
  const [hideA, setHideA] = useState(false);

  useEffect(() => {
    if (hideA) {
      resetHideA(hideA);
    }
  });
  return (
    <>
      <div
        className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 
          text-supportingColor1 bg-white rounded-lg shadow-sm">
        <button onClick={() => setHideA(true)}>
          <BiArrowBack className="h-8 w-8 p-1 text-primaryColor hover:bg-slate-100 rounded-full" />
        </button>
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

export default AnnualCalcul;
