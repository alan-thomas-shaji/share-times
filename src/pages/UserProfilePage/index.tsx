import { UserOutlined, LockOutlined, MailOutlined, DeleteFilled } from "@ant-design/icons";
import { Avatar, Form, Input, Button, message } from "antd";
import Title from "../../components/Title";
import { IUserProfileForm } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../utils/supabse";

const UserprofilePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: IUserProfileForm) => {
    console.log("Received values:", values);
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error(error);
        message.error("Something went wrong");
        throw error;
      }

      if (data) {
        message.success("Profile updated successfully!");
        navigate("/");
      }
    } catch (error) {
      message.error("An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-6 ml-4 flex">
        <Title />
      </div>
      <div className="flex flex-col items-center justify-center h-fit">
        <div className="text-3xl mt-8 pt-16 pb-8 w-full bg-blue-500 text-white flex justify-center shadow-xl">User Profile</div>
        <div className="block p-4 rounded-md mb-4 mt-6">
          <div className="mr-4 flex justify-center">
            <Avatar size={96} icon={<UserOutlined />} className="m-8" />
          </div>
          <div className="w-full p-1">
            <Form
              name="profileForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item className="flex justify-end">
                <Button className="bg-blue-500 text-white" htmlType="submit">
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserprofilePage;
