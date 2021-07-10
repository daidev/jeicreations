import { fetchProducts } from "../../../lib/products";

// search products
export default function getProducts(req, res) {
  const filter = req.query.category ? req.query.category : null;
  const products = fetchProducts(filter);
  res.status(200).json(products)
}