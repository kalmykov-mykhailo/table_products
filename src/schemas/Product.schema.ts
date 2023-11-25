export type Product = {
  delivery_price: string;
  description: string;
  model: string;
  name: string;
  original_price: string;
  photo: string;
  product_id: string;
  quantity_total: string;
  sell_price: string;
  weight: string;
};
export type selectedProduct = {
  selected_product_id: string;
  test_id: string;
  model: string;
  product_info: Product;
};
