import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes = [],
	handleAddNote,
	handleDeleteNote,
	togglePinNote,
	handleEditNote,
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
					handleDeleteNote={handleDeleteNote}
					togglePinNote={togglePinNote}
					handleEditNote={handleEditNote}
				/>
			))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;