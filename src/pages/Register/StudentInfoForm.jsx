import { DatePicker } from "antd";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

function StudentInfoForm({ onInfoChange }) {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState(null);
  const [lastName, setLastName] = useState("");
  const [departmentBirth, setDepartmentBirth] = useState("");
  const [commonBirth, setCommonBirth] = useState("");
  const [addressBirth, setAddressBirth] = useState("");
  const [gender, setGender] = useState("");
  const [handicap, setHandicap] = useState("");
  const [wtHandicap, setWtHandicap] = useState("");
  const [isHandicapEnabled, setIsHandicapEnabled] = useState(false);

  const handleChange = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "birth":
        if (value instanceof Date) {
          const luxonDate = DateTime.fromJSDate(value);
          setBirth(luxonDate);
        } else {
          setBirth(null);
        }
        break;
      case "departmentBirth":
        setDepartmentBirth(value);
        break;
      case "commonBirth":
        setCommonBirth(value);
        break;
      case "addressBirth":
        setAddressBirth(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "handicap":
        setHandicap(value);
        break;
      case "wtHandicap":
        setWtHandicap(value);
        break;
    }
  };
  useEffect(() => {
    onInfoChange(
      name,
      lastName,
      birth,
      departmentBirth,
      commonBirth,
      addressBirth,
      gender,
      handicap,
      wtHandicap,
    );
  });

  const handleInputChange = (date) => {
    if (date) {
      const luxonDate = DateTime.fromJSDate(date.$d).toFormat("yyy - LLL - DD");
      setBirth(luxonDate);
      console.log(luxonDate);
    } else {
      setBirth(null);
    }
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
        <div>
          <h2 className="text-xl font-medium text-supportingColor1">
            Informations Personnelles
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
                Nom <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mb-2">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Prénom <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              value={lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              type="text"
              placeholder="Prénom"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Date de naissance <span className="text-red-600">*</span>
              </span>
            </div>
            <DatePicker
              placeholder="Date de naissance"
              value={birth}
              onChange={handleInputChange}
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mb-2">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Département de naissance
                <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={departmentBirth}
              onChange={(e) => handleChange("departmentBirth", e.target.value)}
              placeholder="Département de naissance"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Commune de naissance <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              value={commonBirth}
              onChange={(e) => handleChange("commonBirth", e.target.value)}
              type="text"
              placeholder="Commune de naissance "
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Lieu de naissance <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              value={addressBirth}
              onChange={(e) => handleChange("addressBirth", e.target.value)}
              type="text"
              placeholder="Lieu de naissance"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <div className="flex items-center w-full max-w-xs mr-5 font-medium mb-2">
            <h2 className="mr-2">
              Sexe <span className="text-red-600">*</span> :
            </h2>
            <label htmlFor="Garçon" className="mr-2">
              Garçon
            </label>
            <input
              type="radio"
              name="gender"
              value="Garçon"
              checked={gender === "Garçon"}
              onChange={(e) => handleChange("gender", e.target.value)} // Nouveau
              className="radio border-primaryColor border-2 w-5 h-5"
            />
            <label htmlFor={"Fille"} className="mx-2">
              Fille
            </label>
            <input
              type="radio"
              name="gender"
              value="Fille"
              checked={gender === "Fille"}
              onChange={(e) => handleChange("gender", e.target.value)} // Nouveau
              className="radio border-primaryColor border-2 w-5 h-5"
            />
          </div>

          <div className="flex items-center w-full max-w-xs mr-5 font-medium mb-2">
            <h2 className="">{`Y a-t'il un handicap ?`}</h2>
            <label htmlFor={"Oui"} className="mx-2">
              Oui
            </label>
            <input
              type="radio"
              name="handicap"
              value="Oui"
              checked={handicap === "Oui"}
              onChange={(e) => {
                handleChange("handicap", e.target.value);
                setIsHandicapEnabled(e.target.value === "Oui");
              }}
              className="radio border-primaryColor border-2 mr-2 w-5 h-5"
            />
            <label htmlFor={"Non"} className="mx-2">
              Non
            </label>
            <input
              type="radio"
              name="handicap"
              value="Non"
              checked={handicap === "Non"}
              onChange={(e) => {
                handleChange("handicap", e.target.value);
                setIsHandicapEnabled(e.target.value === "Oui");
              }}
              className="radio border-primaryColor border-2 w-5 h-5"
            />
          </div>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Handicap <span className="text-red-600">*</span>
              </span>
            </div>
            <select
              name="wthandicap"
              disabled={!isHandicapEnabled}
              value={wtHandicap}
              onChange={(e) => handleChange("wtHandicap", e.target.value)}
              className="select w-full max-w-xs bg-slate-100 border-primaryColor border-2">
              <option value={""} className="text-gray-400">
                Quel type handicap ?
              </option>
              <option value="Moteur">Moteur</option>
              <option value="Sensoriel">Sensoriel</option>
              <option value="Cognitif">Cognitif</option>
              <option value="Psychique">Psychique</option>
            </select>
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default StudentInfoForm;
