/* eslint-disable react/prop-types */
import {DatePicker} from "antd";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function StudentInfoForm({onSubmit}) {
	
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("Le nom est requis"),
		lastName: Yup.string().required("Le prénom est requis"),
		birth: Yup.date()
		.nullable()
		.required("La date de naissance est requise")
		.max(new Date(), "La date de naissance ne peut pas être dans le futur"),
		departement: Yup.string().required("Le département de naissance est requis"),
		common: Yup.string().required("Le commune de naissance est requis"),
		adress: Yup.string().required("Le lieu de naissance est requis"),
		gender: Yup.string().required("Le sexe est requis"),
	});
	
	return (
			<div>
				<div>
					<h2 className="text-xl font-medium text-supportingColor1">
						Informations Personnelles
					</h2>
					<p className="mb-10 font-normal text-primaryColor">
						Les champs avec un astérisque <span className="text-red-600">*</span>{" "}
						sont obligatoires
					</p>
				</div>
				
				<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							birth: null,
							department: '',
							common: '',
							gender: '',
						}}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
					<Form>
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
                    <label htmlFor="firstName">
                      Nom <span className="text-red-600">*</span>
                    </label>
                  </span>
									</div>
									<Field
											type="text"
											className="input bg-slate-100 border-primaryColor border-2"
											name="firstName"
											placeholder="Nom"
									/>
									<div className="label">
                  <span className="label-text-alt text-red-500 text-sm">
                    <ErrorMessage name="firstName" component="div"/>
                  </span>
									</div>
								</label>
								
								<label className="form-control w-full max-w-xs mr-5 mb-10">
									<div className="label">
                  <span className="label-text text-supportingColor1">
                    <label htmlFor="lastName">
                      Prénom <span className="text-red-600">*</span>
                    </label>
                  </span>
									</div>
									<Field
											type="text"
											className="input bg-slate-100 border-primaryColor border-2"
											name="lastName"
											placeholder="Nom"
									/>
									<div className="label">
                  <span className="label-text-alt text-red-500 text-sm">
                    <ErrorMessage name="lastName" component="div"/>
                  </span>
									</div>
								</label>
								
								<label className="form-control w-full max-w-xs mr-5 mb-10">
									<div className="label">
                  <span className="label-text text-supportingColor1">
                    <label htmlFor="birth">
                      Date de naissance <span className="text-red-600">*</span>
                    </label>
                  </span>
									</div>
									<Field name="birth" className="w-full">
										{({field, form}) => (
												<div>
													<DatePicker
															className="input w-full bg-slate-100 border-primaryColor border-2"
															{...field}
															placeholder="Date de naissance"
															format="DD/MM/YYYY"
															onChange={(date, dateString) =>
																	form.setFieldValue(field.name, dateString)
															}
													/>
												</div>
										)}
									</Field>
									<div className="label">
                  <span className="label-text-alt text-red-500 text-sm">
                    <ErrorMessage name="birth" component="div"/>
                  </span>
									</div>
								</label>
								
								<label className="form-control w-full max-w-xs mr-5 mb-10">
									<div className="label">
                  <span className="label-text text-supportingColor1">
                    <label htmlFor="departement">
                      Département de naissance <span className="text-red-600">*</span>
                    </label>
                  </span>
									</div>
									<Field
											type="text"
											className="input bg-slate-100 border-primaryColor border-2"
											name="departement"
											placeholder="Département de naissance"
									/>
									<div className="label">
                  <span className="label-text-alt text-red-500 text-sm">
                    <ErrorMessage name="departement" component="div"/>
                  </span>
									</div>
								</label>
								
								<label className="form-control w-full max-w-xs mr-5 mb-10">
									<div className="label">
                  <span className="label-text text-supportingColor1">
                    <label htmlFor="common">
                      Commune de naissance <span className="text-red-600">*</span>
                    </label>
                  </span>
									</div>
									<Field
											type="text"
											className="input bg-slate-100 border-primaryColor border-2"
											name="common"
											placeholder="Commune de naissance"
									/>
									<div className="label">
                  <span className="label-text-alt text-red-500 text-sm">
                    <ErrorMessage name="common" component="div"/>
                  </span>
									</div>
								</label>
								
								<label className="form-control w-full max-w-xs mr-5 mb-10">
									<div className="label">
                  <span className="label-text text-supportingColor1">
                    <label htmlFor="adress">
                       Lieu de naissance <span className="text-red-600">*</span>
                    </label>
                  </span>
									</div>
									<Field
											type="text"
											className="input bg-slate-100 border-primaryColor border-2"
											name="adress"
											placeholder="Lieu de naissance"
									/>
									<div className="label">
                  <span className="label-text-alt text-red-500 text-sm">
                    <ErrorMessage name="adress" component="div"/>
                  </span>
									</div>
								</label>
								
								<label className="form-control w-full max-w-xs mr-5 mb-10">
									
									<div className="flex items-center w-full max-w-xs mr-5 font-medium">
										<h2 className="mr-2">
											Sexe : <span className="text-red-600">*</span>
										</h2>
										
										<label htmlFor="Garçon" className="mr-2">
											Garçon
											<Field
													type="radio"
													value="Garçon"
													className="radio border-primaryColor border-2 w-5 h-5 mr-2"
													name="gender"
											/>
										</label>
										<label htmlFor="Fille" className="mr-2">
											Fille
											<Field
													type="radio"
													value="Fille"
													className="radio border-primaryColor border-2 w-5 h-5 mr-2"
													name="gender"
											/>
										</label>
									</div>
									<div className="label">
                  <span className="label-text-alt text-red-500 text-sm">
                    <ErrorMessage name="gender" component="div"/>
                  </span>
									</div>
								</label>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
	);
}

export default StudentInfoForm;
