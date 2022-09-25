import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAuthUserContext from "../context/AuthUserContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreateNote = ({ closeModal, refetch }) => {
  const { authUser } = useAuthUserContext();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // create new note
  const createNewNote = async (newNote) => {
    const res = await axiosPrivate.post("/note/post", newNote);
    return res.data;
  };

  const handleCreateNote = async (data) => {
    let now = new Date();
    const newNote = {
      title: data.title,
      body: data.body,
      email: authUser.email,
      createdAt: now.toUTCString(),
    };
    try {
      createNewNote(newNote).then(() => {
        refetch();
      });

      closeModal();
    } catch (err) {
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
      <form
        className=" flex flex-col gap-3"
        onSubmit={handleSubmit(handleCreateNote)}
      >
        {/* Title */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <input
            type="text"
            name="title"
            placeholder="Your Title"
            className="input input-bordered w-full text-black bg-secondary"
            {...register("title", {
              required: "Please enter your title",
            })}
          />
          {/* Error Message */}
          <p className="text-error text-left pt-2">{errors?.title?.message}</p>
        </div>

        {/* Body */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <textarea
            type="text"
            name="body"
            placeholder="Your Note"
            className="textarea textarea-bordered w-full text-black bg-secondary"
            {...register("body", {
              required: "Please type your note",
            })}
          />
          {/* Error Message */}
          <p className="text-error text-left pt-2">{errors?.body?.message}</p>
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
