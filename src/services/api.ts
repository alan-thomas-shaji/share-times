import axios from "axios";

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
const day = String(today.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;

// export const fetchAllNews = async (
//   searchQuery: string | null,
//   sortBy: string | null
// ) => {
//   const response = await axios.get(
//     `${
//       import.meta.env.VITE_NEWS_API_BASE_URL
//     }/everything?q=${searchQuery}&language=en&page=1&sortBy=${sortBy}&pageSize=${50}&page=${1}&apiKey=${
//       import.meta.env.VITE_NEWS_API_KEY
//     }`
//   );
//   console.log(response.data);
//   return response.data;
// };
export const fetchAllNews = async (
  searchQuery: string | null,
  sortBy: string | null,
  page: number
) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_NEWS_API_BASE_URL
    }/everything?q=${searchQuery}&language=en&sortBy=${sortBy}&pageSize=${50}&page=${page}&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  );

  const totalPages = Math.ceil(response.data.totalResults / 50); // Assuming 50 items per page

  return {
    page,
    totalPages,
    articles: response.data.articles,
  };
};

export const fetchLatestNews = async () => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_NEWS_API_BASE_URL
    }/top-headlines?language=en&page=1&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  );
  console.log(response.data);
  return response.data;
};

export const fetchBookmarks = () => {
  const bookmarksFromLocalStorage = localStorage.getItem("bookmarks") || "";
  const storedBookmarks = JSON.parse(bookmarksFromLocalStorage) || [];
  return storedBookmarks;
};
