import instance from "../AxiosInterceptor";

// get all notes
export async function getAllNotes() {
  const res = await instance.get("/note/getAll");
  return res.data;
}

// get all notes by userEmail
export async function getByEmail(email) {
  const res = await instance.get(`/note/getByEmail/${email}`);
  return res.data;
}

// create new note
export async function createNewNote(newNote) {
  const res = await instance.post("/note/post", newNote);
  return res.data;
}

// delete note by id
export async function deleteNoteById(id) {
  const res = await instance.delete(`/note/delete/${id}`);
  return res.data;
}

// update note
export async function updateNote(id, updatedNote) {
  const res = await instance.patch(`/note/update/${id}`, updatedNote);
  return res.data;
}
