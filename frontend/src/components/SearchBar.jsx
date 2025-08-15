import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("title");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?type=${type}&query=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="isbn">ISBN</option>
      </select>
      <input
        type="text"
        value={query}
        placeholder="Search books..."
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 flex-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Search
      </button>
    </form>
  );
}
