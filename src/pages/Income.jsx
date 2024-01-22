import {NavBar} from "@/components/Navbar/NavBar.jsx";
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react";
import {supabase} from "@/Config/SupabaseConfig.jsx";
import {toast, Toaster} from "react-hot-toast";


export function Income() {
	const [loading, setLoading] = useState(true)
	const [incomes, setIncomes] = useState([]);
	const [searchIncome, setSearchIncome] = useState("");
	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [mode, setMode] = useState("")
	const [date, setDate] = useState("")
	const [amount, setAmount] = useState()

	useEffect(() => {
		const fetchIncome = async () => {
			try {
				const { data } = await supabase
					.from("income")
					.select("*")
					.textSearch(searchIncome)

				if(data) {
					setIncomes(data);
				}
			} catch (error) {
				console.log(error)
			}
		}

		return () => fetchIncome();
	}, [searchIncome])

	const handleAddIncome = async (e) => {
		e.preventDefault()

		try {

			const { error } = await supabase
				.from("income")
				.insert({
					name,
					type,
					mode,
					date,
					amount
				})

			if (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error.message)
		}

		e.target.reset(
			setName(""),
			setType(""),
			setMode(""),
			setDate(""),
			setAmount(""),
		)
	}

	const handleDeleteIncome = async (incomeId) => {

		try {
			const { error } = await supabase
				.from('income')
				.delete()
				.eq('id', incomeId);

			if (error) {
				console.error(error);
			}
		} catch (error) {
			toast.error(error.message);
		}
	}


	useEffect(() => {
		const incomeChannel = supabase
			.channel('custom-all-channel')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'income' },
				(payload) => {
					const eventType = payload.eventType;
					const changedData = payload.new;

					switch (eventType) {
						case "INSERT":
							setIncomes((prevIncomes) => [... prevIncomes, changedData])
							break;
						case "UPDATE":
							setIncomes((prevIncomes) => {
								// Mise à jour de l'élément correspondant dans la liste
								return prevIncomes.map((income) => income.id === changedData.id ? changedData : income)})
							break;
						case "DELETE":
							setIncomes((prevIncomes) =>
								prevIncomes.filter((income) => income.id !== payload.old.id ))
							break;

					}
				}
			)
			.subscribe();

		return () => incomeChannel.unsubscribe();
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	})
	
	return (
		<>
			<NavBar/>
			<div className="h-[60rem]">
			<div className="absolute top-10 left-[16%] max-w-full h-[56rem] ">
				{loading ? <Skeleton className="bg-white h-[21rem] w-[72rem] rounded-2xl p-5 mb-10"/> :
					<div className="bg-white h-[21rem] w-[72rem] rounded-2xl p-5">
						<h1 className="font-semibold uppercase text-2xl text-color1">Revenu</h1>
						<h2 className="mb-10">Ajouter un nouveau revenu</h2>
						<form onSubmit={handleAddIncome}>
						<div className="flex flex-wrap">
							<label className="form-control w-full max-w-xs mr-10">
								<div className="label">
									<span className="label-text text-black">Nom</span>
								</div>
								<input
									onChange={(e) => setName(e.target.value)}
									type="text" placeholder="ex: James..." className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs" />
							</label>
							<label className="form-control w-full max-w-xs mr-10">
								<div className="label">
									<span className="label-text text-black">Type de dépense</span>
								</div>
								<select
									onChange={(e) => setType(e.target.value)}
									defaultValue="" className="select select-bordered focus:select-primary bg-gray-200">
									<option value="" className="text-gray-300">Type</option>
									<option value="Frais Scolaire">Frais Scolaire</option>
									<option value="Donnation">Donnation</option>
									<option value="Autres">Autres</option>
								</select>
							</label>
							<label className="form-control w-full max-w-xs mr-10 mb-5">
								<div className="label">
									<span className="label-text text-black">Mode de Paiement</span>
								</div>
								<select
									onChange={(e) => setMode(e.target.value)}
									defaultValue="" className="select select-bordered focus:select-primary bg-gray-200">
									<option value="" className="text-gray-300">Mode de paiement</option>
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
									type="date" placeholder="ex: James..." className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs" />
							</label>
							<label className="form-control w-full max-w-xs mr-10 ">
								<div className="label">
									<span className="label-text text-black">Montant</span>
								</div>
								<input
									onChange={(e) => setAmount(e.target.value)}
									type="number" placeholder="ex: 1000" className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs" />
							</label>
							<button type="submit" className="btn bg-color1 text-white hover:bg-color3 border-none w-28 mt-9 ml-52">Ajouter</button>
						</div>
						</form>
					</div>
						}
				{loading ? <Skeleton className="bg-white h-2/4 w-[72rem] rounded-2xl p-5 mb-10"/> :
					<div className="mt-10 bg-white overflow-y-auto h-2/4 w-[72rem] rounded-2xl p-5">
						<div className="flex mb-10 items-center">
							<h2 className="text-color1 capitalize font-semibold">Liste de revenus</h2>
							<input
								onChange={(e) => setSearchIncome(e.target.value)}
								type="search" placeholder="Recherche rapide" className="input input-bordered focus:file-input-primary bg-gray-200 h-9 w-96 max-w-xs ml-60"/>
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
										{incomes.filter(
											(expense) =>
												expense.name
													.toLowerCase()
													.includes(searchIncome.toLowerCase())
										).map((expense) => (
											<tbody key={expense.id}>
											<tr>
												<th>0{expense.id}</th>
												<td>{expense.name}</td>
												<td>{expense.type}</td>
												<td>{expense.mode}</td>
												<td>{expense.date}</td>
												<td>{expense.amount}</td>
												<td><button
													onClick={() => handleDeleteIncome(expense.id)}
													className="btn bg-red-600 text-white btn-xs">Delete</button></td>
											</tr>
											</tbody>
										))}
									</table>
								) : (
									<p className="text-2xl flex justify-center mt-20">Aucune donnée trouvé</p>
								)}
						</div>
					</div>
				</div>}
				{/*<dialog id="my_modal_1" className={"modal"} >*/}
				{/*	<div className="modal-box bg-white w-11/12 max-w-6xl">*/}
				{/*		<h3 className="font-bold text-lg">Nouveau Membre</h3>*/}
				{/*		<p className="">Les informations en <span className="text-red-600">*</span> sont obligatoires</p>*/}
				{/*		<div className="modal-action">*/}
				{/*			<form method="dialog">*/}

				{/*				/!* if there is a button in form, it will close the modal *!/*/}
				{/*				<div className="flex flex-wrap items-center">*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre nom <span className="text-red-600">*</span> </span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="text"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							onChange={(e) => setName(e.target.value)}*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre Prénom <span className="text-red-600">*</span> </span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="text"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre date de naissance </span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="date"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre adresse <span className="text-red-600">*</span> </span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="text"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre Nif <span className="text-red-600">*</span> </span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="text"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre Ninu <span className="text-red-600">*</span> </span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="text"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre numéro Whatsapp <span className="text-red-600">*</span> </span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="text"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Quel est ton rôle ? <span className="text-red-600">*</span> </span>*/}
				{/*						</div>*/}
				{/*						<select*/}
				{/*							name="role" className="select focus:select-primary w-[22rem] bg-gray-200 w-full max-w-xs">*/}
				{/*							<option value="" className="text-gray-300">Fonction</option>*/}
				{/*							<option value="Professeur Prescolaire">Professeur Prescolaire</option>*/}
				{/*							<option value="Professeur Primaire">Professeur Primaire</option>*/}
				{/*							<option value="Professeur Secondaire">Professeur Secondaire</option>*/}
				{/*							<option value="Staff Direction">Staff Direction</option>*/}
				{/*						</select>*/}
				{/*					</label>*/}
				{/*					<label className="form-control w-full max-w-xs mr-5 mb-10">*/}
				{/*						<div className="label">*/}
				{/*							<span className="label-text text-black">Entrez votre email ?</span>*/}
				{/*						</div>*/}
				{/*						<input*/}
				{/*							type="email"*/}
				{/*							placeholder="Écrivez ici..."*/}
				{/*							// onChange={(e) => setEmail(e.target.value)}*/}
				{/*							className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs " />*/}
				{/*					</label>*/}
				{/*				</div>*/}
				{/*				<button type="submit"  className="btn bg-color1 hover:bg-color3 border-none text-white ml-[56rem]">Soumettre</button>*/}
				{/*			</form>*/}
				{/*			<button type={"button"}*/}
				{/*					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕*/}
				{/*			</button>*/}
				{/*		</div>*/}
				{/*		<Toaster position={"top-right"}/>*/}
				{/*	</div>*/}
				{/*</dialog>*/}
			</div>
			</div>
		</>
	)
}
