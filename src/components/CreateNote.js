import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuthUserContext from "../context/AuthUserContext";
import { createNewNote } from "../network/apis/note";

const CreateNote = ({ closeModal, refetch }) => {
  const { authUser } = useAuthUserContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const newNote = {
        title: title,
        body: body,
        email: authUser.user.email,
      };
      await createNewNote(newNote);
      setTitle("");
      setBody("");
      closeModal();
    } catch (err) {
      toast.error(err.message, {
        id: "createNote error",
      });
    }
  };
  return (
    <div className="bg-white">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <form className=" flex flex-col gap-3 ">
        {/* Title */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Title"
            className="input input-bordered w-full text-black bg-secondary"
          />
        </div>

        {/* Body */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <textarea
            type="text"
            name="body"
            onChange={(e) => setBody(e.target.value)}
            placeholder="Your Note"
            className="textarea textarea-bordered w-full text-black bg-secondary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-active btn-primary text-white uppercase min-w-[350px] max-w-screen-lg"
          onClick={handleCreateNote}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
