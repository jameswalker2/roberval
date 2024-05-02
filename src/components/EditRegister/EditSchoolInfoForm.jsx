import { supabase } from "@/Config/SupabaseConfig.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditSchoolInfoForm({ onEditSchoolInfoChange }) {
  const { id } = useParams();

  const [vacation, setVacation] = useState("");
  const [level, setLevel] = useState("");
  const [classe, setClasse] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setVacation(data.vacation);
        setLevel(data.level);
        setClasse(data.classe);
      } else {
        console.log(error);
      }
    };
    fetchStudent();
  }, [id]);

  useEffect(() => {
    switch (level) {
      case "PRESCOLAIRE":
        setAvailableClasses([
          "PRESCOLAIRE 1",
          "PRESCOLAIRE 2",
          "PRESCOLAIRE 3",
        ]);
        break;
      case "FONDAMENTAL I":
        setAvailableClasses(["1 AF", "2 AF", "3 AF", "4 AF"]);
        break;
      case "FONDAMENTAL II":
        setAvailableClasses(["5 AF", "6 AF"]);
        break;
      case "FONDAMENTAL III":
        setAvailableClasses(["7 AF", "8 AF", "9 AF"]);
        break;
      case "Secondaire":
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
    onEditSchoolInfoChange(vacation, level, classe);
  });

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
              <option value="FONDAMENTAL I">FONDAMENTAL I</option>
              <option value="FONDAMENTAL II">FONDAMENTAL II</option>
              <option value="FONDAMENTAL III">FONDAMENTAL III</option>
              <option value="Secondaire">Secondaire</option>
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

export default EditSchoolInfoForm;
