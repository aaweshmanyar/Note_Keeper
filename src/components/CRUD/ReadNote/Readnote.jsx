import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './readnote.css';
import noteCRUDservices from "../../../services/crudServices";

function Readnote() {
    const navigate = useNavigate();
    const noteId = window.location.href.split('/').slice(-1)[0];        //fetching noteId from url
    const [NoteObj, setNoteObj] = useState({});

    //filling values with fetched data
    useEffect(() => {
        async function fetchNote() {
            try {
                const data = await noteCRUDservices.getNote(noteId);
                setNoteObj(data.data());
            } catch (error) {
                toast.error(error);
            }
        }
        fetchNote();
    }, [])

    //returns date.seconds in formatted string
    const formatDate = (dateSeconds) => {
        const MonthArr = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
        const date = new Date(dateSeconds * 1000);
        const dateNum = date.getDate();
        const MonthNum = date.getMonth();
        const Year = date.getFullYear();
        return `${dateNum} ${MonthArr[MonthNum]}, ${Year}`;

    }

    return (
        <div id="ReadNote">
            <img src="https://cdn-icons-png.flaticon.com/512/5368/5368396.png" alt="close" id='closeNoteIcon' onClick={() => { navigate("/") }} />

            <div id='ReadNotecard' style={{ background: `linear-gradient(45deg, ${NoteObj.noteColor}, ${NoteObj.noteColor + 'B3'})` }}>
                <div id='ReadNotecardHead'>
                    <div id='ReadnoteContent'>
                        <h1 id="ReadnoteTitle" style={{ color: NoteObj.textColor }}>{NoteObj.title}</h1>
                        <p id="ReadnoteTagline" style={{ color: NoteObj.textColor, opacity: ".5" }}>{NoteObj.tagline}</p>
                        <p id="ReadnoteBody" style={{ color: NoteObj.textColor }}>{NoteObj.body}</p>
                    </div>
                </div>

                <div id="ReadnoteOptions" style={{ background: "white" }}>
                    <a title='Edit' onClick={() => { navigate(`/update/${noteId}`) }}><img src="https://cdn-icons-png.flaticon.com/512/2985/2985043.png" alt="edit" className='NoteOptionsIcons' /></a>
                </div>
                <div id='ReadnoteDate' style={{ color: NoteObj.textColor }}>{
                    NoteObj?.date?.seconds ? formatDate(NoteObj.date.seconds) : <>date</>
                }</div>
            </div>
        </div>
    )
}

export default Readnote;