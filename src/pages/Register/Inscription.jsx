import { supabase } from "@/Config/SupabaseConfig.jsx";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
      <div className="relative w-full h-auto p-10">
        <NavLink
          className="text-3xl text-white absolute left-10 top-10"
          to={"/dashboard"}>
          <BiArrowBack id="back" />
        </NavLink>
        <h1 className="text-6xl text-white uppercase font-bold pl-[30%]">
          Page inscription
        </h1>
        {loading ? (
          ""
        ) : (
          <form
            onSubmit={handleAdd}
            className="bg-white rounded w-full h-auto mt-20 p-4">
            <div className="bg-gray-50 p-5 rounded mt-2">
              <h2 className="text-color1 text-xl font-semibold">
                Informations Personnelles
              </h2>
              <p className="mb-10">
                Les champs avec un astérisque{" "}
                <span className="text-red-600">*</span> sont obligatoires
              </p>
              <div className="flex flex-wrap justify-items-center ml-10">
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Nom <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="ex: Méat"
                    className="input w-[22rem] bg-gray-200"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Prénom <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="ex: Wood"
                    className="input w-[22rem] bg-gray-200 "
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Date de naissance <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <DatePicker
                    onChange={(e) => setBirth(e.target.value)}
                    className="input w-[22rem] bg-gray-200"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Département de naissance{" "}
                      <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setDepartmentBirth(e.target.value)}
                    type="text"
                    placeholder="Département de naissance"
                    className="input w-[22rem] bg-gray-200"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Commune de naissance{" "}
                      <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setCommonBirth(e.target.value)}
                    type="text"
                    placeholder="Commune de naissance"
                    className="input w-[22rem] bg-gray-200"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Lieu de naissance <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setAdressBirth(e.target.value)}
                    type="text"
                    placeholder="Lieu de naissance"
                    className="input w-[22rem] bg-gray-200"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>

                <div className="flex items-center font-semibold mt-10">
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
                    value={"Garçon"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                  <label htmlFor={"Fille"} className="mx-2">
                    Fille
                  </label>
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="gender"
                    value={"Fille"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                </div>

                <div className="flex items-center font-semibold mt-10">
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
                    value={"Oui"}
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
                    value={"Non"}
                    className="radio border-color2 border-2 w-5 h-5"
                  />
                </div>
                <select
                  onChange={(e) => setWtHandicap(e.target.value)}
                  name="wthandicap"
                  defaultValue={"0"}
                  disabled={!isHandicapEnabled}
                  className="select w-[22rem] bg-gray-200 ml-24 mt-10">
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
                Les champs avec un astérisque{" "}
                <span className="text-red-600">*</span> sont obligatoires
              </p>
              <div className="flex flex-wrap justify-items-center">
                <select
                  onChange={(e) => setVacation(e.target.value)}
                  name="vacation"
                  defaultValue={"0"}
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
                  defaultValue={"0"}
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
                  defaultValue={"0"}
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
                Les champs avec un astérisque{" "}
                <span className="text-red-600">*</span> sont obligatoires
              </p>
              <div className="flex flex-wrap justify-items-center">
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Adresse <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setAdress(e.target.value)}
                    type="text"
                    placeholder="Adresse"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Département <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setDepartment(e.target.value)}
                    type="text"
                    placeholder="Département"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Commune <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setCommon(e.target.value)}
                    type="text"
                    placeholder="Commune"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Ville / Quartier <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="Ville"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
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
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Nom du Père <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setFirstFather(e.target.value)}
                    type="text"
                    placeholder="Nom du père"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Prénom du Père <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setLastFather(e.target.value)}
                    type="text"
                    placeholder="Prénom du père"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
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
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Nom de la Mère <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setFirstMother(e.target.value)}
                    type="text"
                    placeholder="Nom de la mère"
                    className="input w-[22rem] bg-gray-200 mr-20 my-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Prénom de la Mère <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setLastMother(e.target.value)}
                    type="text"
                    placeholder="Prénom de la mère"
                    className="input w-[22rem] bg-gray-200 mr-20 my-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-2">
                  <div className="label">
                    <span className="label-text text-black">
                      Profession <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setJobMother(e.target.value)}
                    type="text"
                    placeholder="Profession de la mère"
                    className="input w-[22rem] bg-gray-200 mr-20 my-10"
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
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Lien de parenté et/ou nom complet{" "}
                      <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setLinkPerson(e.target.value)}
                    type="text"
                    placeholder="Nom complet"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">Nif </span>
                  </div>
                  <input
                    onChange={(e) => setNif(e.target.value)}
                    type="text"
                    placeholder="Nif"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">Ninu</span>
                  </div>
                  <input
                    onChange={(e) => setNinu(e.target.value)}
                    type="text"
                    placeholder="Ninu"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Téléphone <span className="text-red-600">*</span>{" "}
                    </span>
                  </div>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Téléphone"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">
                      Téléphone additionel
                    </span>
                  </div>
                  <input
                    onChange={(e) => setOtherPhone(e.target.value)}
                    type="text"
                    placeholder="Autre téléphone"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
                  />
                  <div className="label">
                    <span className="label-text-alt"></span>
                  </div>
                </label>
                <label className="form-control w-full max-w-xs mr-20 mb-10">
                  <div className="label">
                    <span className="label-text text-black">Email</span>
                  </div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="input w-[22rem] bg-gray-200 mr-20 mb-10"
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
        )}
        <Toaster position={"top-right"} />
      </div>
    </>
  );
}
