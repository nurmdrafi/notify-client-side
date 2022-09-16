import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handlePost = async (e) => {
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
    <div className="App">
      <form method="POST">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" onClick={handlePost}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
