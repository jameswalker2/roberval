import { supabase } from "@/Config/SupabaseConfig.jsx";
import { NavBar } from "@/components/Navbar/NavBar.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [searchExpense, setSearchExpense] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const { data } = await supabase
          .from("expense")
          .select("*")
          .textSearch(searchExpense);

        if (data) {
          setExpenses(data);
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
      },
    ]);

    if (error) {
      console.log(error);
    }
  };

  const handleDeleteExpense = async (expenseID) => {
    try {
      const { error } = await supabase
        .from("expense")
        .delete()
        .eq("id", expenseID);

      if (error) {
        console.error(error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                // Mise à jour de l'élément correspondant dans la liste
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-[60rem]">
        <div className="ml-60 pt-10 ">
          {loading ? (
            <Skeleton className="bg-white h-80 w-[72rem] rounded-2xl p-5 mb-10" />
          ) : (
            <div className="bg-white h-80 w-[72rem] rounded-2xl p-5">
              <h1 className="font-semibold uppercase text-2xl text-color1">
                Dépense
              </h1>
              <h2 className="mb-10">Ajouter un nouveau dépense</h2>
              <div className="flex flex-wrap">
                <label className="form-control w-full max-w-xs mr-10">
                  <div className="label">
                    <span className="label-text text-black">Nom</span>
                  </div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="ex: James..."
                    className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs mr-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Type de dépense
                    </span>
                  </div>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    defaultValue=""
                    className="select select-bordered focus:select-primary bg-gray-200">
                    <option value="" className="text-gray-300">
                      Type
                    </option>
                    <option value="Fournitures scolaire">
                      Fournitures scolaire
                    </option>
                    <option value="Matérielles de travail">
                      Matérielles de travail
                    </option>
                    <option value="Autres">Autres</option>
                  </select>
                </label>
                <label className="form-control w-full max-w-xs mr-10 mb-5">
                  <div className="label">
                    <span className="label-text text-black">
                      Mode de Paiement
                    </span>
                  </div>
                  <select
                    onChange={(e) => setMode(e.target.value)}
                    defaultValue=""
                    className="select select-bordered focus:select-primary bg-gray-200">
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
                    <span className="label-text text-black">Date</span>
                  </div>
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    placeholder="ex: James..."
                    className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs mr-10 ">
                  <div className="label">
                    <span className="label-text text-black">Montant</span>
                  </div>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="ex: 1000"
                    className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
                  />
                </label>
                <button
                  type="submit"
                  onClick={handleAddExpense}
                  className="btn bg-color1 text-white hover:bg-color3 border-none w-28 mt-9 ml-52">
                  Ajouter
                </button>
              </div>
            </div>
          )}
          {loading ? (
            <Skeleton className="bg-white h-96 w-[72rem] rounded-2xl p-5 mb-10" />
          ) : (
            <div className="mt-10 bg-white overflow-auto h-96 w-[72rem] rounded-2xl p-5 mb-10">
              <div className="flex mb-10 items-center">
                <h2 className="text-color1 capitalize font-semibold">
                  Liste de dépenses
                </h2>
                <input
                  onChange={(e) => setSearchExpense(e.target.value)}
                  type="search"
                  placeholder="Recherche rapide"
                  className="input input-bordered focus:file-input-primary bg-gray-200 h-9 w-96 max-w-xs ml-60"
                />
              </div>
              <div>
                <div className="overflow-x-auto">
                  {expenses.length > 0 ? (
                    <table className="table">
                      <thead className="text-black">
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
                      {expenses
                        .filter((expense) =>
                          expense.name
                            .toLowerCase()
                            .includes(searchExpense.toLowerCase()),
                        )
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
                                <button
                                  onClick={() =>
                                    handleDeleteExpense(expense.id)
                                  }
                                  className="btn bg-red-600 text-white btn-xs">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  ) : (
                    <p className="text-2xl flex justify-center mt-20">
                      Aucune donnée trouvé
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <Toaster />
        </div>
      </div>
    </>
  );
}
