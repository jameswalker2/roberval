/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

function PersonalInfoForm({ formData, setFormData, onSubmit }) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Le nom est requis"),
    lastName: Yup.string().required("Le prénom est requis"),
    birth: Yup.date()
      .nullable()
      .required("La date de naissance est requise")
      .max(new Date(), "La date de naissance ne peut pas être dans le futur"),
    // Ajoutez ici d'autres validations si nécessaire
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
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setFormData(values);
          setSubmitting(false);
        }}>
        <Form>
          <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
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
                    <ErrorMessage name="firstName" component="div" />
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
                    <ErrorMessage name="lastName" component="div" />
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
                <Field name="birth">
                  {({ field, form }) => (
                    <div>
                      <DatePicker
                        className="input bg-slate-100 border-primaryColor border-2"
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
                    <ErrorMessage name="birth" component="div" />
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

export default PersonalInfoForm;
