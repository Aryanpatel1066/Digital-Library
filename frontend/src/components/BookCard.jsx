 import { Link } from "react-router-dom";
export default function BookCard({ book }) {
  return (
        <Link to={`/books/${book._id}`} className="block">

    <div className="flex border rounded-xl shadow p-4 gap-4">
      {/* Left: Thumbnail */}
      {book.thumbnail && (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-32 h-48 object-cover rounded"
        />
      )}

      {/* Right: Book Details */}
      <div className="flex flex-col">
        {/* Title */}
        <h3 className="text-blue-600 font-bold text-lg">{book.title}</h3>

        {/* Author */}
        <p className="font-semibold text-gray-900">
          {book.authors?.join(", ") || "Unknown Author"}
        </p>

        {/* Published Date + ISBN */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Published:</span>{" "}
          {book.publishedDate || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">ISBN:</span>{" "}
          {book.isbn || "N/A"}
        </p>

        {/* Available Copies */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Available Copies:</span>{" "}
          {book.availableCopies || 1}
        </p>

        {/* Description */}
        {book.description && (
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">
            {book.description}
          </p>
        )}
      </div>
    </div>
        </Link>

  );
}
