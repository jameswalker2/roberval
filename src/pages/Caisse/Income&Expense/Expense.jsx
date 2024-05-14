import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import { Button, DatePicker, Empty, Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const expensePerPage = 20;
export function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [searchExpense, setSearchExpense] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [what, setWhat] = useState("");
  const [show, setShow] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expenseType, setExpenseType] = useState([]);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const { data } = await supabase
          .from("expense")
          .select("*")
          .textSearch(searchExpense);

        if (data) {
          setExpenses(data);
          setExpenseType([...new Set(data.map((expense) => expense.type))]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => fetchExpense();
  }, [searchExpense]);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("expense").upsert([
      {
        name,
        type,
        mode,
        date,
        amount,
        what,
      },
    ]);

    if (error) {
      Modal.error({
        title: "Désolé, quelque chose s'est mal passé !",
        content:
          "Veuillez réessayer ou contacter notre équipe pour une maintenance",
        okButtonProps: {
          type: "default",
        },
      });
      console.log(error);
    } else {
      Modal.success({
        content: "Dépense ajouter avec success !",
        okButtonProps: { type: "default" },
      });
      setShow(false);
    }

    e.target.reset([
      setName(""),
      setType(""),
      setMode(""),
      setDate(""),
      setAmount(""),
    ]);
  };

  const handleDeleteExpense = async (expenseID) => {
    try {
      const { error } = await supabase
        .from("expense")
        .delete()
        .eq("id", expenseID)
        .single();

      if (error) {
        console.error(error);
        Modal.error({
          title: "Erreur !",
          content: "Vous n'êtes pas autorisé pour cette opération !",
          okButtonProps: {
            type: "default",
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const collectionOptionsSorted = expenseType.map((category) => ({
    value: category,
    label: category,
  }));

  const filterStaffs = selectedExpense
    ? expenses.filter((expense) => expense.type === selectedExpense)
    : expenses;

  const startIndex = (currentPage - 1) * expensePerPage;
  const endIndex = startIndex + expensePerPage;
  const paginatedExpense = filterStaffs.slice(startIndex, endIndex);

  useEffect(() => {
    const expenseChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expense" },
        (payload) => {
          const eventType = payload.eventType;
          const changedData = payload.new;

          switch (eventType) {
            case "INSERT":
              setExpenses((prevExpense) => [...prevExpense, changedData]);
              break;
            case "UPDATE":
              setExpenses((prevExpenses) => {
                return prevExpenses.map((expense) =>
                  expense.id === changedData.id ? changedData : expense,
                );
              });
              break;
            case "DELETE":
              setExpenses((prevExpenses) =>
                prevExpenses.filter((expense) => expense.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => expenseChannel.unsubscribe();
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
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-supportingColor1">
              Ajouter un nouveau dépense
            </h2>
            <button
              type="submit"
              onClick={() => setShow(true)}
              className="btn bg-primaryColor text-white border-none
                hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100 w-28">
              Ajouter
            </button>
          </div>

          {!show ? (
            ""
          ) : (
            <div>
              <form onSubmit={handleAddExpense}>
                <div className="flex flex-wrap justify-between mt-10">
                  <label className="form-control w-full max-w-xs ">
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
                  <label className="form-control w-full max-w-xs ">
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
                      <option value="Fournitures scolaire">
                        Fournitures scolaire
                      </option>
                      <option value="Fournitures de bureau">
                        Fournitures de bureau
                      </option>
                      <option value="Matérielles scolaire">
                        Matérielles scolaire
                      </option>
                      <option value="Article de toilette">
                        Article de toilette
                      </option>
                      <option value="Prelèvement">Prelèvement</option>
                      <option value="Prêt">Prêt</option>
                      <option value="Réparation">Réparation</option>
                      <option value="Donnation">Donation</option>
                      <option value="Autres">Autres</option>
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs  mb-5">
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
                  <label className="form-control w-full max-w-xs  mb-5">
                    <div className="label">
                      <span className="label-text text-supportingColor1">
                        Date
                      </span>
                    </div>
                    <DatePicker
                      onChange={(date) => setDate(date)}
                      placeholder="Date dépense"
                      className="input bg-slate-100 border-primaryColor border-2"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs  ">
                    <div className="label">
                      <span className="label-text text-supportingColor1">
                        Montant
                      </span>
                    </div>
                    <input
                      onChange={(e) => setAmount(e.target.value)}
                      type="text"
                      placeholder="Montant"
                      className="input bg-slate-100 border-primaryColor border-2"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-supportingColor1">
                        Description
                      </span>
                    </div>
                    <input
                      onChange={(e) => setWhat(e.target.value)}
                      type="text"
                      placeholder="Description"
                      className="input bg-slate-100 border-primaryColor border-2"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs ml-[90%]">
                    <button
                      type="submit"
                      className="btn bg-primaryColor text-white border-none
                  hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100 w-28 mt-9">
                      Soumettre
                    </button>
                  </label>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
          <div className="flex justify-between mb-10 items-center">
            <h2 className="text-supportingColor1 font-medium ">
              Liste de dépenses
            </h2>
            <select
              onChange={(e) => setSelectedExpense(e.target.value)}
              className="select max-w-xs w-96 mr-0 bg-white border-primaryColor border-2 text-supportingColor1">
              <option value="" className="text-gray-300">
                Recherche par role
              </option>
              {collectionOptionsSorted
                .filter((expense) => expense.type !== "Avance Salaire")
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <div className="overflow-x-auto">
              {paginatedExpense.length > 0 ? (
                <div>
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
                    {paginatedExpense
                      .filter((expense) => expense.type !== "Avance Salaire")
                      .map((expense) => (
                        <tbody key={expense.id}>
                          <tr>
                            <th>0{expense.id}</th>
                            <td>{expense.name}</td>
                            <td>{expense.type}</td>
                            <td>{expense.mode}</td>
                            <td>{expense.date}</td>
                            <td>{expense.amount}</td>
                            <td>
                              <Button
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="btn btn-xs text-xs h-10 w-20 border-none text-white bg-supportingColor3 hover:bg-slate-100 hover:text-supportingColor3 active:bg-slate-100">
                                Delete
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                  </table>
                  <Pagination
                    current={currentPage}
                    pageSize={expensePerPage}
                    total={expenses.length}
                    onChange={(page) => setCurrentPage(page)}
                    className="text-center mt-10"
                  />
                </div>
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
