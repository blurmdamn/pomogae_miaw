import { useState } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    setSearchTerm("");
  };

  const handleShowAll = () => {
    setValue("все");
    setSearchTerm("все");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        value={value}
        placeholder="Найти игру..."
        className="flex-1 p-2 border rounded"
        onChange={handleChange}
      />
      <div className="flex gap-2">
        <button
          onClick={handleShowAll}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-1 rounded text-sm"
        >
          Показать все
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded text-sm"
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
