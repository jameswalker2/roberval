// ResetPassword.jsx
import { supabase } from "@/Config/SupabaseConfig.jsx";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(email);
      toast.success(
        "Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.",
      );
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe:",
        error.message,
      );
      toast.error(
        "Une erreur s'est produite lors de la réinitialisation de votre mot de passe. Veuillez réessayer.",
      );
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Réinitialiser le mot de passe</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez votre adresse e-mail"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleResetPassword}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Envoyer le lien de réinitialisation
      </button>
    </div>
  );
}
