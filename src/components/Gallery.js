import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import useNoteContext from "../context/NoteContext";

const Gallery = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("notes");
  const [gallery, setGallery] = useState([]);
  const { uploadedPreviewImages, setUploadedPreviewImages } = useNoteContext();

  // set gallery images
  useEffect(() => {
    const images = [];
    data.map((note) => images.push(...note.images));
    setGallery(images);
  }, [data]);

  // check duplicate
  const checkDuplicate = (url) => {
    if (!uploadedPreviewImages.includes(url)) {
      setUploadedPreviewImages((prev) => [...prev, url]);
    } else {
      setUploadedPreviewImages((prev) => prev.filter((path) => path !== url));
    }
  };

  return (
    <div className="grid grid-cols-4">
      {gallery.map((url, index) => {
        return (
          <img
            key={index}
            src={url}
            alt=""
            className={`w-20 h-20 object-cover m-3 cursor-pointer  ${
              uploadedPreviewImages.includes(url) && "border-green-700 border-4"
            }`}
            onClick={() => {
              checkDuplicate(url);
            }}
          />
        );
      })}
    </div>
  );
};

export default Gallery;
