import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { IArticleCardProps } from "../../types/types";
import { Card, Spin } from "antd";
import ArticleDetailsModal from "../Modals/ArticleDetailsModal";
import { useState } from "react";

const ArticleCard: React.FC<IArticleCardProps> = ({
  id,
  title,
  description,
  imageUrl,
    url,
  isPending
}) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleCardClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
    if (isPending) return (
        <div className="flex justify-center items-center">
            <Spin />
        </div>
    );
  return (
    <div className="m-2">
      <Card
        hoverable
        onClick={handleCardClick}
        className="w-[80vw] md:w-[33vw] lg:w-[20vw]"
        cover={
          <div style={{ height: "200px", overflow: "hidden" }}>
            <img
              alt={imageUrl}
              src={imageUrl}
              className="w-full h-full object-cover"
            />
          </div>
        }
      >
        <Meta
          title={title}
          description={`${description?.trim().substring(0, 75)}...`}
        />
      </Card>
      <ArticleDetailsModal
        isOpen={modalVisible}
        onCancel={handleModalCancel}
        article={{ id, title, description, imageUrl, url }}
      />
    </div>
  );
};

export default ArticleCard;
