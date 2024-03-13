import { Button, Modal, message } from "antd";
import { IArticleModalProps } from "../../../types/types";
import {
  CompassOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import copy from "copy-to-clipboard";

const ArticleDetailsModal: React.FC<IArticleModalProps> = ({
  isOpen,
  onCancel,
  article,
}) => {
  const handleBookmarkClick = () => {
    const currentBookmarksString = localStorage.getItem("bookmarks");
    const currentBookmarks = currentBookmarksString
      ? JSON.parse(currentBookmarksString)
      : [];
    const newBookmarks = [...currentBookmarks, article];
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    message.success("Successfully added new bookmark");
  };

  const ModalTitle = (
    <div className="text-2xl md:text-4xl m-2">{article?.title}</div>
  );

  const handleShareClick = () => {
    const messageToCopy = `Check out this article: ${article?.title} - ${article?.description} ${article?.url}`;
    copy(messageToCopy);
    message.success("Message copied to clipboard!");
  };

  const handleWhatsAppClick = () => {
    const message = `Check out this article: ${article.title} - ${article.description}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Modal
      title={ModalTitle}
      visible={isOpen}
      onCancel={onCancel}
      footer={[
        <Button
          key="whatsapp"
          onClick={handleWhatsAppClick}
          className="flex justify-center items-center"
        >
          <WhatsAppOutlined /> Share on WhatsApp
        </Button>,
      ]}
      className="flex justify-center w-[80vw] md:w-[80vw] lg:w-[70vw]"
    >
      <div
        className="mb-4 md:mb-0"
        style={{ aspectRatio: "auto", height: "40vh" }}
      >
        <img
          alt={article?.imageUrl}
          src={article?.imageUrl}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="m-2 flex flex-col md:flex-row md:justify-between">
        <div className="mb-2 md:mb-0 md:mr-4">
          <a href={article?.url} target="_blank" rel="noreferrer">
            <CompassOutlined
              twoToneColor="#eb2f96"
              style={{ fontSize: "16px", marginRight: "4px", marginTop: "7px" }}
            />
            Read Article
          </a>
        </div>
        <div
          className="m-1 flex items-center cursor-pointer"
          onClick={handleBookmarkClick}
        >
          <PlusCircleOutlined
            twoToneColor="#eb2f96"
            style={{ fontSize: "24px" }}
          />
          <span className="ml-1">Bookmark</span>
        </div>
        <div
          className="m-1 flex items-center"
          onClick={handleShareClick}
          style={{ cursor: "pointer" }}
        >
          <ShareAltOutlined style={{ fontSize: "24px" }} />
          <span className="ml-1">Share</span>
        </div>
      </div>
      <p className="text-md md:text-xl">{article?.description}</p>
    </Modal>
  );
};

export default ArticleDetailsModal;
