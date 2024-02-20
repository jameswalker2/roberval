import {Avatar, Modal} from "antd";
import {User, CircleUser} from "lucide-react";
import moment from "moment";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function DetailsPage({show, close, selectedStaff, deleteID}) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [role, setRole] = useState("");
	const [id, setID] = useState("");
	const [created_at, setCreated_at] = useState("");
	const [balance, setBalance] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");
	const [mode, setMode] = useState("");
	
	useEffect(() => {
		if (selectedStaff) {
			// eslint-disable-next-line react/prop-types
			setFirstName(selectedStaff.name);
			// eslint-disable-next-line react/prop-types
			setLastName(selectedStaff.lastName);
			// eslint-disable-next-line react/prop-types
			setRole(selectedStaff.role);
			// eslint-disable-next-line react/prop-types
			setID(selectedStaff.id);
			// eslint-disable-next-line react/prop-types
			setCreated_at(selectedStaff.created_at);
			// eslint-disable-next-line react/prop-types
			setBalance(selectedStaff.balance);
			// eslint-disable-next-line react/prop-types
			setAmount(selectedStaff.amount);
			// eslint-disable-next-line react/prop-types
			setDate(selectedStaff.date);
			// eslint-disable-next-line react/prop-types
			setMode(selectedStaff.mode);
		}
	}, [selectedStaff]);
	
	const generateBackgroundColor = () => {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		return `#${randomColor}`;
	};
	
	
	return (
		<>
			<Modal
				open={show}
				width={1000}
				onCancel={close}
				footer={null}>
				
				<div className={"mb-10"}>
					<h2 className={"font-medium text-xl"}>Procéder au paiement</h2>
				</div>
				
				<div
					className="overflow-x-auto mt-10 rounded-lg border-4 border-primaryColor border-opacity-10 shadow-sm">
					<table className="table table-xs ">
						<thead className="text-supportingColor1 text-sm bg-primaryColor bg-opacity-10">
						<tr>
							<th className={"flex items-center"}>
								Nom Complet
							</th>
							<th>Date de création</th>
							<th>Balance</th>
							<th>Valeur Avancée</th>
							<th>Date de payroll</th>
							<th>Type de paiment</th>
						</tr>
						</thead>
						<tbody className="font-semibold bg-white">
						<tr>
							<td className={"flex items-center"}>
								<Avatar
									style={{
										backgroundColor: generateBackgroundColor(),
										verticalAlign: "middle",
										marginRight: 5
									}}>
									{firstName.charAt(0).toUpperCase()}
								</Avatar>
								{firstName} {lastName}</td>
							<td>{moment(created_at).format("DD/MM/YYYY")}</td>
							<td>$ {balance}</td>
							<td>$ {amount}</td>
							<td>{date}</td>
							<td>{mode}</td>
						</tr>
						</tbody>
					</table>
				</div>
				
				<div className="flex justify-end items-center mt-10">
					<NavLink to={"/update-pay/" + id}>
						<button className={"btn border-none bg-primaryColor text-white hover:bg-opacity-90"}>
							Ajouter Payroll
						</button>
					</NavLink>
					<button
						onClick={() => {
							deleteID(id)
							close;
						}}
						className="btn bg-supportingColor3 border-none ml-10 text-white hover:bg-opacity-95">
						Delete
					</button>
				</div>
			</Modal>
		</>
	);
}

export default DetailsPage;
