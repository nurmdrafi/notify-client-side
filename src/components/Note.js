import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteNoteById } from "../utils/APIs";

const Note = ({ note, refetch }) => {
  const handleDeleteNote = async (id) => {
    try {
      await deleteNoteById(id);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card mx-10 mb-10 bg-base-100 shadow-md rounded-none p-6">
      <h2 className="text-primary text-2xl font-bold uppercase">
        {note.title}
      </h2>
      <p className="text-black">{note.body}</p>
      <div className="flex justify-end">
        <RiDeleteBin6Line
          onClick={() => handleDeleteNote(note._id)}
          className="text-red-500 text-xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Note;
