import React from 'react';

import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import ProductList from '../../components/ProductList';
import { listCategories } from '../../lib/categories';
import { fetchProducts } from '../../lib/products';

export default function Index({ products, categories }) {
  const url = "/products";
  const title = "All products";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <ProductList products={products} categories={categories} />
    </Layout>
  );
}


export async function getStaticProps() {
  const products = fetchProducts();
  const categories = listCategories();

  return {
    props: { products, categories }
  }
 }

// export async function getServerSideProps({ query, ...rest }) {
//   const queryParams = new URLSearchParams(query);
//   const category = queryParams.getAll('category');
//   const colors = queryParams.getAll('colors');
//   const materials = queryParams.getAll('materials');
  
//   const filters = {
//     category: category.length > 0 ? category[0] : "",
//     colors: colors.length > 0 ? colors[0] : "",
//     materials: materials.length > 0 ? materials[0] : "",
//   };

//   return {
//     props: { filters }
//   }
//  }

 