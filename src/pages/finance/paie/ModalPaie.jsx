/* eslint-disable react/prop-types */
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ModalPaie({
  selectedStudents,
  showModalPaie,
  closeModalPaie,
  deletePaieID,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    if (selectedStudents) {
      setFirstName(selectedStudents.students.firstName);
      setLastName(selectedStudents.students.lastName);
      setId(selectedStudents.id);
      setCreated_at(selectedStudents.created_at);
      setBalance(selectedStudents.balance);
      setAmount(selectedStudents.amount);
      setDate(selectedStudents.date);
      setMode(selectedStudents.mode);
    }
  }, [selectedStudents]);

  console.log(selectedStudents);

  return (
    <>
      <Modal
        open={showModalPaie}
        width={1000}
        onCancel={closeModalPaie}
        footer={null}>
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
            <tbody className="font-semibold bg-white">
              <tr>
                <td className={"flex items-center"}>
                  {firstName} {lastName}
                </td>
                <td>{moment(created_at).format("DD/MM/YYYY")}</td>
                <td>$ {balance}</td>
                <td>$ {amount}</td>
                {date === null ? <td>Non généré</td> : <td>{date}</td>}
                {mode === null ? <td>Non généré</td> : <td>{mode}</td>}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-10">
          <NavLink to={"/update-paie/" + id}>
            <button
              className="btn border-none bg-primaryColor text-white 
						hover:bg-slate-100 hover:text-primaryColor">
              Ajouter Paiement
            </button>
          </NavLink>
          <button
            onClick={() => {
              deletePaieID(id);
              closeModalPaie;
            }}
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
