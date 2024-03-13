import { useQuery } from "@tanstack/react-query";
import { fetchBookmarks } from "../../services/api";
import ArticleCard from "../../components/ArticleCard";
import { IArticleCardProps, IArticleData } from "../../types/types";
import Title from "../../components/Title";
import { Button, message } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const BookmarksPage = () => {
  // const { data: bookmarks } = useQuery("bookmarks", () => fetchBookmarks());
  const {
    isPending,
    error,
    data: bookmarksData,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => fetchBookmarks(),
  });
  const handleClearBookmarks = () => {
    localStorage.removeItem("bookmarks");
    message.success("Bookmarks cleared");
  };
  return (
    <div>
      <div className="mt-6 ml-4 flex">
        <Title />
      </div>
      <div className="text-3xl mt-8 pt-16 pb-8 w-full bg-blue-500 text-white flex justify-center shadow-xl">
         Bookmarks
      </div>
      <div className="p-4 rounded">
        <div className="w-full p-1">
          <Button
            className="bg-blue-500 text-white"
            onClick={handleClearBookmarks}
            icon={<DeleteFilled />}
          >
            Clear Bookmarks
          </Button>
        </div>
      </div>
      <div className="m-2 flex flex-wrap justify-center">
        {bookmarksData?.map((bookmark: IArticleCardProps, idx: number) => (
          // <ArticleCard key={idx} {...bookmark} />
          <ArticleCard
            key={idx}
            id={idx}
            title={bookmark?.title}
            description={bookmark?.description}
            imageUrl={bookmark?.imageUrl}
            url={bookmark?.url}
            // isPending={isPending}
          />
        ))}
      </div>
    </div>
  );
}

export default BookmarksPage
