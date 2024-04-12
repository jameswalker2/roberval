import { supabase } from "@/Config/SupabaseConfig.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditParentInfoForm({ onEditParentInfoChange }) {
  const { id } = useParams();

  const [motherName, setMotherName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [motherJob, setMotherJob] = useState("");
  const [dMother, setDMother] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherLastName, setFatherLastName] = useState("");
  const [fatherJob, setFatherJob] = useState("");
  const [dFather, setDFather] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setMotherName(data.firstMother);
        setMotherLastName(data.lastMother);
        setMotherJob(data.jobMother);
        setDMother(data.statutMother);
        setFatherName(data.firstFather);
        setFatherLastName(data.lastFather);
        setFatherJob(data.jobFather);
        setDFather(data.statutFather);
      } else {
        console.log(error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (fieldName, value) => {
    switch (fieldName) {
      case "motherName":
        setMotherName(value);
        break;
      case "motherLastName":
        setMotherLastName(value);
        break;
      case "motherJob":
        setMotherJob(value);
        break;
      case "dMother":
        setDMother(value);
        break;
      case "fatherName":
        setFatherName(value);
        break;
      case "fatherLastName":
        setFatherLastName(value);
        break;
      case "fatherJob":
        setFatherJob(value);
        break;
      case "dFather":
        setDFather(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onEditParentInfoChange(
      motherName,
      motherLastName,
      motherJob,
      dMother,
      fatherName,
      fatherLastName,
      fatherJob,
      dFather,
    );
  });

  return (
    <div>
      <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
        <div>
          <h2 className="text-xl font-medium text-supportingColor1">
            Informations Parents
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
                Nom de la mère <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={motherName}
              onChange={(e) => handleChange("motherName", e.target.value)}
              placeholder="Nom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Prénom de la mère <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={motherLastName}
              onChange={(e) => handleChange("motherLastName", e.target.value)}
              placeholder="Nom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Occupation de la mère
              </span>
            </div>
            <input
              type="text"
              value={motherJob}
              onChange={(e) => handleChange("motherJob", e.target.value)}
              placeholder="Occupation de la mère"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <div className="flex items-center mr-[30rem] font-medium mb-2">
            <h2 className="mr-2">
              Statut de la mère <span className="text-red-600">*</span> :
            </h2>
            <label htmlFor="Décédée" className="mr-2">
              Décédée
            </label>
            <input
              type="radio"
              name="statutMother"
              value="Décédée"
              checked={dMother === "Décédée"}
              onChange={(e) => handleChange("dMother", e.target.value)} // Nouveau
              className="radio border-primaryColor border-2 w-5 h-5"
            />
            <label htmlFor="Vivante" className="mx-2">
              Vivante
            </label>
            <input
              type="radio"
              name="statutMother"
              value="Vivante"
              checked={dMother === "Vivante"}
              onChange={(e) => handleChange("dMother", e.target.value)} // Nouveau
              className="radio border-primaryColor border-2 w-5 h-5"
            />
          </div>

          <label className="form-control w-full max-w-xs mr-5 mt-10 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Nom du père <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={fatherName}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              placeholder="Nom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mt-10 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Prénom du père <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={fatherLastName}
              onChange={(e) => handleChange("fatherLastName", e.target.value)}
              placeholder="Nom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mt-10 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Occupation du père
              </span>
            </div>
            <input
              type="text"
              value={fatherJob}
              onChange={(e) => handleChange("fatherJob", e.target.value)}
              placeholder="Occupation du père"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <div className="flex items-center w-full max-w-xs mr-5 font-medium mb-2">
            <h2 className="mr-2">
              Statut du père <span className="text-red-600">*</span> :
            </h2>
            <label htmlFor="Décédé" className="mr-2">
              Décédé
            </label>
            <input
              type="radio"
              name="statutFather"
              value="Décédé"
              checked={dFather === "Décédé"}
              onChange={(e) => handleChange("dFather", e.target.value)} // Nouveau
              className="radio border-primaryColor border-2 w-5 h-5"
            />
            <label htmlFor="Vivant" className="mx-2">
              Vivant
            </label>
            <input
              type="radio"
              name="statutFather"
              value="Vivant"
              checked={dFather === "Vivant"}
              onChange={(e) => handleChange("dFather", e.target.value)} // Nouveau
              className="radio border-primaryColor border-2 w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditParentInfoForm;
