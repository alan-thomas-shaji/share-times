import { useState } from "react";
import { Input, Button, Form, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { IUserProfileForm } from "../../types/types";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { supabase } from "../../utils/supabse";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: IUserProfileForm) => {
    try {
      setLoading(true);
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      if (signUpData) {
        message.success("Signup successful! Please check your email for verification mail");
        navigate("/login"); // Redirect to the login page after successful signup
      }
    } catch (error) {
      message.error("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Form
          name="signupForm"
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
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignupPage;
