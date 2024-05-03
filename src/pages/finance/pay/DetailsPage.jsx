import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function DetailsPage({ show, close, selectedStaff, deleteID }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [id, setID] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    if (selectedStaff) {
      // eslint-disable-next-line react/prop-types
      setFirstName(selectedStaff.staffs.name);
      // eslint-disable-next-line react/prop-types
      setLastName(selectedStaff.staffs.lastName);
      // eslint-disable-next-line react/prop-types
      setRole(selectedStaff.role);
      // eslint-disable-next-line react/prop-types
      setID(selectedStaff.id);
      // eslint-disable-next-line react/prop-types
      setBalance(selectedStaff.balance);
      // eslint-disable-next-line react/prop-types
      setAmount(selectedStaff.amount);
      // eslint-disable-next-line react/prop-types
      setDate(selectedStaff.date);
      // eslint-disable-next-line react/prop-types
      setMode(selectedStaff.mode);
    }
  }, [selectedStaff]);

  console.log(selectedStaff);

  return (
    <>
      <Modal open={show} width={1000} onCancel={close} footer={null}>
        <div className={"mb-10"}>
          <h2 className={"font-medium"}>
            Procéder au payroll de{" "}
            <span className="text-primaryColor font-semibold">
              {firstName} {lastName}
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto mt-10 rounded-lg border-4 border-primaryColor border-opacity-10 shadow-sm">
          <table className="table table-xs ">
            <thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
              <tr>
                <th>ID payroll</th>
                <th>Role</th>
                <th>Valeur Avancée</th>
                <th>Balance</th>
                <th>Date de payroll</th>
                <th>Type de paiment</th>
              </tr>
            </thead>
            <tbody className="font-semibold bg-white">
              <tr>
                <td>0{id}</td>
                <td>{role}</td>
                <td>$ {amount}</td>
                <td>$ {balance}</td>
                {date === null ? (
                  <td>Non généré</td>
                ) : (
                  <td>{moment(date).format("DD/MM/YYYY")}</td>
                )}
                {mode === null ? <td>Non généré</td> : <td>{mode}</td>}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-10">
          <NavLink to={"/update-pay/" + id}>
            <button
              className="btn border-none bg-primaryColor text-white 
						hover:bg-slate-100 hover:text-primaryColor">
              Ajouter Payroll
            </button>
          </NavLink>
          <button
            onClick={() => {
              deleteID(id);
              close;
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

export default DetailsPage;
