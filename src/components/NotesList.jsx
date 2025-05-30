import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes = [],
	handleAddNote,
	handleDeleteNote,
	togglePinNote,
	handleEditNote,
	darkMode,
}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					text={note.text}
					date={note.date}
					pinned={note.pinned}
					color={note.color}
					handleDeleteNote={handleDeleteNote}
					togglePinNote={togglePinNote}
					handleEditNote={handleEditNote}
					darkMode={darkMode}
				/>
			))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;