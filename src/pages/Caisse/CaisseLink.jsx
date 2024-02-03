import { NavLink } from "react-router-dom";

function CaisseLink() {
  return (
    <div>
      <div className="flex pt-10 pl-5 mb-10">
        <NavLink
          to={"/income"}
          id="revenu"
          className="card mr-10 w-96 h-40 shadow-xl p-[20px] bg-gradient-to-r from-blue-400 to-green-400">
          <h2 className="mb-5 text-xl text-slate-100 ">Revenu</h2>
          <h1 className="mb-3 text-4xl text-color1 font-semibold text-color">
            $5000ht
          </h1>
          <span className="">
            <p className="text-slate-100">Cliquez pour accéder</p>
          </span>
        </NavLink>
        <NavLink
          to={"/expense"}
          id="expense"
          className="card mr-10 w-96 h-40 shadow-xl p-[20px] bg-gradient-to-r from-blue-400 to-red-400">
          <h2 className="mb-5 text-xl text-slate-100">Dépense</h2>
          <h1 className="mb-3 text-4xl text-color1 font-semibold">$3000ht</h1>
          <p className="text-slate-100">Cliquez pour accéder</p>
        </NavLink>
        <NavLink
          to={"/gain"}
          id="bank"
          className="card w-96 h-40 shadow-xl p-[20px] bg-gradient-to-r from-blue-400 to-purple-500">
          <h2 className="mb-5 text-xl text-slate-100">Profit et Perte</h2>
          <h1 className="mb-3 text-4xl text-color1 font-semibold">$3000ht</h1>
          <p className="text-slate-100">Cliquez pour accéder</p>
        </NavLink>
      </div>
    </div>
  );
}

export default CaisseLink;
