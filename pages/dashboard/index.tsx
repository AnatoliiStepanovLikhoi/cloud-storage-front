import { GetServerSidePropsContext, NextPage } from "next";
import nookies from "nookies";
import * as Api from "@/api";
import { checkAuth } from "@/utils/checkAuth";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "../types";

import styles from "@/styles/Home.module.scss";
import { Button, Menu } from "antd";
import { useRouter } from "next/router";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";

interface Props {
  // items: FileItem[];
}

const DashboardPage: NextPageWithLayout<Props> = ({}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <Button>Upload</Button>
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: "/dashboard",
              icon: <FileOutlined />,
              label: "Files",
              onClick: () => router.push("/dashboard"),
            },
            {
              key: "/dashboard/photos",
              icon: <FileImageOutlined />,
              label: "Photos",
              onClick: () => router.push("/dashboard/photos"),
            },
            {
              key: "/dashboard/trash",
              icon: <DeleteOutlined />,
              label: "Trash",
              onClick: () => router.push("/dashboard/trash"),
            },
          ]}
        />
      </div>
      <div className="container">
        <h1>Files</h1>
      </div>
    </main>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Main">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  return {
    props: {},
  };
};

export default DashboardPage;
