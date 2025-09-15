import type { MenuData } from "./types";

export const menu: MenuData = {
  currency: "EUR",
  theme: { primary: "#F7C884", accent: "#DC7129", dark: "#462305" },
  promo: {
    id: "spring",
    title: "Spring Specials",
    subtitle: "Limited time • Save 15%",
    image: "image-placeholder.png",
    link: "/specials",
    background: "#F7C884",
  },
  categories: [
    {
      id: "starters",
      name: "Starters",
      items: [
        {
          id: "bruschetta",
          name: "Bruschetta",
          description: "Tomato, basil, olive oil",
          image: "image-placeholder.png",
          price: 6.5,
          badges: ["vegan"],
        },
        {
          id: "calamari",
          name: "Crispy Calamari",
          description: "Lemon aioli",
          image: "image-placeholder.png",
          price: 8.0,
        },
      ],
    },
    {
      id: "mains",
      name: "Mains",
      items: [
        {
          id: "carbonara",
          name: "Carbonara",
          description: "Pancetta, pecorino, egg",
          image: "image-placeholder.png",
          price: 13.5,
        },
        {
          id: "vegan-bowl",
          name: "Green Bowl",
          description: "Quinoa, avocado, greens",
          image: "image-placeholder.png",
          badges: ["vegan"],
          price: 11.0,
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: "espresso",
          name: "Espresso",
          image: "image-placeholder.png",
          price: 2.2,
        },
        {
          id: "lemonade",
          name: "House Lemonade",
          image: "image-placeholder.png",
        },
      ],
    },
  ],
};
