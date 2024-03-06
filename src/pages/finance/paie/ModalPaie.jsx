/* eslint-disable react/prop-types */
import { supabase } from "@/Config/SupabaseConfig";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ModalPaie({ paiementId, onOpen, onClose, deletePaieID }) {
  const [paiementHistory, setPaiementHistory] = useState([]);

  useEffect(() => {
    const getHistoryPaiement = async () => {
      try {
        const { data, error } = await supabase
          .from("history_paiement")
          .select("*")
          .eq("generated_id", paiementId.student_id);

        if (error) {
          throw error;
        } else {
          setPaiementHistory(data || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getHistoryPaiement();
  }, [paiementId]);

  return (
    <>
      <Modal open={onOpen} width={1000} onCancel={onClose} footer={null}>
        <div className={"mb-10"}>
          <h2 className={"font-medium text-xl"}>Procéder au paiement</h2>
        </div>

        <div className="overflow-x-auto mt-10 rounded-lg border-4 border-primaryColor border-opacity-10 shadow-sm">
          <table className="table table-xs ">
            <thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
              <tr>
                <th className={"flex items-center"}>Nom Complet</th>
                <th>Date de création</th>
                <th>Balance</th>
                <th>Valeur Avancée</th>
                <th>Date de payroll</th>
                <th>Type de paiment</th>
              </tr>
            </thead>
            {paiementHistory.map((paiement) => (
              <tbody className="font-semibold bg-white" key={paiement.id}>
                <tr>
                  <td className={"flex items-center"}>
                    {paiement.amount} {paiement.lastName}
                    {paiementHistory.id}
                  </td>
                  {/* <td>{moment(created_at).format("DD/MM/YYYY")}</td> */}
                  {/* <td>$ {balance}</td> */}
                  {/* <td>$ {amount}</td> */}
                  {/* {date === null ? <td>Non généré</td> : <td>{date}</td>} */}
                  {/* {mode === null ? <td>Non généré</td> : <td>{mode}</td>} */}
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className="flex justify-end items-center mt-10">
          <NavLink to={"/update-paie/"}>
            <button
              className="btn border-none bg-primaryColor text-white 
						hover:bg-slate-100 hover:text-primaryColor">
              Ajouter Paiement
            </button>
          </NavLink>
          <button
            // onClick={() => deletePaieID(paiementId.id)}
            className="btn bg-supportingColor3 border-none ml-10 text-white 
						hover:bg-slate-100 hover:text-supportingColor3">
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ModalPaie;
