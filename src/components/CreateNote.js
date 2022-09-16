import React, { useState } from "react";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/notes/note", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <div className="bg-white">
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
