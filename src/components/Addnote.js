import React, { useState, useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { AiOutlineFileAdd } from "react-icons/ai"
const Addnote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    // const display = document.getElementById("none")
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Your note has been added successfully", "success")
        // display.style.display = "none"

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div >
            <div className={`container my-3`} id="none">
                <h2>Add a Note <AiOutlineFileAdd style={{ "marginBottom": "3px", "marginLeft": "1px" }} /></h2>
                <form className='my-3 '>
                    <div className="mb-3 ">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className={`form-control  bg-${props.mode} `} id="title" name='title' minLength={5} required aria-describedby="emailHelp" value={note.title} onChange={onChange} style={{ "boxShadow": "1px 1px 5px black" }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className={`form-control bg-${props.mode} `} name="description" id="description" cols="20" rows="5" minLength={5} required value={note.description} onChange={onChange} style={{ "boxShadow": "1px 1px 5px black" }}></textarea>
                        {/* <input type="text" className="form-control" id="description" name='description' minLength={5} required value={note.description} onChange={onChange} /> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className={`form-control bg-${props.mode} `} id="tag" name='tag' minLength={5} required value={note.tag} onChange={onChange} style={{ "boxShadow": "1px 1px 4px black" }} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
