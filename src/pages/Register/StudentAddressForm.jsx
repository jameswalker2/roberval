import { useEffect, useState } from "react";

function StudentAddressForm({ onAddressInfoChange, resetData }) {
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [common, setCommon] = useState("");
  const [city, setCity] = useState("");

  const handleChange = (fieldName, value) => {
    switch (fieldName) {
      case "department":
        setDepartment(value);
        break;
      case "common":
        setCommon(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onAddressInfoChange(address, department, common, city);
  });

  const handleReset = () => {
    setAddress("");
    setDepartment("");
    setCommon("");
    setCity("");
  };

  useEffect(() => {
    if (resetData) {
      handleReset();
    }
  }, [resetData]);

  return (
    <div>
      <div className="bg-white p-4 rounded-lg mt-10 mb-5 w-[95%]">
        <div>
          <h2 className="text-xl font-medium text-supportingColor1">
            Informations Addresse
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
                Adresse <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Adresse"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Département <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={department}
              onChange={(e) => handleChange("department", e.target.value)}
              placeholder="Département"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Commune <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={common}
              onChange={(e) => handleChange("common", e.target.value)}
              placeholder="Commune"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs mr-5 mb-10">
            <div className="label">
              <span className="label-text text-supportingColor1">
                Quartier <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              value={city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Quartier"
              className="input bg-slate-100 border-primaryColor border-2"
            />
            <div className="label">
              <span className="label-text-alt"></span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
export default StudentAddressForm;
