import { DatePicker, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../../Config/SupabaseConfig";

// eslint-disable-next-line react/prop-types
function StaffsUpdate({ visibleUp, onCloseUp, selectedStaffs }) {
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

  // Fetch pour les inputs
  useEffect(() => {
    if (selectedStaffs) {
      // eslint-disable-next-line react/prop-types
      setName(selectedStaffs.name);
      // eslint-disable-next-line react/prop-types
      setLastName(selectedStaffs.lastName);
      // eslint-disable-next-line react/prop-types
      setBirth(selectedStaffs.birth);
      // eslint-disable-next-line react/prop-types
      setAdress(selectedStaffs.adress);
      // eslint-disable-next-line react/prop-types
      setNif(selectedStaffs.nif);
      // eslint-disable-next-line react/prop-types
      setNinu(selectedStaffs.ninu);
      // eslint-disable-next-line react/prop-types
      setPhone(selectedStaffs.phone);
      // eslint-disable-next-line react/prop-types
      setRole(selectedStaffs.role);
      // eslint-disable-next-line react/prop-types
      setEmail(selectedStaffs.email);
    }
  }, [selectedStaffs]);

  // Fonction pour update les données
  const handleUpdateStaff = async (e) => {
    e.preventDefault();

    try {
      const updateObject = {};
      if (name) updateObject.name = name;
      if (lastName) updateObject.lastName = lastName;
      if (birth) updateObject.birth = birth;
      if (adress) updateObject.adress = adress;
      if (nif) updateObject.nif = nif;
      if (ninu) updateObject.ninu = ninu;
      if (phone) updateObject.phone = phone;
      if (role) updateObject.role = role;
      if (email) updateObject.email = email;

      const { error } = await supabase
        .from("staffs")
        .update(updateObject)
        // eslint-disable-next-line react/prop-types
        .eq("id", selectedStaffs.id);

      if (error) {
        throw error;
      } else {
        setTimeout(() => {
          onCloseUp();
        }, 1000);
        toast.success("Formulaire mise à jour !");
      }
    } catch (error) {
      toast.error(error.message);
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

  // console.log(selectedStaffs);

  // Le rendu
  return (
    <>
      {!selectedStaffs ? (
        ""
      ) : (
        <Modal
          title={"Modifier le membre"}
          centered
          open={visibleUp}
          onOk={handleUpdateStaff}
          onCancel={onCloseUp}
          footer={[
            <button
              key={"submit"}
              onClick={handleUpdateStaff}
              className="btn bg-color1 hover:bg-color3 border-none text-white">
              Soumettre
            </button>,
          ]}
          width={1100}>
          <p className="">
            Les champs avec un astérisque{" "}
            <span className="text-red-600">*</span> sont obligatoires
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                  />
                </label>
                <label className="form-control w-full max-w-xs mr-5 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Entrez votre prénom{" "}
                      <span className="text-red-600">*</span>{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
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
                    defaultValue={birth ? moment(birth) : null}
                    value={moment(birth)}
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
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
                  />
                </label>
                <label className="form-ontrol w-full max-w-xs mr-5 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Entrez votre nif{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={nif}
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
                    value={ninu}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                  />
                </label>
                <label className="form-control w-full max-w-xs mr-5 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Quel est ton rôle ?{" "}
                      <span className="text-red-600">*</span>{" "}
                    </span>
                  </div>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    value={role}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
                  />
                </label>
              </div>
            </form>
          </div>
          <Toaster position={"top-right"} />
        </Modal>
      )}
    </>
  );
}

export default StaffsUpdate;
