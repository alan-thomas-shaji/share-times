import { Route, Routes } from "react-router-dom"
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import LoginPage from "./pages/LoginPage";
import BookmarksPage from "./pages/BookmarksPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" Component={ArticlesPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/articles" Component={ArticlesPage} />
        <Route path="/articles/:id" Component={ArticleDetailsPage} />
        <Route path="/bookmarks" Component={BookmarksPage} />
        <Route path="/profile" Component={UserProfilePage} />
      </Routes>
    </>
  );
}

export default App
