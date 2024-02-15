import { useAuth } from "@/pages/AuthConfig/AuthContext.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Toaster, toast } from "react-hot-toast";
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
    password: Yup.string().required("Champ password requis"),
  });

  return (
    <>
      <div className="h-screen bg-gradient-to-t from-color1 to-fuchsia-100 ">
        <Toaster position={"top-right"} />
        <div
          className="container_login absolute flex left-[50%] top-[50%] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100
          border-gray-100 bg-color3 p-2 rounded-2xl w-[65rem] h-[35rem] max-[1040px]:w-[90%] max-[1040px]:p-[1%] max-[1040px]:h-[60%] ">
          <div className="bg- rounded-l-2xl flex justify-center max-[800px]:hidden">
            <img width="500" src={imageRoberval} alt="svg" id="img_roberval" />
          </div>
          <div className="flex items-center justify-center bg-color1 ml-20 rounded-2xl w-[30rem] p-10 max-[1040px]:w-[100%] max-[1040px]:ml-0  ">
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
                    toast.error("Email ou Password est incorrect");
                  }
                } finally {
                  setSubmitting(false);
                }
              }}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="text-center text-color2">
                    <h1 className="text-3xl capitalize font-bold max-[500px]:text-xl">
                      Bienvenue !
                    </h1>
                    <h2 className="text-md mb-10 max-[500px]:text-xs ">
                      Veuillez entrer vos coordonnées
                    </h2>
                    <div className="form-control w-full max-w-xs mb-5  max-[100px]:max-w-sm">
                      <label htmlFor="email" className="label">
                        <span className="label-text text-white">
                          Entrez votre email{" "}
                        </span>
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Écrivez ici..."
                        className="input input-bordered bg-white text-black w-80 max-w-xs max-[500px]:w-96 mb-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-left text-red-500"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs mb-10">
                      <label htmlFor="password" className="label">
                        <span className="label-text text-white">
                          Entrez votre mot de passe{" "}
                        </span>
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Écrivez ici..."
                        className="input input-bordered bg-white text-black w-80 max-w-xs mb-2"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-left text-red-500"
                      />
                    </div>
                    {isSubmitting ? (
                      <div className="loading loading-spinner"></div>
                    ) : (
                      <div className="text-center flex flex-col ">
                        <button
                          className="btn text-color2 bg-transparent border-2 hover:border-none hover:bg-color3"
                          type="submit"
                          disabled={isSubmitting}>
                          Se connecter
                        </button>
                        {/* <NavLink
                          to="/reset-password"
                          className="btn  bg-white border-none text-color1 hover:bg-color3 hover:text-white hover:underline">
                          Mot de passe oublié ?
                        </NavLink> */}
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
