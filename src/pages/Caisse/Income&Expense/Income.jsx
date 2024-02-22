import {supabase} from "@/Config/SupabaseConfig.jsx";
import {NavBar} from "@/components/Navbar/NavBar.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {Empty} from "antd";

export function Income() {
	const [incomes, setIncomes] = useState([]);
	const [searchIncome, setSearchIncome] = useState("");
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [mode, setMode] = useState("");
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState();
	
	useEffect(() => {
		const fetchIncome = async () => {
			try {
				const {data} = await supabase
					.from("income")
					.select("*")
					.textSearch(searchIncome);
				
				if (data) {
					setIncomes(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		
		return () => fetchIncome();
	}, [searchIncome]);
	
	const handleAddIncome = async (e) => {
		e.preventDefault();
		
		try {
			const {error} = await supabase.from("income").insert({
				name,
				type,
				mode,
				date,
				amount,
			});
			
			if (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error.message);
		}
		
		e.target.reset(
			setName(""),
			setType(""),
			setMode(""),
			setDate(""),
			setAmount(""),
		);
	};
	
	const handleDeleteIncome = async (incomeId) => {
		try {
			const {error} = await supabase
				.from("income")
				.delete()
				.eq("id", incomeId);
			
			if (error) {
				console.error(error);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	
	useEffect(() => {
		const incomeChannel = supabase
			.channel("custom-all-channel")
			.on(
				"postgres_changes",
				{event: "*", schema: "public", table: "income"},
				(payload) => {
					const eventType = payload.eventType;
					const changedData = payload.new;
					
					switch (eventType) {
						case "INSERT":
							setIncomes((prevIncomes) => [...prevIncomes, changedData]);
							break;
						case "UPDATE":
							setIncomes((prevIncomes) => {
								// Mise à jour de l'élément correspondant dans la liste
								return prevIncomes.map((income) =>
									income.id === changedData.id ? changedData : income,
								);
							});
							break;
						case "DELETE":
							setIncomes((prevIncomes) =>
								prevIncomes.filter((income) => income.id !== payload.old.id),
							);
							break;
					}
				},
			)
			.subscribe();
		
		return () => incomeChannel.unsubscribe();
	}, []);
	
	
	return (
		<>
			<NavBar/>
			<div className="h-[60rem]">
				<div className="absolute top-10 left-[16%] max-w-full h-[56rem] ">
					<div className="bg-white h-[21rem] w-[72rem] rounded-2xl p-5">
						<h1 className="font-semibold uppercase text-2xl text-color1">
							Revenu
						</h1>
						<h2 className="mb-10">Ajouter un nouveau revenu</h2>
						<form onSubmit={handleAddIncome}>
							<div className="flex flex-wrap">
								<label className="form-control w-full max-w-xs mr-10">
									<div className="label">
										<span className="label-text text-black">Nom</span>
									</div>
									<input
										onChange={(e) => setName(e.target.value)}
										type="text"
										placeholder="ex: James..."
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
									/>
								</label>
								<label className="form-control w-full max-w-xs mr-10">
									<div className="label">
                      <span className="label-text text-black">
                        Type de dépense
                      </span>
									</div>
									<select
										onChange={(e) => setType(e.target.value)}
										defaultValue=""
										className="select select-bordered focus:select-primary bg-gray-200">
										<option value="" className="text-gray-300">
											Type
										</option>
										<option value="Frais Scolaire">Frais Scolaire</option>
										<option value="Donnation">Donnation</option>
										<option value="Autres">Autres</option>
									</select>
								</label>
								<label className="form-control w-full max-w-xs mr-10 mb-5">
									<div className="label">
                      <span className="label-text text-black">
                        Mode de Paiement
                      </span>
									</div>
									<select
										onChange={(e) => setMode(e.target.value)}
										defaultValue=""
										className="select select-bordered focus:select-primary bg-gray-200">
										<option value="" className="text-gray-300">
											Mode de paiement
										</option>
										<option value="Cash">Cash</option>
										<option value="Chèque">Chèque</option>
										<option value="Bank">Bank</option>
									</select>
								</label>
								<label className="form-control w-full max-w-xs mr-10 mb-5">
									<div className="label">
										<span className="label-text text-black">Date</span>
									</div>
									<input
										onChange={(e) => setDate(e.target.value)}
										type="date"
										placeholder="ex: James..."
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
									/>
								</label>
								<label className="form-control w-full max-w-xs mr-10 ">
									<div className="label">
										<span className="label-text text-black">Montant</span>
									</div>
									<input
										onChange={(e) => setAmount(e.target.value)}
										type="number"
										placeholder="ex: 1000"
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
									/>
								</label>
								<button
									type="submit"
									className="btn bg-color1 text-white hover:bg-color3 border-none w-28 mt-9 ml-52">
									Ajouter
								</button>
							</div>
						</form>
					</div>
					<div className="mt-10 bg-white overflow-y-auto h-2/4 w-[72rem] rounded-2xl p-5">
						<div className="flex mb-10 items-center">
							<h2 className="text-color1 capitalize font-semibold">
								Liste de revenus
							</h2>
							<input
								onChange={(e) => setSearchIncome(e.target.value)}
								type="search"
								placeholder="Recherche rapide"
								className="input input-bordered focus:file-input-primary bg-gray-200 h-9 w-96 max-w-xs ml-60"
							/>
						</div>
						{/**/}
						<div>
							<div className="overflow-x-auto">
								{incomes.length > 0 ? (
									<table className="table">
										<thead className="text-black">
										<tr>
											<th>ID</th>
											<th>Nom</th>
											<th>Type de dépense</th>
											<th>Mode de Paiement</th>
											<th>Date</th>
											<th>Montant</th>
											<th>Actions</th>
										</tr>
										</thead>
										{incomes
											.filter((expense) =>
												expense.name
													.toLowerCase()
													.includes(searchIncome.toLowerCase()),
											)
											.map((expense) => (
												<tbody key={expense.id}>
												<tr>
													<th>0{expense.id}</th>
													<td>{expense.name}</td>
													<td>
														{expense.type}
														{expense.what}
													</td>
													<td>{expense.mode}</td>
													<td>{expense.date}</td>
													<td>{expense.amount}</td>
													<td>
														<button
															onClick={() => handleDeleteIncome(expense.id)}
															className="btn bg-red-600 text-white btn-xs">
															Delete
														</button>
													</td>
												</tr>
												</tbody>
											))}
									</table>
								) : (
									<Empty description={"Aucune donnée disponible"}/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
