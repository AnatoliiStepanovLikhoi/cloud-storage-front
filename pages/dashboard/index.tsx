import axios from "axios";
import { GetServerSidePropsContext, NextPage } from "next";
import nookies from "nookies";
import * as Api from "@/api";
import { checkAuth } from "@/utils/checkAuth";
import { Header } from "@/components/Header";

const DashboardPage: NextPage = () => {
  return (
    <main>
      <Header />
      <h1>Dashboard page</h1>
    </main>
  );
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
