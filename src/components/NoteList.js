import React from "react";
import Note from "./Note";

const NoteList = ({ notes, refetch }) => {
  return (
    <div>
      {notes.length === 0 ? (
        <p className="text-center mt-16">No Data</p>
      ) : (
        <div className="columns-1 md:columns-2 mt-16 lg:px-10 px-5 ">
          {notes.map((note) => (
            <Note key={note._id} note={note} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
