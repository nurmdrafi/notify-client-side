import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import Swal from "sweetalert2";
import { deleteNoteById, updateNote } from "../network/apis/note";

const Note = ({ note, refetch }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const handleDeleteNote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteNoteById(id).then(() => refetch());
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };

  const handleSaveNote = () => {
    setIsEditable(false);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const updatedNote = {
            title: title,
            body: body,
          };
          updateNote(note._id, updatedNote).then(() => refetch());
        } catch (err) {
          console.log(err.message);
        }
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        setTitle(note.title);
        setBody(note.body);
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <div className="card mx-10 mb-10 bg-base-100 shadow-md rounded-none p-6 space-y-3">
      <div className="flex justify-end">
        {isEditable ? (
          <AiOutlineClose
            className="text-primary text-2xl cursor-pointer"
            onClick={() => setIsEditable(false)}
          />
        ) : (
          <AiOutlineEdit
            onClick={() => {
              setIsEditable(true);
              setTitle(note.title);
              setBody(note.body);
            }}
            className="text-primary text-2xl cursor-pointer"
          />
        )}
      </div>
      {isEditable ? (
        <>
          <input
            type="text"
            className="text-primary text-2xl font-bold capitalize input p-0 input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="text-black capitalize textarea textarea-bordered p-0"
          >
            {note.body}
          </textarea>
        </>
      ) : (
        <>
          <h2 className="text-primary capitalize text-2xl font-bold">
            {note.title}
          </h2>
          <p className="text-black capitalize">{note.body}</p>
        </>
      )}

      <div className="flex justify-end">
        {isEditable ? (
          <button
            onClick={handleSaveNote}
            className="text-primary btn btn-xs rounded-none hover:text-white"
          >
            Save
          </button>
        ) : (
          <RiDeleteBin6Line
            onClick={() => handleDeleteNote(note._id)}
            className="text-red-500 text-xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Note;
