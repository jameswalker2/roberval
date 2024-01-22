import { supabase } from "../../Config/SupabaseConfig.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "@/pages/AuthConfig/AuthContext.jsx"
import {toast, Toaster} from "react-hot-toast";
import * as Yup from 'yup';
import imageRoberval from "../../assets/welcom_to_roberval.svg";
import "./Login.scss";

export function Login() {
  const { login } = useAuth();
  let navigate = useNavigate();
  
  const [loadingData, setLoadingData] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Adresse e-mail invalide').required('Champ e-mail requis'),
    password: Yup.string().required('Champ password requis'),
  });
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await validationSchema.validate({email, password}, {abortEarly: false})

      setLoadingData(true);
      await login(email, password)
      navigate("/dashboard")

    } catch (error) {
      if (error.name === 'ValidationError') {
        error.errors.forEach((validationError) => {
          toast.error(validationError)
        });
      } else {
        toast.error("Email ou Password est incorrect")
      }
    }
    finally {
      setTimeout(() => {
        setLoadingData(false);
      }, 1000)
    }
  };

  return (
    <>
      <div className="h-screen">
        <Toaster position={"top-right"}/>
        <div className="container_login absolute flex left-[50%] top-[50%] bg-color3 p-2 rounded-2xl w-[65rem] h-[35rem]
        max-[1040px]:w-[90%] max-[1040px]:p-[1%] max-[1040px]:h-[60%] ">
          <div className="bg- rounded-l-2xl flex justify-center max-[800px]:hidden">
          <img width="500" src={imageRoberval} alt="svg" id="img_roberval" />
          </div>
          <div className="flex items-center justify-center bg-color2 ml-20 rounded-2xl w-[30rem] p-10 max-[1040px]:w-[100%] max-[1040px]:ml-0  ">
            {loadingData ? (<div className="loader"></div>) : (
                <form id="form" onSubmit={handleSubmit}>
                <div className="text-center text-white">
                  <h1 className="text-3xl capitalize font-bold max-[500px]:text-xl">Bienvenue !</h1>
                  <h2 className="text-md mb-10 max-[500px]:text-xs ">Veuillez entrer vos coordonnées</h2>
                  <label className="form-control w-full max-w-xs mb-8 max-[500px]:max-w-sm">
                    <div className="label">
                      <span className="label-text text-white">Entrez votre email </span>
                    </div>
                    <input
                        type="email"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered bg-white text-black w-80 max-w-xs max-[500px]:w-96 " />
                  </label>
                  <label className="form-control w-full max-w-xs mb-10">
                    <div className="label">
                      <span className="label-text text-white">Entrez votre mot de passe </span>
                    </div>
                    <input
                        type="password"
                        placeholder="Écrivez ici..."
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered bg-white text-black w-80 max-w-xs " />
                  </label>
                  <button className="btn bg-white border-none text-color1 hover:bg-color3 hover:text-white" type="submit" >
                      Connecter
                    </button>
                </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
