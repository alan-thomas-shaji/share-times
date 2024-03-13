import { Route, Routes } from "react-router-dom"
import ArticlesPage from "./pages/ArticlesPage";
import LoginPage from "./pages/LoginPage";
import BookmarksPage from "./pages/BookmarksPage";
import UserProfilePage from "./pages/UserProfilePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./ProtectedRoute";
import SignUpPage from "./pages/SignUpPage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/" element={<ProtectedRoute Component={SearchPage} />} />
          <Route
            path="/articles"
            element={<ProtectedRoute Component={ArticlesPage} />}
          />
          <Route
            path="/bookmarks"
            element={<ProtectedRoute Component={BookmarksPage} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={UserProfilePage} />}
          />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App
