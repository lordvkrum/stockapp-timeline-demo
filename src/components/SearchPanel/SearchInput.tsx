import React from "react";

interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ query, setQuery }: SearchInputProps) => {
  return (
    <>
      <input
        className="p-3 no-border rounded-s-lg w-full focus:outline-none"
        type="text"
        placeholder="Search..."
        value={query}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
        data-testid="search-input"
      />
      <button
        className="p-3 text-white bg-blue-700 rounded-e-lg"
        onClick={() => setQuery("")}
        data-testid="clear-search-button"
      >
        Clear
      </button>
    </>
  );
};

export default SearchInput;
