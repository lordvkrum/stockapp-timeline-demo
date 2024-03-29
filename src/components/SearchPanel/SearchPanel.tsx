import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";

interface SearchPanelProps {
  onClickItem: () => void;
}

const SearchPanel = ({ onClickItem }: SearchPanelProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 1000);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center max-w-sm mx-auto mb-3">
        <SearchInput query={query} setQuery={setQuery} />
      </div>
      <SearchList
        query={!query ? "" : debouncedQuery}
        onClickItem={onClickItem}
      />
    </div>
  );
};

export default SearchPanel;
