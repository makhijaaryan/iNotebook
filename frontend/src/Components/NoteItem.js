import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title text-center mb-3">{note.title}</h5>
                    <p className="card-text mb-2">{note.description}</p>
                    <p className="card-text mt-3">Tags: {note.tag}</p>
                    <div className="d-flex justify-content-around mt-4">
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted", "success") }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note); }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
