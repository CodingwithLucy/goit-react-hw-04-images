import '../components.css';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <FiSearch color="black" />
          <span className="SearchForm-button-label"></span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      </form>
    </header>
  );
}

export default Searchbar;
