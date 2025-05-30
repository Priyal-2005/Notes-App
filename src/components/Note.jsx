import { useState } from 'react';
import { MdDeleteForever, MdDownload, MdEdit } from 'react-icons/md';
import { FaThumbtack } from 'react-icons/fa';

const COLORS = ['#fef68a', '#f9c6c9', '#f9e3c6', '#c6f9d9', '#c6d9f9', '#f9c6f2', '#c6f9f4'];

const Note = ({ id, text, date, pinned, color, handleDeleteNote, togglePinNote, handleEditNote }) => {
  const defaultColor = '#fef68a';
  const [selectedColor, setSelectedColor] = useState(color || defaultColor);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const formattedDate = new Date(date).toLocaleDateString();

  const textColor = '#000';

  const handleExportNote = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `note-${id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleSave = () => {
    handleEditNote(id, editText, selectedColor);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setSelectedColor(color);
    setIsEditing(false);
  };

  return (
    <div className='note' style={{ backgroundColor: selectedColor, color: textColor }}>
      {isEditing ? (
        <>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows="5"
          />
          <div className='color-palette' style={{ display: 'flex', gap: '8px', margin: '8px 0' }}>
            {COLORS.map((col) => (
              <div
                key={col}
                onClick={() => setSelectedColor(col)}
                style={{
                  backgroundColor: col,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: selectedColor === col ? '3px solid #555' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
                title={`Select color ${col}`}
              />
            ))}
          </div>
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