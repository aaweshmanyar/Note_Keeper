import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./createnote.css";
import noteCRUDservices from "../../../services/crudServices";

function Createnote() {
  const navigate = useNavigate();

  // default initial state of note
  const [noteObj, setNoteObj] = useState({
    title: "",
    tagline: "",
    body: "",
    isPinned: false,
    noteColor: "#FFF",
    textColor: "#000",
    date: new Date(),
  });

  // changing note data with change in input fields
  const handleNoteChange = (e) => {
    setNoteObj({ ...noteObj, [e.target.name]: e.target.value });
  };

  // handling note pin state
  const handlePin = (e) => {
    setNoteObj({ ...noteObj, isPinned: e });
  };

  // reflecting changes of note theme with its selection by user
  useEffect(() => {
    console.log(noteObj);
    document.getElementById("CreatenoteTitle").style.color = noteObj.textColor;
    document.getElementById("CreatenoteTagline").style.color =
      noteObj.textColor;
    document.getElementById("CreatenoteBody").style.color = noteObj.textColor;
    document.getElementById("CreateNotecard").style.background =
      noteObj.noteColor;
  }, [noteObj]);

  // posting the note as the user hits create btn with handling some possible exceptions
  const createNote = async () => {
    if (noteObj.title === "") {
      toast.error("Title can't be blank");
    } else {
      try {
        await noteCRUDservices.postNote(noteObj);
        toast.success("Note Created");
        navigate("/");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div id="Createnote">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5368/5368396.png"
        alt="close"
        id="closeNoteIcon"
        onClick={() => {
          navigate("/");
        }}
      />
      <div id="CreateNotecard">
        <div id="CreateNotecardHead">
          <div id="CreatenoteContent">
            <input
              type="text"
              name="title"
              id="CreatenoteTitle"
              onChange={(e) => {
                handleNoteChange(e);
              }}
              placeholder="Title"
            />
            <input
              type="text"
              name="tagline"
              id="CreatenoteTagline"
              onChange={(e) => {
                handleNoteChange(e);
              }}
              placeholder="Tagline"
            />
            <textarea
              type="text"
              name="body"
              id="CreatenoteBody"
              onChange={(e) => {
                handleNoteChange(e);
              }}
              placeholder="Body"
            />
          </div>
          <div id="CreatenotePinsec" className="NoteOptionsIcons">
            {noteObj.isPinned === true ? (
              <a
                title="Unpin"
                onClick={() => {
                  handlePin(false);
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2951/2951513.png"
                  alt="pinned"
                  className="notePin"
                />
              </a>
            ) : (
              <a
                title="Pin"
                onClick={() => {
                  handlePin(true);
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2951/2951412.png"
                  alt="notPinned"
                  className="notePin"
                />
              </a>
            )}
          </div>
        </div>
        <div id="CreatenoteOptions">
          <div style={{ display: "flex" }}>
            {/* Note color */}
            <a
              title="Note Color"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="NoteOptionsIcons"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/686/686094.png"
                alt="color"
                className="NoteOptionsIcons"
              />
              <input
                type="color"
                name="noteColor"
                id="notecolor"
                style={{ position: "absolute", opacity: "0" }}
                onChange={(e) => {
                  handleNoteChange(e);
                }}
              />
            </a>

            {/* Text color */}
            <a
              title="Text Color"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="NoteOptionsIcons"
            >
              <h1 className="NoteOptionsIcons" id="textColor">
                A
              </h1>
              <input
                type="color"
                name="textColor"
                id="textcolorInp"
                style={{ position: "absolute", opacity: "0" }}
                onChange={(e) => {
                  handleNoteChange(e);
                }}
              />
            </a>
          </div>
          <button className="btn" onClick={createNote}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Createnote;
