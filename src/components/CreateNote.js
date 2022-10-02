import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import useAuthUserContext from "../context/AuthUserContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { uploadFirebase } from "../utils/handleFirebaseStorage";
import useNoteContext from "../context/NoteContext";

const CreateNote = ({ closeModal, refetch }) => {
  const { authUser } = useAuthUserContext();
  const axiosPrivate = useAxiosPrivate();
  const {
    newImages,
    setNewImages,
    newPreviewImages,
    setNewPreviewImages,
    uploadedPreviewImages,
    setUploadedPreviewImages,
  } = useNoteContext();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  // create new note
  const createNewNote = async (newNote) => {
    const res = await axiosPrivate.post("/note/post", newNote);
    return res.data;
  };

  const addFromGallery = async (_id, url) => {
    const res = await axiosPrivate.patch("/file/addFromGallery", { _id, url });
    return res.data;
  };

  // handle create note
  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const newNote = {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        email: authUser.email,
      };
      const note = await createNewNote(newNote);
      if (newImages.length > 0) {
        uploadFirebase(authUser, newImages, note.id, refetch);
      }
      if (uploadedPreviewImages.length > 0) {
        uploadedPreviewImages.forEach((url) =>
          addFromGallery(note.id, url).then(() =>
            refetch().catch((error) => console.log(error))
          )
        );
      }
      setNewImages([]);
      setNewPreviewImages([]);
      setUploadedPreviewImages([]);
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message, {
        id: "createNote error",
      });
    }
  };

  return (
    <div className="bg-white">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>

      <form className=" flex flex-col gap-3" onSubmit={handleCreateNote}>
        {/* Title */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <input
            type="text"
            name="title"
            placeholder="Your Title"
            className="input input-bordered w-full text-black bg-secondary"
            required
            ref={titleRef}
          />
        </div>

        {/* Body */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <textarea
            type="text"
            name="body"
            placeholder="Your Note"
            className="textarea textarea-bordered w-full text-black bg-secondary"
            required
            ref={bodyRef}
          />
        </div>
        {/* Choose Images */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <label htmlFor="my-modal" className="btn modal-button">
            Select Images
          </label>

          <div className="flex flex-wrap gap-2">
            {/* new images */}
            {newPreviewImages.map((image, index) => {
              return (
                <div key={index} className="inline-block relative">
                  <img
                    src={image.url}
                    alt=""
                    className="w-16 h-16 object-cover border mt-2"
                  />
                  <AiOutlineClose
                    className="text-red-600 text-2xl cursor-pointer absolute top-0 right-0"
                    onClick={() =>
                      setNewImages((prev) =>
                        prev.filter((img) => img.name !== image.name)
                      )
                    }
                  />
                </div>
              );
            })}
            {/* galley images */}

            {uploadedPreviewImages.map((url, index) => {
              return (
                <div key={index} className="inline-block relative">
                  <img
                    src={url}
                    alt=""
                    className="w-16 h-16 object-cover border mt-2"
                  />
                  <AiOutlineClose
                    className="text-red-600 text-2xl cursor-pointer absolute top-0 right-0"
                    onClick={() =>
                      setUploadedPreviewImages((prev) =>
                        prev.filter((path) => path !== url)
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-active btn-primary text-white uppercase min-w-[350px] max-w-screen-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
