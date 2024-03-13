import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

const NoSearchQueryError: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <Empty
        imageStyle={{ height: 60 }}
        description={<span>Oops! Looks like something went wrong...</span>}
      >
        <Button
          className="bg-blue-500 text-white"
          onClick={() => navigate("/")}
        >
          Back to Home Page
        </Button>
      </Empty>
    </div>
  );
};

export default NoSearchQueryError;
