import { useLocation, useNavigate } from "react-router-dom";
import ArticleCard from "../../components/ArticleCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchAllNews } from "../../services/api";
import { IArticleData, IPageData } from "../../types/types";
import NoSearchQueryError from "../../components/ErrorComponent/NoSearchQueryError";
import SearchBar from "../../components/SearchBar";
import { Button, Dropdown, MenuProps, Select, Spin, message } from "antd";
import { useState } from "react";
import Title from "../../components/Title";
import { HeartFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useIntersection } from "react-use";
import { supabase } from "../../utils/supabse";

const ArticlesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const {
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    data: newsData,
  } = useInfiniteQuery({
    queryKey: ["newsDataSearch", search, sortBy],
    queryFn: ({ pageParam = 1 }) => fetchAllNews(search, sortBy, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.totalPages > lastPage.page ? lastPage.page + 1 : undefined,
    initialPageParam: 1, // Provide an initial page parameter
  });

  const handleLogout = async() => { 
    let { error } = await supabase.auth.signOut();
    message.success("Logged out successfully");
    if(error) return message.error("Something went wrong")
    navigate("/login");
   };
  
  const items: MenuProps["items"] = [
    {
      label: "User Profile",
      onClick: () => {
        navigate("/profile");
      },
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Bookmarks",
      key: "2",
      icon: <HeartFilled />,
      onClick: () => {
        navigate("/bookmarks");
      },
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined />,
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const menuProps = {
    items,
  };
  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null);

  const intersection = useIntersection(loadMoreButtonRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  React.useEffect(() => {
    if (intersection && intersection.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [intersection, fetchNextPage, hasNextPage]);
  if (isError) return <NoSearchQueryError />;
  if (isFetching)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  return (
    <>
      <div className="m-2">
        <div className="mt-6 ml-4 flex">
          <Title />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center bg-blue-500 py-8 mb-10">
          <SearchBar />
          <Select
            style={{ marginLeft: 16 }}
            defaultValue={null}
            onChange={(value) => setSortBy(value)}
            placeholder={<span className="text-black">Filter Articles</span>}
            className="m-1 w-2/3 sm:w-fit"
          >
            <Select.Option value="relevancy">Relevancy</Select.Option>
            <Select.Option value="popularity">Popularity</Select.Option>
            <Select.Option value="publishedAt">Published At</Select.Option>
          </Select>
          <Dropdown.Button
            menu={menuProps}
            placement="bottom"
            icon={<UserOutlined />}
            className="w-fit m-1 ml-4 bg-white rounded-md"
          >
            Options
          </Dropdown.Button>
        </div>
        <div className="m-2 flex flex-wrap justify-center">
          {newsData?.pages.map((pageData, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {pageData.articles.map((newsItem: IArticleData, idx: number) => (
                <ArticleCard
                  key={idx}
                  id={idx}
                  title={newsItem?.title}
                  description={newsItem?.description}
                  imageUrl={newsItem?.urlToImage}
                  url={newsItem?.url}
                  // isPending={isPending}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        {hasNextPage && (
          <div className="flex justify-center">
            <Button
              ref={loadMoreButtonRef}
              onClick={() => fetchNextPage()}
              className="text-blue-500 border-blue-500 bg-white"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticlesPage;
