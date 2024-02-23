import { supabase } from "@/Config/SupabaseConfig.jsx";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { NavBar } from "../../components/Navbar/NavBar";
import "./Inscription.scss";

// import {BsPersonFillAdd} from 'react-icons/bs'

export function Inscription() {
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

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // await validationSchema.validate({firstName, lastName, birth, gender, departmentBirth, commonBirth, adressBirth}, {abortEarly: false})

      const { error } = await supabase
        .from("students")
        .insert({
          firstName,
          lastName,
          birth,
          gender,
          departmentBirth,
          commonBirth,
          adressBirth,
          handicap,
          wtHandicap,
          adress,
          department,
          common,
          city,
          firstMother,
          lastMother,
          jobMother,
          statutMother,
          firstFather,
          lastFather,
          jobFather,
          statutFather,
          vacation,
          level,
          classe,
          linkPerson,
          nif,
          ninu,
          email,
          phone,
          otherPhone,
        })
        .single();
      if (error) throw error;
      toast.success("Formulaire soumis avec succès!");
    } catch (error) {
      // if (error.name === 'ValidationError') {
      //   error.errors.forEach((validationError) => {
      //     toast.error(validationError)
      //   });
      // }
      toast.error(error.message);
    }
    e.target.reset(
      setFirstName(""),
      setLastName(""),
      setBirth(""),
      setGender(""),
      setDepartmentBirth(""),
      setCommonBirth(""),
      setAdressBirth(""),
      setHandicap(""),
      setWtHandicap(""),
      setAdress(""),
      setDepartment(""),
      setCommon(""),
      setCity(""),
      setFirstMother(""),
      setLastMother(""),
      setJobMother(""),
      setStatutMother(""),
      setFirstFather(""),
      setLastFather(""),
      setJobFather(""),
      setStatutFather(""),
      setVacation(""),
      setLevel(""),
      setClasse(""),
      setLinkPerson(""),
      setNif(""),
      setNinu(""),
      setEmail(""),
      setPhone(""),
      setOtherPhone(""),
    );
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
      <NavBar />
      <div
        className={
          "h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10"
        }>
        <div
          className={
            "text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 " +
            "text-supportingColor1 bg-white rounded-lg shadow-sm"
          }>
          <NavLink className="text-3xl text-primaryColor" to={"/dashboard"}>
            <BiArrowBack id="back" />
          </NavLink>
          <h1 className="font-semibold text-2xl">Inscription</h1>
          <ul>
            <li>
              <NavLink className="text-supportingColor1" to={"/dashboard"}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-supportingColor1" to={"/eleves"}>
                Eleves
              </NavLink>
            </li>
          </ul>
        </div>

        <form onSubmit={handleAdd}>
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
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="Méat"
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
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Junior"
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
                  onChange={(e) => setBirth(e.target.value)}
                  placeholder="2024/02/23"
                  className="input bg-slate-100 border-primaryColor border-2"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Département de naissance{" "}
                    <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setDepartmentBirth(e.target.value)}
                  type="text"
                  placeholder="Artibonite"
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
                  onChange={(e) => setCommonBirth(e.target.value)}
                  type="text"
                  placeholder="Saint-Marc"
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
                  onChange={(e) => setAdressBirth(e.target.value)}
                  type="text"
                  placeholder="#109, Route de Pont-Ambour"
                  className="input bg-slate-100 border-primaryColor border-2"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>

              <div className="flex items-center w-full max-w-xs mr-5 font-medium">
                <h2 className="mr-2">
                  Sexe <span className="text-red-600">*</span> :
                </h2>
                <label htmlFor="Garçon" className="mr-2">
                  Garçon
                </label>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value={"Garçon"}
                  className="radio border-primaryColor border-2 w-5 h-5"
                />
                <label htmlFor={"Fille"} className="mx-2">
                  Fille
                </label>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value={"Fille"}
                  className="radio border-primaryColor border-2 w-5 h-5"
                />
              </div>

              <div className="flex items-center w-full max-w-xs mr-5 font-medium">
                <h2 className="">{`Y a-t'il un handicap ?`}</h2>
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
                  value={"Oui"}
                  className="radio border-primaryColor border-2 w-5 h-5"
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
                  value={"Non"}
                  className="radio border-primaryColor border-2 w-5 h-5"
                />
              </div>
              <select
                onChange={(e) => setWtHandicap(e.target.value)}
                name="wthandicap"
                defaultValue={"0"}
                disabled={!isHandicapEnabled}
                className="select w-full max-w-xs bg-slate-100 border-primaryColor border-2">
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

          <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
            <h2 className="text-supportingColor1 text-xl font-medium">
              Informations Académiques
            </h2>
            <p className="mb-10 text-primaryColor">
              Les champs avec un astérisque{" "}
              <span className="text-red-600">*</span> sont obligatoires
            </p>
            <div className="flex flex-wrap ml-10 justify-items-center">
              <select
                onChange={(e) => setVacation(e.target.value)}
                name="vacation"
                defaultValue={"0"}
                className="select w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2">
                <option value={"0"} className="text-gray-400">
                  Vacation
                </option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <select
                onChange={(e) => setLevel(e.target.value)}
                name="Niveau"
                defaultValue={"0"}
                className="select w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2">
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
                defaultValue={"0"}
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
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
            <h2 className="text-supportingColor1 text-xl font-medium">
              Adresse
            </h2>
            <p className="mb-10 text-primaryColor">
              Les champs avec un astérisque{" "}
              <span className="text-red-600">*</span> sont obligatoires
            </p>
            <div className="flex flex-wrap justify-items-center">
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Adresse <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setAdress(e.target.value)}
                  type="text"
                  placeholder="Adresse"
                  className="input w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Département <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setDepartment(e.target.value)}
                  type="text"
                  placeholder="Département"
                  className="input w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Commune <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setCommon(e.target.value)}
                  type="text"
                  placeholder="Commune"
                  className="input w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Ville / Quartier <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="Ville"
                  className="input w-full max-w-xs mr-5 bg-slate-100 border-primaryColor border-2"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded mt-20">
            <h2 className="text-color1 text-xl font-semibold">
              Informations Parents
            </h2>
            <p className="mb-10">
              Les champs avec un astérisque{" "}
              <span className="text-red-600">*</span> sont obligatoires
            </p>
            <div className="flex flex-wrap justify-items-center">
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Nom du Père <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setFirstFather(e.target.value)}
                  type="text"
                  placeholder="Nom du père"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Prénom du Père <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setLastFather(e.target.value)}
                  type="text"
                  placeholder="Prénom du père"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Profession <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setJobFather(e.target.value)}
                  type="text"
                  placeholder="Profession du père"
                  className="input w-[22rem] bg-gray-200"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>

              <div className="flex items-center font-semibold mb-10">
                <h2 className="mr-2">Statut du père:</h2>
                <h2 className="mr-2">Décédé</h2>
                <input
                  onChange={(e) => setStatutFather(e.target.value)}
                  type="radio"
                  name="3"
                  value={"Décédé"}
                  className="radio border-color2 border-2 w-5 h-5"
                />
                <h2 className="mx-2">Vivant</h2>
                <input
                  onChange={(e) => setStatutFather(e.target.value)}
                  type="radio"
                  name="3"
                  value={"Vivant"}
                  className="radio border-color2 border-2 w-5 h-5 mr-[50rem]"
                />
              </div>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Nom de la Mère <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setFirstMother(e.target.value)}
                  type="text"
                  placeholder="Nom de la mère"
                  className="input w-[22rem] bg-gray-200 mr-5 my-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Prénom de la Mère <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setLastMother(e.target.value)}
                  type="text"
                  placeholder="Prénom de la mère"
                  className="input w-[22rem] bg-gray-200 mr-5 my-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-2">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Profession <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setJobMother(e.target.value)}
                  type="text"
                  placeholder="Profession de la mère"
                  className="input w-[22rem] bg-gray-200 mr-5 my-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <div className="flex items-center font-semibold">
                <h2 className="mr-2">Statut de la mère:</h2>
                <h2 className="mr-2">Décédée</h2>
                <input
                  onChange={(e) => setStatutMother(e.target.value)}
                  type="radio"
                  name="4"
                  value={"Décédée"}
                  className="radio border-color2 border-2 w-5 h-5"
                />
                <h2 className="mx-2">Vivante</h2>
                <input
                  onChange={(e) => setStatutMother(e.target.value)}
                  type="radio"
                  name="4"
                  value={"Vivante"}
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
              Les champs avec un astérisque{" "}
              <span className="text-red-600">*</span> sont obligatoires
            </p>
            <div className="flex flex-wrap justify-items-center">
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Lien de parenté et/ou nom complet{" "}
                    <span className="text-red-600">*</span>
                  </span>
                </div>
                <input
                  onChange={(e) => setLinkPerson(e.target.value)}
                  type="text"
                  placeholder="Nom complet"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-supportingColor1">Nif </span>
                </div>
                <input
                  onChange={(e) => setNif(e.target.value)}
                  type="text"
                  placeholder="Nif"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-supportingColor1">Ninu</span>
                </div>
                <input
                  onChange={(e) => setNinu(e.target.value)}
                  type="text"
                  placeholder="Ninu"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Téléphone <span className="text-red-600">*</span>{" "}
                  </span>
                </div>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Téléphone"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Téléphone additionel
                  </span>
                </div>
                <input
                  onChange={(e) => setOtherPhone(e.target.value)}
                  type="text"
                  placeholder="Autre téléphone"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <label className="form-control w-full max-w-xs mr-5 mb-10">
                <div className="label">
                  <span className="label-text text-supportingColor1">
                    Email
                  </span>
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  className="input w-[22rem] bg-gray-200 mr-5 mb-10"
                />
                <div className="label">
                  <span className="label-text-alt"></span>
                </div>
              </label>
            </div>
          </div>
          <button
            className="btn ml-[70rem] mt-10 bg-color1 text-white hover:bg-color3 border-none w-56"
            type="submit">
            Soumettre le formulaire
          </button>
        </form>
        <Toaster position={"top-right"} />
      </div>
    </>
  );
}
