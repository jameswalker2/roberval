import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../Config/SupabaseConfig.jsx";
// import * as Yup from "yup";

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [departmentBirth, setDepartmentBirth] = useState("");
  const [commonBirth, setCommonBirth] = useState("");
  const [adressBirth, setAdressBirth] = useState("");
  const [handicap, setHandicap] = useState("");
  const [wtHandicap, setWtHandicap] = useState("");
  const [adress, setAdress] = useState("");
  const [department, setDepartment] = useState("");
  const [common, setCommon] = useState("");
  const [city, setCity] = useState("");
  const [firstMother, setFirstMother] = useState("");
  const [lastMother, setLastMother] = useState("");
  const [jobMother, setJobMother] = useState("");
  const [statutMother, setStatutMother] = useState("");
  const [firstFather, setFirstFather] = useState("");
  const [lastFather, setLastFather] = useState("");
  const [jobFather, setJobFather] = useState("");
  const [statutFather, setStatutFather] = useState("");
  const [vacation, setVacation] = useState("");
  const [level, setLevel] = useState("");
  const [classe, setClasse] = useState("");
  const [linkPerson, setLinkPerson] = useState("");
  const [nif, setNif] = useState("");
  const [ninu, setNinu] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHandicapEnabled, setIsHandicapEnabled] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);

  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string().required('Le nom est requis'),
  //   lastName: Yup.string().required('Le prénom est requis'),
  //   // birth: Yup.date().required('La date est requis'),
  //   gender: Yup.boolean().oneOf([true], 'Vous devez selectionner un genre'),
  //   departmentBirth: Yup.string().required('Le département de naissance est requis'),
  //   commonBirth: Yup.string().required('La commune de naissance est requis'),
  //   adressBirth: Yup.string().required("L'adresse de naissance est requis"),
  // });

  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setFirstName(data.firstName),
          setLastName(data.lastName),
          setBirth(data.birth),
          setDepartmentBirth(data.departmentBirth),
          setCommonBirth(data.commonBirth),
          setAdressBirth(data.adressBirth),
          setGender(data.gender),
          setHandicap(data.handicap),
          setWtHandicap(data.wtHandicap),
          setVacation(data.vacation),
          setLevel(data.level),
          setClasse(data.classe),
          setAdress(data.adress),
          setDepartment(data.department),
          setCommon(data.common),
          setCity(data.city),
          setFirstFather(data.firstFather),
          setLastFather(data.lastFather),
          setJobFather(data.jobFather),
          setStatutFather(data.statutFather),
          setFirstMother(data.firstMother),
          setLastMother(data.lastMother),
          setJobMother(data.jobMother),
          setStatutMother(data.statutMother),
          setLinkPerson(data.linkPerson),
          setNif(data.nif),
          setNinu(data.ninu),
          setPhone(data.phone),
          setOtherPhone(data.otherPhone),
          setEmail(data.email);
      } else {
        navigate("/eleves", { replace: true });
        console.log(error);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  const handleUdapteStudents = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("students")
        .update({
          firstName,
          lastName,
          birth,
          gender,
          departmentBirth,
          commonBirth,
          adressBirth,
          vacation,
          level,
          classe,
          adress,
          department,
          common,
          city,
          firstFather,
          lastFather,
          jobFather,
          statutFather,
          firstMother,
          lastMother,
          jobMother,
          statutMother,
          linkPerson,
          nif,
          ninu,
          phone,
          otherPhone,
          email,
        })
        .eq("id", id)
        .select("id");

      if (error) {
        throw error;
      } else {
        toast.success("Formulaire mise à jour !");
      }
    } catch (error) {
      toast.error(error.message);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    switch (level) {
      case "Prescolaire":
        setAvailableClasses([
          "1e Annee Kind",
          "2e Annee Kind",
          "3e Annee Kind",
        ]);
        break;
      case "Fondamental I":
        setAvailableClasses([
          "1e Annee Fond",
          "2e Annee Fond",
          "3e Annee Fond",
          "4e Annee Fond",
        ]);
        break;
      case "Fondamental II":
        setAvailableClasses(["5e Annee Fond", "6e Annee Fond"]);
        break;
      case "Fondamental III":
        setAvailableClasses([
          "7e Annee Fond",
          "8e Annee Fond",
          "9e Annee Fond",
        ]);
        break;
      case "Secondaire":
        setAvailableClasses(["NS I", "NS II", "NS III", "NS IV"]);
        break;
      default:
        setAvailableClasses([]);
    }
  }, [level]);

  return (
    <>
      <div className="relative w-full h-auto p-10">
        <NavLink
          className="text-3xl text-white absolute left-10 top-14"
          to={"/eleves"}>
          <BiArrowBack />
        </NavLink>
        <h1 className="text-6xl text-white uppercase font-bold pl-[30%]">
          Page inscription
        </h1>
        <p></p>
        {loading ? (
          ""
        ) : (
          <form
            onSubmit={handleUdapteStudents}
            className="bg-white rounded w-full h-auto mt-20 p-4">
            <div className="bg-gray-50 p-5 rounded mt-2">
              <h2 className="text-color1 text-xl font-semibold">
                Informations Personnelles
              </h2>
              <p className="mb-10">Tous les champs sont obligatoires</p>
              <div className="flex flex-wrap justify-items-center">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  value={firstName}
                  placeholder="Nom"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  value={lastName}
                  placeholder="Prénom"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setBirth(e.target.value)}
                  type="date"
                  value={birth}
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setDepartmentBirth(e.target.value)}
                  type="text"
                  value={departmentBirth}
                  placeholder="Département de naissance"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setCommonBirth(e.target.value)}
                  type="text"
                  value={commonBirth}
                  placeholder="Commune de naissance"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setAdressBirth(e.target.value)}
                  type="text"
                  value={adressBirth}
                  placeholder="Lieu de naissance"
                  className="input w-[22rem] bg-gray-200 mr-20"
                />
                <div className="flex items-center font-semibold ">
                  <h2 className="mr-2">
                    Sexe<span className="text-red-600">*</span>:
                  </h2>
                  <label htmlFor="Garçon" className="mr-2">
                    Garçon
                  </label>
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="gender"
                    id="Garçon"
                    value={"Garçon"}
                    checked={gender === "Garçon"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                  <label htmlFor={"Fille"} className="mx-2">
                    Fille
                  </label>
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="gender"
                    id="Fille"
                    value={"Fille"}
                    checked={gender === "Fille"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                </div>
                <div className="flex items-center font-semibold ">
                  <h2 className="ml-52 mr-2">{`Y a-t'il un handicap ?`}</h2>
                  <label htmlFor={"Oui"} className="mr-2">
                    Oui
                  </label>
                  <input
                    onChange={(e) => {
                      setHandicap(e.target.value);
                      setIsHandicapEnabled(e.target.value === "Oui");
                    }}
                    type="radio"
                    name="handicap"
                    id="Oui"
                    value={"Oui"}
                    checked={handicap === "Oui"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                  <label htmlFor={"Non"} className="mx-2">
                    Non
                  </label>
                  <input
                    onChange={(e) => {
                      setHandicap(e.target.value);
                      setIsHandicapEnabled(e.target.value === "Oui");
                    }}
                    type="radio"
                    name="handicap"
                    id="Non"
                    value={"Non"}
                    checked={handicap === "Non"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                </div>
                <select
                  onChange={(e) => setWtHandicap(e.target.value)}
                  name="wthandicap"
                  value={wtHandicap}
                  disabled={!isHandicapEnabled}
                  className="select w-[22rem] bg-gray-200 ml-[9.9rem] text-[18px]">
                  <option value={"0"} className="text-gray-400">
                    Quel type handicap ?
                  </option>
                  <option value="Moteur">Moteur</option>
                  <option value="Sensoriel">Sensoriel</option>
                  <option value="Cognitif">Cognitif</option>
                  <option value="Psychique">Psychique</option>
                </select>
              </div>
            </div>
            <div className="bg-gray-50 p-5 rounded mt-20">
              <h2 className="text-color1 text-xl font-semibold">
                Informations Académiques
              </h2>
              <p className="mb-10">
                Tous les champs sont obligatoires{" "}
                <span className="text-red-600">*</span>
              </p>
              <div className="flex flex-wrap justify-items-center">
                <select
                  onChange={(e) => setVacation(e.target.value)}
                  name="vacation"
                  value={vacation}
                  className="select w-[22rem] bg-gray-200 mr-20 mb-10 text-[18px]">
                  <option value={"0"} className="text-gray-400">
                    Vacation
                  </option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <select
                  onChange={(e) => setLevel(e.target.value)}
                  name="Niveau"
                  value={level}
                  className="select w-[22rem] bg-gray-200 mr-20 mb-10 text-[18px]">
                  <option
                    value={"0"}
                    className="text-gray-400">{`Niveau d'enseignement`}</option>
                  <option value="Prescolaire">Prescolaire</option>
                  <option value="Fondamental I">Fondamental I</option>
                  <option value="Fondamental II">Fondamental II</option>
                  <option value="Fondamental III">Fondamental III</option>
                  <option value="Secondaire">Secondaire</option>
                </select>
                <select
                  onChange={(e) => setClasse(e.target.value)}
                  name="Classe"
                  value={classe}
                  className="select w-[22rem] bg-gray-200 mr-20 mb-10 text-[18px]">
                  <option
                    value={"0"}
                    className="text-gray-400">{`Niveau d'études`}</option>
                  {availableClasses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-gray-50 p-5 rounded mt-20">
              <h2 className="text-color1 text-xl font-semibold">Adresse</h2>
              <p className="mb-10">
                Tous les champs sont obligatoires{" "}
                <span className="text-red-600">*</span>
              </p>
              <div className="flex flex-wrap justify-items-center">
                <input
                  onChange={(e) => setAdress(e.target.value)}
                  type="text"
                  value={adress}
                  placeholder="adresse"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setDepartment(e.target.value)}
                  type="text"
                  value={department}
                  placeholder="department"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setCommon(e.target.value)}
                  type="text"
                  value={common}
                  placeholder="Commune"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  value={city}
                  placeholder="Ville/Quartier"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-5 rounded mt-20">
              <h2 className="text-color1 text-xl font-semibold">
                Informations Parents
              </h2>
              <p className="mb-10">
                Tous les champs sont obligatoires{" "}
                <span className="text-red-600">*</span>
              </p>
              <div className="flex flex-wrap justify-items-center">
                <input
                  onChange={(e) => setFirstFather(e.target.value)}
                  type="text"
                  value={firstFather}
                  placeholder="Nom du père"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setLastFather(e.target.value)}
                  type="text"
                  value={lastFather}
                  placeholder="Prénom du père"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setJobFather(e.target.value)}
                  type="text"
                  value={jobFather}
                  placeholder="Profession"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <div className="flex items-center font-semibold">
                  <h2 className="mr-2">Statut du père:</h2>
                  <h2 className="mr-2">Décédé</h2>
                  <input
                    onChange={(e) => setStatutFather(e.target.value)}
                    type="radio"
                    name="3"
                    value={"Décédé"}
                    checked={statutFather === "Décédé"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                  <h2 className="mx-2">Vivant</h2>
                  <input
                    onChange={(e) => setStatutFather(e.target.value)}
                    type="radio"
                    name="3"
                    value={"Vivant"}
                    checked={statutFather === "Vivant"}
                    className="radio border-color2 border-2 w-5 h-5 mr-[50rem]"
                  />
                </div>
                <input
                  onChange={(e) => setFirstMother(e.target.value)}
                  type="text"
                  value={firstMother}
                  placeholder="Nom de la mère"
                  className="input w-[22rem] bg-gray-200 mr-20 my-10"
                />
                <input
                  onChange={(e) => setLastMother(e.target.value)}
                  type="text"
                  value={lastMother}
                  placeholder="Prénom de la mère"
                  className="input w-[22rem] bg-gray-200 mr-20 my-10"
                />
                <input
                  onChange={(e) => setJobMother(e.target.value)}
                  type="text"
                  value={jobMother}
                  placeholder="Profession"
                  className="input w-[22rem] bg-gray-200 mr-20 my-10"
                />
                <div className="flex items-center font-semibold">
                  <h2 className="mr-2">Statut de la mère:</h2>
                  <h2 className="mr-2">Décédée</h2>
                  <input
                    onChange={(e) => setStatutMother(e.target.value)}
                    type="radio"
                    name="statutMother"
                    value={"Décédée"}
                    checked={statutMother === "Décédée"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                  <h2 className="mx-2">Vivante</h2>
                  <input
                    onChange={(e) => setStatutMother(e.target.value)}
                    type="radio"
                    name="4"
                    value="Vivante"
                    checked={statutMother === "Vivante"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-5 rounded mt-20">
              <h2 className="text-color1 text-xl font-semibold">
                Personne en cas urgence
              </h2>
              <p className="mb-10">
                Tous les champs sont obligatoires{" "}
                <span className="text-red-600">*</span>
              </p>
              <div className="flex flex-wrap justify-items-center">
                <input
                  onChange={(e) => setLinkPerson(e.target.value)}
                  type="text"
                  value={linkPerson}
                  placeholder="Nom Complet"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setNif(e.target.value)}
                  type="text"
                  value={nif}
                  placeholder="Nif"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setNinu(e.target.value)}
                  type="text"
                  value={ninu}
                  placeholder="Ninu"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  value={phone}
                  placeholder="Téléphone"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setOtherPhone(e.target.value)}
                  type="number"
                  value={otherPhone}
                  placeholder="Autre téléphone"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  value={email}
                  placeholder="Email"
                  className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                />
              </div>
            </div>
            <button
              className="btn ml-[67rem] mt-10 bg-color1 text-white hover:bg-color3 border-none w-40"
              type="submit">
              Mettre à Jour
            </button>
          </form>
        )}
        <Toaster position={"top-right"} />
      </div>
    </>
  );
}
