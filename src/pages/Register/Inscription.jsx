import {useState} from "react";
import {BiArrowBack} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import {NavBar} from "../../components/Navbar/NavBar";
import "./Inscription.scss";
import StudentInfoForm from "./StudentInfoForm";

export function Inscription() {
	const [studentName, setStudentName] = useState("");
	const [studentLastname, setStudentLastname] = useState("");
	const [studentBirth, setStudentBirth] = useState("");
	const [studentDepartment, setStudentDepartment] = useState("");
	const [studentCommon, setStudentCommon] = useState("");
	const [studentAdress, setStudentAdress] = useState("");
	const [studentHandicap, setStudentHandicap] = useState("");
	const [studentGender, setStudentGender] = useState("");
	
	const handleNameChange = (name, lastName, birth, department, common, address, handicap, gender) => {
		setStudentName(name);
		setStudentLastname(lastName);
		setStudentBirth(birth);
		setStudentDepartment(department);
		setStudentCommon(common);
		setStudentAdress(address);
		setStudentHandicap(handicap);
		setStudentGender(gender);
	};
	
	return (
			<>
				<NavBar/>
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
							<BiArrowBack id="back"/>
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
					<h1>{studentLastname}</h1>
					<h1>{studentBirth}</h1>
					<h1>{studentDepartment}</h1>
					<h1>{studentCommon}</h1>
					<h1>{studentAdress}</h1>
					<h1>{studentGender}</h1>
					<h1>{studentHandicap}</h1>
					<StudentInfoForm onInfoChange={handleNameChange}/>
				</div>
				
				<div className="text-center">
					<button
							className="btn bg-primaryColor text-white border-none
            hover:bg-slate-100 hover:text-primaryColor active:bg-slate-100">
						Soumettre le formulaire
					</button>
				</div>
			</>
	);
}

export default Inscription;
