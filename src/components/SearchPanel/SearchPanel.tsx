import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";

const SearchPanel = (): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 1000);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center max-w-sm mx-auto mb-3">
        <SearchInput query={query} setQuery={setQuery} />
      </div>
      <SearchList query={!query ? "" : debouncedQuery} />
    </div>
  );
};

export default SearchPanel;
