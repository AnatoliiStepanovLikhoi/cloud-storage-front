// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import type { NextPage } from "next";
// import React, { ReactNode } from "react";

// interface Props extends AppProps {
//   Component: AppProps["Component"] & {
//     getLayout?: (page: React.ReactElement) => React.ReactNode;
//   };
// }

// export default function App({ Component, pageProps }: Props) {
//   const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

//   return getLayout(<Component {...pageProps} />);
// }

// import { NextPage } from "next";
// import type { AppProps } from "next/app";
// import { ScriptProps } from "next/script";
// import "@/styles/globals.css";

// type Page<P = Record<string, never>> = NextPage<P> & {
//   Layout: (page: ScriptProps) => JSX.Element;
// };

// type Props = AppProps & {
//   Component: Page;
// };

// const Noop = ({ children }: ScriptProps) => <>{children}</>;

// function App({ Component, pageProps }: Props) {
//   const Layout = Component.Layout || Noop;

//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

// export default App;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { NextPageWithLayout } from "../core/types"; // Вкажіть правильний шлях до вашого файлу з типами

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return getLayout(<Component {...pageProps} />);
}
