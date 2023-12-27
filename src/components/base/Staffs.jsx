import {supabase} from "../login/SupabaseConfig";
import {useEffect, useState} from "react";
import {BiArrowBack} from "react-icons/bi";
import {BiSolidAddToQueue} from "react-icons/bi";
import {BiSolidPencil} from "react-icons/bi";
import {FaRegTrashAlt} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {useRef} from 'react';
import {toast, Toaster} from "react-hot-toast";
import * as Yup from "yup";


export function Staffs() {
  const modalRef = useRef(null);
  
  const [resultsStaffs, setResultsStaffs] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("")
  const [adress, setAdress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setMail] = useState("")
  
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const {data} = await supabase
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
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    lastName: Yup.string().required('Le prénom est requis'),
    role: Yup.string().required('Le rôle est requis'),
    adress: Yup.string().required('L\'adresse est requise'),
    phone: Yup.string().required('Le téléphone est requis'),
    email: Yup.string().email('Format d\'email invalide').required('L\'email est requis'),
  });
  
  const handleAddStaff = async (e) => {
    e.preventDefault()
    
    try {
      
      await validationSchema.validate({name, lastName, role, adress, phone, mail}, {abortEarly: false});
      
      const {data, error} = await supabase
        .from('staffs')
        .insert({
          name,
          lastName,
          role,
          adress,
          phone,
          email
        }).single()
      
      if (error) {
        // throw error
        toast.error(error.message)
      } else {
        console.log(data)
      }
      if (modalRef.current) {
        modalRef.current.close();
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.errors.forEach((validationError) => {
          toast.error(validationError)
        });
        console.log(error)
      }
    }
    
    e.target.reset(
      setName(""),
      setLastName(""),
      setRole(""),
      setAdress(""),
      setPhone(""),
      setMail("")
    )
  }
  
  const handleModalClose = () => {
    // Logique de fermeture du modal sans soumission du formulaire
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  
  
  return (
    <>
      <div className="w-full h-[695px]">
        <div
          className="relative w-[90%] h-[7vh] bg-white top-10 left-20 rounded-full pl-5 pr-20 flex items-center justify-between mb-[80px] ">
          <NavLink className="text-2xl text-color1" to={"/accueil"}>
            <BiArrowBack id="back"/>
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
          <button
            onClick={() => document.getElementById('my_modal_1').showModal()}
            className="flex items-center justify-center bg-color2 text-white font-semibold hover:bg-color3 w-72 h-11 rounded-full  ">
            <BiSolidAddToQueue className="w-[20px] h-[20px] m-2"/>
            Ajouter un nouveau membre
          </button>
        </div>

        <div className="overflow-x-auto absolute left-20 mt-40 bg-white w-[90%] h-96">
          {resultsStaffs.length > 0 ? (
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
                          <BiSolidPencil className="mr-5"/>
                        </NavLink>
                        <FaRegTrashAlt onClick={() => handleDelete(staff.id)}/>
                      </span>
                    </td>
                  </tr>
                  </tbody>
                ))}
            </table>) : (
            <p className="text-2xl flex justify-center mt-40">Aucun membre du personnel trouvé</p>
          )}
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_1" className={"modal"} ref={modalRef}>
          <div className="modal-box bg-white w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Nouveau Membre</h3>
            <p className="">Les informations en <span className="text-red-600">*</span> sont obligatoires</p>
            <div className="modal-action">
              <form onSubmit={handleAddStaff} method="dialog">
                
                {/* if there is a button in form, it will close the modal */}
                <div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text" placeholder="Nom" className="input w-[22rem] bg-gray-200 mr-20 mb-10"/>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text" placeholder="Prénom" className="input w-[22rem] bg-gray-200 mr-20 mb-10"/>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    name="role" className="select w-[22rem] bg-gray-200 mr-20 mb-10">
                    <option disabled selected>Role</option>
                    <option value="Professeur Prescolaire">Professeur Prescolaire</option>
                    <option value="Professeur Primaire">Professeur Primaire</option>
                    <option value="Professeur Secondaire">Professeur Secondaire</option>
                    <option value="Staff Direction">Staff Direction</option>
                  </select>
                  <input
                    onChange={(e) => setAdress(e.target.value)}
                    type="text" placeholder="adresse" className="input w-[22rem] bg-gray-200 mr-20 mb-10"/>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="number" placeholder="téléphone" className="input w-[22rem] bg-gray-200 mr-20 mb-10"/>
                  <input
                    onChange={(e) => setMail(e.target.value)}
                    type="text" placeholder="E-mail" className="input w-[22rem] bg-gray-200 mr-20 mb-10"/>
                </div>
                <button type="submit" className="btn bg-color1 border-none text-white">Soumettre</button>
                <button type={"button"} onClick={handleModalClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                </button>
              </form>
            </div>
            <Toaster/>
          </div>
        </dialog>
      </div>
    </>
  );
}
