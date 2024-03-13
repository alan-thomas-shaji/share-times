import { useQuery } from "@tanstack/react-query";
import Title from "../../components/Title";
import { fetchLatestNews } from "../../services/api";
import { Spin } from "antd";
import ArticleCard from "../../components/ArticleCard";
import { IArticleData } from "../../types/types";
import Header from "../../components/Header";
import NoSearchQueryError from "../../components/ErrorComponent/NoSearchQueryError";

const SearchPage = () => {
  const {
    isPending,
    error,
    data: latestData,
  } = useQuery({
    queryKey: ["latestData"],
    queryFn: () => fetchLatestNews(),
  });
  if (isPending)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  if (error) return <NoSearchQueryError />;
  return (
    <>
      <div className="mt-6 ml-4 flex">
        <Title />
      </div>
      <Header />
      <div className="m-2 flex flex-wrap justify-center">
        {latestData?.articles?.map((newsItem: IArticleData, idx: number) => (
          <ArticleCard
            key={idx}
            id={idx}
            title={newsItem?.title}
            description={newsItem?.description}
            imageUrl={newsItem?.urlToImage}
            url={newsItem?.url}
          />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
