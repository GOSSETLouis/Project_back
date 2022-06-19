import Head from "next/head";

import { IndexPage } from "../../types/index-page";

const IndexPage = ({ title }: IndexPage): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
  </div>
);

export { IndexPage };
