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
  quantity?:number;
};
export type SelectedProduct = {
  model: string;
  selected_product_id: string;
  quantity: string;
  test_id: string;
  product_info: Product;
};
