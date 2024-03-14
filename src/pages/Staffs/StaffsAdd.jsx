import {DatePicker, Modal} from "antd";
import {useState} from "react";
import * as Yup from "yup";
import {supabase} from "../../Config/SupabaseConfig";


// eslint-disable-next-line react/prop-types
function StaffsAdd({visible, onClose}) {
	// Déclarer les états (hooks)
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birth, setBirth] = useState("");
	const [adress, setAdress] = useState("");
	const [nif, setNif] = useState("");
	const [ninu, setNinu] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	
	// Faire la validation du formulaire update
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Le nom est requis"),
		lastName: Yup.string().required("Le prénom est requis"),
		role: Yup.string().required("Le rôle est requis"),
		phone: Yup.number().required("Le téléphone est requis"),
		email: Yup.string()
		.email("Format d'email invalide")
		.required("L'email est requis"),
	});
	
	// Fonction pour update les données
	const handleAddStaff = async (e) => {
		e.preventDefault();
		
		try {
			await validationSchema.validate(
					{name, lastName, role, phone, email},
					{abortEarly: false},
			);
			
			const addObject = {};
			if (name) addObject.name = name;
			if (lastName) addObject.lastName = lastName;
			if (birth) addObject.birth = birth;
			if (adress) addObject.adress = adress;
			if (nif) addObject.nif = nif;
			if (ninu) addObject.ninu = ninu;
			if (phone) addObject.phone = phone;
			if (role) addObject.role = role;
			if (email) addObject.email = email;
			
			const {error} = await supabase
			.from("staffs")
			.insert(addObject)
			.single();
			
			if (error) {
				Modal.error({
					title: "Erreur !",
					content: "Vous n'êtes pas autorisé pour cette opération !",
					okButtonProps: {
						type: "default",
					},
				});
				throw error;
			} else {
				Modal.success({
					title: "Succès !",
					content: "Formulaire ajouter avec succès !",
					okButtonProps: {
						type: "default",
					},
				});
				onClose();
				resetStates();
			}
		} catch (error) {
			if (error.name === "ValidationError") {
				error.errors.forEach((validationError) => {
					Modal.error({
						title: "Erreur !",
						content: validationError,
						okButtonProps: {
							type: "default",
						},
					});
				});
			}
		}
	};
	
	const resetStates = () => {
		console.log('resetStates')
		setName("");
		setLastName("");
		setBirth("");
		setAdress("");
		setNif("");
		setNinu("");
		setPhone("");
		setRole("");
		setEmail("");
	};
	
	
	// Le rendu
	return (
			<>
				<Modal
						title={"Ajouter un nouveau membre"}
						centered
						open={visible}
						onCancel={() => {
							onClose();
							resetStates();
						}}
						footer={[
							<button
									key={"submit"}
									onClick={handleAddStaff}
									className="btn font-normal bg-primaryColor border-none text-white hover:text-primaryColor hover:bg-slate-100">
								Soumettre
							</button>,
						]}
						width={1100}>
					<p className="text-primaryColor">
						Les champs avec un astérisque <span className="text-red-600">*</span>{" "}
						sont obligatoires
					</p>
					<div className="modal-action">
						{/* if there is a button in form, it will close the modal */}
						<div className="flex flex-wrap items-center">
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre nom
                    <span className="text-red-600">*</span>{" "}
                  </span>
								</div>
								<input
										type="text"
										placeholder="Écrivez ici..."
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
								/>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre prénom <span className="text-red-600">*</span>{" "}
                  </span>
								</div>
								<input
										type="text"
										placeholder="Écrivez ici..."
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
								/>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre date de naissance{" "}
	                  <span className="text-red-600">*</span>{" "}
                  </span>
								</div>
								<DatePicker
										onChange={(dateString) => setBirth(dateString)}
										value={birth}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-96 max-w-xs "
								/>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre adresse{" "}
                  </span>
								</div>
								<input
										type="text"
										placeholder="Écrivez ici..."
										value={adress}
										onChange={(e) => setAdress(e.target.value)}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs"
								/>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre nif{" "}
                  </span>
								</div>
								<input
										type="text"
										placeholder="Écrivez ici..."
										value={nif}
										onChange={(e) => setNif(e.target.value)}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
								/>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre ninu{" "}
                  </span>
								</div>
								<input
										type="text"
										placeholder="Écrivez ici..."
										value={ninu}
										onChange={(e) => setNinu(e.target.value)}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
								/>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre numéro Whatsapp{" "}
	                  <span className="text-red-600">*</span>{" "}
                  </span>
								</div>
								<input
										type="text"
										placeholder="Écrivez ici..."
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
								/>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Quel est ton rôle ? <span className="text-red-600">*</span>{" "}
                  </span>
								</div>
								<select
										value={role}
										onChange={(e) => setRole(e.target.value)}
										name="role"
										className="select focus:select-primary bg-gray-200 w-full max-w-xs">
									<option value="" className="text-gray-300">
										Fonction
									</option>
									<option value="Professeur Prescolaire">
										Professeur Prescolaire
									</option>
									<option value="Professeur Fondamentale">
										Professeur Fondamentale
									</option>
									<option value="Professeur Secondaire">
										Professeur Secondaire
									</option>
									<option value="Staff Direction">Staff Direction</option>
								</select>
							</label>
							<label className="form-control w-full max-w-xs mr-5 mb-10">
								<div className="label">
                  <span className="label-text text-black">
                    Entrez votre email <span className="text-red-600">*</span>
                  </span>
								</div>
								<input
										type="email"
										placeholder="Écrivez ici..."
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="input input-bordered focus:file-input-primary bg-gray-200 w-full max-w-xs "
								/>
							</label>
						</div>
					</div>
				</Modal>
			</>
	);
}

export default StaffsAdd;
