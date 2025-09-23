export type Allergen =
  | "celery"
  | "crustaceans"
  | "egg"
  | "fish"
  | "gluten"
  | "lupin"
  | "milk"
  | "molluscs"
  | "mustard"
  | "peanuts"
  | "pinenuts"
  | "sesame"
  | "soybeans"
  | "sulphites";

export type Category = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  image: string;
  title: string;
  description?: string;
  price: number;
  allergies: Allergen[];
  passiveAllergies: Allergen[];
};

export type InfoBox = {
  id: string;
  message: string;
};

export type MenuEntry = MenuItem | InfoBox;

export type MenuSection = {
  id: string;
  title: string;
  items: MenuEntry[];
};

export interface MenuObject {
  categories: Category[];
  sections: MenuSection[];
}
