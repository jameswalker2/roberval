import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import { Button, DatePicker, Empty, Modal } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function Income() {
  const [incomes, setIncomes] = useState([]);
  const [searchIncome, setSearchIncome] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState();

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const { data } = await supabase
          .from("income")
          .select("*")
          .textSearch(searchIncome);

        if (data) {
          setIncomes(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => fetchIncome();
  }, [searchIncome]);

  const handleAddIncome = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("income").upsert([
      {
        name,
        type,
        mode,
        date,
        amount,
      },
    ]);

    if (error) {
      console.log(error);
    }

    e.target.reset([
      setName(""),
      setType(""),
      setMode(""),
      setDate(""),
      setAmount(""),
    ]);
  };

  const handleDeleteIncome = async (incomeId) => {
    try {
      const { error, data } = await supabase
        .from("income")
        .delete()
        .eq("id", incomeId)
        .single();

      if (error) {
        console.log(error);
        Modal.error({
          title: "Erreur !",
          content: "Vous n'êtes pas autorisé pour cette opération !",
          okButtonProps: {
            type: "default",
          },
        });
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const incomeChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "income" },
        (payload) => {
          const eventType = payload.eventType;
          const changedData = payload.new;

          switch (eventType) {
            case "INSERT":
              setIncomes((prevIncomes) => [...prevIncomes, changedData]);
              break;
            case "UPDATE":
              setIncomes((prevIncomes) => {
                return prevIncomes.map((income) =>
                  income.id === changedData.id ? changedData : income,
                );
              });
              break;
            case "DELETE":
              setIncomes((prevIncomes) =>
                prevIncomes.filter((income) => income.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => incomeChannel.unsubscribe();
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-screen overflow-y-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
        <div
          className={
            "text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 " +
            "text-supportingColor1 bg-white rounded-lg shadow-sm"
          }>
          <h1 className="font-semibold text-2xl">Revenu</h1>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/gain"}>
                Caisse
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/income"}>
                Revenu
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div>
            <h2 className="mb-10 font-medium text-xl text-supportingColor1">
              Ajouter un nouveau revenu
            </h2>
          </div>

          <div>
            <div className="flex flex-wrap ml-10">
              <form onSubmit={handleAddIncome}>
                <label className="form-control w-full max-w-xs mr-10">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Nom
                    </span>
                  </div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Nom"
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                </label>
                <label className="form-control w-full max-w-xs mr-10">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Type de dépense
                    </span>
                  </div>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    defaultValue=""
                    className="select bg-slate-100 border-primaryColor border-2">
                    <option value="" className="text-gray-300">
                      Type
                    </option>
                    <option value="Frais Scolaire">Frais Scolaire</option>
                    <option value="Donnation">Donnation</option>
                    <option value="Autres">Autres</option>
                  </select>
                </label>
                <label className="form-control w-full max-w-xs mr-10 mb-5">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Mode de Paiement
                    </span>
                  </div>
                  <select
                    onChange={(e) => setMode(e.target.value)}
                    defaultValue=""
                    className="select bg-slate-100 border-primaryColor border-2">
                    <option value="" className="text-gray-300">
                      Mode de paiement
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Chèque">Chèque</option>
                    <option value="Bank">Bank</option>
                  </select>
                </label>
                <label className="form-control w-full max-w-xs mr-10 mb-5">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Date
                    </span>
                  </div>
                  <DatePicker
                    onChange={(date) => setDate(date)}
                    placeholder="Date revenu"
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                </label>
                <label className="form-control w-full max-w-xs mr-10 ">
                  <div className="label">
                    <span className="label-text text-supportingColor1">
                      Montant
                    </span>
                  </div>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="Montant"
                    className="input bg-slate-100 border-primaryColor border-2"
                  />
                </label>
                <button
                  type="submit"
                  className="btn bg-primaryColor text-white border-none
                hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100 w-28 mt-9 ml-52">
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="flex mb-10 items-center">
            <h2 className="text-supportingColor1 font-medium">
              Liste de revenus
            </h2>
            <input
              onChange={(e) => setSearchIncome(e.target.value)}
              type="search"
              placeholder="Recherche rapide"
              className="input input-bordered focus:file-input-primary bg-gray-200 h-9 w-96 max-w-xs ml-60"
            />
          </div>
          {/**/}
          <div>
            <div className="overflow-x-auto">
              {incomes.length > 0 ? (
                <table className="table">
                  <thead className="text-supportingColor1">
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Type de dépense</th>
                      <th>Mode de Paiement</th>
                      <th>Date</th>
                      <th>Montant</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {incomes
                    // .filter(
                    //   (expense) =>
                    //     expense.name
                    //       .toLowerCase()
                    //       .includes(searchIncome.toLowerCase()) ||
                    //     console.log(expense),
                    // )
                    .map((expense) => (
                      <tbody key={expense.id}>
                        <tr>
                          <th>0{expense.id}</th>
                          <td>{expense.name}</td>
                          <td>
                            {expense.type}
                            {expense.what}
                          </td>
                          <td>{expense.mode}</td>
                          <td>{expense.date}</td>
                          <td>{expense.amount}</td>
                          <td>
                            <Button
                              onClick={() => handleDeleteIncome(expense.id)}
                              type="submit"
                              className={
                                "btn btn-xs text-xs h-10 w-20 border-none text-white bg-supportingColor3 " +
                                "hover:bg-slate-100 hover:text-supportingColor3 active:bg-slate-100"
                              }>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              ) : (
                <Empty description={"Aucune donnée disponible"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
