import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import parse from "autosuggest-highlight/parse";

// Replace with your Google Maps API key or use environment variable
const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_API_KEY || "YOUR_API_KEY_HERE";

function loadScript(src, position, id) {
  if (!position) return;

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const GooglePlacesField = ({
  initialValue = "",
  onChangeValue,
  error,
  helperText,
  mt = "0",
}) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState(initialValue);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const loaded = useRef(false);
  const containerRef = useRef(null);

  // Load Google Maps script
  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }
    loaded.current = true;
  }

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        if (autocompleteService.current) {
          autocompleteService.current.getPlacePredictions(request, callback);
        }
      }, 400),
    []
  );

  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google && window.google.maps) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      console.warn("Google Maps AutocompleteService not available");
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = value ? [value] : [];

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnChange = (newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    setShowOptions(false);

    if (newValue) {
      const address = newValue.description;
      const placeID = newValue.place_id;
      const items = newValue.terms.map((x) => x.value);
      const country = items[items.length - 1].trim();
      let city = "";
      if (items.length >= 3) {
        city = items[items.length - 3].trim();
      } else if (items.length === 2) {
        city = items[items.length - 2].trim();
      }
      onChangeValue(address, placeID, city, country);
    } else {
      onChangeValue();
    }
  };

  const handleOnInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowOptions(true);
    if (!newValue) {
      onChangeValue();
    }
  };

  return (
    <div className={`w-full ${mt}`} ref={containerRef}>
      <div className="relative w-full">
        <label
          htmlFor="google-map-demo"
          className={`block text-sm font-medium text-gray-700 mb-1 transition-all duration-200 ${
            inputValue ? "opacity-100" : "opacity-80"
          } ${error ? "text-red-500" : ""}`}
        >
          Location
        </label>
        <input
          id="google-map-demo"
          type="text"
          value={inputValue || ""}
          onChange={handleOnInputChange}
          onFocus={() => setShowOptions(true)}
          placeholder="Search location"
          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
            error ? "border-red-500" : "border-gray-300"
          } focus:border-blue-500 outline-none transition-colors duration-200 bg-transparent`}
        />
        <div
          className={`text-red-500 text-sm mt-1 transition-opacity duration-200 ${
            error ? "opacity-100 h-5" : "opacity-0 h-0"
          } ${error ? "visible" : "invisible"}`}
        >
          {helperText || ""}
        </div>
      </div>

      {showOptions && options.length > 0 && (
        <ul className="z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {options.map((option, index) => {
            const matches =
              option.structured_formatting?.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <li
                key={index}
                onClick={() => handleOnChange(option)}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  className="w-6 h-6 text-gray-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="flex-1">
                  <div>
                    {parts.map((part, i) => (
                      <span
                        key={i}
                        className={part.highlight ? "font-bold" : ""}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {option.structured_formatting?.secondary_text}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

GooglePlacesField.propTypes = {
  initialValue: PropTypes.string,
  onChangeValue: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  mt: PropTypes.string,
};

export default GooglePlacesField;
