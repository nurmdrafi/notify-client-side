import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import useAuthUserContext from "../context/AuthUserContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import storage from "../firebase.init";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateNote = ({ closeModal, refetch }) => {
  const { authUser } = useAuthUserContext();
  const axiosPrivate = useAxiosPrivate();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const folderPath = `images/${authUser.email}`;

  // create new note
  const createNewNote = async (newNote) => {
    const res = await axiosPrivate.post("/note/post", newNote);
    return res.data;
  };

  // delete from preview

  const deletePreviewImage = (name) => {
    const filter = images.filter((image) => image.name !== name);
    setImages(filter);
  };

  // handle create note
  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const newNote = {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        email: authUser.email,
      };
      await createNewNote(newNote).then((res) => {
        // handle firebase storage images
        images.forEach((image) => {
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
            getDownloadURL(snapshot.ref).then((url) => {
              // store url
              axiosPrivate
                .post("/file/upload", {
                  note_id: res.id,
                  path: filePath,
                  url,
                })
                .then(() => refetch());
            });
          });
        });
      });
      await closeModal();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message, {
        id: "createNote error",
      });
    }
  };

  // show preview images
  useEffect(() => {
    const newImageUrls = [];
    images.forEach((image) =>
      newImageUrls.push({ url: URL.createObjectURL(image), name: image.name })
    );
    setPreview(newImageUrls);
  }, [images]);

  return (
    <div className="bg-white">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <form className=" flex flex-col gap-3" onSubmit={handleCreateNote}>
        {/* Title */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <input
            type="text"
            name="title"
            placeholder="Your Title"
            className="input input-bordered w-full text-black bg-secondary"
            required
            ref={titleRef}
          />
        </div>

        {/* Body */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <textarea
            type="text"
            name="body"
            placeholder="Your Note"
            className="textarea textarea-bordered w-full text-black bg-secondary"
            required
            ref={bodyRef}
          />
        </div>
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <label
            htmlFor="img"
            className="custom-file-input"
            onChange={(e) => setImages((prev) => [...prev, ...e.target.files])}
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

          <div className="flex flex-wrap gap-2">
            {preview.map((image, index) => {
              return (
                <div key={index} className="inline-block relative">
                  <img
                    src={image.url}
                    alt=""
                    className="w-16 h-16 object-cover border mt-2"
                  />
                  <AiOutlineClose
                    className="text-primary text-2xl cursor-pointer absolute top-0 right-0"
                    onClick={() => deletePreviewImage(image.name)}
                  />
                </div>
              );
            })}
          </div>
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
