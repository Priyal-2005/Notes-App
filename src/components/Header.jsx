import React from 'react';

const Header = ({ handleToggleDarkMode, handleSearchNote, sortType, handleSortChange }) => {
	return (
		<div className='header'>
			<h1>Notes</h1>
			<input
				type='text'
				placeholder='Type to search...'
				className='search-input'
				onChange={(event) => handleSearchNote(event.target.value)}
			/>
			<select
				value={sortType}
				onChange={(e) => handleSortChange(e.target.value)}
				className='sort-select'
				aria-label='Sort notes'
			>
				<option value='pinned'>Pinned</option>
				<option value='newest'>Newest First</option>
				<option value='oldest'>Oldest First</option>
			</select>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			>
				Toggle Mode
			</button>
		</div>
	);
};

export default Header;