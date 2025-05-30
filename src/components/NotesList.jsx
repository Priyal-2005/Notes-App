import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes = [],
	handleAddNote,
	handleDeleteNote,
	togglePinNote,
}) => {
	return (
		<div className='notes-list'>
			{notes.filter(note => note.pinned).map((note) => (
				<Note
					key={note.id}
					id={note.id}
					text={note.text}
					date={note.date}
					pinned={note.pinned}
					handleDeleteNote={handleDeleteNote}
					togglePinNote={togglePinNote}
				/>
			))}

			{notes.filter(note => !note.pinned).map((note) => (
				<Note
					key={note.id}
					id={note.id}
					text={note.text}
					date={note.date}
					pinned={note.pinned}
					handleDeleteNote={handleDeleteNote}
					togglePinNote={togglePinNote}
				/>
			))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;