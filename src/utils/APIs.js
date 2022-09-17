import axios from "axios";

// get all notes
export async function getAllNotes() {
  const res = await axios.get("http://localhost:5000/notes/getAll");
  return res.data;
}

// get all notes by userEmail
export async function getByEmail(email) {
  const res = await axios.get(
    `http://localhost:5000/notes/getByEmail/${email}`
  );
  return res.data;
}

// create new user
export async function createNewUser(newUser) {
  const res = await axios.post("http://localhost:5000/users/post", newUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

// create new note
export async function createNewNote(newNote) {
  const res = await axios.post("http://localhost:5000/notes/post", newNote, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

// delete note by id
export async function deleteNoteById(id) {
  const res = await axios.delete(`http://localhost:5000/notes/delete/${id}`);
  return res.data;
}
