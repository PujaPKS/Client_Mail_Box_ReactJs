import React, { useContext, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './ComposeMail.css'; // Create and style this CSS file
import { useDispatch, useSelector } from "react-redux";
// import AuthContext from "../context/AuthContext";
import { sendMail } from '../../services/apiServices';
import { addMail } from "../../store/slice/mailSlice";

const ComposeMail = ({ onCancel }) => {

  const dispatch = useDispatch();
  const fixedFrom = useSelector((state) => state.auth.email); // Get the logged-in user's email from Redux store

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const handleSendClick = async () => {
    
    if (!to || !subject || !editorState.getCurrentContent().hasText()) {
      alert("All fields are required!");
      return;
    }

    if (!fixedFrom) {
      alert("User is not logged in!");
      return;
    }

    // const messageContent = JSON.stringify(convertToRaw(editorState.getCurrentContent())); // Convert rich text to raw JSON
    const messageContent = editorState.getCurrentContent().getPlainText(); 
    const textMessage = editorState.getCurrentContent().getPlainText(); // Extract plain text

    const mailData = {
      from: fixedFrom,
      to,
      subject,
      message: messageContent, // Storing JSON formatted content
    };

    try {
      await sendMail(fixedFrom, mailData); // API call with user email
      dispatch(addMail(mailData)); // Update Redux state
      alert("Mail Sent Successfully!");
      // Reset form fields
      setTo("");
      setSubject("");
      setEditorState(EditorState.createEmpty());

      onCancel(); // Close the modal
    } 
    catch (error) {
      alert("Failed to send mail.");
    }
  // };


    // const textMessage = editorState.getCurrentContent().getPlainText(); // Extracts normal text
    console.log("From:", fixedFrom);  // ✅ From is now fixed
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("JSON Coded Message Content:", messageContent);
    console.log("Message Content:", textMessage);
    alert("Message Sent! Check console for details.");
    onCancel(); // Close Compose Mail after sending
  };

  return (
    <div className="compose-container">
      <h2 className="compose-header">
        New Message
        <button className="cancel" onClick={onCancel}>X</button>
      </h2>
      {/* <label>From:- </label> */}
      <div className="input-row">
        <label htmlFor="from" className="input-label">From:</label>
        <input
          type="text"
          id="from"
          className="input-field"
          value={fixedFrom}
          readOnly
        />
      </div>
      {/* <label>To:- </label> */}
      <div className="input-row">
        <label htmlFor="to" className="input-label">To:</label>
        <input
          type="text"
          id="to"
          className="input-field"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      {/* <label>Subject:- </label> */}
      <div className="input-row">
        <label htmlFor="subject" className="input-label">Subject:</label>
        <input
          type="text"
          id="subject"
          className="input-field"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <div className="compose-actions">
        <button className="send-button" onClick={handleSendClick}>
          Send
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ComposeMail;