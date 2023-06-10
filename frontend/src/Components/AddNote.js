import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [checkLen, setCheckLen] = useState(false);

    const [note, setNote] = useState({title: "", description: "", tag: "Personal"});

    const handleSubmit = () =>{
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: "Personal"})
    }

    const onChange = (e) =>{
        setNote(note =>({...note, [e.target.name]: e.target.value}))
    }

    const checkLength = (id) =>{
        var titleElement = document.getElementById(id).value;
        if(titleElement.length<5){
            document.getElementById(`${id}_message`).innerHTML="Length too short!";
            setCheckLen(false);
        }
        else{
            document.getElementById(`${id}_message`).innerHTML="";
            setCheckLen(true);
        }
        
    }

    return (
        <div>
            <div className="container my-3">
                <h3>Add a Note</h3>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name="title"  onChange={onChange} minLength={5} onBlur={()=>{checkLength('title')}} required/>
                        <p className="text-danger" id="title_message"></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} onBlur={()=>{checkLength('description')}} required/>
                        <p className="text-danger" id="description_message"></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}/>
                    </div>
                    <button disabled={(note.title.length<5 || note.description.length<5) && checkLen} type="submit" className="btn btn-primary" onClick={(e) => {e.preventDefault(); handleSubmit()}}>Add Note</button>
                    {/* e.preventDefualt(); this prevents the page from reloading after submit */}
                </form>
            </div>
        </div>
    )
}

export default AddNote
