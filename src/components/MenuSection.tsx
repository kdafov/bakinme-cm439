import MenuItem from "./MenuItem";

interface MenuItemData {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface MenuSectionProps {
  id: string;
  title: string;
  items: MenuItemData[];
}

export default function MenuSection({ id, title, items }: MenuSectionProps) {
  return (
    <section id={id} className="mb-8">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#462305] pacifico-regular">
          {title}
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#DC7129] to-[#F7C884] rounded-full mt-2"></div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}
