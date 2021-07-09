import { fetchProducts } from "../../../lib/products";

export default (req, res) => {
  const filter = req.query.category ? req.query.category : null;
  const products = fetchProducts(filter);
  
  const productsByCategories = products.reduce((acc, { categories, ...product }) => {
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
  
  res.status(200).json(productsByCategories)
}