import { useState } from "react";

const SearchBar = ({ setSearchTerm, searchMode, setSearchMode }) => {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setSearchTerm(e.target.value);
  };

  const toggleMode = (e) => {
    setSearchMode(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:items-center w-full">
      <input
        type="text"
        value={value}
        placeholder="Найти игру..."
        className="w-full sm:flex-1 p-2 border rounded text-sm"
        onChange={handleChange}
      />
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <select
          value={searchMode}
          onChange={toggleMode}
          className="w-full sm:w-auto border px-2 py-1 rounded text-sm"
        >
          <option value="default">По названию</option>
          <option value="smart">Умный поиск</option>
        </select>
        <button
          onClick={handleClear}
          className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded text-sm"
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
