import { fetchProductsByCategories } from "../../../lib/products";

export default function getProductsByCategories(req, res) {
  const filter = req.query.category ? req.query.category : null;
  const products = fetchProductsByCategories(filter);
  res.status(200).json(products)
}