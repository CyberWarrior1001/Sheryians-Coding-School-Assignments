import RecipeCard from "./RecipeCard";

function MainContainer({products, setCartItems, cartItems}) {
  return (
    <div className="col-span-3 p-8 ">
      <div className="header flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Discover Recipies</h1>
        <p>Top rated recipies for your next meal</p>
      </div>
      <div className="recipies_list grid grid-cols-2 gap-6 my-4" >
        {
          products.map((product)=>(
            
            <RecipeCard product={product} key={product?.id} setCartItems={setCartItems} cartItems={cartItems}/>
          ))
        }
                        
      </div>
    </div>
  );
}

export default MainContainer;
