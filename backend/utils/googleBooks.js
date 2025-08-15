 const fetch = require("node-fetch");

const fetchBooks = async (type, query) => {
  let googleQuery = "";
  if (type === "isbn") googleQuery = `isbn:${query}`;
  else if (type === "title") googleQuery = `intitle:${query}`;
  else if (type === "author") googleQuery = `inauthor:${query}`;
  else throw new Error("Invalid type");

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(googleQuery)}`;
  const response = await fetch(url);
  const data = await response.json();

  return (data.items || []).map(item => {
    const v = item.volumeInfo;
    // ✅ Safely extract ISBN_13 if available
    const isbn = v.industryIdentifiers?.find(i => i.type === "ISBN_13")?.identifier || null;

    return {
      title: v.title,
      authors: v.authors || [],
      publisher: v.publisher || null,
      publishedDate: v.publishedDate || null,
      description: v.description || null,
      pageCount: v.pageCount || null,
      categories: v.categories || [],
      averageRating: v.averageRating || null,
      thumbnail: v.imageLinks?.thumbnail || null,
      isbn: isbn, // ✅ now properly defined
    };
  });
};

module.exports = fetchBooks;
