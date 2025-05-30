import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList.jsx';
import Header from './components/Header.jsx';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '2021-04-15T00:00:00.000Z',
			pinned: false,
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '2021-04-21T00:00:00.000Z',
			pinned: false,
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '2021-04-28T00:00:00.000Z',
			pinned: false,
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '2021-04-30T00:00:00.000Z',
			pinned: false,
		},
	]);

	const [darkMode, setDarkMode] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [sortType, setSortType] = useState('newest');
	

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toISOString(),
			pinned: false,
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const togglePinNote = (id) => {
		const noteToToggle = notes.find(note => note.id === id);
		if (!noteToToggle) return;

		const updatedNote = { ...noteToToggle, pinned: !noteToToggle.pinned };
		const remainingNotes = notes.filter(note => note.id !== id);

		const newNotes = updatedNote.pinned
			? [updatedNote, ...remainingNotes]
			: [...remainingNotes, updatedNote];

		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	const handleSortChange = (type) => {
		setSortType(type);
	};

	// Edit note text and update date
	const handleEditNote = (id, newText) => {
		const updatedNotes = notes.map(note =>
			note.id === id ? { ...note, text: newText, date: new Date().toISOString() } : note
		);
		setNotes(updatedNotes);
	};

	const sortNotes = (notesArr) => {
		switch (sortType) {
			case 'newest':
				return [...notesArr].sort((a, b) => new Date(b.date) - new Date(a.date));
			case 'oldest':
				return [...notesArr].sort((a, b) => new Date(a.date) - new Date(b.date));
			case 'pinned':
				return [...notesArr].sort((a, b) => b.pinned - a.pinned);
			default:
				return notesArr;
		}
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header
					handleToggleDarkMode={setDarkMode}
					handleSearchNote={setSearchText}
					sortType={sortType}
					handleSortChange={handleSortChange}
				/>
				<NotesList
					notes={sortNotes(
						notes
							.filter(note =>
								sortType === 'pinned' ? note.pinned : true
							)
							.filter(note =>
								note.text.toLowerCase().includes(searchText.toLowerCase())
							)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					togglePinNote={togglePinNote}
					handleEditNote={handleEditNote}
				/>
			</div>
		</div>
	)
};

export default App;