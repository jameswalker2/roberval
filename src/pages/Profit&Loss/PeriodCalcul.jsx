import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import CaisseLink from "./CaisseLink";

const { RangePicker } = DatePicker;

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

      <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
        <div className="mt-0">
          <h1 className="text-supportingColor1 text-[15px]">
            Votre balance est :
          </h1>
          <h1 className="text-4xl font-bold bg-gradient-to-t from-blue-500 to-pink-500 bg-clip-text text-transparent">
            500,000 ht
          </h1>
        </div>
      </div>

      <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
        <div className=" text-supportingColor1 mb-5">
          <h2>Sélectionnez une date</h2>
        </div>
        <div className="flex flex-wrap justify-center">
          <RangePicker
            className="w-[40rem] h-10 border-primaryColor border-2 rounded-lg bg-white
              focus:file-input-primaryColor"
          />
          {/* <button
            type="search"
            className="btn btn-xs text-xs h-10 w-32 ml-20 border-none text-white bg-primaryColor
              hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
            <Search size={20} />
            Search
          </button> */}
        </div>
      </div>
      <CaisseLink />
      <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm"></div>
    </>
  );
}

export default PeriodCalcul;
