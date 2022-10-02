import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {
  const [newImages, setNewImages] = useState([]);
  const [newPreviewImages, setNewPreviewImages] = useState([]);
  const [uploadedPreviewImages, setUploadedPreviewImages] = useState([]);
  useEffect(() => {
    const newImageUrls = [];
    newImages.forEach((image) =>
      newImageUrls.push({ url: URL.createObjectURL(image), name: image.name })
    );
    setNewPreviewImages(newImageUrls);
  }, [newImages]);
  return (
    <NoteContext.Provider
      value={{
        newImages,
        setNewImages,
        newPreviewImages,
        setNewPreviewImages,
        uploadedPreviewImages,
        setUploadedPreviewImages,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw Error("useNoteContext must be used within a NoteContextProvider");
  }
  return context;
};

export default useNoteContext;
