import { useAuth } from "@/pages/AuthConfig/AuthContext.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import imageRoberval from "../../assets/welcom_to_roberval.svg";
import "./Login.scss";

export function Login() {
  const { login } = useAuth();
  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("Champ e-mail requis"),
    password: Yup.string().required("Champ mot de passe requis"),
  });

  return (
    <>
      <div className="h-screen bg-gradient-to-t from-indigo-700 to-primaryColor">
        <Toaster position={"top-center"} />
        <div className="absolute flex left-[15%] top-[10%] w-[70%] h-[80%] bg-white p-2 rounded-lg ">
          <div className=" bg-supportingColor4 rounded-lg w-[60%] flex justify-center ">
            <img style={{ width: 500 }} src={imageRoberval} alt="svg" />
          </div>
          <div className="w-[0%] flex ml-14 mt-10">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  await login(values.email, values.password);
                  navigate("/dashboard");
                } catch (error) {
                  if (error.name === "ValidationError") {
                    setErrors(error.errors);
                  } else {
                    setTimeout(() => {
                      toast.error(
                        "Email ou password est incorrect, essayer à nouveau !",
                        {
                          style: { minWidth: "500px" },
                        },
                      );
                    });
                  }
                } finally {
                  setSubmitting(false);
                }
              }}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="text-primaryColor ">
                    <h1 className="text-[30px] capitalize font-bold ">
                      Se connecter
                    </h1>
                    <h2 className="text-md mb-20  font-normal">
                      Entrez votre email et votre mot de passe
                    </h2>
                    <div className="form-control w-full max-w-xs mb-5">
                      <label htmlFor="email" className="label">
                        <span className="label-text text-primaryColor font-normal text-[16px]">
                          Email{" "}
                        </span>
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Écrivez ici..."
                        className="input input-bordered border-2 bg-white border-primaryColor text-supportingColor1
                        w-80 mb-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-left text-red-500 font-[16px]"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs mb-10">
                      <label htmlFor="password" className="label">
                        <span className="label-text text-primaryColor font-normal text-[16px]">
                          Mot de passe{" "}
                        </span>
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Écrivez ici..."
                        className="input input-bordered border-2 bg-white border-primaryColor text-supportingColor1
                        w-80 mb-2 font-normal"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-left text-red-500 font-[16px]"
                      />
                    </div>
                    {isSubmitting ? (
                      <div className="text-center">
                        <span className="loading loading-spinner" />
                      </div>
                    ) : (
                      <div className="flex flex-col ">
                        <button
                          className="btn text-primaryColor bg-transparent border-2 border-primaryColor
                          hover:border-none hover:bg-primaryColor hover:text-white"
                          type="submit"
                          disabled={isSubmitting}>
                          Se connecter
                        </button>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
