import { useEffect, useState } from "react";
import ImageUploaderWithPreview from "../../components/ImageUploaderWithPreview";
import DatePickerSingle from "../../components/DatePickerSingle";
import TimePickerSingle from "../../components/TimePickerSingle";
import GooglePlacesField from "../../components/GooglePlacesField";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useToast } from "../../../contexts/ToastContext";

export default function CreateEventForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [editEvent, setEditEvent] = useState(false);
  const [isEventOnline, setIsEventOnline] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    imageURL: "",
    event_name: "",
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    location: null,
    registrationLink: "",
    about: null,
    participants_limit: null,
    errors: {
      imageURL: false,
      event_name: false,
      start_date: false,
      end_date: false,
      start_time: false,
      end_time: false,
      pastTime: false,
      location: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const MAX_CHARACTERS = 2000;
  const remainingCharacters = MAX_CHARACTERS - eventDetails?.about?.length;
  const [image, setImage] = useState(null);

  const onBackClick = () => {
    navigate(-1);
  };

  const getEventById = async (urlId) => {
    console.log("urlId in getEventById", urlId);
    const apiURL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(
        `${apiURL}/api/admin/admin-event-detail?event_id=${urlId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data?.status === 1) {
        console.log("data", data);
        setSelectedEvent(data?.data);
      } else {
        console.error("Failed to fetch events data:", data);
      }
    } catch (error) {
      console.error("Error fetching events data:", error);
    } finally {
      //
    }
  };

  const handleApiError = (err) => {
    if (err.response?.status === 401) {
      console.log(err.response?.data?.message, "error");
    } else {
      console.log("err", err);
      setIsLoading(false);
      setDisableButton(false);
      console.log(err.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes("edit")) {
      setEditEvent(true);
      getEventById(window.location.pathname.split("/")[2]);
    }
  }, []);

  useEffect(() => {
    if (
      eventDetails.event_name &&
      eventDetails.date &&
      eventDetails.time &&
      (isEventOnline || eventDetails.location) &&
      image
    ) {
      console.log("date being sent: ", moment(eventDetails.date).date());
      const formDetails = {
        event_id: eventDetails?.event_id,
        event_name: eventDetails.title,
        event_date: `${moment({
          year: moment(eventDetails?.start_date).year(),
          month: moment(eventDetails?.start_date).month(),
          day: moment(eventDetails?.start_date).date(),
          hour: moment(eventDetails?.start_time).hour(),
          minute: moment(eventDetails?.start_time).minute(),
          second: moment(eventDetails?.start_time).second(),
        }).toISOString()}`,
        end_date: `${moment({
          year: moment(eventDetails?.end_date).year(),
          month: moment(eventDetails?.end_date).month(),
          day: moment(eventDetails?.end_date).date(),
          hour: moment(eventDetails?.end_time).hour(),
          minute: moment(eventDetails?.end_time).minute(),
          second: moment(eventDetails?.end_time).second(),
        }).toISOString()}`,
        is_online: isEventOnline ? true : false,
        event_address: eventDetails.location,
        event_link: eventDetails.registrationLink,
        about: eventDetails.description,
        image_url: image,
      };

      console.log("formDetails startAt: ", formDetails.startAt);

      if (editEvent) {
        api
          .put(
            `${urls.eventApiHead}/${userData?.user_community?.community?.uid}/event/update`,
            {
              ...formDetails,
              event_id: selectedEvent?.uid,
              // startAt: `${moment(eventDetails.date).format("YYYY-MM-DD")} ${moment(eventDetails.time).format("hh:mm")}`,
            }
          )
          .then((res) => {
            console.log("res", res);
            // setIsLoading(false);
            showToast("Event updated successfully", "success");
            onBackClick();
          })
          .catch(handleApiError);
      } else {
        api
          .post(
            `${urls.eventApiHead}/${userData?.user_community?.community?.uid}/event/create`,
            formDetails
          )
          .then((res) => {
            console.log("res", res);
            // setIsLoading(false);
            showToast("Event created successfully", "success");
            // clear form
            setEventDetails({
              imageURL: "",
              event_name: "",
              start_date: null,
              end_date: null,
              start_time: null,
              end_time: null,
              location: null,
              registrationLink: "",
              about: null,
              participants_limit: null,
              errors: {
                imageURL: false,
                event_name: false,
                start_date: false,
                end_date: false,
                start_time: false,
                end_time: false,
                pastTime: false,
                location: false,
              },
            });
            onBackClick();
          });
        // .catch(){};
      }
    }
  }, [image]);

  useEffect(() => {
    if (editEvent) {
      setEventDetails({
        imageURL: selectedEvent?.image_url,
        event_name: selectedEvent?.event_name,
        date: selectedEvent?.event_date,
        time: selectedEvent?.end_date,
        location: selectedEvent?.location,
        registrationLink: selectedEvent?.registrationLink,
        about: selectedEvent?.about,
        errors: {
          imageURL: false,
          event_name: false,
          date: false,
          time: false,
          location: false,
          registrationLink: false,
        },
      });
    }
  }, [editEvent, selectedEvent]);

  const handleSubmit = () => {
    setDisableButton(true);

    const eventDate = moment(eventDetails.date).startOf("day");
    const currentDate = moment().startOf("day");

    let isInvalidInput = false;
    if (eventDetails.image_url === "") {
      setEventDetails((previousDetails) => ({
        ...previousDetails,
        errors: { ...previousDetails.errors, image_url: true },
      }));
      isInvalidInput = true;
    }
    if (eventDetails.event_name === null || eventDetails.event_name === "") {
      setEventDetails((previousDetails) => ({
        ...previousDetails,
        errors: { ...previousDetails.errors, event_name: true },
      }));
      isInvalidInput = true;
    }
    if (
      eventDetails.start_date === null ||
      eventDetails.start_date === "Invalid date"
    ) {
      setEventDetails((previousDetails) => ({
        ...previousDetails,
        errors: { ...previousDetails.errors, start_date: true },
      }));
      isInvalidInput = true;
    }
    console.log(eventDate.isBefore(currentDate));
    if (eventDate.isBefore(currentDate)) {
      setEventDetails((previousDetails) => ({
        ...previousDetails,
        errors: {
          ...previousDetails.errors,
          pastDate: true,
        },
      }));
      isInvalidInput = true;
    }
    if (
      eventDetails.start_time === null ||
      eventDetails.start_time === "Invalid date"
    ) {
      setEventDetails((previousDetails) => ({
        ...previousDetails,
        errors: { ...previousDetails.errors, start_time: true },
      }));
      isInvalidInput = true;
    }
    if (
      eventDate.isSame(currentDate) &&
      moment(eventDetails.start_time).isSameOrBefore(moment())
    ) {
      setEventDetails((previousDetails) => ({
        ...previousDetails,
        errors: {
          ...previousDetails.errors,
          pastTime: true,
        },
      }));
      isInvalidInput = true;
    }
    if (!isEventOnline && eventDetails.location === null) {
      setEventDetails((previousDetails) => ({
        ...previousDetails,
        errors: { ...previousDetails.errors, location: true },
      }));
      isInvalidInput = true;
    }

    console.log("isInvalidInput: ", isInvalidInput);

    if (!isInvalidInput) {
      console.log("here");
      setIsLoading(true);
      if (eventDetails.image_url === selectedEvent?.image_url) {
        setImage(selectedEvent?.image_url);
      } else {
        const imageBlob = convertBse64ToFormData(eventDetails.image_url);

        const formData = new FormData();
        formData.append("image", imageBlob, "filename.png");

        api
          .post(urls.uploadImage, formData)
          .then((res) => {
            setImage(res?.data?.data);
          })
          .catch(handleApiError);
      }
    } else {
      setDisableButton(false);
    }
  };

  showToast("Event updated successfully", "info");

  console.log("eventDetails", eventDetails);

  return (
    <div className="bg-white flex justify-center items-center p-6 rounded-xl">
      <div className="p-4 md:p-10 w-full max-w-3xl">
        <div className="mb-4">
          {/* image upload and preview */}
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
            value={eventDetails.event_name}
            onChange={(e) => {
              setDisableButton(false);
              setEventDetails({ ...eventDetails, event_name: e.target.value });
            }}
            maxLength={100}
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              eventDetails.errors.event_name
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {eventDetails.errors.event_name && (
            <p className="text-xs text-red-500 mt-1">Please enter a title</p>
          )}
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
            value={eventDetails.participants_limit || ""}
            onChange={(e) => {
              setDisableButton(false);
              setEventDetails({
                ...eventDetails,
                participants_limit: e.target.value,
              });
            }}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Offline/Online Selection */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="eventMode"
              value="offline"
              checked={!isEventOnline}
              onChange={() => {
                setDisableButton(false);
                setIsEventOnline(false);
              }}
              className="peer hidden"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                !isEventOnline
                  ? "border-violet-500 ring-2 ring-violet-500"
                  : "border-gray-400"
              }`}
            >
              {!isEventOnline && (
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
              )}
            </div>
            <span className="text-gray-700 font-medium">Offline</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="eventMode"
              value="online"
              checked={isEventOnline}
              onChange={() => {
                setDisableButton(false);
                setIsEventOnline(true);
              }}
              className="peer hidden"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                isEventOnline
                  ? "border-violet-500 ring-2 ring-violet-500"
                  : "border-gray-400"
              }`}
            >
              {isEventOnline && (
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
              )}
            </div>
            <span className="text-gray-700 font-medium">Online</span>
          </label>
        </div>

        <div className="mb-4">
          <GooglePlacesField
            initialValue={eventDetails.location ?? ""}
            onChangeValue={(value) => {
              setEventDetails({ ...eventDetails, location: value });
            }}
            error={eventDetails.errors.location}
            helperText="Please enter a valid location"
            mt="mt-4"
          />
        </div>

        <div className="w-full mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Event
          </label>
          <textarea
            aria-label="minimum height"
            rows={6}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Description"
            onChange={(e) => {
              setDisableButton(false);
              setEventDetails({
                ...eventDetails,
                about: e.target.value.slice(0, MAX_CHARACTERS),
              });
            }}
            value={eventDetails.about}
          />
          <div className="flex justify-end items-center mt-1">
            <p
              className={`text-[10px] ${
                remainingCharacters ? "text-gray-600" : "text-[#FF204E]"
              }`}
            >
              {isNaN(remainingCharacters) ? "2000" : remainingCharacters}{" "}
              characters left
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-4">
          <button
            onClick={onBackClick}
            className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg bg-violet-800 text-white font-medium hover:bg-violet-700 transition"
          >
            {editEvent ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
