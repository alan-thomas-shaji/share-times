const ArticleDetailsPage: React.FC = () => {
  return (
    <>
      <div>Article Details Page</div>
      <div>
        <div className="title flex justify-center">
          <div className="text-5xl">Europe Street beat</div> 
        </div>
        <div className="imgUrl flex justify-center">
          <div>
            <img
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              alt="News Article Banner"
            />
          </div>
        </div>
        <div className="description flex justify-center">
          <div>www.instagram.com</div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetailsPage;
