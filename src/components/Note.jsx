import { MdDeleteForever, MdDownload } from 'react-icons/md';
import { FaThumbtack } from 'react-icons/fa';

const Note = ({ id, text, date, pinned, handleDeleteNote, togglePinNote }) => {
  const formattedDate = new Date(date).toLocaleDateString();

  const handleExportNote = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `note-${id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className='note'>
      <span>{text}</span>
      <div className='note-footer'>
        <small>{formattedDate}</small>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaThumbtack
            onClick={() => togglePinNote(id)}
            style={{ cursor: 'pointer', color: pinned ? 'red' : 'gray' }}
            title={pinned ? 'Unpin note' : 'Pin note'}
          />
          <MdDownload
            onClick={handleExportNote}
            style={{ cursor: 'pointer', color: '#4caf50' }}
            title='Export note'
            size='1.3em'
          />
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className='delete-icon'
            size='1.3em'
          />
        </div>
      </div>
    </div>
  );
};

export default Note;