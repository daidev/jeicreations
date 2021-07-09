
import { useEffect, useState } from 'react'


export default function useCategories(): {
  categories: any[],
  loading: boolean,
  getCategory: (string) => any,
} {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/categories')
      .then(res => res.json())
      .then(res => {
        setResults(res)
        setLoading(false);
      })
  }, []);

  function getCategory(category) {
    return results.find(({ slug }) => slug === category);
  }

  return {
    categories: results,
    loading,
    getCategory,
  }
}
