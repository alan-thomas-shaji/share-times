import { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { IUserProfileForm } from "../../types/types";
import { supabase } from "../../utils/supabse";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: IUserProfileForm) => {
    try {
      setLoading(true);
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      if (loginData) {
        message.success("Login successful!");
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
      <div className="flex justify-center items-center h-screen">
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className="mb-6">
            <Title />
          </div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-500 text-white"
            >
              Log in
            </Button>
          </Form.Item>
          <div className="mt-4">
            <Button type="link" onClick={() => navigate("/signup")}>
              Don't have an account? Sign up here
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
