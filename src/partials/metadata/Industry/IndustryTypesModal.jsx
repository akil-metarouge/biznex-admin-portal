import { useEffect, useState } from "react";
import ModalBasic from "../../../components/ModalBasic";

const IndustryTypesModal = ({
  title = "Industry Type",
  mode = "add",
  item = null,
  modalOpen,
  setModalOpen,
}) => {
  const [industryType, setIndustryType] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (mode === "edit" && item) {
      setIndustryType(item.industryType || "");
      setStatus(item.active ? "active" : "inactive");
    } else {
      setIndustryType("");
      setStatus("active");
    }
  }, [mode, item, modalOpen]);

  const handleSave = async () => {
    const payload = {
      ...(mode === "edit" && { id: item?.id }),
      industryType,
      status: status === "active",
    };

    // This will call the parent-provided API handler (can be add/edit)

    console.log("Payload to save:", payload);

    setModalOpen(false);
  };

  return (
    <ModalBasic
      id={`${mode}-industry-type-modal`}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title={mode === "edit" ? "Edit Industry Type" : "Add Industry Type"}
    >
      <div className="py-9 px-10 text-sm">
        <h2 className="text-[20px] font-bold text-center text-black mb-6">
          {mode === "edit" ? "Edit" : "Add"} {title}
        </h2>

        <div className="space-y-3 mb-6">
          <label className="block">
            <span className="text-[16px] font-semibold mb-1 block">
              {title}
            </span>
            <input
              type="text"
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
              className="block w-full h-[50px] border border-[#B5B5B5] px-4 py-3 rounded-md text-black focus:outline-none"
            />
          </label>
        </div>

        <div className="flex items-center gap-8">
          {["active", "inactive"].map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={val}
                checked={status === val}
                onChange={() => setStatus(val)}
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full border-2 border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                <div className="w-4 h-4 rounded-full border-2 border-white peer-checked:bg-violet-800" />
              </div>
              <span className="text-[16px] font-semibold capitalize">
                {val}
              </span>
            </label>
          ))}
        </div>

        <div className="pt-6">
          <button
            onClick={handleSave}
            className="w-full py-3.5 text-[16px] font-semibold bg-violet-800 text-white hover:bg-violet-800/90 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </ModalBasic>
  );
};

export default IndustryTypesModal;
