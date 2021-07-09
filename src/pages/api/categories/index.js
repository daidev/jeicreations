import { listCategories } from "../../../lib/categories";

// product catogories
export default (req, res) => {
  const categories = listCategories();
  res.status(200).json(categories);
}