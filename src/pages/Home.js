import React, { useState } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";
import { useQuery } from "react-query";
import useAuthUserContext from "../context/AuthUserContext";
import Loading from "../components/Loading";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const { authUser } = useAuthUserContext();
  const axiosPrivate = useAxiosPrivate();
  const [modalIsOpen, setIsOpen] = useState(false);

  // get all notes by userEmail
  async function getNotes() {
    const res = await axiosPrivate.get("/note/get");
    return res.data;
  }

  const {
    isLoading,
    data: notes,
    isError,
    error,
    refetch,
  } = useQuery("notes", () => authUser?.email && getNotes());

  // refetch again if notes undefined
  if (!notes) {
    refetch();
  }

  if (isLoading) {
    return <Loading />;
  }

  // fetch error handling
  if (isError) {
    toast.error(error.message, {
      id: "getByEmail error",
    });
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
      width: "60%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div className="flex-col min-h-[calc(100vh-65px)] justify-center items-center">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>

      <h1 className="text-center text-black text-3xl font-bold mb-3">
        Hello! {authUser.username}
      </h1>

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
        contentLabel="Create Note Modal"
      >
        <div className="flex justify-end mb-5">
          <button onClick={closeModal}>
            <AiOutlineCloseCircle className="text-black text-2xl" />{" "}
          </button>
        </div>
        <CreateNote closeModal={closeModal} refetch={refetch} />
      </Modal>
      {/* if notes available then pass props */}
      {notes && <NoteList notes={notes} refetch={refetch} />}
    </div>
  );
};

export default Home;
