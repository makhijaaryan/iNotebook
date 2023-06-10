import React, { useEffect, useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line  
    }, [])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:"", edit_title: "", edit_description: "", edit_tag: "default"});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, edit_title: currentNote.title, edit_description: currentNote.description, edit_tag: currentNote.tag, });
    }

    
    const onChange = (e) =>{
        setNote(note =>({...note, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () =>{
        editNote(note.id, note.edit_title, note.edit_description, note.edit_tag);
        refClose.current.click();
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="edit_title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edit_title" name="edit_title" value={note.edit_title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edit_description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edit_description" name="edit_description" value={note.edit_description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edit_tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="edit_tag" name="edit_tag" value={note.edit_tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => {e.preventDefault(); handleSubmit()}} className="btn btn-primary">Save changes</button>
                            {/* <button type="button" onClick={handleSubmit()} className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your Notes</h3>
                {notes && notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
