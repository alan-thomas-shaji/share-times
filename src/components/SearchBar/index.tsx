import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchterm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();
    const onSearch = () => {
      navigate(`/articles?search=${searchterm}`);
    };
    const SearchButton = (
      <Button
        className="bg-blue-500 !text-white  hover:bg-white hover:text-blue-500 rounded-md w-full"
            disabled={!searchterm}
            icon={<SearchOutlined className='text-white'/>}
      >
      </Button>
    );
    return (
      <>
        <Search
          placeholder={"Search for News here"}
          allowClear
          enterButton={SearchButton}
          size="large"
          className="w-full sm:w-1/2 bg-[#1677ff] rounded-md m-1"
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);
          }}
          onSearch={onSearch}
        />
      </>
    );
}

export default SearchBar
