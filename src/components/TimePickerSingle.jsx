"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Clock } from "lucide-react"; // Optional: replace with your icon
import { clockIcon } from "../assets";

export default function TimePickerSingle({
  className,
  time,
  setTime,
  setDisableButton,
}) {
  const [open, setOpen] = useState(false);

  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const isPM = hour >= 12;
        const h12 = hour % 12 === 0 ? 12 : hour % 12;
        const m = min.toString().padStart(2, "0");
        const meridian = isPM ? "PM" : "AM";
        times.push(`${h12}:${m} ${meridian}`);
      }
    }
    return times;
  };

  const handleSelect = (value) => {
    setTime(value);
    setDisableButton(false);
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex justify-between btn min-w-[15.5rem] border rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white border-gray-400 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600 dark:bg-gray-800 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-sm font-medium text-left",
              !time && "text-muted-foreground"
            )}
          >
            {time || <span>Pick a time</span>}
            <img src={clockIcon} alt="calendar" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[12rem] max-h-[15rem] overflow-y-auto p-2"
          align="start"
        >
          <ul className="grid gap-1">
            {generateTimes().map((t) => (
              <li key={t}>
                <button
                  onClick={() => handleSelect(t)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-violet-100 dark:hover:bg-violet-800"
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
