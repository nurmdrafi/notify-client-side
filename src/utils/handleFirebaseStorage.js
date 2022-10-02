import storage from "../firebase.init";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { axiosPrivate } from "../api/axios";
import toast from "react-hot-toast";

export const uploadFirebase = (authUser, images, id, refetch) => {
  const folderPath = `images/${authUser.email}`;

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
            note_id: id,
            path: filePath,
            url,
          })
          .then(() => refetch())
          .catch((error) =>
            toast.error(error.response.data.message, {
              id: "Firebase Storage Error",
            })
          );
      });
    });
  });
};
