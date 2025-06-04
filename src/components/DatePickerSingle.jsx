"use client";

import { useState } from "react";
import { format, isBefore, startOfToday } from "date-fns";

import { cn } from "../lib/utils";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { calendarIcon } from "../assets";

export default function DatePickerSingle({
  className,
  startDate,
  setStartDate,
  setDisableButton,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(startDate || null);

  const handleSelect = (selectedDate) => {
    if (!selectedDate) return;

    // prevent selecting past dates
    if (isBefore(selectedDate, startOfToday())) return;

    setDate(selectedDate);
    setStartDate(selectedDate);
    setDisableButton(false);
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "flex justify-between btn min-w-[15.5rem] border rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white border-gray-400 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600 dark:bg-gray-800 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-sm font-medium text-left",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "dd LLL y") : <span>Pick a date</span>}
            <img src={calendarIcon} alt="calendar" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => isBefore(date, startOfToday())}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
