export interface productsProps {
  brand: string,
  category: string,
  description: string,
  image: string,
  isNew: boolean,
  oldPrice: number,
  price: number,
  title: string,
  _id: number,
}

export interface StoreProduct {
  brand: string,
  category: string,
  description: string,
  image: string,
  isNew: boolean,
  oldPrice: number,
  price: number,
  title: string,
  _id: number,
  quantity: number,
}

export interface StateProps {
  products: [];
  favourites: [];
  userInfo: ( null | string );
  cart: any;
}