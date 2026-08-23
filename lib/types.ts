export interface Item {
  id: number;
  name: string;
  category: string;
  stockLevel: 0 | 1 | 2;
  wantToBuy: boolean;
  bought: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Catalog {
  id: number;
  name: string;
  categoryId: number;
}
