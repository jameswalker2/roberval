import { Modal } from "antd";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { supabase } from "../../Config/SupabaseConfig";
import { NavBar } from "../../components/Navbar/NavBar";
import OtherInfoForm from "./OtherInfoForm";
import ParentInfoForm from "./ParentInfoForm";
import SchoolInfoForm from "./SchoolInfoForm";
import StudentAddressForm from "./StudentAddressForm";
import StudentInfoForm from "./StudentInfoForm";

export function Inscription() {
  const [studentName, setStudentName] = useState("");
  const [studentLastname, setStudentLastname] = useState("");
  const [studentBirth, setStudentBirth] = useState("");
  const [studentDepartmentBirth, setStudentDepartmentBirth] = useState("");
  const [studentCommonBirth, setStudentCommonBirth] = useState("");
  const [studentAddressBirth, setStudentAddressBirth] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentHandicap, setStudentHandicap] = useState("");
  const [studentWtHandicap, setStudentWtHandicap] = useState("");
  const [studentAddress, SetStudentAddress] = useState("");
  const [studentDepartment, SetStudentDepartment] = useState("");
  const [studentCommon, SetStudentCommon] = useState("");
  const [studentCity, SetStudentCity] = useState("");
  const [studentMotherName, SetStudentmotherName] = useState("");
  const [studentMotherLastName, SetStudentMotherLastName] = useState("");
  const [studentMotherJob, SetStudentMotherJob] = useState("");
  const [studentDMother, SetStudentDMother] = useState("");
  const [studentFatherName, SetStudentFatherName] = useState("");
  const [studentFatherLastName, SetStudentFatherLastName] = useState("");
  const [studentFatherJob, SetStudentFatherJob] = useState("");
  const [studentDFather, SetStudentDFather] = useState("");
  const [studentVacation, SetStudentVacation] = useState("");
  const [studentLevel, SetStudentLevel] = useState("");
  const [studentClasse, SetStudentClasse] = useState("");
  const [studentPersonLink, SetStudentPersonLink] = useState("");
  const [studentNif, SetStudentNif] = useState("");
  const [studentNinu, SetStudentNinu] = useState("");
  const [studentEmail, SetStudentEmail] = useState("");
  const [studentPhone, SetStudentPhone] = useState("");
  const [studentOtherPhone, SetStudentOtherPhone] = useState("");

  const handleStudentInfo = (
    name,
    lastName,
    birth,
    departmentBirth,
    commonBirth,
    addressBirth,
    gender,
    handicap,
    wtHandicap,
  ) => {
    setStudentName(name);
    setStudentLastname(lastName);
    setStudentBirth(birth);
    setStudentDepartmentBirth(departmentBirth);
    setStudentCommonBirth(commonBirth);
    setStudentAddressBirth(addressBirth);
    setStudentGender(gender);
    setStudentHandicap(handicap);
    setStudentWtHandicap(wtHandicap);
  };

  const handleStudentAddress = (address, department, common, city) => {
    SetStudentAddress(address);
    SetStudentDepartment(department);
    SetStudentCommon(common);
    SetStudentCity(city);
  };

  const handleStudentParent = (
    motherName,
    motherLastName,
    motherJob,
    dMother,
    fatherName,
    fatherLastName,
    fatherJob,
    dFather,
  ) => {
    SetStudentmotherName(motherName);
    SetStudentMotherLastName(motherLastName);
    SetStudentMotherJob(motherJob);
    SetStudentDMother(dMother);
    SetStudentFatherName(fatherName);
    SetStudentFatherLastName(fatherLastName);
    SetStudentFatherJob(fatherJob);
    SetStudentDFather(dFather);
  };

  const handleStudentSchool = (vacation, level, classe) => {
    SetStudentVacation(vacation);
    SetStudentLevel(level);
    SetStudentClasse(classe);
  };

  const handleStudentPerson = (
    personLink,
    nif,
    ninu,
    email,
    phone,
    otherPhone,
  ) => {
    SetStudentPersonLink(personLink);
    SetStudentNif(nif);
    SetStudentNinu(ninu);
    SetStudentEmail(email);
    SetStudentPhone(phone);
    SetStudentOtherPhone(otherPhone);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("students").insert({
        firstName: studentName,
        lastName: studentLastname,
        classe: studentClasse,
        vacation: studentVacation,
        level: studentLevel,
        //
        gender: studentGender,
        departmentBirth: studentDepartmentBirth,
        commonBirth: studentCommonBirth,
        addressBirth: studentAddressBirth,
        handicap: studentHandicap,
        wtHandicap: studentWtHandicap,
        address: studentAddress,
        department: studentDepartment,
        common: studentCommon,
        city: studentCity,
        firstMother: studentMotherName,
        lastMother: studentMotherLastName,
        jobMother: studentMotherJob,
        statutMother: studentDMother,
        firstFather: studentFatherName,
        lastFather: studentFatherLastName,
        jobFather: studentFatherJob,
        statutFather: studentDFather,
        linkPerson: studentPersonLink,
        nif: studentNif,
        ninu: studentNinu,
        email: studentEmail,
        phone: studentPhone,
        otherPhone: studentOtherPhone,
      });

      if (error) {
        throw error;
      } else {
        Modal.success({
          content: "Formulaire soumis avec succès!",
          okButtonProps: {
            type: "default",
          },
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <h1>{studentName}</h1>

        <StudentInfoForm onInfoChange={handleStudentInfo} />
        <StudentAddressForm onAddressInfoChange={handleStudentAddress} />
        <ParentInfoForm onParentInfoChange={handleStudentParent} />
        <SchoolInfoForm onSchoolInfoChange={handleStudentSchool} />
        <OtherInfoForm onOtherInfoChange={handleStudentPerson} />
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="btn bg-primaryColor text-white border-none
            hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
            Soumettre le formulaire
          </button>
        </div>
      </div>
    </>
  );
}

export default Inscription;
