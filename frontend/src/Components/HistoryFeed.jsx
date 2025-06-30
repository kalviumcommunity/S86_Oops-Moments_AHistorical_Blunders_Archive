import React, { useState, useEffect } from "react";
import HistoryCard from "./HistoryCard";
import axios from "axios";
import BlogNavFAB from "./BlogNavFAB";
import AuthorFilterDropdown from "./AuthorFilterDropdown";

const HistoryFeed = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/post/feed");
      setEntries(res.data);
      setFilteredEntries(res.data); // default: show all
    } catch (error) {
      console.error("Failed to fetch history data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAuthorFilter = (data) => {
    if (data === "All") {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(data);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex flex-col space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">History Oops</h1>
      <p className="text-gray-600 mb-6">
        Discover history's strangest moments, peculiar events, and amusing
        mishaps that you probably didn't learn about in school.
      </p>

      {/* Author Filter Dropdown */}
      <AuthorFilterDropdown onAuthorPostsFetched={handleAuthorFilter} />

      {/* Post List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <HistoryCard key={entry._id} entry={entry} refreshFeed={fetchHistory} />
          ))
        ) : (
          <p className="text-gray-500">No posts found for this author.</p>
        )}
      </div>

      <BlogNavFAB refreshFeed={fetchHistory} />
    </div>
  );
};

export default HistoryFeed;
