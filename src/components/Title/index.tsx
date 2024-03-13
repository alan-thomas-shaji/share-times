import { useNavigate } from "react-router-dom"

const Title = () => {
    const navigate = useNavigate();
    const handleClick = () => { 
        navigate("/");
     };
  return (
    <div className='m-2 text-4xl font-mono font-bold text-blue-500 flex justify-center cursor-pointer hover:text-blue-400' onClick={handleClick}>
      Share Times
    </div>
  )
}

export default Title
