 import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

// lucide-react icons
import { BookOpen, Calendar, Barcode, FileText, Globe, Copy ,Star} from "lucide-react";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!book) return null;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Thumbnail */}
      <div className="flex justify-center md:justify-start">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-xl shadow-md"
          />
        ) : (
          <div className="w-48 h-72 bg-gray-200 flex items-center justify-center rounded-xl">
            <BookOpen className="text-gray-400 w-10 h-10" />
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="md:col-span-2 flex flex-col">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>

        {/* Metadata with icons */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Authors:</span>
            <span>{book.authors?.join(", ") || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Published:</span>
            <span>{book.publishedDate || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Barcode className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">ISBN:</span>
            <span>{book.isbn || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Pages:</span>
            <span>{book.pageCount || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Rating:</span>
            <span>{book.averageRating || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Available:</span>
            <span>
              {book.copiesAvailable} / {book.totalCopies}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 text-gray-700 text-sm leading-relaxed">
          {expanded ? book.description : `${book.description?.slice(0, 200)}...`}
          {book.description?.length > 200 && (
            <button
              className="ml-2 text-blue-600 hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl">
            Borrow Book
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-xl">
            Add to Favorites
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl">
            Preview
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
            Info
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl">
            WebReader
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl">
            Talk with me
          </button>
        </div>
      </div>
    </div>
  );
}
