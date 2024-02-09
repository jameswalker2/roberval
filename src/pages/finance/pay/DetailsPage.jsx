import { Modal } from "antd";
import { CircleUserRound } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function DetailsPage({ show, close, selectedStaff, deleteID }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [id, setID] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    if (selectedStaff) {
      // eslint-disable-next-line react/prop-types
      setFirstName(selectedStaff.name);
      // eslint-disable-next-line react/prop-types
      setLastName(selectedStaff.lastName);
      // eslint-disable-next-line react/prop-types
      setRole(selectedStaff.role);
      // eslint-disable-next-line react/prop-types
      setID(selectedStaff.id);
      // eslint-disable-next-line react/prop-types
      setCreated_at(selectedStaff.created_at);
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

  return (
    <>
      <Modal
        centered
        title={"Procédér au payroll"}
        open={show}
        width={1000}
        onCancel={close}
        footer={null}>
        <div className="flex gap-3 p-2 ">
          <CircleUserRound
            strokeWidth={1}
            size={"40px"}
            className="text-color2"
          />
          <span>
            <h2 className=" font-extrabold text-color2 uppercase">
              {firstName} {lastName}
            </h2>
            <p className="">{role}</p>
          </span>
        </div>
        <div className="p-2 mt-10">
          <table className="table table-xs ">
            <thead className="text-color2 text-sm bg-gray-50 hover:bg-gray-100">
              <tr>
                <th>Staff ID</th>
                <th>Date de création</th>
                <th>Balance</th>
                <th>Valeur Avancée</th>
                <th>Date de payroll</th>
                <th>Type de paiment</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              <tr>
                <td>{id}</td>
                <td>{moment(created_at).format("DD/MM/YYYY")}</td>
                <td>$ {balance}</td>
                <td>$ {amount}</td>
                <td>{date}</td>
                <td>{mode}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center">
          <NavLink
            to={"/update-pay/" + id}
            className="btn bg-color2 border-none text-white  hover:bg-color1 hover:text-white">
            Ajouter Payroll
          </NavLink>
          <button
            onClick={() => {
              deleteID(id), close;
            }}
            className="btn bg-red-600 border-none ml-10 text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DetailsPage;
