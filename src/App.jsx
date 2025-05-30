import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList.jsx';
import Header from './components/Header.jsx';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
			pinned: false,
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
			pinned: false,
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
			pinned: false,
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
			pinned: false,
		},
	]);

	const [darkMode, setDarkMode] = useState(false);
	const [searchText, setSearchText] = useState('');
	

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
			date: date.toLocaleDateString(),
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

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} handleSearchNote={setSearchText} />
				<NotesList
					notes={[...notes]
						.filter((note) =>
							note.text.toLowerCase().includes(searchText.toLowerCase())
						)
						.sort((a, b) => b.pinned - a.pinned)
					}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					togglePinNote={togglePinNote}
				/>
			</div>
		</div>
	)
};

export default App;