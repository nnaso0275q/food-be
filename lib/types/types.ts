export type FoodType = {
  name: string;
  ingredients: string;
  image: string;
  price: number;
  categoryId: string;
};

export type FoodSchematype = {
  name: string;
  price: string;
  ingredients: string;
  category: string;
  image: string;
};

export type CategorySchematype = {
  name: string;
};

export type UserSchemaType = {
  email: string;
  password: string;
};
