import React from 'react'
import SearchBar from '../SearchBar';
import { Dropdown, MenuProps, Select, message } from 'antd';
import { HeartFilled, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabse';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
      let { error } = await supabase.auth.signOut();
      message.success("Logged out successfully");
      if (error) return message.error("Something went wrong");
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
  return (
      <div className="flex flex-col sm:flex-row justify-center items-center bg-blue-500 py-8 mb-10">
        <SearchBar />
        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
          className="w-fit m-1 ml-4 bg-white rounded-md"
        >
          Options
        </Dropdown.Button>
      </div>
  );
}

export default Header
