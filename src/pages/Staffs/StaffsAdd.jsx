import { DatePicker, Modal } from "antd";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { supabase } from "../../Config/SupabaseConfig";

// eslint-disable-next-line react/prop-types
function StaffsAdd({ visible, onClose }) {
  // Déclarer les états (hooks)
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birth, setBirth] = useState("");
  const [adress, setAdress] = useState("");
  const [nif, setNif] = useState("");
  const [ninu, setNinu] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // Faire la validation du formulaire update
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis"),
    lastName: Yup.string().required("Le prénom est requis"),
    role: Yup.string().required("Le rôle est requis"),
    phone: Yup.number().required("Le téléphone est requis"),
    email: Yup.string()
      .email("Format d'email invalide")
      .required("L'email est requis"),
  });

  // Fonction pour update les données
  const handleAddStaff = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { name, lastName, role, phone, email },
        { abortEarly: false },
      );

      const addObject = {};
      if (name) addObject.name = name;
      if (lastName) addObject.lastName = lastName;
      if (birth) addObject.birth = birth;
      if (adress) addObject.adress = adress;
      if (nif) addObject.nif = nif;
      if (ninu) addObject.ninu = ninu;
      if (phone) addObject.phone = phone;
      if (role) addObject.role = role;
      if (email) addObject.email = email;

      const { data, error } = await supabase
        .from("staffs")
        .insert(addObject)
        .single();

      if (error) {
        toast.error(error.message);
        throw error;
      } else {
        console.log(data);
        toast.succes("Formulaire ajouter avec succès !");
        onClose();
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        error.errors.forEach((validationError) => {
          toast.error(validationError);
        });
      }
    }

    setName("");
    setLastName("");
    setBirth("");
    setAdress("");
    setNif("");
    setNinu("");
    setPhone("");
    setRole("");
    setEmail("");
  };

  // Le rendu
  return (
    <>
      <Modal
        title={"Ajouter un nouveau membre"}
        centered
        open={visible}
        onCancel={onClose}
        footer={[
          <button
            key={"submit"}
            onClick={handleAddStaff}
            className="btn bg-color1 hover:bg-color3 border-none text-white">
            Soumettre
          </button>,
        ]}
        width={1100}>
        <p className="">
          Les champs avec un astérisque <span className="text-red-600">*</span>{" "}
          sont obligatoires
        </p>
        <div className="modal-action">
          <form>
            {/* if there is a button in form, it will close the modal */}
            <div className="flex flex-wrap items-center">
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre nom
                    <span className="text-red-600">*</span>{" "}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Écrivez ici..."
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                />
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre prénom <span className="text-red-600">*</span>{" "}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Écrivez ici..."
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                />
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre date de naissance{" "}
                    <span className="text-red-600">*</span>{" "}
                  </span>
                </div>
                <DatePicker
                  onChange={(dateString) => setBirth(dateString)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-96 max-w-xs "
                />
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre adresse{" "}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Écrivez ici..."
                  onChange={(e) => setAdress(e.target.value)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre nif{" "}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Écrivez ici..."
                  onChange={(e) => setNif(e.target.value)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                />
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre ninu{" "}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Écrivez ici..."
                  onChange={(e) => setNinu(e.target.value)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                />
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre numéro Whatsapp{" "}
                    <span className="text-red-600">*</span>{" "}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Écrivez ici..."
                  onChange={(e) => setPhone(e.target.value)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                />
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Quel est ton rôle ? <span className="text-red-600">*</span>{" "}
                  </span>
                </div>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  className="select focus:select-primary bg-gray-200 w-full max-w-xs">
                  <option value="" className="text-gray-300">
                    Fonction
                  </option>
                  <option value="Directeur">Directeur</option>
                  <option value="Enseignant(e)">Enseignant(e)</option>
                  <option value="Censeur">Censeur</option>
                  <option value="Staff Direction">Staff Direction</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-black">
                    Entrez votre email <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  type="email"
                  placeholder="Écrivez ici..."
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                />
              </label>
            </div>
          </form>
        </div>
        <Toaster position={"top-right"} />
      </Modal>
    </>
  );
}

export default StaffsAdd;
