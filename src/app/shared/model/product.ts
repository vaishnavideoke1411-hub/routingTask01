export interface IProduct {
  id?: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  price: number;
  
  rating: rating;
  status: string;
}

export interface rating {
  rate : number,
  count : number
}
