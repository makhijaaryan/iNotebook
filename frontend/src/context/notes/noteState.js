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
        let note = {
            "_id": "660fe8c4bb0085592f86b3",
            "user": "6460b538595f6e2e69603701",
            "title": "adding new note",
            "description": "here's my first description",
            "tag": "trial",
            "date": "2023-05-14T15:30:20.985Z",
            "__v": 0
        };
        setNotes(notes.push(note))
    }

    //Delete a note
    const deleteNote =()=>{
        
    }

    //Edit a note
    const editNote =()=>{
        
    }

    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteSate;