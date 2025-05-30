import { useState } from 'react';
import { MdDeleteForever, MdDownload, MdEdit } from 'react-icons/md';
import { FaThumbtack } from 'react-icons/fa';

const Note = ({ id, text, date, pinned, handleDeleteNote, togglePinNote, handleEditNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const formattedDate = new Date(date).toLocaleDateString();

  const handleExportNote = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `note-${id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleSave = () => {
    handleEditNote(id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <div className='note'>
      {isEditing ? (
        <>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows="5"
          />
          <div className='note-footer'>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span>{text}</span>
          <div className='note-footer'>
            <small>{formattedDate}</small>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaThumbtack
                onClick={() => togglePinNote(id)}
                style={{ cursor: 'pointer', color: pinned ? 'red' : 'gray' }}
                title={pinned ? 'Unpin note' : 'Pin note'}
              />
              <MdEdit
                onClick={() => setIsEditing(true)}
                style={{ cursor: 'pointer', color: '#1976d2' }}
                title='Edit note'
                size='1.3em'
              />
              <MdDownload
                onClick={handleExportNote}
                style={{ cursor: isEditing ? 'default' : 'pointer', color: '#4caf50' }}
                title='Export note'
                size='1.3em'
                aria-disabled={isEditing}
              />
              <MdDeleteForever
                onClick={() => !isEditing && handleDeleteNote(id)}
                className='delete-icon'
                size='1.3em'
                style={{ cursor: isEditing ? 'default' : 'pointer' }}
                aria-disabled={isEditing}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;