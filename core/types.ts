// import { NextPage } from "next";
// import React from "react";

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: React.ReactElement, props: P) => React.ReactNode;
// };

import { NextPage } from "next";
import React from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
