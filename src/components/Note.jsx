import { MdDeleteForever } from 'react-icons/md';
import { FaThumbtack } from 'react-icons/fa';

const Note = ({ id, text, date, pinned, handleDeleteNote, togglePinNote }) => {
  const formattedDate = new Date(date).toLocaleDateString();

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