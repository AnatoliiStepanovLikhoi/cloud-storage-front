import { NextPageWithLayout } from "../types";
import { User } from "@/api/dto/auth.dto";
import { checkAuth } from "@/utils/checkAuth";
import { Button } from "antd";
import { GetServerSidePropsContext } from "next";
import * as Api from "@/api";
import styles from "@/styles/Profile.module.scss";
import { Layout } from "@/layouts/Layout";

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  const onClickLogout = () => {
    if (window.confirm("Are you sure, you want logout?")) {
      Api.auth.Logout();
      location.href = "/";
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={onClickLogout} type="primary" danger>
          Выйти
        </Button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Profile">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
