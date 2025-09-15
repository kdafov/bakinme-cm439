type Badge = "vegan" | "spicy" | "gluten-free";
type Currency = "EUR";

interface ModifierOption {
  id: string;
  label: string;
  priceDelta?: number;
}
interface ModifierGroup {
  id: string;
  name: string;
  required?: boolean;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  badges?: Badge[];
  available?: boolean;
  modifiers?: ModifierGroup[];
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}
export interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
  background?: string;
}

export interface MenuData {
  currency: Currency;
  categories: Category[];
  promo?: Promo;
  theme: { primary: string; accent: string; dark: string };
}
