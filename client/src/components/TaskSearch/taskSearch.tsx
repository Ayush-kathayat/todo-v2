import React, { useState } from "react";
import "./taskSearch.css";

type TaskSearchProps = {
  newTaskClicked: (value: boolean) => void;
  onSearchTermChange: (term: string) => void;
};

const TaskSearch: React.FC<TaskSearchProps> = ({newTaskClicked, onSearchTermChange}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearchTermChange(newSearchTerm);
  };

  const handleCleanup = () => {
    setSearchTerm("");
    onSearchTermChange("");
  }

  const handleSwitch = () => {
    handleCleanup();
    newTaskClicked(true);
  }


  return (
    <div className="search-header">
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for tasks..."
        />

        <div className="search-icon-wrapper" onClick={handleCleanup}>
          <img src="x.svg" alt="search-icon" />
        </div>
      </div>

      <button className="new-task-button" onClick={handleSwitch}>
        New Task
      </button>
    </div>
  );
};
export default TaskSearch;
