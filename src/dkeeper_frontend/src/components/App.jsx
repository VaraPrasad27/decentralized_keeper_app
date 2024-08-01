import React, { useEffect, useState } from "react";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreaatArea";
import Footer from "./Footer";

function App() {
  const [notes, setNote] = useState([]);

  function addNote(newNote) {
    dkeeper_backend.createNote(newNote.title, newNote.content);
    setNote((prevNotes) => {
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {
    console.log("use effect triggered");
    fetchData();
  }, []);

  async function fetchData() {
    const noteArray = await dkeeper_backend.readNote();
    setNote(noteArray);
  }

  function deleteNote(id) {
    dkeeper_backend.removeNote(id);
    setNote((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
