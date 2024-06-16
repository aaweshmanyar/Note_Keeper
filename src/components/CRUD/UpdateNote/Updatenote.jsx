import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import './updatenote.css';
import noteCRUDservices from "../../../services/crudServices";

function Updatenote() {
    const navigate = useNavigate();
    const noteId = window.location.href.split('/').slice(-1)[0];        //fetching noteId from url

    const [updatedNoteObj, setUpdatedNoteObj] = useState({
        title: "",
        tagline: "",
        body: "",
        isPinned: false,
        noteColor: "",
        textColor: "",
        date: new Date()
    });

    //filling values with old data
    useEffect(() => {
        async function fetchNote() {
            try {
                const data = await noteCRUDservices.getNote(noteId);
                setUpdatedNoteObj(data.data());
            } catch (error) {
                toast.error(error);
            }
        }
        fetchNote();
    }, [])

    // updating note with change in input fields
    const handleNoteChange = (e) => {
        setUpdatedNoteObj({ ...updatedNoteObj, [e.target.name]: e.target.value, date: new Date() });
    }

    // handling note pin
    const handlePin = (e) => {
        setUpdatedNoteObj({ ...updatedNoteObj, isPinned: e });
    }

    // reflecting note theme with change in input theme fields
    useEffect(() => {
        console.log(updatedNoteObj);
        document.getElementById("UpdatenoteTitle").style.color = updatedNoteObj.textColor;
        document.getElementById("UpdatenoteTagline").style.color = updatedNoteObj.textColor;
        document.getElementById("UpdatenoteBody").style.color = updatedNoteObj.textColor;
        document.getElementById("UpdateNotecard").style.background = `linear-gradient(45deg, ${updatedNoteObj.noteColor}, ${updatedNoteObj.noteColor + 'B3'})`;
    }, [updatedNoteObj])

    // posting the updated note to DB as the used hits update btn with handling some  possible exceptions
    const updateNote = async () => {
        if (updatedNoteObj.title === "") {
            toast.error("Title can't be blank");
        } else {
            try {
                await noteCRUDservices.updateNote(noteId, updatedNoteObj);
                console.log("Note Posted : ", updatedNoteObj);
                toast.success("Note Updated");
                navigate("/");
            } catch (error) {
                toast.error(error);
            }
        }
    }

    return (
        <div id="UpdateNote">
            <img src="https://cdn-icons-png.flaticon.com/512/5368/5368396.png" alt="close" id='closeNoteIcon' onClick={() => { navigate("/") }} />
            <div id='UpdateNotecard'>
                {
                    updatedNoteObj ?
                        <>
                            <div id='UpdateNotecardHead'>
                                <div id='UpdatenoteContent'>
                                    <input type="text" name="title" id="UpdatenoteTitle" onChange={(e) => { handleNoteChange(e) }} placeholder='Title' defaultValue={updatedNoteObj.title} />
                                    <input type="text" name="tagline" id="UpdatenoteTagline" onChange={(e) => { handleNoteChange(e) }} placeholder='Tagline' defaultValue={updatedNoteObj.tagline} />
                                    <textarea type="text" name="body" id="UpdatenoteBody" onChange={(e) => { handleNoteChange(e) }} placeholder='Body' defaultValue={updatedNoteObj.body} />
                                </div>
                                <div id="UpdatenotePinsec" className='NoteOptionsIcons'>
                                    {
                                        updatedNoteObj.isPinned === true ?
                                            <a title='Unpin' onClick={() => { handlePin(false) }}><img src="https://cdn-icons-png.flaticon.com/512/2951/2951513.png" alt="pinned" className='notePin' /></a>
                                            : <a title='Pin' onClick={() => { handlePin(true) }}><img src="https://cdn-icons-png.flaticon.com/512/2951/2951412.png" alt="notPinned" className='notePin' /></a>
                                    }
                                </div>
                            </div>
                            <div id="UpdatenoteOptions">
                                <div style={{ display: "flex" }}>

                                    {/* Note color */}
                                    <a title='Note Color' style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} className='NoteOptionsIcons'><img src="https://cdn-icons-png.flaticon.com/512/686/686094.png" alt="color" className='NoteOptionsIcons' /><input type="color" name="noteColor" id="notecolor" style={{ position: "absolute", opacity: "0" }} onChange={(e) => { handleNoteChange(e) }} />
                                    </a>

                                    {/* Text color */}
                                    <a title='Text Color' style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} className='NoteOptionsIcons'><h1 className='NoteOptionsIcons' id='textColor'>A</h1><input type="color" name="textColor" id="textcolorInp" style={{ position: "absolute", opacity: "0" }} onChange={(e) => { handleNoteChange(e) }} />
                                    </a>

                                </div>
                                <button className='btn' onClick={updateNote}>Update</button>
                            </div>
                        </>
                        : <>
                            <div className="loading">
                                <ReactLoading
                                    type="spinningBubbles"
                                    color="orange"
                                    height={100}
                                    width={50}
                                />
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Updatenote;