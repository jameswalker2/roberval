import { supabase } from "../login/SupabaseConfig";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Staffs() {
  const [resultsStaffs, setResultsStaffs] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const { data } = await supabase
          .from("staffs")
          .select("*")
          .textSearch(searchStaff);

        if (data) {
          setResultsStaffs(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaffs();
  }, [searchStaff]);

  return (
    <>
      <div className="w-full h-[695px]">
        <div className="relative w-[90%] h-[7vh] bg-white top-10 left-20 rounded-full pl-5 pr-20 flex items-center justify-between mb-[80px] ">
          <NavLink className="text-2xl text-color1" to={"/accueil"}>
            <BiArrowBack id="back" />
          </NavLink>
          <div>
            <NavLink className="link_el" to={"/accueil"}>
              Dashboard{" "}
            </NavLink>
            <span className="m-5" id="span">
              |
            </span>
            <NavLink className="link_el" to={"/payroll"}>
              Payroll
            </NavLink>
          </div>
        </div>

        <div className="absolute mt-5 left-20 p-5 bg-white w-[83rem] rounded-full flex justify-between items-center">
          <h2 className="text-[20px] font-semibold text-color1">
            Liste des staffs
          </h2>
          <input
            onChange={(e) => setSearchStaff(e.target.value)}
            className="input w-[40rem] h-10 rounded-full bg-white shadow "
            placeholder="Cherchez avec le nom..."
            type="search"
          />
          <NavLink
            to={""}
            className="flex items-center justify-center bg-color2 text-white hover:bg-color3 w-64 h-9 rounded-full  ">
            <BiSolidAddToQueue className="w-[20px] h-[20px] m-2" />
            Ajouter un nouveau membre
          </NavLink>
        </div>

        <div className="overflow-x-auto absolute left-20 mt-40 bg-white w-[90%] h-96">
          <table className="table table-xs text-4xl">
            <thead
              key="thead"
              id="thead"
              className="text-[16px] text-white bg-color2">
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Role</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Gmail</th>
                <th>Actions</th>
              </tr>
            </thead>
            {resultsStaffs
              .filter(
                (staff) =>
                  staff.name
                    .toLowerCase()
                    .includes(searchStaff.toLowerCase()) ||
                  staff.lastName
                    .toLowerCase()
                    .includes(searchStaff.toLowerCase())
              )
              .map((staff) => (
                <tbody key={staff.id} className="font-semibold">
                  <tr>
                    <td>0{staff.id}</td>
                    <td>{staff.name}</td>
                    <td>{staff.lastName}</td>
                    <td>{staff.role}</td>
                    <td>{staff.adress}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.email}</td>
                    <td>
                      <span className="flex justify-flex-start">
                        <NavLink
                          id="nav"
                          // to={`/edit/${studentid}`
                          to={`/edit/`}>
                          <BiSolidPencil className="mr-5" />
                        </NavLink>
                        <FaRegTrashAlt onClick={() => handleDelete(staff.id)} />
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}
