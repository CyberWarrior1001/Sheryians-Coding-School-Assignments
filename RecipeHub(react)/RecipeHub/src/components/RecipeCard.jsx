function RecipeCard({ product, setCartItems }) {
  const addToCartHandler = (product) => {

    setCartItems((prev) => [...prev, product]);
};
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col gap-4 p-4">
      {/* Image Container with Price Capsule */}
      <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.imgUrl}
          alt="Recipe"
          className="w-full h-full object-cover"
        />
        {/* Top-Left Price Capsule */}
        <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full">
          ${product.price}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Footer Parent Container (Flex + Justify Between) */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        {/* Left Side: Chef Name and Time stacked */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm">
            {product.chefName}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {product.prepTime} mins
          </span>
        </div>

        {/* Right Side: Add to Cart Button */}
        <button
          onClick={() => {
            addToCartHandler(product);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
