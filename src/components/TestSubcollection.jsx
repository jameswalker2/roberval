import { useState } from "react";
import { supabase } from "./login/SupabaseConfig";
import { useParams } from "react-router-dom";
import { BsTypeH2 } from "react-icons/bs";

export function TestSubcollection() {
  const { id } = useParams();
  const [amount, setAmount] = useState();
  const [te, setTe] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("paie")
      .update({ amount: amount })
      .eq("id", 26)
      .select("id");

    if (data) {
      console.log("Succes !");
      setTe(data);
    } else {
      console.log(error.message);
    }
  };
  return (
    <div>
      <input type="text" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleSubmit}>Mettre à jour </button>
      {te.map((t) => (
        <h2>{t.amount}</h2>
      ))}
    </div>
  );
}
