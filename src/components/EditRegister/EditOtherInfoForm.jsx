import { supabase } from "@/Config/SupabaseConfig.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditOtherInfoForm({ onEditOtherInfoChange }) {
  const { id } = useParams();

  const [personLink, setPersonLink] = useState("");
  const [nif, setNif] = useState("");
  const [ninu, setNinu] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otherPhone, setOtherPhone] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setPersonLink(data.linkPerson);
        setNif(data.nif);
        setNinu(data.ninu);
        setEmail(data.email);
        setPhone(data.phone);
        setOtherPhone(data.otherPhone);
      } else {
        console.log(error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (fieldName, value) => {
    switch (fieldName) {
      case "person":
        setPersonLink(value);
        break;
      case "nif":
        setNif(value);
        break;
      case "ninu":
        setNinu(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "other":
        setOtherPhone(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onEditOtherInfoChange(personLink, nif, ninu, email, phone, otherPhone);
  });

  return (
    <div>
      <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
        <div>
          <h2 className="text-xl font-medium text-supportingColor1">
            Personne Responsable
          </h2>
          <p className="mb-10 font-normal text-primaryColor">
            Les champs avec un astérisque{" "}
            <span className="text-red-600">*</span> sont obligatoires
          </p>
        </div>

        <div className="flex flex-wrap ml-10">
          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Nom complet personne responsable{" "}
                <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={personLink}
              onChange={(e) => handleChange("person", e.target.value)}
              placeholder="Nom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">NIF</span>
            </div>
            <input
              type="text"
              value={nif}
              onChange={(e) => handleChange("nif", e.target.value)}
              placeholder="Nom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">NINU</span>
            </div>
            <input
              type="text"
              value={ninu}
              onChange={(e) => handleChange("ninu", e.target.value)}
              placeholder="Occupation de la mère"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">Email</span>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Occupation de la mère"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Téléphone <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Occupation de la mère"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Téléphone additionnel
              </span>
            </div>
            <input
              type="text"
              value={otherPhone}
              onChange={(e) => handleChange("other", e.target.value)}
              placeholder="Occupation de la mère"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default EditOtherInfoForm;
