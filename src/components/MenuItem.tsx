interface MenuItemProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function MenuItem({
  image,
  title,
  description,
  price,
}: MenuItemProps) {
  return (
    <div className="bg-white rounded-xl border border-[#DC7129]/60 hover:border-[#DC7129]/30 transition-all duration-200 hover:shadow-md overflow-hidden mx-6">
      <div className="flex p-4">
        {/* Image */}
        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#DC7129] to-[#F7C884] rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Content Area */}
        <div className="flex-1 ml-4 min-w-0">
          <div className="flex justify-between items-start mb-2">
            {/* Title */}
            <h3 className="font-semibold text-[#462305] text-lg leading-tight pr-3 flex-1">
              {title}
            </h3>

            {/* Price */}
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-[#DC7129]">
                €{price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
