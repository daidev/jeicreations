import { useEffect, useState } from 'react'
import { fetchProductsByCategories } from '../lib/products';

// const searchEndpoint = ({ category, colors, materials }) => {
//   const query = new URLSearchParams({ category, colors, materials })
//   return `/api/products/category?${query.toString()}`
// }

export default function useProductsByCategory(filters) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // fetch(searchEndpoint(filters))
    //   .then(res => res.json())
    //   .then(res => {
    //     setResults(res)
    //     setLoading(false);
    //   })
    setResults(fetchProductsByCategories(filters));
    setLoading(false);
  }, [filters]);

  return {
    products: results,
    loading,
  }
}
