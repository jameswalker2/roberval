/* eslint-disable react/prop-types */
import { supabase } from "@/Config/SupabaseConfig";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function DetailsPage({ show, close, selectedStaff, deleteID }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setID] = useState("");
  const [getId, setGetId] = useState("");
  const [payrollHistory, setPayrollHistory] = useState([]);

  useEffect(() => {
    if (selectedStaff) {
      setFirstName(selectedStaff.staffs.name);
      setLastName(selectedStaff.staffs.lastName);
      setID(selectedStaff.staffs_id);
      setGetId(selectedStaff.id);
    }
  }, [selectedStaff]);

  useEffect(() => {
    const getHistoryPaiement = async () => {
      try {
        const { data, error } = await supabase
          .from("history_payroll")
          .select(`*, generated_staff_id ( *, staffs (*))`)
          .eq("generated_staff_id", selectedStaff.staffs_id);

        if (error) {
          throw error;
        } else {
          setPayrollHistory(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getHistoryPaiement();
  }, [selectedStaff]);

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
            {payrollHistory.map((payroll) => (
              <tbody className="font-semibold bg-white" key={payroll.id}>
                <tr>
                  <td>0{payroll.id}</td>
                  <td>{payroll.role}</td>
                  <td>$ {payroll.amount}</td>
                  <td>$ {payroll.balance}</td>
                  {payroll.date === null ? (
                    <td>Non généré</td>
                  ) : (
                    <td>{moment(payroll.date).format("DD/MM/YYYY")}</td>
                  )}
                  {payroll.mode === null ? (
                    <td>Non généré</td>
                  ) : (
                    <td>{payroll.mode}</td>
                  )}
                </tr>
              </tbody>
            ))}
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
              deleteID(getId);
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
