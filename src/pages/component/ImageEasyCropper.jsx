import React, { Fragment, useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";

export const ImageEasyCropper = ({
  selectedImage,
  aspectRatio,
  closeCropper,
  cropCompleted,
  cropButtonText = "Apply",
  cropShape = "rect",
}) => {
  const [cropUpdated, setCropUpdated] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageBase64, setImageBase64] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      setImageLoaded(false);
      setCropUpdated(false);
    }
  }, [selectedImage]);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels
      );
      setImageBase64(croppedImage);
      setCropUpdated(true);
    } catch (e) {
      console.error("Error occurred while cropping the image:", e);
    }
  };

  const getCroppedImg = (imageSrc, pixelCrop) => {
    const { x, y, width, height } = pixelCrop;
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    return new Promise((resolve, reject) => {
      image.onload = () => {
        setImageLoaded(true);
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
        const base64 = canvas.toDataURL("image/jpeg", 0.8);
        resolve(base64);
      };

      image.onerror = (error) => {
        reject(error);
      };
    });
  };

  const cropImageNow = () => {
    cropCompleted(imageBase64);
  };

  return (
    <Fragment>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeCropper}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden shadow-lg w-[300px] md:w-[500px] lg:w-[600px] h-[400px] md:h-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[80%]">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                restrictPosition={true}
                objectFit="contain"
                cropShape={cropShape}
              />
            </div>
            <div className="h-[20%] flex items-center justify-evenly px-4">
              <div className="flex w-full gap-4">
                <button
                  className="w-full h-10 md:h-12 bg-violet-500 text-white font-semibold rounded hover:bg-violet-800 transition disabled:opacity-50"
                  onClick={cropImageNow}
                  disabled={!cropUpdated || !imageLoaded}
                >
                  {cropButtonText}
                </button>
                <button
                  className="w-full h-10 md:h-12 bg-blue-100 text-violet-800 font-semibold rounded hover:bg-violet-200 transition"
                  onClick={closeCropper}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

ImageEasyCropper.propTypes = {
  selectedImage: PropTypes.string,
  aspectRatio: PropTypes.number,
  closeCropper: PropTypes.func,
  cropCompleted: PropTypes.func,
  cropButtonText: PropTypes.string,
};
