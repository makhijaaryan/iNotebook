import { useState } from "react";
import noteContext from "./noteContext";

const NoteSate = (props) => {

    const notesInitial=[
        {
          "_id": "6460fe8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
        {
          "_id": "6460fe8c4b9b0085592f86b3",
          "user": "6460b538595f6e2e69603701",
          "title": "first note",
          "description": "here's my first description",
          "tag": "trial",
          "date": "2023-05-14T15:30:20.985Z",
          "__v": 0
        },
    ]

    const [notes, setNotes] = useState(notesInitial)

    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteSate;