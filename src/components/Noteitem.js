import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiEdit } from "react-icons/bi"
<link rel="stylesheet" href="../src/font.css" />


const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updatenote } = props

    return (
        <div className="col-md-3" >
            <div className={`card my-3 `}  >
                <div className="card-body">
                    <div className="d-flex align-items-center" style={{ "borderBottom": "1px solid black" }} >
                        <h5 className="card-title">{note.title}</h5>
                        {/* <i className="fa fa-trash-o mx-2 " alt="Delete" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Your note has been deleted successfully", "success")
                        }}></i> */}
                        <RiDeleteBin6Line style={{ "marginBottom": "4px", "marginLeft": "10px", "cursor": "pointer" }} onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Your note has been deleted successfully", "success")
                        }} />
                        {/* <i className="fa-solid fa-pen-to-square mx-2  " alt="Edit" onClick={() => { updatenote(note) }}></i> */}
                        <BiEdit className='editModal' style={{ "marginBottom": "4px", "marginLeft": "10px", "cursor": "pointer" }} onClick={() => { updatenote(note) }} />
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
