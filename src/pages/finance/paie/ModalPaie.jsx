/* eslint-disable react/prop-types */
import { supabase } from "@/Config/SupabaseConfig";
import { Modal } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ModalPaie({ paiementId, onOpen, onClose, deletePaieID }) {
  const [paiementHistory, setPaiementHistory] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [statut, setStatut] = useState(null);

  useEffect(() => {
    if (paiementId) {
      setId(paiementId.id);
      setName(paiementId.students.firstName);
      setLastName(paiementId.students.lastName);
      setStatut(paiementId.statut);
    }
  }, [paiementId]);

  useEffect(() => {
    const getHistoryPaiement = async () => {
      try {
        const { data, error } = await supabase
          .from("history_paiement")
          .select(`*, generated_id ( *, students (*))`)
          .eq("generated_id", paiementId.student_id);

        if (error) {
          throw error;
        } else {
          setPaiementHistory(data);
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
          <h2 className={"font-medium"}>
            Procéder au paiement de{" "}
            <span className="text-primaryColor font-semibold">
              {name} {lastName}
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto mt-10 rounded-lg border-4 border-primaryColor border-opacity-10 shadow-sm">
          <table className="table table-xs ">
            <thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
              <tr>
                <th>ID paiement</th>
                <th>Valeur Avancée</th>
                <th>Bourse</th>
                <th>Balance</th>
                <th>Date de paiement</th>
                <th>Type de paiement</th>
              </tr>
            </thead>
            {paiementHistory.map((paiement) => (
              <tbody className="font-semibold bg-white" key={paiement.id}>
                <tr>
                  <td>{paiement.id}</td>
                  <td>$ {paiement.amount}</td>
                  <td>$ {paiement.bourse}</td>
                  <td>$ {paiement.balance}</td>

                  {paiement.date === null ? (
                    <td>Non généré</td>
                  ) : (
                    <td>{moment(paiement.date).format("DD/MM/YYYY")}</td>
                  )}
                  {paiement.mode === null ? (
                    <td>Non généré</td>
                  ) : (
                    <td>{paiement.mode}</td>
                  )}
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className="flex justify-end items-center mt-10">
          {statut === "Payé" ? (
            ""
          ) : (
            <NavLink to={"/update-paie/" + id}>
              <button
                className="btn border-none bg-primaryColor text-white 
              hover:bg-slate-100 hover:text-primaryColor">
                Ajouter Paiement
              </button>
            </NavLink>
          )}
          <button
            onClick={() => deletePaieID(id)}
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
