import { useState } from "react";
import ImageUploaderWithPreview from "../../components/ImageUploaderWithPreview";
import DatePickerSingle from "../../components/DatePickerSingle";
import TimePickerSingle from "../../components/TimePickerSingle";

export default function CreateEventForm() {
  const [disableButton, setDisableButton] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    imageURL: "",
    title: "",
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    location: null,
    registrationLink: "",
    description: null,
    errors: {
      imageURL: false,
      title: false,
      start_date: false,
      end_date: false,
      start_time: false,
      end_time: false,
      pastTime: false,
      location: false,
    },
  });

  console.log("eventDetails", eventDetails);

  return (
    <div className="bg-white flex justify-center items-center p-6 rounded-xl">
      <div className="p-4 md:p-10 w-full max-w-3xl">
        <div className="mb-4">
          <ImageUploaderWithPreview
            title="Upload Image"
            subTitle="JPG, PNG, WEBP or AVIF (Max. file size 25 MB)"
            recommendedSize="Recommended size 1070px X 580px"
            imageURL={eventDetails.imageURL}
            onImageSelection={(img) => {
              setDisableButton(false);
              setEventDetails({ ...eventDetails, imageURL: img });
            }}
            onImageRemoved={() => {
              setEventDetails({ ...eventDetails, imageURL: "" });
            }}
            cardHeight="h-[320px] sm:h-[420px]"
            aspectRatio={1.8}
            error={eventDetails.errors.imageURL}
            helperText={
              <span
                className={`block h-5 transition-opacity duration-200 ${
                  eventDetails.errors.imageURL
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                } text-sm text-red-500`}
              >
                {eventDetails.errors.imageURL ? "Please upload an image" : ""}
              </span>
            }
            showPlusIcon={true}
          />
        </div>

        {/* Event Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            placeholder="Profit Partners Alliance"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Date Range */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <DatePickerSingle
              startDate={eventDetails.start_date}
              setStartDate={(date) =>
                setEventDetails({ ...eventDetails, start_date: date })
              }
              setDisableButton={setDisableButton}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <DatePickerSingle
              startDate={eventDetails.end_date}
              setStartDate={(date) =>
                setEventDetails({ ...eventDetails, end_date: date })
              }
              setDisableButton={setDisableButton}
            />
          </div>
        </div>

        {/* Time Range */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <TimePickerSingle
              time={eventDetails.start_time}
              setTime={(time) =>
                setEventDetails({ ...eventDetails, start_time: time })
              }
              setDisableButton={setDisableButton}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <TimePickerSingle
              time={eventDetails.end_time}
              setTime={(time) =>
                setEventDetails({ ...eventDetails, end_time: time })
              }
              setDisableButton={setDisableButton}
            />
          </div>
        </div>

        {/* Attendees Limit */}
        <div className="mb-4 mt-6">
          <input
            type="number"
            placeholder="Attendees Limit (Optional)"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Offline/Online Selection */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="eventMode"
              className="accent-violet-600"
              defaultChecked
            />
            <span className="text-gray-700 font-medium">Offline</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="eventMode"
              className="accent-violet-600"
            />
            <span className="text-gray-700 font-medium">Online</span>
          </label>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="International Convention Centre (ICC) Sydney, Australia"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* About Event */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Event
          </label>
          <textarea
            rows={6}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
            defaultValue="The Profit Partners 2024 in Sydney is a prestigious event that celebrates excellence, innovation, and leadership in the business community. This annual event brings together top entrepreneurs, business leaders, and industry professionals from across Australia to honor outstanding achievements in various sectors."
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-4">
          <button className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">
            Cancel
          </button>
          <button className="px-8 py-3 rounded-lg bg-violet-800 text-white font-medium hover:bg-violet-700 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
