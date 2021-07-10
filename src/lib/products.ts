import { getDirectoryContent } from "./files";

export type ProductContent = {
  readonly date: string;
  readonly title?: string;
  readonly slug: string;
  readonly categories?: string[];
  fullPath: string;
  readonly materials?: string[];
  readonly content?: any;
};

interface Filters {
  category?: string;
  slug?: string;
}

const DEFAULT_FILTER = {
  category: "",
  slug: "",
};

export function fetchProducts(filters?: Filters): ProductContent[] {
  const { category, slug } = filters || DEFAULT_FILTER;
  return getDirectoryContent("content/products", ".mdx").filter((it) => (
    !category || (it.categories && it.categories.includes(category)) &&
    !slug || (it.slug && it.slug.includes(slug))
  ));
}

export function fetchProductsByCategories(category?: string){
  return fetchProducts({ category }).reduce((acc, { categories, ...product }) => {
    let result;
    categories.forEach(category => {
      result = {
        ...acc,
        [category]: [
          ...acc[category] || [],
          product,
        ],
      };  
    });
    return result;
  }, {});
}

export function fetchProduct(slug: string): ProductContent {
  return fetchProducts({ slug })[0];
} 
