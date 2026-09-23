import { X } from 'lucide-react';

function AddToCartPCard({item, setCartItems, cartItems}) {
    const deleteProductfromCart = ()=>{
        console.log("Product deleted successfully")
        
        let anotherarr = cartItems.filter(citem=>citem.id !== item.id)
        console.log(anotherarr)
        setCartItems(anotherarr)
    }
  return (
    <div>
      <div key={item.id} className="relative max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col gap-4 p-4">
              
              {/* Lucide X Delete Button (Top Right of Card) */}
              <button 
              onClick={deleteProductfromCart}
                className="absolute top-6 right-6 z-10 bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-600 p-1.5 rounded-full transition duration-200 border border-gray-100 shadow-sm"
                aria-label="Remove item"
              >
                <X size={18} />

              </button>

              {/* Image Container with Price Capsule */}
              <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={item.imgUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                {/* Top-Left Price Capsule */}
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full">
                  $ {item.price}
                </span>
              </div>

              {/* Content Area */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Footer Parent Container */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-sm">{item.chechefNamef}</span>
                  <span className="text-xs text-gray-500 font-medium">{item.prepTime}</span>
                </div>
              </div>

            </div>
    </div>
  )
}

export default AddToCartPCard
