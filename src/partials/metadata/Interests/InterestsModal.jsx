import { useEffect, useState } from "react";
import ModalBasic from "../../../components/ModalBasic";

const InterestsModal = ({
  title = "Interest",
  mode = "add",
  item = null,
  modalOpen,
  setModalOpen,
}) => {
  const [industryType, setIndustryType] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (mode === "edit" && item) {
      setIndustryType(item.reason || "");
      setStatus(item.active ? "active" : "inactive");
    } else {
      setIndustryType("");
      setStatus("active");
    }
  }, [mode, item]);

  const handleSave = async () => {
    const payload = {
      ...(mode === "edit" && { id: item?.id }),
      reason: industryType,
      active: status === "active",
    };

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
          {["active", "inactive"].map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="status"
                value={value}
                checked={status === value}
                onChange={() => setStatus(value)}
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-full border-[2px] border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <span
                className={`text-[16px] font-semibold ${
                  status === value ? "text-violet-800" : "text-gray-700"
                }`}
              >
                {value === "active" ? "Active" : "InActive"}
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

export default InterestsModal;
