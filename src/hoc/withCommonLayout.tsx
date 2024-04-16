import Head from "next/head";
import { ComponentType, Fragment } from "react";

export const withCommonLayout = (Component: ComponentType) => {
  const ComponentWithCommonLayout = () => {
    return (
      <Fragment>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
          <meta name="format-detection" content="telephone=no" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta property="og:locale" content="ko_kr" />
        </Head>
        HOC
        <Component />
      </Fragment>
    );
  };

  return ComponentWithCommonLayout;
};
