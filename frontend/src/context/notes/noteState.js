import { useState } from "react";
import noteContext from "./noteContext";

const NoteSate = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Fetching all notes
  const getNotes = async () => {
    //API call 
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGI1Mzg1OTVmNmUyZTY5NjAzNzAxIn0sImlhdCI6MTY4NDA3MDAzMH0.cKHO__O_Vfp8DvUQCIEJO45BSe6wPV9GgLBfc9xmN64"

      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  
  const addNote = async (title, description, tag) => {
    //API call here
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGI1Mzg1OTVmNmUyZTY5NjAzNzAxIn0sImlhdCI6MTY4NDA3MDAzMH0.cKHO__O_Vfp8DvUQCIEJO45BSe6wPV9GgLBfc9xmN64"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const json = await response.json();
    console.log(json);

    console.log("Note Added");
    
    const note = {
      "_id": "6481d1fb694bb855461a24c91",
      "user": "6460b538595f6e2e69603701",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-14T15:30:20.985Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGI1Mzg1OTVmNmUyZTY5NjAzNzAxIn0sImlhdCI6MTY4NDA3MDAzMH0.cKHO__O_Vfp8DvUQCIEJO45BSe6wPV9GgLBfc9xmN64"

      },
    });
    const json = await response.json();
    console.log(json)
    console.log("Deleting note with ID: " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGI1Mzg1OTVmNmUyZTY5NjAzNzAxIn0sImlhdCI6MTY4NDA3MDAzMH0.cKHO__O_Vfp8DvUQCIEJO45BSe6wPV9GgLBfc9xmN64"

      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);  

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}


export default NoteSate;