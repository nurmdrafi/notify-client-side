import React from "react";
import Note from "./Note";

const NoteList = ({ notes, refetch }) => {
  return (
    <div className="columns-1 md:columns-2 mt-16 lg:px-10 px-5 ">
      {notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} refetch={refetch} />
          ))}
        </>
      ) : (
        <p>No Data.</p>
      )}
    </div>
  );
};

export default NoteList;
