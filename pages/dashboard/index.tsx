import { GetServerSidePropsContext } from "next";
import * as Api from "@/api";
import { checkAuth } from "@/utils/checkAuth";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "../../core/types";

import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/module/Files";

interface Props {
  items: FileItem[];
}

const DashboardPage: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
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

  try {
    const items = await Api.files.getAll("all");

    return {
      props: {
        items,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        items: [],
      },
    };
  }
};

export default DashboardPage;
