    import {supabase} from "../Config/SupabaseConfig.jsx";
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
  const [birth, setBirth] = useState("")
  const [adress, setAdress] = useState("")
  const [nif, setNif] = useState("")
  const [ninu, setNinu] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [personName, setPersonName] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null)





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
    
    return () => fetchStaffs();
  }, [searchStaff]);
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    lastName: Yup.string().required('Le prénom est requis'),
    role: Yup.string().required('Le rôle est requis'),
    phone: Yup.number().required('Le téléphone est requis'),
    email: Yup.string().email('Format d\'email invalide').required('L\'email est requis'),
  });
  const handleAddStaff = async (e) => {
    e.preventDefault();
    
    try {
      await validationSchema.validate({name, lastName, role, phone, email}, {abortEarly: false});

      if(selectedStaff) {
        const {error} = await supabase
            .from("staffs")
            .update({
              name, lastName, birth, adress, nif, ninu, phone, role, email
            })
            .eq('id', selectedStaff.id)

        if(error) {
          throw error;
        } else {
          setName(selectedStaff.name || "");
          setLastName(selectedStaff.lastName || "");
          setBirth(selectedStaff.birth || "");
          setAdress(selectedStaff.adress || "");
          setNif(selectedStaff.nif || "");
          setNinu(selectedStaff.ninu || "");
          setPhone(selectedStaff.phone || "");
          setRole(selectedStaff.role || "");
          setEmail(selectedStaff.email || "");
        }
      } else {

      const {data, error} = await supabase
        .from('staffs')
        .insert({
          name,
          lastName,
          birth,
          adress,
          nif,
          ninu,
          phone,
          role,
          email
        }).single()

      if (error) {
        // throw error
        toast.error(error.message)
      } else {
        setResultsStaffs((prevResults) => prevResults.filter((data) => data));
        setName("");
        setLastName("");
        setBirth("");
        setAdress("");
        setNif("");
        setNinu("");
        setPhone("");
        setRole("");
        setEmail("");
        console.log(data)
      }
      }

      if (modalRef.current) {
        modalRef.current.close();

      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.errors.forEach((validationError) => {
          toast.error(validationError)
        });
      }
        console.log(error.message)
    }


  }

  const handleDelete = async (staffId) => {

    try {
      const { error } = await supabase
          .from('staffs')
          .delete()
          .eq('id', staffId)

      if (error) {
        console.error(error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const expenseChannel = supabase
        .channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'staffs' },
            (payload) => {
              const eventType = payload.eventType;
              const changedData = payload.new;

              switch (eventType) {
                case "INSERT":
                  setResultsStaffs((prevExpense) => [... prevExpense, changedData])
                  break;
                case "UPDATE":
                  setResultsStaffs((prevExpenses) => {
                    return prevExpenses.map((expense) => expense.id === changedData.id ? changedData : expense)})
                  break;
                case "DELETE":
                  setResultsStaffs((prevExpenses) =>
                      prevExpenses.filter((expense) => expense.id !== payload.old.id ))
                  break;

              }
            }
        ).subscribe();

    return () => expenseChannel.unsubscribe();
  }, [])
  
  const handleModalClose = () => {
    // Logique de fermeture du modal sans soumission du formulaire
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  
  return (
    <>
      <div className="h-[100vh]">
        <div
          className="relative w-[90%] h-[7vh] bg-white top-10 left-20 rounded-full pl-5 pr-20 flex items-center justify-between mb-[80px] ">
          <NavLink className="text-2xl text-color1" to={"/dashboard"}>
            <BiArrowBack />
          </NavLink>
          <div>
            <NavLink className="link_el" to={"/dashboard"}>
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
        
        <div className="absolute left-20 p-5 bg-white w-[90%] rounded-2xl">
          <h2 className="text-[20px] font-medium text-color1 mb-5">Liste des staffs</h2>
          <div className="flex justify-around">
            <input
                onChange={(e) => setSearchStaff(e.target.value)}
                className="input input-bordered focus:file-input-primary w-[40rem] h-10 rounded-full bg-gray-100  "
                placeholder="Rechercher avec le nom"
                type="search"
            />
            <button
                onClick={() => document.getElementById('my_modal_1').showModal()}
                className="flex items-center justify-center bg-color2 text-white font-semibold hover:bg-color3 w-72 h-11 rounded-full  ">
              <BiSolidAddToQueue className="w-[20px] h-[20px] m-2"/>
              Ajouter un nouveau membre
            </button>
          </div>
        </div>

        <div className="overflow-x-auto absolute rounded left-20 mt-40 bg-white w-[90%] h-96">
          {resultsStaffs.length > 0 ? (
            <table className="table table-xs">
              <thead
                className="text-color2 text-sm bg-gray-50 hover:bg-gray-100">
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
                        <BiSolidPencil onClick={() => {
                          setSelectedStaff(staff)
                          document.getElementById('my_modal_1').showModal()
                        }} className="mr-5 text-color2 cursor-pointer"/>
                        <FaRegTrashAlt className="text-red-600 cursor-pointer" onClick={() => handleDelete(staff.id)}/>
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
          <div className="modal-box bg-white w-11/12 z-[0] max-w-6xl">

            <h3 className="font-bold text-lg text-color1">{selectedStaff ?  'Modifier le membre' : 'Ajouter un nouveau membre'}</h3>
            <p className="">Les champs avec un astérisque <span className="text-red-600">*</span> sont obligatoires</p>
            <div className="modal-action">
              <form method="dialog">

                {/* if there is a button in form, it will close the modal */}
                <div className="flex flex-wrap items-center">
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre nom <span className="text-red-600">*</span> </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Écrivez ici..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre prénom <span className="text-red-600">*</span> </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre date de naissance <span className="text-red-600">*</span> </span>
                    </div>
                    <input
                        type="date"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setBirth(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre adresse </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setAdress(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre nif </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setNif(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre ninu </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setNinu(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre numéro Whatsapp <span className="text-red-600">*</span> </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setPhone(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Quel est ton rôle ? <span className="text-red-600">*</span> </span>
                    </div>
                    <select
                        onChange={(e) => setRole(e.target.value)}
                        name="role" className="select focus:select-primary w-[22rem] bg-gray-200 w-full max-w-xs">
                      <option value="" className="text-gray-300">Fonction</option>
                      <option value="Directeur">Directeur</option>
                      <option value="Enseignant(e)">Enseignant(e)</option>
                      <option value="Censeur">Censeur</option>
                      <option value="Staff Direction">Staff Direction</option>
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs mr-5 mb-10">
                    <div className="label">
                      <span className="label-text text-black">Entrez votre email <span className="text-red-600">*</span></span>
                    </div>
                    <input
                        type="email"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />
                  </label>

                </div>
                <button type="submit" onClick={handleAddStaff} className="btn bg-color1 hover:bg-color3 border-none text-white ml-[56rem]">Soumettre</button>
              </form>
                <button type={"button"} onClick={handleModalClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                </button>
            </div>
            <Toaster position={"top-right"}/>
          </div>
        </dialog>
      </div>
    </>
  );
}
