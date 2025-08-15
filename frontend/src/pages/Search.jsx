// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import api from "../api/api";
// import BookCard from "../components/BookCard";

// export default function Search() {
//   const [books, setBooks] = useState([]);
//   const [params] = useSearchParams();

//   const type = params.get("type");
//   const query = params.get("query");

//   useEffect(() => {
//     if (type && query) {
//       api.get(`/books?type=${type}&query=${query}`)
//         .then((res) => setBooks(res.data))
//         .catch((err) => console.error(err));
//     }
//   }, [type, query]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Search Results</h2>
//       {books.length === 0 ? (
//         <p>No books found.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {books.map((book) => (
//             <BookCard key={book._id} book={book} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";

export default function Search() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "title";
  const query = searchParams.get("query") || "";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/books?type=${type}&query=${query}`);
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [type, query]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">
        Results for <span className="font-bold">{query}</span> ({type})
      </h2>

      {loading && <p>Loading books...</p>}

      {!loading && books.length === 0 && <p>No books found</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book, i) => (
          <div key={i} className="border p-2 rounded shadow">
            {book.thumbnail && (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-48 object-cover mb-2"
              />
            )}
            <h3 className="font-semibold text-sm">{book.title}</h3>
            <p className="text-xs text-gray-600">
              {book.authors?.join(", ") || "Unknown author"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
