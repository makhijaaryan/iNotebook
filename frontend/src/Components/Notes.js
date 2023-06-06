import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, addNote} = context;
    return (    
        <div className="row my-3">
            <h3>Your Notes</h3>
            {notes && notes.map((note)=>{
            return <NoteItem key={note._id} note={note}/>;
            })}
        </div>
    )
}

export default Notes
