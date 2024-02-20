import moment from "moment";
import {useEffect, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import {NavLink} from "react-router-dom";
import {supabase} from "@/Config/SupabaseConfig.jsx";
import {NavBar} from "@/components/Navbar/NavBar.jsx";
import DetailsPage from "./DetailsPage.jsx";
import "./Payroll.scss";
import {FilePlus2} from "lucide-react";
import {Empty} from "antd";

// import { FiMoreHorizontal } from "react-icons/fi";

export function Payroll() {
	const [selectedRole, setSelectedRole] = useState(false);
	const [staffs, setStaffs] = useState([]);
	const [role, setRole] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedStaff, setSelectStaffs] = useState(null);
	const [isModalShow, setIsModalShow] = useState(false);
	
	const openIsModalShow = () => {
		setIsModalShow(true);
	};
	
	const closeIsModalShow = () => {
		setIsModalShow(false);
	};
	
	useEffect(() => {
		const getStudents = async () => {
			try {
				const {data, error} = await supabase
					.from("pay")
					.select("*")
					.textSearch(search);
				
				if (data) {
					setStaffs(data);
					setRole([...new Set(data.map((staff) => staff.role))]);
				} else {
					console.log(error.message);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getStudents();
	}, [search]);
	
	const collectionRole = role.map((category) => ({
		value: category,
		label: category,
	}));
	
	const filterStaffs = selectedRole
		? staffs.filter((staff) => staff.role === selectedRole)
		: staffs;
	
	const handleDelete = async (payId) => {
		try {
			const {error} = await supabase
				.from("pay")
				.delete()
				.eq("id", payId)
				.single();
			
			if (error) {
				console.log(error.message);
				toast.error("Vous n'êtes pas autorisé à effectuer cette opération");
			} else {
				console.log("Ok");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	
	useEffect(() => {
		const expenseChannel = supabase
			.channel("custom-all-channel")
			.on(
				"postgres_changes",
				{event: "*", schema: "public", table: "pay"},
				(payload) => {
					const eventType = payload.eventType;
					const changedData = payload.new;
					
					switch (eventType) {
						case "INSERT":
							setStaffs((prevPay) => [...prevPay, changedData]);
							break;
						case "UPDATE":
							setStaffs((prevPay) => {
								return prevPay.map((pay) =>
									pay.id === changedData.id ? changedData : pay,
								);
							});
							break;
						case "DELETE":
							setStaffs((prevPay) =>
								prevPay.filter((pay) => pay.id !== payload.old.id),
							);
							break;
					}
				},
			)
			.subscribe();
		
		return () => expenseChannel.unsubscribe();
	}, []);
	
	return (
		<>
			<NavBar/>
			<Toaster position="top-right"/>
			<div className="h-screen overflow-scroll pl-64 py-5 bg-primaryColor bg-opacity-10">
				<div
					className="text-sm breadcrumbs flex items-center justify-between w-[95%] h-16 p-4 text-supportingColor1 bg-white rounded-lg shadow-sm">
					<h1 className="font-semibold text-2xl">Payroll</h1>
					<ul>
						<li>
							<NavLink className="text-supportingColor1" to={"/dashboard"}>
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink className="text-supportingColor1" to={"/staffs"}>
								Staffs
							</NavLink>
						</li>
						<li>
							<NavLink className="text-supportingColor1" to={"/payroll"}>
								Payroll
							</NavLink>
						</li>
					</ul>
				</div>
				
				<div className="w-[95%] p-4 rounded-lg bg-white mt-10 shadow-sm">
					<div className={"flex justify-between mb-5"}>
						<h2 className="font-medium text-supportingColor1 mb-5">
							Selectionner les critères
						</h2>
						<NavLink
							className="btn border-none bg-primaryColor text-white hover:bg-color3"
							to={"/addpay"}>
							<FilePlus2/>
							Générer nouveau payroll
						</NavLink>
					</div>
					
					<div className={"flex justify-around"}>
						<select
							value={selectedRole}
							onChange={(e) => setSelectedRole(e.target.value)}
							className="select select-bordered bg-primaryColor text-white w-full max-w-xs focus:select-primary">
							<option value="" className="text-gray-300">
								Recherche par role
							</option>
							{collectionRole.map((option) => (
								<option
									className="text-black"
									key={option.value}
									value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<input
							onChange={(e) => setSearch(e.target.value)}
							type="search"
							className="input input-bordered w-96 border-primaryColor border-2 rounded-full bg-white
              focus:file-input-primaryColor"
							placeholder="Rechercher avec le nom..."
						/>
					</div>
				</div>
				
				<div className="overflow-y-hidden overflow-x-auto w-[95%] h-auto mt-10 rounded-lg bg-white p-4 shadow-sm">
					{filterStaffs.length > 0 ? (
						<table className="table">
							<thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10" key="thead">
							<tr>
								<th>ID</th>
								<th>Nom Complet</th>
								<th>Role</th>
								<th>Téléphone</th>
								<th>Date de création</th>
								<th>Valeur Avancée</th>
								<th>Balance</th>
								{/*<th>Date</th>*/}
								<th>Statut</th>
								<th>Action</th>
							</tr>
							</thead>
							{filterStaffs
								.filter(
									(resultL) =>
										resultL.name
											.toLowerCase()
											.includes(search.toLowerCase()) ||
										resultL.lastName
											.toLowerCase()
											.includes(search.toLowerCase()),
								)
								.map((staff) => (
									<tbody key={staff.id} className="">
									<tr>
										<td>0{staff.id}</td>
										<td>
											{staff.name} {staff.lastName}
										</td>
										<td>{staff.role}</td>
										<td>{staff.phone}</td>
										<td>{moment(staff.created_at).format("DD/MM/YYYY")}</td>
										<td>$ {staff.amount}</td>
										<td>$ {staff.balance}</td>
										{/*<td>{staff.date}</td>*/}
										<td
											id="non"
											className={"btn btn-ghost text-white font-medium"}
											style={{
												backgroundColor:
													staff.statut === "Non Payé"
														? "#FD6477"
														: staff.statut === "Avance"
															? "#FFBF5A"
															: "#5AD374",
											}}>
											{staff.statut}
										</td>
										<td>
											<span>
                            <button
															onClick={() => {
																if (staff) {
																	setSelectStaffs(staff);
																	openIsModalShow();
																} else {
																	toast.error("Erreur !");
																}
															}}
															className="btn btn-xs text-xs h-10 w-20 border-none bg-primaryColor hover:bg-opacity-90
															text-white">
                              Détails
                            </button>
                          </span>
										</td>
									</tr>
									</tbody>
								))}
						</table>
					) : (
						<Empty/>
					)}
				</div>
				<DetailsPage
					selectedStaff={selectedStaff}
					show={isModalShow}
					close={closeIsModalShow}
					deleteID={handleDelete}
				/>
			</div>
		</>
	);
}
