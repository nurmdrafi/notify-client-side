import axiosPublic from "../axiosPublic";

// get all notes
export async function getAllNotes() {
  const res = await axiosPublic.get("/note/getAll");
  return res.data;
}

// get all notes by userEmail
export async function getByEmail(email) {
  const res = await axiosPublic.get(`/note/getByEmail/${email}`);
  return res.data;
}

// create new note
export async function createNewNote(newNote) {
  const res = await axiosPublic.post("/note/post", newNote);
  return res.data;
}

// delete note by id
export async function deleteNoteById(id) {
  const res = await axiosPublic.delete(`/note/delete/${id}`);
  return res.data;
}

// update note
export async function updateNote(id, updatedNote) {
  const res = await axiosPublic.patch(`/note/update/${id}`, updatedNote);
  return res.data;
}
