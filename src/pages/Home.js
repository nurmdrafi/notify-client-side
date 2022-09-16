import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";
import { useQuery } from "react-query";

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    isLoading,
    data: notes,
    isError,
    error,
    refetch,
  } = useQuery("notes", () =>
    fetch("http://localhost:5000/notes/notes").then((res) => res.json())
  );
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>error.message</h2>;
  }

  // modal functionality
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div className="flex-col min-h-[calc(100vh-65px)] justify-center items-center">
      <h1 className="text-center text-black text-3xl font-bold mb-3">Hello!</h1>

      {/* Create Note Button */}
      <div className="flex justify-center">
        <button className="btn-primary btn text-white" onClick={openModal}>
          Create Note
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Post Modal"
      >
        <div className="flex justify-end mb-5">
          <button onClick={closeModal}>
            <AiOutlineCloseCircle className="text-black text-2xl" />{" "}
          </button>
        </div>
        <CreateNote closeModal={closeModal} refetch={refetch}/>
      </Modal>
      <NoteList notes={notes} refetch={refetch} />
    </div>
  );
};

export default Home;
