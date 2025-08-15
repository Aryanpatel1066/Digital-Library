 import { useEffect, useState } from "react";
import api from "../api/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar"
export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    api.get("/books/new").then((res) => setNewArrivals(res.data));
    api.get("/books/trending").then((res) => setTrending(res.data));
  }, []);

  return (
    <div className="p-4">
      <SearchBar/>
      {/* Use grid to split into 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* New Arrivals Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">📕 New Arrivals</h2>
          <div className="space-y-4">
            {newArrivals.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">🔥 Trending</h2>
          <div className="space-y-4">
            {trending.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
