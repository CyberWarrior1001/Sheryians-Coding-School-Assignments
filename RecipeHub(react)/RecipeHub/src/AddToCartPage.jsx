import AddToCartPCard from "./components/AddToCartPCard";


function CartPage({cartItems, setCartItems}) {
  
  

  return (
    <div className="p-8 max-w-6xl mx-auto bg ">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((item) => (
             <AddToCartPCard item={item} setCartItems={setCartItems} cartItems={cartItems}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
