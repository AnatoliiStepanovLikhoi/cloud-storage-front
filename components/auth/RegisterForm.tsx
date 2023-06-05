import React from "react";
import styles from "./Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { RegisterFormDTO } from "@/api/dto/auth.dto";

import * as Api from "@/api";
import { setCookie } from "nookies";

export const RegisterForm: React.FC = () => {
  const onSubmit = async (values: RegisterFormDTO) => {
    try {
      const { token } = await Api.auth.register(values);

      notification.success({
        message: "Success!",
        description: "Moving to admin dashboard..",
        duration: 2,
      });

      setCookie(null, "_token", token, {
        path: "/",
      });

      location.href = "/dashboard";
    } catch (error) {
      console.warn("LoginForm", error);

      notification.error({
        message: "Error(",
        description: "Wrong login or password",
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form name="basic" labelCol={{ span: 8 }} onFinish={onSubmit}>
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
