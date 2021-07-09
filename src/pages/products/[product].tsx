import React from 'react'
import { Box, Typography } from '@material-ui/core';
import { GetStaticProps, GetStaticPaths } from "next";
import { MdxRemote } from "next-mdx-remote/types";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";

import { fetchProduct, fetchProducts } from "../../lib/products";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  materials?: string[];
  categories: string[];
  author: string;
  source: MdxRemote.Source;
};

const externalComponents = {
  InstagramEmbed, YouTube, TwitterTweetEmbed
}
const components = { 
  ...externalComponents,
  h2: (props) => <Typography variant="h2" {...props} />
};

const ProductPage = ({ source }) => {
  const content = hydrate(source, { components })
  return (
    <Box textAlign="center">
      {content}
    </Box>
  );
}

export default function Product({ slug, title, ...props }: Props) {
  const url = `/products/${slug}`;
  
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <ProductPage {...props} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = fetchProducts();
  const paths = products.map(it => "/products/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.product as string;
  console.log({ slug });
  const product = fetchProduct(slug);
  const { content, ...data } = product || { content: "" };
  const source = await renderToString(content, { components, scope: data as any });
  return {
    props: {
      ...data,
      source,
    },
  };
};
