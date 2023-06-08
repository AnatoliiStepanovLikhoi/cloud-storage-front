import React, { useEffect, useState } from "react";
import { Layout, Avatar, Menu, Popover, Button } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import * as Api from "@/api";

import { useRouter } from "next/router";
import { checkAuth } from "@/utils/checkAuth";

export const Header: React.FC = ({}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [activeTab, setActiveTab] = useState("login");

  const handleMenuSelect = (key: string) => {
    setActiveTab(key);
  };

  const onClickLogout = () => {
    if (window.confirm("Are you sure, you want logout?")) {
      Api.auth.Logout();
      location.href = "/";
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        await Api.auth.getMe();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            Cloud Storage
          </h2>

          {isAuthenticated ? (
            <Menu
              className={styles.topMenu}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[selectedMenu]}
              onSelect={({ key }) => router.push(key)}
              items={[
                { key: "/dashboard", label: "Main" },
                { key: "/dashboard/profile", label: "Profile" },
              ]}
            />
          ) : (
            <Menu
              className={styles.topMenu}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[selectedMenu]}
              onSelect={({ key }) => {
                // handleMenuSelect(key);
                router.push(key); // Переход на шлях `/dashboard/auth`
                // return false; // Відміна стандартної поведінки меню
              }}
              items={[
                { key: "/dashboard/auth", label: "Login/Register" },
                // { key: "/dashboard/auth", label: "Register" },
              ]}
            />
          )}
        </div>

        {isAuthenticated && (
          <div className={styles.headerRight}>
            <Popover
              trigger="click"
              content={
                <Button onClick={onClickLogout} type="primary" danger>
                  Logout
                </Button>
              }
            >
              <Avatar>A</Avatar>
            </Popover>
          </div>
        )}
      </div>
    </Layout.Header>
  );
};
