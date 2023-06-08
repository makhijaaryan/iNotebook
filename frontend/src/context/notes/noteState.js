import { useState } from "react";
import noteContext from "./noteContext";

const NoteSate = (props) => {

    const notesInitial=[
        {
          "_id": "6460fe8c4b9b0085592f863",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f83",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86b",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b85592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4bb0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "646e8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    //Add a note
    const addNote =(title, description, tag)=>{
        //API call here
        console.log("Note Added");
        const note = {
            "_id": "660fe8b0085592f86b3",
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
    const deleteNote =(id)=>{
      //API call here
      console.log("Deleting note with ID: " +id)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    //Edit a note
    const editNote =(id, title, description,tag  )=>{
      //API call here


      //Logic to edit in client
      for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if(element._id === id){
          element.title=title;
          element.description=description;
          element.tag=tag;
        }
      }
    }

    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteSate;