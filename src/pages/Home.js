import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CreateNote from "../components/CreateNote";

const Home = () => {
  // modal functionality
  const [modalIsOpen, setIsOpen] = useState(false);
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
        <CreateNote closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default Home;
