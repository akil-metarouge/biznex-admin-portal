import { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { imagePlaceholder } from "../assets/index.js";
import { ArrowUp, Add, Trash, Edit2 } from "iconsax-react";
import { ImageEasyCropper } from "../pages/component/ImageEasyCropper.jsx";
// import { useToast } from "../../contexts";

export const ImageUploaderWithPreview = (props) => {
  const {
    title,
    subTitle,
    recommendedSize,
    maxFileSize,
    aspectRatio,
    showPlusIcon,
    imageURL,
    onImageSelection,
    onImageRemoved,
    cardHeight = "h-60",
    cardPadding = "p-0",
    isMyProfile,
    noBG,
    borderRadius = "rounded-2xl",
    bannerBlob = false,
    autoHeight,
    helperText,
    error,
  } = props;

  // const { showToast } = useToast();
  const [selectedImageURL, setSelectedImageURL] = useState(imageURL);
  const [src, setSrc] = useState(null);
  const imagePicker = useRef(null);

  const selectImage = (file) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      alert(
        `File size exceeded the max limit of ${maxFileSize} MB. Please choose a smaller file.`,
        "error"
      );
      imagePicker.current.value = "";
    } else {
      setSrc(URL.createObjectURL(file));
    }
  };

  const closeCropper = () => {
    imagePicker.current.value = "";
    setSrc(null);
  };

  const cropCompleted = (img) => {
    imagePicker.current.value = "";
    setSrc(null);
    setSelectedImageURL(img);
    onImageSelection(img);
  };

  const showFinder = () => {
    imagePicker.current.click();
  };

  const onRemoveImageClick = () => {
    setSelectedImageURL("");
    onImageRemoved();
  };

  useEffect(() => {
    setSelectedImageURL(imageURL);
  }, [imageURL]);

  return (
    <Fragment>
      {selectedImageURL === "" && (
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-center text-center transition cursor-pointer ${cardPadding} ${
              autoHeight ? "" : cardHeight
            } ${borderRadius} ${error ? "border border-red-500" : ""} ${
              noBG
                ? "bg-transparent"
                : isMyProfile
                ? "bg-gray-900"
                : "bg-gray-100"
            }`}
            onClick={showFinder}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div
                className={`relative ${
                  noBG
                    ? "bg-transparent"
                    : isMyProfile
                    ? "bg-gray-900"
                    : "bg-gray-100"
                } w-16 h-16 md:w-20 md:h-20 xl:w-[75px] xl:h-[75px]`}
              >
                <img
                  src={imagePlaceholder}
                  alt="placeholder"
                  className="w-full h-full object-cover"
                />
                <button className="absolute -right-2 -bottom-2 p-1 bg-violet-800 rounded-full hover:bg-violet-500">
                  {showPlusIcon ? (
                    <Add size="20" color="#fff" />
                  ) : (
                    <ArrowUp size="20" color="#fff" />
                  )}
                </button>
              </div>
              <p className="text-center text-sm md:text-base font-semibold text-gray-700">
                {title}
              </p>
              <p className="text-center text-sm text-gray-500 px-2">
                {subTitle}
              </p>
              {recommendedSize && (
                <p className="text-center text-sm text-gray-500">
                  {recommendedSize}
                </p>
              )}
            </div>
          </div>
          {helperText && (
            <p className="text-xs text-red-500 mt-2">{helperText}</p>
          )}
        </div>
      )}

      {selectedImageURL !== "" && (
        <div
          className={`relative w-full text-center ${
            autoHeight ? "" : cardHeight
          }`}
        >
          <div className="absolute top-3 right-3 flex space-x-2 z-10">
            <button
              className="bg-violet-500 p-2 rounded-full hover:bg-violet-800"
              onClick={showFinder}
            >
              <Edit2 size="18" color="#fff" />
            </button>
            <button
              className="bg-white p-2 rounded-full hover:bg-white"
              onClick={onRemoveImageClick}
            >
              <Trash size="18" color="#8470ff " />
            </button>
          </div>

          <img
            src={selectedImageURL}
            alt="selected"
            className={`w-full object-cover ${borderRadius} ${
              autoHeight ? "h-auto min-h-[200px] max-h-[300px]" : "h-full"
            }`}
          />
        </div>
      )}

      {src && (
        <ImageEasyCropper
          selectedImage={src}
          aspectRatio={aspectRatio}
          closeCropper={closeCropper}
          cropCompleted={cropCompleted}
        />
      )}

      <input
        type="file"
        accept="image/jpeg, image/png, image/webp, image/avif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          const validImageTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
          ];
          if (file) {
            if (validImageTypes.includes(file.type)) {
              selectImage(file);
            } else {
              alert("Please select a valid file type", "error");
            }
          }
        }}
        ref={imagePicker}
        className="hidden"
      />
    </Fragment>
  );
};

ImageUploaderWithPreview.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  maxFileSize: PropTypes.number,
  aspectRatio: PropTypes.number,
  imageURL: PropTypes.string,
  showPlusIcon: PropTypes.bool,
  onImageSelection: PropTypes.func,
  onImageRemoved: PropTypes.func,
  cardHeight: PropTypes.string,
  cardPadding: PropTypes.string,
  isMyProfile: PropTypes.bool,
  noBG: PropTypes.bool,
  borderRadius: PropTypes.string,
  bannerBlob: PropTypes.bool,
  autoHeight: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
};

export default ImageUploaderWithPreview;
