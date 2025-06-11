import { TickCircle, CloseCircle, InfoCircle } from "iconsax-react";

export default function Toast({ open, severity, message, setOpen }) {
  if (!open) return null;

  const borderColor = {
    success: "border-l-[#05CB84]",
    error: "border-l-[#FF4949]",
    warning: "border-l-[#FFFF00]",
    info: "border-l-[#3B82F6]",
  };

  const icon = {
    success: (
      <div className="w-[26px] h-[24px] flex items-center justify-center rounded-full bg-[#05CB8410]">
        <TickCircle size={24} variant="Bold" color="#05CB84" />
      </div>
    ),
    error: <CloseCircle size={24} variant="Bold" color="#FF4949" />,
    warning: <InfoCircle size={24} variant="Bold" color="#FFFF00" />,
    info: <InfoCircle size={24} variant="Bold" color="#3B82F6" />,
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`min-w-[300px] max-w-md bg-[#303947] text-white shadow-[0px_5px_28px_0px_rgba(0,0,0,0.25)] rounded-lg px-4 py-3 flex items-start gap-3 ${
          borderColor[severity] || "border-l-[#FFFF00]"
        } border-l-[8px]`}
      >
        {icon[severity]}

        <div className="flex flex-col">
          <span className="capitalize font-medium">{severity}</span>
          <span className="text-white/70 text-sm">{message}</span>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="ml-auto text-white/50 hover:text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
