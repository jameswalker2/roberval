import { useEffect, useState } from "react";

function SchoolInfoForm({ onSchoolInfoChange, resetData }) {
  const [vacation, setVacation] = useState("");
  const [level, setLevel] = useState("");
  const [classe, setClasse] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    switch (level) {
      case "PRESCOLAIRE":
        setAvailableClasses([
          "PRESCOLAIRE 1",
          "PRESCOLAIRE 2",
          "PRESCOLAIRE 3",
        ]);
        break;
      case "FONDAMENTAL 1":
        setAvailableClasses(["1 AF", "2 AF", "3 AF", "4 AF"]);
        break;
      case "FONDAMENTAL 2":
        setAvailableClasses(["5 AF", "6 AF"]);
        break;
      case "FONDAMENTAL 3":
        setAvailableClasses(["7 AF", "8 AF", "9 AF"]);
        break;
      case "SECONDAIRE":
        setAvailableClasses(["NS I", "NS II", "NS III", "NS IV"]);
        break;
      default:
        setAvailableClasses([]);
    }
  }, [level]);

  const handleChange = (fieldName, value) => {
    switch (fieldName) {
      case "vacation":
        setVacation(value);
        break;
      case "level":
        setLevel(value);
        break;
      case "classe":
        setClasse(value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    onSchoolInfoChange(vacation, level, classe);
  });

  const handleReset = () => {
    setVacation("");
    setLevel("");
    setClasse("");
  };

  useEffect(() => {
    if (resetData) {
      handleReset();
    }
  }, [resetData]);

  return (
    <div>
      {" "}
      <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
        <div className="mb-10">
          <h2 className="text-xl font-medium text-supportingColor1">
            Informations Académiques
          </h2>
        </div>

        <div className="flex flex-wrap ml-10">
          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <select
              onChange={(e) => handleChange("vacation", e.target.value)}
              value={vacation}
              name="vacation"
              className="select w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2">
              <option value={"0"} className="text-gray-400">
                Vacation
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <select
              onChange={(e) => handleChange("level", e.target.value)}
              value={level}
              name="Niveau"
              className="select w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2">
              <option
                value={"0"}
                className="text-gray-400">{`Niveau d'enseignement`}</option>
              <option value="PRESCOLAIRE">PRESCOLAIRE</option>
              <option value="FONDAMENTAL 1">FONDAMENTAL 1</option>
              <option value="FONDAMENTAL 2">FONDAMENTAL 2</option>
              <option value="FONDAMENTAL 3">FONDAMENTAL 3</option>
              <option value="SECONDAIRE">SECONDAIRE</option>
            </select>
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <select
              onChange={(e) => handleChange("classe", e.target.value)}
              value={classe}
              name="Classe"
              className="select w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2">
              <option
                value={"0"}
                className="text-gray-400">{`Niveau d'études`}</option>
              {availableClasses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
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

export default SchoolInfoForm;
