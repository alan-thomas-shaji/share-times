import axios from "axios";

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

  const totalPages = Math.ceil(response.data.totalResults / 50); 

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
