import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"});

    const handleSubmit = () =>{
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: "default"})
    }

    const onChange = (e) =>{
        setNote(note =>({...note, [e.target.name]: e.target.value}))
    }

    return (
        <div>
            <div className="container my-3">
                <h3>Add a Note</h3>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title"  onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => {e.preventDefault(); handleSubmit()}}>Add Note</button>
                    {/* e.preventDefualt(); this prevents the page from reloading after submit */}
                </form>
            </div>
        </div>
    )
}

export default AddNote
