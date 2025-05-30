import { useState } from 'react';

const COLORS = ['#fef68a', '#f9c6c9', '#f9e3c6', '#c6f9d9', '#c6d9f9', '#f9c6f2', '#c6f9f4'];

const AddNote = ({ handleAddNote }) => {
	const [noteText, setNoteText] = useState('');
	const [selectedColor, setSelectedColor] = useState(COLORS[0]);
	const characterLimit = 200;

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (noteText.trim().length > 0) {
			handleAddNote(noteText, selectedColor);
			setNoteText('');
			setSelectedColor(COLORS[0]);
		}
	};

	return (
		<div className='note new'>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={noteText}
				onChange={handleChange}
			></textarea>
			<div className='color-palette' style={{ display: 'flex', marginTop: '8px', gap: '8px' }}>
				{COLORS.map((color) => (
					<div
						key={color}
						onClick={() => setSelectedColor(color)}
						style={{
							backgroundColor: color,
							width: '24px',
							height: '24px',
							borderRadius: '50%',
							cursor: 'pointer',
							border: selectedColor === color ? '2px solid #000' : '2px solid transparent',
						}}
					></div>
				))}
			</div>
			<div className='note-footer'>
				<small>
					{characterLimit - noteText.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;