export default function BookCard({ book }) {
  return (
    <div className="border rounded-xl shadow p-4 flex flex-col">
      {book.thumbnail && (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-32 h-48 object-cover mx-auto"
        />
      )}
      <h3 className="font-bold text-lg mt-2">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.authors?.join(", ")}</p>
      <p className="text-xs text-gray-400">{book.publishedDate}</p>
    </div>
  );
}
