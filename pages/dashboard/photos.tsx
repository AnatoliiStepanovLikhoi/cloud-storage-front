import { GetServerSidePropsContext, NextPage } from "next";
import * as Api from "@/api";
import { checkAuth } from "@/utils/checkAuth";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "../../core/types";

import { FileItem } from "@/api/dto/files.dto";
import { FileList } from "@/components/FileList";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/module/Files";

interface Props {
  items: FileItem[];
}

const DashboardPhotos: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Photos">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll("photos");

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

export default DashboardPhotos;
