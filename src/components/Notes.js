import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import noteContext from "../context/notes/noteContext"
import Addnote from './Addnote'
import Noteitem from './Noteitem'
import { CgNotes } from 'react-icons/cg'
import { IoMdAddCircle } from 'react-icons/io'

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getNotes()
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    const updatenote = (currentnote) => {
        ref.current.click()
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Your note has been updated successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // const dislplay = document.getElementById("none")
    // dislplay.style.display = "none"
    // const toggleNote = () => {
    //     dislplay.style.display = "block"
    // }
    return (
        <>
            <Addnote showAlert={props.showAlert} mode={props.mode} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content bg-${props.mode}`} id="Modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" minLength={5} required value={note.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            < div className="row my-3 " >
                <h2>Your Notes<CgNotes style={{ "marginBottom": "3px", "marginLeft": "5px" }} /></h2>
                <div className="container">
                    {/* we put && if there is no else part */}
                    {notes.length === 0 && "There are no notes to display"}
                </div>

                {notes.map && notes?.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} showAlert={props.showAlert} note={note} mode={props.mode} />
                })
                }

            </ div>
            <div className='d-flex' style={{ "justifyContent": "flex-end" }}>
                <IoMdAddCircle style={{ "marginBottom": "3px", "marginLeft": "1px", "width": "5%", "height": "4%", "cursor": "pointer" }} />
            </div>

        </>
    )
}

export default Notes
