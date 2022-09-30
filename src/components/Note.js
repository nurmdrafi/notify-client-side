import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuthUserContext from "../context/AuthUserContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import storage from "../firebase.init";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageSlider from "./ImageSlider";

const Note = ({ note, refetch }) => {
  const { authUser } = useAuthUserContext();
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [images, setImages] = useState(note.images);
  const [preview, setPreview] = useState(note.images);
  const axiosPrivate = useAxiosPrivate();
  const folderPath = `images/${authUser.email}`;

  useEffect(() => {
    setImages(note.images);
    setPreview(note.images);
  }, [note]);

  // delete images list
  const [deleteImages, setDeleteImages] = useState([]);

  // add new images list
  const [addNewImages, setAddNewImages] = useState([]);

  // add new images preview
  const [newImagesPreview, setNewImagesPreview] = useState([]);

  // preview new added images
  useEffect(() => {
    const newImageUrls = [];
    addNewImages.forEach((image) =>
      newImageUrls.push({ url: URL.createObjectURL(image), name: image.name })
    );
    setNewImagesPreview(newImageUrls);
  }, [addNewImages]);

  // delete note by note id
  const deleteNoteById = async (_id) => {
    const res = await axiosPrivate.delete(`/note/delete/${_id}`);
    return res.data;
  };

  // update note by note id
  const updateNote = async (_id, updatedNote) => {
    const res = await axiosPrivate.patch(`/note/update/${_id}`, updatedNote);
    return res.data;
  };

  // update note's prev images
  const updateNotePrevImages = async (_id, url) => {
    const res = await axiosPrivate.patch("/file/upPrevNoteImg/", { _id, url });
    return res.data;
  };

  const handleDeleteNote = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      backdrop: "#3085d6",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteNoteById(_id).then(() => refetch());
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (err) {
          console.log(err);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // delete existing note's image
          if (deleteImages.length > 0) {
            deleteImages.map(
              async (url) => await updateNotePrevImages(note._id, url)
            );
          }
          // add new images into note's images
          if (addNewImages.length > 0) {
            addNewImages.forEach((image) => {
              // set unique file name
              const fileExt = image.name.split(".").splice(1);
              const filePath = `${folderPath}/${
                image.name.split(".").slice(0, -1).join(".") +
                "-" +
                new Date().getTime() +
                "." +
                fileExt
              }`;

              // set storage path
              const imageRef = ref(storage, filePath);

              // upload to storage
              uploadBytes(imageRef, image).then((snapshot) => {
                // get url
                getDownloadURL(snapshot.ref).then(async (url) => {
                  // store url
                  await axiosPrivate
                    .post("/file/upload", {
                      note_id: note._id,
                      path: filePath,
                      url,
                    })
                    .then(() => refetch());
                });
              });
            });
            setAddNewImages([]);
          }
          const updatedNote = {
            title: title,
            body: body,
          };
          await updateNote(note._id, updatedNote);
          await refetch();
        } catch (err) {
          console.log(err);
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
      {/* Edit Button */}
      <div className="flex justify-end">
        {isEditable ? (
          <AiOutlineClose
            className="text-primary text-2xl cursor-pointer"
            onClick={() => setIsEditable(false)}
          />
        ) : (
          <AiOutlineEdit
            onClick={() => setIsEditable(true)}
            className="text-primary text-2xl cursor-pointer"
          />
        )}
      </div>

      {/* Images */}
      {isEditable ? (
        <div className="flex">
          {/* previous uploaded images */}
          {preview.map((url, index) => {
            return (
              <div key={index} className="relative">
                <img src={url} alt="" className="w-16 h-16 object-cover mt-2" />
                <AiOutlineClose
                  className="text-red-600 text-2xl cursor-pointer absolute top-0 right-0"
                  onClick={() => {
                    setPreview((prev) => prev.filter((path) => path !== url));
                    setDeleteImages((prev) => [...prev, url]);
                  }}
                />
              </div>
            );
          })}
          {/* new preview images */}
          {newImagesPreview.map((image, index) => {
            return (
              <div key={index} className="inline-block relative">
                <img
                  src={image.url}
                  alt=""
                  className="w-16 h-16 object-cover border mt-2"
                />
                <AiOutlineClose
                  className="text-red-600 text-2xl cursor-pointer absolute top-0 right-0"
                  onClick={() =>
                    setAddNewImages((prev) =>
                      prev.filter((img) => img.name !== image.name)
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      ) : (
        <ImageSlider images={images} />
      )}
      {/* Select Button */}
      {isEditable && (
        <>
          <label
            htmlFor="img"
            className="custom-file-input"
            onChange={(e) =>
              setAddNewImages((prev) => [...prev, ...e.target.files])
            }
          >
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple
              placeholder="New Upload"
              className="hidden"
              id="img"
            />
          </label>
        </>
      )}

      {/* Title & Body*/}
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

      {/* Save Button */}
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
