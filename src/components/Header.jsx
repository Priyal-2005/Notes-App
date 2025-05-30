import React from 'react';

const Header = ({ handleToggleDarkMode, handleSearchNote }) => {
	return (
		<div className='header'>
			<h1>Notes</h1>
			<input
				type='text'
				placeholder='Type to search...'
				className='search-input'
				onChange={(event) => handleSearchNote(event.target.value)}
			/>
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