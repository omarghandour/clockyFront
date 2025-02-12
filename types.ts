export type Product = {
  _id: string;
  name?: string;
  price?: string;
  before?: string;
  description?: string;
  countInStock?: string;
  gender?: string;
  caseColor?: string;
  dialColor?: string;
  movmentType?: string;
  class?: string;
  productClass?: string;
  img?: string;
  brand?: string;
};

export type ProductFormData = Omit<Product, "_id">;
